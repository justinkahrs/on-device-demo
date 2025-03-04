import React from "react";
import type { RCSMessageEvent } from "../components/Message/Message";

export const QuickReplies = ({
  options,
  onSelect,
}: {
  options: string[];
  onSelect?: (option: string) => void;
}) => {
  return (
    <div>
      {options.map((option) => (
        <button
          key={option}
          style={{ padding: "8px 12px", borderRadius: "4px" }}
          type="button"
          onClick={() => onSelect?.(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
export const GuestName = () => <span>Justin</span>;

export const RichLink = ({
  label,
  url = "https://www.apple.com",
}: {
  label: string;
  url?: string;
}) => {
  return (
    <a href={url} style={{ color: "blue", textDecoration: "underline" }}>
      {label}
    </a>
  );
};

export const ApplePayButton = ({ label }: { label: string }) => {
  return (
    <button
      style={{
        background: "black",
        color: "white",
        padding: "8px 16px",
        borderRadius: "4px",
      }}
      type="button"
    >
      {label}
    </button>
  );
};

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
        123 Oceanview Drive, Monterey, CA
      </>
    ),
  },
  {
    from: "bot",
    text: "Key Access: Smart Lock (Code will be shared 24 hours before check-in)",
  },
  {
    from: "bot",
    awaitUser: true,
    component: (
      <>
        Would you like to:
        <QuickReplies
          options={[
            "🏠 View full property guide",
            "🗾 Get directions",
            "📷 See Photos",
          ]}
        />
      </>
    ),
  },
  { from: "guest", text: "Get directions" },
  {
    from: "bot",
    component: (
      <>
        <span>Here’s the fastest route to The Lighthouse. </span>
        <RichLink label="View in Apple Maps" url="maps://?daddr=Cupertino,CA" />
      </>
    ),
  },
  { from: "guest", text: "Can you show me the house rules?" },
  {
    from: "bot",
    component: (
      <>
        Of course!
        <br />
        Here are the key house rules:
        <br />
        No smoking indoors
        <br />
        Quiet hours: 10 PM – 7 AM
        <br />
        No pets
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
    from: "bot",
    component: (
      <>
        <span>Here’s the full list of house rules: </span>
        <RichLink label="View Full House Rules" />
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
            "🍽 Seaside Cafe Reservations",
            "🎫 Tickets to tonight's concert",
          ]}
        />
      </>
    ),
  },
  { from: "guest", text: "🍽 Reservations at The Seaside Café" },
  { from: "bot", text: "Would you like to book a table?" },
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
    component: (
      <>
        <span>
          Confirmed! Your dinner reservation is set for Saturday at 7:00 PM.
        </span>
        <RichLink label="View Reservation" url="https://www.google.com" />
      </>
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
          Wi-Fi is available! Network: LighthouseGuest, Password: Sunset123.
          Still need help?{" "}
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
    from: "bot",
    component: (
      <>
        <span>
          Late Checkout Confirmed! Payment of $30 is required to finalize.{" "}
        </span>
        <ApplePayButton label="Pay $30 Now" />
      </>
    ),
  },
  { from: "guest", text: "[Guest taps Apple Pay and confirms payment]" },
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
