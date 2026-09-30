import {
  Participant,
  FestEvent,
  EventRegistration,
  Announcement,
  EventResult,
  StatsOverview,
  ParticipantType
} from '../types/fest';
import { INITIAL_EVENTS, INITIAL_ANNOUNCEMENTS, INITIAL_RESULTS } from '../data/festEvents';

// Persistent client-side fallback storage in case backend is cycling
const STORAGE_USER_KEY = 'colorido_user';
const STORAGE_REG_KEY = 'colorido_registrations';

export const api = {
  // 1. Fetch live stats
  async getStats(): Promise<StatsOverview> {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        return data.stats;
      }
    } catch (e) {
      console.warn('Backend API fallback for stats:', e);
    }
    return {
      totalParticipants: 438,
      internalCount: 251,
      externalCount: 187,
      collegesCount: 36,
      eventsCount: INITIAL_EVENTS.length,
      totalRegistrations: 395
    };
  },

  // 2. Fetch events
  async getEvents(): Promise<FestEvent[]> {
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        return data.events;
      }
    } catch (e) {
      console.warn('Backend API fallback for events:', e);
    }
    return INITIAL_EVENTS;
  },

  // 3. Register user (Internal or External)
  async registerUser(payload: {
    userType: ParticipantType;
    name: string;
    email: string;
    enrollmentNumber: string;
    phoneNumber?: string;
    collegeName?: string;
    department?: string;
    password?: string;
  }): Promise<{ user: Participant; stats: StatsOverview }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to register participant.');
    }

    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(data.user));
    return { user: data.user, stats: data.stats };
  },

  // 4. Login user
  async loginUser(identifier: string, password?: string): Promise<{ user: Participant; registrations: EventRegistration[] }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Login failed. Please check credentials.');
    }

    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(data.user));
    return { user: data.user, registrations: data.registrations || [] };
  },

  // 5. Register for Event
  async registerForEvent(payload: {
    eventId: string;
    participantId: string;
    teamName?: string;
    teamMembers?: { name: string; rollNo: string }[];
  }): Promise<EventRegistration> {
    const res = await fetch('/api/events/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Event registration failed.');
    }

    return data.registration;
  },

  // 6. Get registrations
  async getRegistrations(participantId: string): Promise<EventRegistration[]> {
    try {
      const res = await fetch(`/api/registrations/${participantId}`);
      if (res.ok) {
        const data = await res.json();
        return data.registrations;
      }
    } catch (e) {
      console.warn('Backend API fallback for registrations:', e);
    }
    return [];
  },

  // 7. Unregister / cancel registration
  async unregisterEvent(regId: string, participantId: string): Promise<boolean> {
    const res = await fetch(`/api/registrations/${regId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantId })
    });
    const data = await res.json();
    return res.ok && data.success;
  },

  // 8. Fetch Announcements
  async getAnnouncements(): Promise<Announcement[]> {
    try {
      const res = await fetch('/api/announcements');
      if (res.ok) {
        const data = await res.json();
        return data.announcements;
      }
    } catch (e) {
      console.warn('Backend API fallback for announcements:', e);
    }
    return INITIAL_ANNOUNCEMENTS;
  },

  // 9. Fetch Results
  async getResults(): Promise<EventResult[]> {
    try {
      const res = await fetch('/api/results');
      if (res.ok) {
        const data = await res.json();
        return data.results;
      }
    } catch (e) {
      console.warn('Backend API fallback for results:', e);
    }
    return INITIAL_RESULTS;
  },

  // Helper: Get cached user from local storage
  getCachedUser(): Participant | null {
    try {
      const raw = localStorage.getItem(STORAGE_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  logoutUser(): void {
    localStorage.removeItem(STORAGE_USER_KEY);
  }
};
