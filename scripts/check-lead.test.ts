// Run: node scripts/check-lead.test.ts
import assert from "node:assert/strict";
import { checkLead } from "../lib/leads.ts";

const good = { vertical: "furnace" as const, service: "Boiler", zip: "55406", problem: "No heat", timeline: "Today", name: "Pat", phone: "612-555-0100", email: "" };

assert.equal(checkLead(good, true), null);
assert.equal(checkLead({ ...good, phone: "", email: "pat@example.com" }, true), null);
assert.match(checkLead(good, false)!.message, /Check the box/);
assert.match(checkLead({ ...good, zip: "5540" }, true)!.message, /zip/);
assert.match(checkLead({ ...good, phone: "", email: "" }, true)!.message, /phone number or email/);
assert.match(checkLead({ ...good, phone: "555-0100" }, true)!.message, /10-digit/);
assert.match(checkLead({ ...good, phone: "", email: "pat@" }, true)!.message, /email/);
assert.equal(checkLead({ ...good, problem: "" }, true), null); // description is optional
assert.match(checkLead({ ...good, service: "" }, true)!.message, /happening/);
assert.match(checkLead({ ...good, timeline: "" }, true)!.message, /how soon/);
assert.equal(checkLead({ ...good, phone: "", email: "" }, true)!.field, "phone");
assert.equal(checkLead(good, false)!.field, "consent");
console.log("checkLead: all cases pass");
