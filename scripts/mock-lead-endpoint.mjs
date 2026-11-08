// Local stand-in for the real lead endpoint, for testing the intake form.
// Run: node scripts/mock-lead-endpoint.mjs   (listens on :8787)
// Then build or dev with NEXT_PUBLIC_LEAD_ENDPOINT=http://localhost:8787/lead
import { appendFileSync } from "node:fs";
import { createServer } from "node:http";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

createServer((req, res) => {
  if (req.method === "OPTIONS") return res.writeHead(204, cors).end();
  if (req.method !== "POST") return res.writeHead(405, cors).end();
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    try {
      const lead = JSON.parse(body);
      const line = JSON.stringify({ receivedAt: new Date().toISOString(), lead });
      appendFileSync(process.env.LEAD_LOG ?? "leads.test.jsonl", line + "\n");
      console.log(line);
      res.writeHead(200, { ...cors, "Content-Type": "application/json" }).end('{"ok":true}');
    } catch {
      res.writeHead(400, cors).end('{"ok":false}');
    }
  });
}).listen(8787, () => console.log("mock lead endpoint on http://localhost:8787/lead"));
