export type TicketStatus = 'Open' | 'In Progress' | 'Closed';

export interface Ticket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: string;
  status: TicketStatus;
  created: string;
  adminResponse?: string;
}

const STORAGE_KEY = 'nws_tickets';

export function getTickets(): Ticket[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveTickets(tickets: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export function addTicket(ticket: Ticket) {
  const tickets = getTickets();
  tickets.push(ticket);
  saveTickets(tickets);
}

export function updateTicket(id: string, updates: Partial<Ticket>) {
  const tickets = getTickets();
  const idx = tickets.findIndex(t => t.id === id);
  if (idx !== -1) {
    tickets[idx] = { ...tickets[idx], ...updates };
    saveTickets(tickets);
  }
}

export function getUserTickets(email: string): Ticket[] {
  return getTickets().filter(t => t.email === email);
} 