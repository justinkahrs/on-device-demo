import { QuickReplies, RichLink } from "../../lib";
import type { PlaygroundScenario } from "./types";

export const arrivalPlannerScenario: PlaygroundScenario = {
  id: "arrival-planner",
  name: "Arrival Planner (Multi-Path)",
  description:
    "Realistic pre-arrival flow with nested decisions for transport, check-in, and dining.",
  branches: [
    "Main router: Transport vs Early check-in vs Dining",
    "Transport branch: Rideshare vs Drive vs Transit",
    "Check-in branch: Early check-in request with optional luggage storage",
    "Dining branch: Reservation options with time selection",
  ],
  script: [
    {
      from: "guest",
      text: "I land around 11:20 AM tomorrow. Can you help me plan arrival?",
    },
    {
      from: "bot",
      component: (
        <div style={{ display: "grid", gap: "4px" }}>
          <strong>Reservation snapshot</strong>
          <span>Arrival date: Tomorrow</span>
          <span>Standard check-in: 3:00 PM</span>
          <span>Address: 500 Oceanfront Drive</span>
          <span>Parking included: 1 vehicle</span>
        </div>
      ),
    },
    {
      id: "arrival-main-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        transport: "arrival-transport-guest",
        checkin: "arrival-checkin-guest",
        dining: "arrival-dining-guest",
      },
      component: (
        <>
          What should we handle first?
          <QuickReplies
            options={[
              { label: "Transport options", value: "transport" },
              { label: "Early check-in", value: "checkin" },
              { label: "Dinner planning", value: "dining" },
            ]}
          />
        </>
      ),
    },

    { id: "arrival-transport-guest", from: "guest", text: "Transport options" },
    {
      id: "arrival-transport-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        rideshare: "arrival-rideshare-guest",
        drive: "arrival-drive-guest",
        transit: "arrival-transit-guest",
      },
      component: (
        <>
          Which arrival method are you using?
          <QuickReplies
            options={[
              { label: "Rideshare", value: "rideshare" },
              { label: "Driving", value: "drive" },
              { label: "Public transit", value: "transit" },
            ]}
          />
        </>
      ),
    },
    { id: "arrival-rideshare-guest", from: "guest", text: "Rideshare" },
    {
      from: "bot",
      text: "Use Terminal B pickup zone 3. Typical fare around that time is $22-$28.",
    },
    {
      from: "bot",
      awaitUser: true,
      component: (
        <RichLink
          external
          label="Pickup + destination map"
          subtitle="Includes curbside pickup pin"
          body="Open this before you deplane for the fastest handoff."
          src="/lighthouse-lodge-cottages.jpg"
          url="https://maps.apple.com/?q=Monterey%20CA"
          urlDisplay="maps.apple.com"
        />
      ),
    },
    {
      id: "arrival-rideshare-seat-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        seat_yes: "arrival-seat-yes-guest",
        seat_no: "arrival-seat-no-guest",
      },
      component: (
        <>
          Do you need a child-seat friendly vehicle?
          <QuickReplies
            options={[
              { label: "Yes, add child seat", value: "seat_yes" },
              { label: "No, standard vehicle", value: "seat_no" },
            ]}
          />
        </>
      ),
    },
    { id: "arrival-seat-yes-guest", from: "guest", text: "Yes, add child seat" },
    {
      from: "bot",
      text: "Noted. I flagged this in your arrival note for the driver.",
      next: "arrival-wrap",
    },
    { id: "arrival-seat-no-guest", from: "guest", text: "No, standard vehicle" },
    {
      from: "bot",
      text: "Perfect. You are set for standard curb pickup.",
      next: "arrival-wrap",
    },

    { id: "arrival-drive-guest", from: "guest", text: "Driving" },
    {
      from: "bot",
      component: (
        <div style={{ display: "grid", gap: "4px" }}>
          <strong>Parking details</strong>
          <span>Garage entrance: Oak St. (south gate)</span>
          <span>Guest level: P2</span>
          <span>EV chargers: 8 total, first-come first-served</span>
        </div>
      ),
    },
    {
      id: "arrival-drive-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        charger: "arrival-drive-charger-guest",
        none: "arrival-drive-none-guest",
      },
      component: (
        <>
          Do you need EV charger instructions?
          <QuickReplies
            options={[
              { label: "Yes, charger details", value: "charger" },
              { label: "No, I am all set", value: "none" },
            ]}
          />
        </>
      ),
    },
    { id: "arrival-drive-charger-guest", from: "guest", text: "Yes, charger details" },
    {
      from: "bot",
      text: "Use chargers 2-5 on P2. PlugShare code is posted near elevator bank C.",
      next: "arrival-wrap",
    },
    { id: "arrival-drive-none-guest", from: "guest", text: "No, I am all set" },
    {
      from: "bot",
      text: "Great. I will keep a parking QR code ready for arrival.",
      next: "arrival-wrap",
    },

    { id: "arrival-transit-guest", from: "guest", text: "Public transit" },
    {
      from: "bot",
      component: (
        <div style={{ display: "grid", gap: "4px" }}>
          <strong>Transit options</strong>
          <span>Airport shuttle every 30 minutes until 10:00 PM</span>
          <span>Nearest stop: Harbor & 5th (4-minute walk)</span>
          <span>Last evening train connection: 9:12 PM</span>
        </div>
      ),
    },
    {
      id: "arrival-transit-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        pass: "arrival-transit-pass-guest",
        reminder: "arrival-transit-reminder-guest",
      },
      component: (
        <>
          Want a pass link or just a timed reminder?
          <QuickReplies
            options={[
              { label: "Send pass link", value: "pass" },
              { label: "Reminder only", value: "reminder" },
            ]}
          />
        </>
      ),
    },
    { id: "arrival-transit-pass-guest", from: "guest", text: "Send pass link" },
    {
      from: "bot",
      awaitUser: true,
      component: (
        <RichLink
          external
          label="Transit pass checkout"
          subtitle="Single ride + airport transfer"
          body="Opens the transit provider checkout page."
          url="https://www.montereyairbus.com/"
          urlDisplay="montereyairbus.com"
        />
      ),
    },
    {
      from: "bot",
      text: "Pass link sent. I also set a 10:45 AM departure reminder.",
      next: "arrival-wrap",
    },
    { id: "arrival-transit-reminder-guest", from: "guest", text: "Reminder only" },
    {
      from: "bot",
      text: "Done. I will ping you with route details before you leave the airport.",
      next: "arrival-wrap",
    },

    { id: "arrival-checkin-guest", from: "guest", text: "Early check-in" },
    {
      from: "bot",
      text: "Standard check-in is 3:00 PM. Earliest likely ready time tomorrow is 12:15 PM.",
    },
    {
      id: "arrival-checkin-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        request: "arrival-checkin-request-guest",
        skip: "arrival-checkin-skip-guest",
      },
      component: (
        <>
          Should I submit an early check-in request?
          <QuickReplies
            options={[
              { label: "Yes, submit request", value: "request" },
              { label: "No, keep standard", value: "skip" },
            ]}
          />
        </>
      ),
    },
    { id: "arrival-checkin-request-guest", from: "guest", text: "Yes, submit request" },
    {
      id: "arrival-luggage-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        luggage_yes: "arrival-luggage-yes-guest",
        luggage_no: "arrival-luggage-no-guest",
      },
      component: (
        <>
          Add luggage storage if the room is not ready yet?
          <QuickReplies
            options={[
              { label: "Yes, add storage", value: "luggage_yes" },
              { label: "No, room request only", value: "luggage_no" },
            ]}
          />
        </>
      ),
    },
    { id: "arrival-luggage-yes-guest", from: "guest", text: "Yes, add storage" },
    {
      from: "bot",
      text: "Done. Early check-in + luggage storage request is confirmed.",
      next: "arrival-wrap",
    },
    { id: "arrival-luggage-no-guest", from: "guest", text: "No, room request only" },
    {
      from: "bot",
      text: "Got it. I will notify you as soon as housekeeping marks the room ready.",
      next: "arrival-wrap",
    },
    { id: "arrival-checkin-skip-guest", from: "guest", text: "No, keep standard" },
    {
      from: "bot",
      text: "Perfect. I will send your digital key automatically at 2:50 PM.",
      next: "arrival-wrap",
    },

    { id: "arrival-dining-guest", from: "guest", text: "Dinner planning" },
    {
      from: "bot",
      component: (
        <div style={{ display: "grid", gap: "4px" }}>
          <strong>Nearby options tonight</strong>
          <span>Harbor Rooftop (seafood, 8 min walk)</span>
          <span>Market Street Grill (family-style, 5 min drive)</span>
          <span>In-room menu until 11:00 PM</span>
        </div>
      ),
    },
    {
      id: "arrival-dining-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        rooftop: "arrival-rooftop-guest",
        market: "arrival-market-guest",
        skip: "arrival-dining-skip-guest",
      },
      component: (
        <>
          Want me to reserve a table?
          <QuickReplies
            options={[
              { label: "Reserve Harbor Rooftop", value: "rooftop" },
              { label: "Reserve Market Street", value: "market" },
              { label: "No reservation", value: "skip" },
            ]}
          />
        </>
      ),
    },
    { id: "arrival-rooftop-guest", from: "guest", text: "Reserve Harbor Rooftop" },
    {
      id: "arrival-rooftop-time-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        seven: "arrival-rooftop-seven-guest",
        eight: "arrival-rooftop-eight-guest",
      },
      component: (
        <>
          Which seating time works?
          <QuickReplies
            options={[
              { label: "7:00 PM", value: "seven" },
              { label: "8:00 PM", value: "eight" },
            ]}
          />
        </>
      ),
    },
    { id: "arrival-rooftop-seven-guest", from: "guest", text: "7:00 PM" },
    {
      from: "bot",
      text: "Booked. Rooftop table confirmed for 7:00 PM under your name.",
      next: "arrival-wrap",
    },
    { id: "arrival-rooftop-eight-guest", from: "guest", text: "8:00 PM" },
    {
      from: "bot",
      text: "8:00 PM is waitlist only. I added you and will notify if confirmed.",
      next: "arrival-wrap",
    },
    { id: "arrival-market-guest", from: "guest", text: "Reserve Market Street" },
    {
      from: "bot",
      awaitUser: true,
      component: (
        <RichLink
          external
          label="Market Street Grill location"
          subtitle="Route + phone details"
          body="Open to confirm call-ahead seating."
          url="https://maps.apple.com/?q=Monterey%20Restaurant"
          urlDisplay="maps.apple.com"
        />
      ),
    },
    {
      from: "bot",
      text: "Nice choice. I sent a 10% guest coupon to this thread.",
      next: "arrival-wrap",
    },
    { id: "arrival-dining-skip-guest", from: "guest", text: "No reservation" },
    {
      from: "bot",
      text: "No problem. Ping me later and I can still book same-day if availability opens.",
      next: "arrival-wrap",
    },

    {
      id: "arrival-wrap",
      from: "bot",
      text: "Arrival planning complete. Replay this scenario to try a different path.",
    },
  ],
};
