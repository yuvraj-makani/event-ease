export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  template?: string;
}

export interface Task {
  id: string;
  eventId: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  email: string;
  rsvp: 'Pending' | 'Confirmed' | 'Declined';
  specialRequests?: string;
  isVIP: boolean;
  isCheckedIn: boolean;
}

export interface Budget {
  id: string;
  eventId: string;
  category: string;
  amount: number;
}

export interface Expense {
  id: string;
  eventId: string;
  category: string;
  description: string;
  amount: number;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  rating: number;
  price: string;
  location: string;
}
