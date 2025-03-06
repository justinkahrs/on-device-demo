import React from "react";
import ContactlessIcon from "@mui/icons-material/Contactless";
import type { RCSMessageEvent } from "../components/Message/Message";
import { QuickReplies } from "../components/QuickReplies/QuickReplies";
import { GuestName } from "../components/GuestName/GuestName";
import { RichLink } from "../components/RichLink/RichLink";
import { ApplePayButton } from "../components/ApplePayButton/ApplePayButton";

export const IntroMessages: RCSMessageEvent[] = [
  {
    from: "guest",
    text: "Hi! I just booked The Lighthouse for this weekend. Can you share some details?",
  },
  {
    from: "bot",
    component: (
      <>
        <span>Welcome to The Lighthouse! We’re excited to host you, </span>
        <GuestName />
        <span>. Here’s a quick summary of your stay:</span>
      </>
    ),
  },
  {
    from: "bot",
    component: (
      <>
        <strong>Check-in:</strong>
        <br />
        Friday, Feb 16, 3:00PM
        <br />
        <strong>Check-out:</strong>
        <br />
        Monday, Feb 19, 11:00AM
        <br />
        <strong>Address:</strong>
        <br />
        1150 Lighthouse Ave
        <br />
        Monterey, CA
      </>
    ),
  },
  {
    awaitUser: true,
    from: "bot",
    component: (
      <>
        <strong>Key Access:</strong> Smart Lock
        <br />
        <ApplePayButton
          copy="Code will be shared 24 hours before check-in"
          label="Apple Wallet"
          type="wallet"
        />
      </>
    ),
  },
  {
    from: "bot",
    awaitUser: true,
    component: (
      <>
        Would you like to:
        <QuickReplies
          options={[
            "🏠 See property guide",
            "🗾 Get directions",
            "📷 See photos",
          ]}
        />
      </>
    ),
  },
  { from: "guest", text: "Get directions" },
  {
    from: "bot",
    component: <span>Here&apos;s the fastest route to The Lighthouse:</span>,
  },
  {
    awaitUser: true,
    from: "bot",
    component: (
      <RichLink
        external
        label="View in Apple Maps"
        url="maps://?daddr=Lighthouse Lodge & Cottages, Monterery, CA"
        urlDisplay="Lighthouse Lodge & Cottages"
        src="/lighthouse-lodge-cottages.jpg"
      />
    ),
  },
  { from: "guest", text: "Can you show me the house rules?" },
  {
    from: "bot",
    component: (
      <>
        Of course!
        <br />
        <strong>Key house rules:</strong>
        <br />
        No smoking indoors!
        <br />
        Quiet hours: 10 PM – 7 AM
        <br />
        No pets, please
        <br />
        Max occupancy: 4 guests
      </>
    ),
  },
  {
    from: "bot",
    awaitUser: true,
    component: (
      <>
        <span>Would you like a full list? </span>
        <QuickReplies options={["Yes", "No"]} />
      </>
    ),
  },
  { from: "guest", text: "Yes" },
  {
    awaitUser: true,
    from: "bot",
    component: (
      <>
        <span>Here’s the full list of house rules: </span>
        <br />
        <RichLink
          src="/rules.jpg"
          label="View Full House Rules"
          url="/house-rules"
          urlDisplay="The Do's and Don'ts"
        />
      </>
    ),
  },
];
export const RecommendationMessages: RCSMessageEvent[] = [
  { from: "guest", text: "What’s fun to do around here?" },
  {
    awaitUser: true,
    from: "bot",
    component: (
      <>
        <span>Here are some approved recommendations from your host:</span>
        <QuickReplies
          options={[
            "🗾 Directions to a local park",
            "🍽 Julia's Vegetarian Restaurant",
            "🎫 Tickets to tonight's concert",
          ]}
        />
      </>
    ),
  },
  { from: "guest", text: "🍽 Julia's Vegetarian" },
  {
    awaitUser: true,
    from: "bot",
    component: (
      <>
        Would you like to book a table?
        <br />
        <QuickReplies options={["Yes", "No"]} />
      </>
    ),
  },
  { from: "guest", text: "Yes" },
  {
    awaitUser: true,
    from: "bot",
    component: (
      <>
        Here’s their availability for Saturday night:
        <QuickReplies options={["🕡 6:30 PM", "🕖 7:00 PM", " 🕗 8:00 PM"]} />
      </>
    ),
  },
  { from: "guest", text: "7:00 PM" },
  {
    from: "bot",
    text: "Confirmed! Your dinner reservation is set for Saturday at 7:00 PM.",
  },
  {
    from: "bot",
    component: (
      <RichLink
        src="/food.jpeg"
        label="View Reservation"
        url="https://www.juliasveg.com/"
        urlDisplay="Julia's Vegetarian"
        external
      />
    ),
  },
];
export const ContactOwnerMessages: RCSMessageEvent[] = [
  { from: "guest", text: "I have a question about the Wi-Fi." },
  {
    from: "bot",
    awaitUser: true,
    component: (
      <>
        <span>
          Wi-Fi is available!
          <br />
          <strong>Network (SSID):</strong> LighthouseGuest
          <br />
          <strong>Password:</strong> Sunset123.
          <br />
          Still need help?
        </span>
        <QuickReplies options={["Contact Owner", "Never mind"]} />
      </>
    ),
  },
  { from: "guest", text: "Contact Owner" },
  {
    from: "bot",
    component: (
      <>
        <span>
          Please describe your question. The owner will respond shortly
        </span>
      </>
    ),
  },
  { from: "guest", text: "The Wi-Fi seems slow, any troubleshooting tips?" },
  {
    from: "bot",
    text: "Your message has been sent to the owner. You’ll receive a response here shortly.",
  },
  {
    from: "bot",
    text: "From Chad (host):",
  },
  {
    from: "owner",
    component: (
      <>
        <span>Hi </span>
        <GuestName />
        <span>
          , thanks for reaching out! The Wi-Fi may slow if multiple devices
          stream video. Try restarting the router under the TV.
        </span>
      </>
    ),
  },
  { from: "guest", text: "Thanks so much!" },
  {
    from: "bot",
    text: "Happy to help! Enjoy your stay at The Lighthouse. Let us know if you need anything else.",
  },
];
export const LateCheckoutMessages: RCSMessageEvent[] = [
  { from: "guest", text: "Can I check out later on Monday?" },
  {
    from: "bot",
    awaitUser: true,
    component: (
      <>
        <span>
          You can extend your stay until 1:00 PM for a $30 late checkout fee.
          Would you like to confirm?{" "}
        </span>
        <QuickReplies options={["Yes", "No"]} />
      </>
    ),
  },
  { from: "guest", text: "Yes" },
  {
    awaitUser: true,
    from: "bot",
    component: (
      <>
        <span>
          Late Checkout Confirmed! Payment of $30 is required to finalize.
        </span>
        <br />
        <ApplePayButton label="Pay $30" />
      </>
    ),
  },
  {
    from: "guest",
    component: (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        Payment Sent
        <ContactlessIcon style={{ marginLeft: "8px" }} />
      </div>
    ),
  },
  {
    from: "bot",
    text: "Payment Received! Late checkout is confirmed for Monday, 1:00 PM.",
  },
];

export const messages: RCSMessageEvent[] = [
  ...IntroMessages,
  ...RecommendationMessages,
  ...ContactOwnerMessages,
  ...LateCheckoutMessages,
];
