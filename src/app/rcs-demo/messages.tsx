import React from "react";

export const QuickReplies = ({ options }: { options: string[] }) => {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {options.map((option, index) => (
        <button
          key={index}
          style={{ padding: "8px 12px", borderRadius: "4px" }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
export const GuestName = () => <span>Justin</span>;

export const ListPicker = ({ prompt }: { prompt: string }) => {
  return (
    <div
      style={{ border: "1px dashed gray", padding: "8px", borderRadius: "4px" }}
    >
      {prompt}
    </div>
  );
};

export const RichLink = ({ label }: { label: string }) => {
  return (
    <a href="#" style={{ color: "blue", textDecoration: "underline" }}>
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
    >
      {label}
    </button>
  );
};

export const FormPlaceholder = () => {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "4px" }}
    >
      [Form Component]
    </div>
  );
};

export const PaymentConfirmation = ({ message }: { message: string }) => {
  return <div style={{ padding: "8px", fontStyle: "italic" }}>{message}</div>;
};

export const messages = [
  // { from: "bot", text: "Step 2: Guest Arrives in Apple Messages for Business" },
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
    text: (
      <>
        <strong>Check-in:</strong>
        <br />
        Friday, Feb 16, 3:00PM
        <br />
        <strong>Check-out:</strong>
        <br />
        Monday, Feb 19, 11:00AM
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
    text: "Would you like to: View full property guide • Get directions • See photos",
  },
  {
    from: "guest",
    component: (
      <PaymentConfirmation message="Guest taps Apple Pay and confirms payment" />
    ),
  },
  // { from: "bot", text: "Step 3: Guest Requests Directions" },
  { from: "guest", text: "Get directions" },
  {
    from: "bot",
    component: (
      <>
        <span>Here’s the fastest route to The Lighthouse. </span>
        <RichLink label="View in Apple Maps" />
      </>
    ),
  },
  // { from: "bot", text: "Step 4: Guest Wants to See House Rules" },
  { from: "guest", text: "Can you show me the house rules?" },
  {
    from: "bot",
    text: "Of course! Here are the key house rules: No smoking indoors, Quiet hours: 10 PM – 7 AM, No pets, Max occupancy: 4 guests",
  },
  {
    from: "bot",
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
  // { from: "bot", text: "Step 5: Guest Requests Local Recommendations" },
  { from: "guest", text: "What’s good to do nearby?" },
  {
    from: "bot",
    text: "There’s plenty to explore! Here are some top recommendations: Food & Drink: The Seaside Café, Pier 42 Bar. Attractions: Monterey Bay Aquarium, 17-Mile Drive.",
  },
  {
    from: "bot",
    text: "Would you like: Directions | 🍽 Reservations | Event tickets",
  },
  { from: "guest", text: "[List-Picker: Guest selects an option]" },
  // { from: "bot", text: "Step 6: Guest Wants to Book Dinner" },
  { from: "guest", text: "🍽 Reservations at The Seaside Café" },
  {
    from: "bot",
    text: "Great choice! Here’s their availability for Saturday night: 6:30 PM, 7:00 PM, 7:30 PM (fully booked), 8:00 PM",
  },
  { from: "bot", text: "Would you like to book a table?" },
  { from: "guest", text: "[List-Picker: Guest selects a time]" },
  { from: "guest", text: "7:00 PM" },
  {
    from: "bot",
    component: (
      <>
        <span>
          Confirmed! Your dinner reservation is set for Saturday at 7:00 PM.{" "}
        </span>
        <RichLink label="View Reservation" />
      </>
    ),
  },
  // { from: "bot", text: "Step 7: Guest Needs to Contact the Owner" },
  { from: "guest", text: "I have a question about the Wi-Fi." },
  {
    from: "bot",
    component: (
      <>
        <span>
          Wi-Fi is available! Network: LighthouseGuest, Password: Sunset123.
          Still need help?{" "}
        </span>
        <QuickReplies options={["Contact Owner"]} />
      </>
    ),
  },
  { from: "guest", text: "Contact Owner" },
  {
    from: "bot",
    component: (
      <>
        <span>
          Please describe your question. The owner will respond shortly.{" "}
        </span>
        <FormPlaceholder />
      </>
    ),
  },
  { from: "guest", text: "The Wi-Fi seems slow, any troubleshooting tips?" },
  {
    from: "bot",
    text: "Your message has been sent to the owner. You’ll receive a response here shortly.",
  },
  // { from: "bot", text: "Step 8: Owner Responds" },
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
  // {
  //   from: "bot",
  //   text: "Step 9: Guest Requests Late Checkout (Apple Pay Integration)",
  // },
  { from: "guest", text: "Can I check out later on Monday?" },
  {
    from: "bot",
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
