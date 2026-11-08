"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { BRAND, LEAD_ENDPOINT, checkLead, consentText, type Lead, type LeadField } from "@/lib/leads";
import type { Niche } from "@/lib/niches";

type Status = { kind: "idle" | "sending" | "sent" } | { kind: "error"; field?: LeadField; message: string };

const inputClass = "h-10 bg-white text-[16px]";

// shadcn "choice card" pattern: each option is a bordered card with a radio.
function Choices({ name, legend, options, value, onChange, error }: {
  name: string;
  legend: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <FieldSet data-invalid={!!error || undefined}>
      <FieldLegend variant="label" className="text-[15px]">{legend}</FieldLegend>
      <RadioGroup
        name={name}
        value={value}
        onValueChange={(v) => onChange(String(v))}
        aria-invalid={!!error || undefined}
        className="grid grid-cols-2 gap-2"
      >
        {options.map((o) => {
          const id = `${name}-${o.replace(/\W+/g, "-").toLowerCase()}`;
          return (
            <FieldLabel key={o} htmlFor={id} className="bg-white">
              <Field orientation="horizontal" className="py-2! *:data-[slot=field-label]:leading-tight">
                <RadioGroupItem value={o} id={id} aria-label={o} />
                <FieldTitle className="text-[15px] font-normal">{o}</FieldTitle>
              </Field>
            </FieldLabel>
          );
        })}
      </RadioGroup>
      {error && <FieldError>{error}</FieldError>}
    </FieldSet>
  );
}

export function IntakeForm({ niche }: { niche: Niche }) {
  const [f, setF] = useState({ service: "", zip: "", problem: "", timeline: "", name: "", phone: "", email: "" });
  const [consented, setConsented] = useState(false);
  const [trap, setTrap] = useState(""); // honeypot: people never see it, bots fill it
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const doneRef = useRef<HTMLDivElement>(null);
  // The form shrinks to a short message on send; bring it into view so people see it worked.
  useEffect(() => {
    if (status.kind === "sent") doneRef.current?.scrollIntoView({ block: "center" });
  }, [status.kind]);
  const set = (k: keyof typeof f) => (v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    if (status.kind === "error" && status.field === k) setStatus({ kind: "idle" });
  };
  const errorFor = (k: LeadField) => (status.kind === "error" && status.field === k ? status.message : undefined);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const problem = checkLead({ vertical: niche.slug, ...f }, consented);
    if (problem) {
      setStatus({ kind: "error", ...problem });
      document.getElementById(`field-${problem.field}`)?.scrollIntoView({ block: "center" });
      return;
    }
    if (trap) return setStatus({ kind: "sent" });
    if (!LEAD_ENDPOINT) return setStatus({ kind: "error", message: "This form is not connected yet." });

    const now = new Date().toISOString();
    const lead: Lead = {
      vertical: niche.slug,
      ...f,
      consent: { agreed: true, text: consentText(BRAND), at: now },
      page: window.location.href,
      submittedAt: now,
    };
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "sent" });
    } catch {
      // Keep what they typed so they can retry without starting over.
      setStatus({ kind: "error", message: "That didn't go through. Check your connection and try again." });
    }
  }

  if (status.kind === "sent") {
    return (
      <Card ref={doneRef} role="status" className="rounded-2xl border border-black/10 bg-white shadow-xl ring-0">
        <CardHeader>
          <CardTitle className="text-[24px] font-medium">Got it. Help is on the way.</CardTitle>
          <CardDescription className="text-[17px] text-black/65">
            Watch your {f.email ? "email" : "phone"}. We&rsquo;ll write back in under a minute and find you a local pro.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border border-black/10 bg-white py-6 shadow-xl ring-0">
      <CardHeader className="gap-0.5 px-5 md:px-7">
        <CardTitle className="text-[22px] font-medium">Get help</CardTitle>
        <CardDescription className="text-[15px] text-black/65">Takes a minute. Free.</CardDescription>
      </CardHeader>
      <CardContent className="px-5 md:px-7">
        <form onSubmit={submit} noValidate>
          <FieldGroup className="gap-4">
            <div id="field-service">
              <Choices name="service" legend={niche.question} options={niche.services} value={f.service} onChange={set("service")} error={errorFor("service")} />
            </div>
            <div id="field-timeline">
              <Choices name="timeline" legend="How soon?" options={niche.timelines} value={f.timeline} onChange={set("timeline")} error={errorFor("timeline")} />
            </div>
            <Field id="field-problem" data-invalid={!!errorFor("problem") || undefined}>
              <FieldLabel htmlFor="problem" className="text-[15px]">
                Anything else? <span className="font-normal text-black/60">Optional</span>
              </FieldLabel>
              <Textarea
                id="problem"
                value={f.problem}
                onChange={(e) => set("problem")(e.target.value)}
                maxLength={1000}
                placeholder={niche.placeholder}
                aria-invalid={!!errorFor("problem") || undefined}
                className="min-h-16 bg-white text-[16px]"
              />
              {errorFor("problem") && <FieldError>{errorFor("problem")}</FieldError>}
            </Field>
            <FieldSet>
              <FieldLegend variant="label" className="text-[15px]">
                Where should we reply? <span className="font-normal text-black/60">Phone or email.</span>
              </FieldLegend>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    ["name", "First name", "text", "given-name"],
                    ["zip", "Zip code", "text", "postal-code"],
                    ["phone", "Phone", "tel", "tel"],
                    ["email", "Email", "email", "email"],
                  ] as const
                ).map(([k, label, type, auto]) => (
                  <Field key={k} id={`field-${k}`} data-invalid={!!errorFor(k) || undefined}>
                    <FieldLabel htmlFor={k} className="text-[14px] font-normal text-black/70">{label}</FieldLabel>
                    <Input
                      id={k}
                      type={type}
                      autoComplete={auto}
                      inputMode={k === "zip" ? "numeric" : undefined}
                      maxLength={k === "zip" ? 5 : undefined}
                      value={f[k]}
                      onChange={(e) => set(k)(k === "zip" ? e.target.value.replace(/\D/g, "") : e.target.value)}
                      aria-invalid={!!errorFor(k) || undefined}
                      className={inputClass}
                    />
                    {errorFor(k) && <FieldError>{errorFor(k)}</FieldError>}
                  </Field>
                ))}
              </div>
            </FieldSet>
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
              className="hidden"
            />
            <Field id="field-consent" orientation="horizontal" data-invalid={!!errorFor("consent") || undefined}>
              <Checkbox
                id="consent"
                aria-label="I agree to be contacted about this request"
                checked={consented}
                onCheckedChange={(c) => {
                  setConsented(c === true);
                  if (errorFor("consent")) setStatus({ kind: "idle" });
                }}
                aria-invalid={!!errorFor("consent") || undefined}
                className="mt-0.5 bg-white"
              />
              <FieldLabel htmlFor="consent" className="text-[12px] leading-[1.4] font-normal text-black/60">
                {consentText(BRAND)}
              </FieldLabel>
            </Field>
            {errorFor("consent") && <FieldError className="-mt-4">{errorFor("consent")}</FieldError>}
            {status.kind === "error" && !status.field && <FieldError>{status.message}</FieldError>}
            <Button
              type="submit"
              disabled={status.kind === "sending"}
              className="h-[52px] rounded-full bg-black text-[17px] font-medium text-white hover:bg-black/80"
            >
              {status.kind === "sending" ? "Sending…" : "Get help now"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
