import { AppleButton, QuickReplies } from "../../lib";
import type { PlaygroundScenario } from "./types";

export const stayExtensionBillingScenario: PlaygroundScenario = {
  id: "stay-extension-billing",
  name: "Stay Extension + Billing",
  description:
    "Detailed extension flow with room options, payment methods, and fallback outcomes.",
  branches: [
    "Extension type: Same room vs Upgrade vs Keep checkout",
    "Payment method: Card on file vs Apple Pay vs Split payment",
    "Late checkout fallback when full-night extension is declined",
  ],
  script: [
    { from: "guest", text: "I may need one more night. What are my options?" },
    {
      from: "bot",
      component: (
        <div style={{ display: "grid", gap: "4px" }}>
          <strong>Availability for tomorrow night</strong>
          <span>Keep current room: $239 + tax</span>
          <span>Upgrade (harbor view): $289 + tax</span>
          <span>Latest hold time: 5:00 PM today</span>
        </div>
      ),
    },
    {
      id: "billing-main-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        same_room: "billing-same-room-guest",
        upgrade: "billing-upgrade-guest",
        keep_checkout: "billing-keep-checkout-guest",
      },
      component: (
        <>
          Which option do you want?
          <QuickReplies
            options={[
              { label: "Keep same room", value: "same_room" },
              { label: "Show upgrade options", value: "upgrade" },
              { label: "Keep current checkout", value: "keep_checkout" },
            ]}
          />
        </>
      ),
    },

    { id: "billing-same-room-guest", from: "guest", text: "Keep same room" },
    {
      id: "billing-payment-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        card_on_file: "billing-card-guest",
        apple_pay: "billing-apple-guest",
        split_payment: "billing-split-guest",
      },
      component: (
        <>
          Total is $264.11 after taxes. How should we settle payment?
          <QuickReplies
            options={[
              { label: "Charge card on file", value: "card_on_file" },
              { label: "Pay with Apple Pay", value: "apple_pay" },
              { label: "Split payment", value: "split_payment" },
            ]}
          />
        </>
      ),
    },
    { id: "billing-card-guest", from: "guest", text: "Charge card on file" },
    {
      id: "billing-card-authorization-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        approve: "billing-card-approve-guest",
        cancel: "billing-card-cancel-guest",
      },
      component: (
        <>
          Last 4 digits are 4021. Approve the charge now?
          <QuickReplies
            options={[
              { label: "Approve charge", value: "approve" },
              { label: "Cancel for now", value: "cancel" },
            ]}
          />
        </>
      ),
    },
    { id: "billing-card-approve-guest", from: "guest", text: "Approve charge" },
    {
      from: "bot",
      text: "Approved. New folio is #FX-4438 and checkout moves to Tuesday 11:00 AM.",
      next: "billing-end",
    },
    { id: "billing-card-cancel-guest", from: "guest", text: "Cancel for now" },
    {
      from: "bot",
      text: "Understood. I held this rate until 5:00 PM if you decide later.",
      next: "billing-end",
    },

    { id: "billing-apple-guest", from: "guest", text: "Pay with Apple Pay" },
    {
      from: "bot",
      awaitUser: true,
      component: (
        <>
          Great. Complete payment to lock the extra night.
          <AppleButton
            label="Pay $264.11"
            copy="Double-click side button to approve extension payment."
          />
        </>
      ),
    },
    { from: "guest", text: "Payment complete" },
    {
      from: "bot",
      text: "Payment received. Same-room extension is confirmed.",
      next: "billing-end",
    },

    { id: "billing-split-guest", from: "guest", text: "Split payment" },
    {
      from: "bot",
      text: "Split payment is available (50/50). I can send a second payer link.",
    },
    {
      id: "billing-split-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        send_link: "billing-split-send-link-guest",
        desk: "billing-split-desk-guest",
      },
      component: (
        <>
          How do you want to proceed?
          <QuickReplies
            options={[
              { label: "Send second payer link", value: "send_link" },
              { label: "Settle at front desk", value: "desk" },
            ]}
          />
        </>
      ),
    },
    { id: "billing-split-send-link-guest", from: "guest", text: "Send second payer link" },
    {
      from: "bot",
      text: "Link sent. Reservation remains on hold until both halves are completed.",
      next: "billing-end",
    },
    { id: "billing-split-desk-guest", from: "guest", text: "Settle at front desk" },
    {
      from: "bot",
      text: "Done. Front desk has your note and will finalize billing at check-in.",
      next: "billing-end",
    },

    { id: "billing-upgrade-guest", from: "guest", text: "Show upgrade options" },
    {
      from: "bot",
      component: (
        <div style={{ display: "grid", gap: "4px" }}>
          <strong>Upgrade options</strong>
          <span>Harbor View King: +$50/night</span>
          <span>Patio Suite: +$95/night</span>
          <span>Both include late checkout at 12:00 PM</span>
        </div>
      ),
    },
    {
      id: "billing-upgrade-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        harbor: "billing-upgrade-harbor-guest",
        patio: "billing-upgrade-patio-guest",
        skip: "billing-upgrade-skip-guest",
      },
      component: (
        <>
          Which upgrade should I hold?
          <QuickReplies
            options={[
              { label: "Hold Harbor View", value: "harbor" },
              { label: "Hold Patio Suite", value: "patio" },
              { label: "No upgrade", value: "skip" },
            ]}
          />
        </>
      ),
    },
    { id: "billing-upgrade-harbor-guest", from: "guest", text: "Hold Harbor View" },
    {
      from: "bot",
      text: "Held. Harbor View is reserved until 5:00 PM under your booking.",
      next: "billing-end",
    },
    { id: "billing-upgrade-patio-guest", from: "guest", text: "Hold Patio Suite" },
    {
      from: "bot",
      text: "Patio Suite held. Please confirm by 4:30 PM to avoid release.",
      next: "billing-end",
    },
    { id: "billing-upgrade-skip-guest", from: "guest", text: "No upgrade" },
    {
      from: "bot",
      text: "No changes made. You can reopen this thread any time before 5:00 PM.",
      next: "billing-end",
    },

    { id: "billing-keep-checkout-guest", from: "guest", text: "Keep current checkout" },
    {
      id: "billing-fallback-choice",
      from: "bot",
      awaitUser: true,
      branches: {
        late_checkout: "billing-late-checkout-guest",
        luggage_only: "billing-luggage-only-guest",
      },
      component: (
        <>
          Want a fallback option instead?
          <QuickReplies
            options={[
              { label: "Offer late checkout (+$25)", value: "late_checkout" },
              { label: "Luggage storage only", value: "luggage_only" },
            ]}
          />
        </>
      ),
    },
    { id: "billing-late-checkout-guest", from: "guest", text: "Offer late checkout (+$25)" },
    {
      from: "bot",
      awaitUser: true,
      component: (
        <>
          Confirm late checkout until 1:00 PM.
          <AppleButton label="Pay $25" copy="Approve late checkout charge." />
        </>
      ),
    },
    { from: "guest", text: "Paid." },
    {
      from: "bot",
      text: "Confirmed. Late checkout is now set for 1:00 PM.",
      next: "billing-end",
    },
    { id: "billing-luggage-only-guest", from: "guest", text: "Luggage storage only" },
    {
      from: "bot",
      text: "Done. Complimentary luggage storage is booked until 6:00 PM.",
      next: "billing-end",
    },
    {
      id: "billing-end",
      from: "bot",
      text: "Billing flow complete. Replay to exercise a different path.",
    },
  ],
};
