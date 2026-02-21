import { QuickReplies } from "../../lib";
import type { PlaygroundScenario } from "./types";

export const incidentResponseScenario: PlaygroundScenario = {
  id: "incident-response",
  name: "Incident Response (Operational)",
  description:
    "Operational incident flow with safety triage, troubleshooting, escalation, and closure.",
  branches: [
    "Issue priority: Smoke detector vs HVAC vs Both",
    "Nested diagnostics with resolved/escalate branches",
    "Escalation path with dispatch timing choices",
  ],
  script: [
    { from: "guest", text: "The AC is not cooling and a smoke detector is chirping." },
    {
      from: "bot",
      component: (
        <div style={{ display: "grid", gap: "4px" }}>
          <strong>Incident triage started</strong>
          <span>Priority level: Medium</span>
          <span>On-site team online: Yes</span>
          <span>Average maintenance ETA: 20 minutes</span>
        </div>
      ),
    },
    {
      id: "incident-main-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        smoke_first: "incident-smoke-first-guest",
        hvac_first: "incident-hvac-first-guest",
        both: "incident-both-guest",
      },
      component: (
        <>
          Which issue should we handle first?
          <QuickReplies
            options={[
              { label: "Smoke detector first", value: "smoke_first" },
              { label: "AC first", value: "hvac_first" },
              { label: "Handle both", value: "both" },
            ]}
          />
        </>
      ),
    },

    { id: "incident-smoke-first-guest", from: "guest", text: "Smoke detector first" },
    {
      id: "incident-smoke-type-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        chirp: "incident-smoke-chirp-guest",
        alarm: "incident-smoke-alarm-guest",
      },
      component: (
        <>
          Is it an intermittent chirp or a continuous alarm?
          <QuickReplies
            options={[
              { label: "Intermittent chirp", value: "chirp" },
              { label: "Continuous alarm", value: "alarm" },
            ]}
          />
        </>
      ),
    },
    { id: "incident-smoke-chirp-guest", from: "guest", text: "Intermittent chirp" },
    {
      from: "bot",
      text: "Likely low battery. I can dispatch maintenance with a replacement now.",
    },
    {
      id: "incident-smoke-location-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        hallway: "incident-smoke-hallway-guest",
        bedroom: "incident-smoke-bedroom-guest",
      },
      component: (
        <>
          Where is the detector?
          <QuickReplies
            options={[
              { label: "Hallway", value: "hallway" },
              { label: "Bedroom", value: "bedroom" },
            ]}
          />
        </>
      ),
    },
    { id: "incident-smoke-hallway-guest", from: "guest", text: "Hallway" },
    {
      from: "bot",
      text: "Technician dispatched with ladder kit. ETA 15-20 minutes.",
      next: "incident-followup",
    },
    { id: "incident-smoke-bedroom-guest", from: "guest", text: "Bedroom" },
    {
      from: "bot",
      text: "Technician dispatched with battery + detector backup. ETA 15-20 minutes.",
      next: "incident-followup",
    },
    { id: "incident-smoke-alarm-guest", from: "guest", text: "Continuous alarm" },
    {
      from: "bot",
      text: "For safety, please exit the room immediately and move to the nearest marked exit.",
    },
    {
      id: "incident-safe-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        safe: "incident-safe-guest",
        unsafe: "incident-unsafe-guest",
      },
      component: (
        <>
          Are you currently in a safe location?
          <QuickReplies
            options={[
              { label: "Yes, I am safe", value: "safe" },
              { label: "Not yet", value: "unsafe" },
            ]}
          />
        </>
      ),
    },
    { id: "incident-safe-guest", from: "guest", text: "Yes, I am safe" },
    {
      from: "bot",
      text: "Understood. I alerted on-site security and building engineering.",
      next: "incident-followup",
    },
    { id: "incident-unsafe-guest", from: "guest", text: "Not yet" },
    {
      from: "bot",
      text: "Please prioritize evacuation now. On-site team is being dispatched immediately.",
      next: "incident-critical-end",
    },

    { id: "incident-hvac-first-guest", from: "guest", text: "AC first" },
    {
      id: "incident-hvac-symptom-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        no_air: "incident-hvac-no-air-guest",
        warm_air: "incident-hvac-warm-air-guest",
        noisy: "incident-hvac-noisy-guest",
      },
      component: (
        <>
          Which symptom is closest?
          <QuickReplies
            options={[
              { label: "No airflow", value: "no_air" },
              { label: "Warm airflow", value: "warm_air" },
              { label: "Loud/noisy unit", value: "noisy" },
            ]}
          />
        </>
      ),
    },
    { id: "incident-hvac-no-air-guest", from: "guest", text: "No airflow" },
    {
      from: "bot",
      text: "Please set thermostat to COOL and fan to AUTO, then wait 2 minutes.",
    },
    {
      id: "incident-hvac-no-air-result",
      from: "bot",
      awaitUser: true,
      branches: {
        resolved: "incident-hvac-resolved-guest",
        escalate: "incident-hvac-escalate-guest",
      },
      component: (
        <>
          Any improvement?
          <QuickReplies
            options={[
              { label: "Yes, resolved", value: "resolved" },
              { label: "Still not working", value: "escalate" },
            ]}
          />
        </>
      ),
    },
    { id: "incident-hvac-warm-air-guest", from: "guest", text: "Warm airflow" },
    {
      from: "bot",
      text: "Set target temperature to 68F and close balcony doors for 3 minutes.",
    },
    {
      id: "incident-hvac-warm-result",
      from: "bot",
      awaitUser: true,
      branches: {
        resolved: "incident-hvac-resolved-guest",
        escalate: "incident-hvac-escalate-guest",
      },
      component: (
        <>
          Did cooling recover?
          <QuickReplies
            options={[
              { label: "Yes, resolved", value: "resolved" },
              { label: "No, escalate", value: "escalate" },
            ]}
          />
        </>
      ),
    },
    { id: "incident-hvac-noisy-guest", from: "guest", text: "Loud/noisy unit" },
    {
      from: "bot",
      text: "Please switch fan mode to AUTO. Constant mode can cause vibration noise.",
    },
    {
      id: "incident-hvac-noisy-result",
      from: "bot",
      awaitUser: true,
      branches: {
        resolved: "incident-hvac-resolved-guest",
        escalate: "incident-hvac-escalate-guest",
      },
      component: (
        <>
          Is the noise reduced?
          <QuickReplies
            options={[
              { label: "Yes, resolved", value: "resolved" },
              { label: "No, send technician", value: "escalate" },
            ]}
          />
        </>
      ),
    },
    { id: "incident-hvac-resolved-guest", from: "guest", text: "Yes, resolved" },
    {
      from: "bot",
      text: "Great. I logged this as resolved and can keep monitoring if needed.",
      next: "incident-followup",
    },
    { id: "incident-hvac-escalate-guest", from: "guest", text: "Still not working" },
    {
      id: "incident-hvac-visit-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        asap: "incident-hvac-asap-guest",
        evening: "incident-hvac-evening-guest",
      },
      component: (
        <>
          Choose visit window:
          <QuickReplies
            options={[
              { label: "ASAP (20 min)", value: "asap" },
              { label: "After 6:30 PM", value: "evening" },
            ]}
          />
        </>
      ),
    },
    { id: "incident-hvac-asap-guest", from: "guest", text: "ASAP (20 min)" },
    {
      from: "bot",
      text: "Technician assigned. ETA 20 minutes.",
      next: "incident-followup",
    },
    { id: "incident-hvac-evening-guest", from: "guest", text: "After 6:30 PM" },
    {
      from: "bot",
      text: "Scheduled for 6:30-7:00 PM. I will notify you when the tech is en route.",
      next: "incident-followup",
    },

    { id: "incident-both-guest", from: "guest", text: "Handle both" },
    {
      from: "bot",
      text: "Understood. I am opening two tickets now: detector + HVAC.",
    },
    {
      id: "incident-both-priority-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        safety_first: "incident-both-safety-guest",
        comfort_first: "incident-both-comfort-guest",
      },
      component: (
        <>
          Which visit should arrive first?
          <QuickReplies
            options={[
              { label: "Safety first (detector)", value: "safety_first" },
              { label: "Comfort first (HVAC)", value: "comfort_first" },
            ]}
          />
        </>
      ),
    },
    { id: "incident-both-safety-guest", from: "guest", text: "Safety first (detector)" },
    {
      from: "bot",
      text: "Safety team ETA 12 minutes. HVAC follows in approximately 30 minutes.",
      next: "incident-followup",
    },
    { id: "incident-both-comfort-guest", from: "guest", text: "Comfort first (HVAC)" },
    {
      from: "bot",
      text: "HVAC ETA 18 minutes. Detector battery swap ETA 35 minutes.",
      next: "incident-followup",
    },

    {
      id: "incident-followup",
      from: "bot",
      awaitUser: true,
      branches: {
        status: "incident-status-guest",
        close: "incident-close-guest",
      },
      component: (
        <>
          Do you want a live status summary or should I close this thread?
          <QuickReplies
            options={[
              { label: "Send live status", value: "status" },
              { label: "Close thread", value: "close" },
            ]}
          />
        </>
      ),
    },
    { id: "incident-status-guest", from: "guest", text: "Send live status" },
    {
      from: "bot",
      component: (
        <div style={{ display: "grid", gap: "4px" }}>
          <strong>Current ticket status</strong>
          <span>Safety ticket #S-221: Technician en route</span>
          <span>HVAC ticket #H-908: Assigned, ETA under 25 min</span>
          <span>Manager notified for follow-up check</span>
        </div>
      ),
    },
    {
      from: "bot",
      text: "I will keep this thread open and post updates automatically.",
      next: "incident-end",
    },
    { id: "incident-close-guest", from: "guest", text: "Close thread" },
    {
      from: "bot",
      text: "Closed for now. You can reopen this thread any time.",
      next: "incident-end",
    },
    {
      id: "incident-critical-end",
      from: "bot",
      text: "Emergency handling in progress. This demo branch ends here.",
    },
    { id: "incident-end", from: "bot", text: "Incident flow complete." },
  ],
};
