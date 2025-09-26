export const eventTemplates = {
  wedding: {
    tasks: [
      {
        title: "Finalize Guest List",
        description: "Confirm all guests with family members"
      },
      {
        title: "Book Venue",
        description: "Finalize and book the wedding hall"
      },
      {
        title: "Choose Caterer",
        description: "Select menu and book catering services"
      },
      {
        title: "Send Invitations",
        description: "Send digital invites to all guests"
      }
    ],
    budgets: [
      { category: "Venue", amount: 250000 },
      { category: "Catering", amount: 150000 },
      { category: "Decor", amount: 100000 },
      { category: "Entertainment", amount: 50000 }
    ],
    tips: "For a wedding, budget tracking and guest management are most important. Pay attention to RSVPs and seating arrangements."
  },
  birthday: {
    tasks: [
      {
        title: "Create Guest List",
        description: "Decide who to invite to the party"
      },
      {
        title: "Order Cake",
        description: "Choose a design and order the cake"
      },
      {
        title: "Buy Decorations",
        description: "Get balloons, streamers, etc."
      },
      {
        title: "Plan Activities",
        description: "Organize games or other fun activities"
      }
    ],
    budgets: [
      { category: "Food & Drinks", amount: 15000 },
      { category: "Decorations", amount: 5000 },
      { category: "Cake", amount: 3000 },
      { category: "Gifts", amount: 7000 }
    ],
    tips: "For a birthday party, focus on activities and a personalized guest experience."
  },
  conference: {
    tasks: [
      {
        title: "Finalize Speakers",
        description: "Confirm speakers and their topics"
      },
      {
        title: "Set Agenda",
        description: "Create a detailed schedule for the conference"
      },
      {
        title: "Promote Event",
        description: "Market the conference on social media"
      },
      {
        title: "Prepare Materials",
        description: "Gather items for attendee welcome bags"
      }
    ],
    budgets: [
      { category: "Venue", amount: 100000 },
      { category: "Speakers", amount: 80000 },
      { category: "Marketing", amount: 50000 },
      { category: "Logistics", amount: 30000 }
    ],
    tips: "For a conference, the agenda and speaker logistics are crucial. Use QR check-ins to manage attendee flow efficiently."
  }
};
