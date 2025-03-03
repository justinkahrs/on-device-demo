export const messages = [
  // { from: "bot", text: "Step 2: Guest Arrives in Apple Messages for Business" },
  {
    from: "guest",
    text: "Hi! I just booked The Lighthouse for this weekend. Can you share some details?",
  },
  {
    from: "bot",
    text: "Welcome to The Lighthouse! We’re excited to host you, [Guest Name]. Here’s a quick summary of your stay:",
  },
  {
    from: "bot",
    text: "Check-in: Friday, Feb 16, 3:00 PM • Check-out: Monday, Feb 19, 11:00 AM • Address: 123 Oceanview Drive, Monterey, CA",
  },
  {
    from: "bot",
    text: "Key Access: Smart Lock (Code will be shared 24 hours before check-in)",
  },
  {
    from: "bot",
    text: "Would you like to: View full property guide • Get directions • See photos",
  },
  { from: "guest", text: "[List-Picker: Guest selects an option]" },
  // { from: "bot", text: "Step 3: Guest Requests Directions" },
  { from: "guest", text: "Get directions" },
  {
    from: "bot",
    text: "Here’s the fastest route to The Lighthouse. [Rich-Link: View in Apple Maps]",
  },
  // { from: "bot", text: "Step 4: Guest Wants to See House Rules" },
  { from: "guest", text: "Can you show me the house rules?" },
  {
    from: "bot",
    text: "Of course! Here are the key house rules: No smoking indoors, Quiet hours: 10 PM – 7 AM, No pets, Max occupancy: 4 guests",
  },
  {
    from: "bot",
    text: "Would you like a full list? [Quick Replies: Yes | No]",
  },
  { from: "guest", text: "Yes" },
  {
    from: "bot",
    text: "Here’s the full list of house rules: [Rich-Link: View Full House Rules]",
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
    text: "Confirmed! Your dinner reservation is set for Saturday at 7:00 PM. [Rich-Link: View Reservation]",
  },
  // { from: "bot", text: "Step 7: Guest Needs to Contact the Owner" },
  { from: "guest", text: "I have a question about the Wi-Fi." },
  {
    from: "bot",
    text: "Wi-Fi is available! Network: LighthouseGuest, Password: Sunset123. Still need help? [Quick Reply: Contact Owner]",
  },
  { from: "guest", text: "Contact Owner" },
  {
    from: "bot",
    text: "Please describe your question. The owner will respond shortly. [Form appears]",
  },
  { from: "guest", text: "The Wi-Fi seems slow, any troubleshooting tips?" },
  {
    from: "bot",
    text: "Your message has been sent to the owner. You’ll receive a response here shortly.",
  },
  // { from: "bot", text: "Step 8: Owner Responds" },
  {
    from: "owner",
    text: "Hi [Guest Name], thanks for reaching out! The Wi-Fi may slow if multiple devices stream video. Try restarting the router under the TV.",
  },
  { from: "guest", text: "Thanks so much!" },
  {
    from: "bot",
    text: "Happy to help! Enjoy your stay at The Lighthouse. Let us know if you need anything else.",
  },
  {
    from: "bot",
    // text: "Step 9: Guest Requests Late Checkout (Apple Pay Integration)",
  },
  { from: "guest", text: "Can I check out later on Monday?" },
  {
    from: "bot",
    text: "You can extend your stay until 1:00 PM for a $30 late checkout fee. Would you like to confirm? [Yes | No]",
  },
  { from: "guest", text: "Yes" },
  {
    from: "bot",
    text: "Late Checkout Confirmed! Payment of $30 is required to finalize. [Apple Pay Button: Pay $30 Now]",
  },
  { from: "guest", text: "[Guest taps Apple Pay and confirms payment]" },
  {
    from: "bot",
    text: "Payment Received! Late checkout is confirmed for Monday, 1:00 PM.",
  },
];
