export type ParticipantType = 'internal' | 'external';

export interface Participant {
  id: string;
  userType: ParticipantType;
  name: string;
  email: string;
  enrollmentNumber: string;
  phoneNumber?: string;
  collegeName: string;
  department?: string;
  password?: string;
  createdAt: string;
}

export type EventCategory = 'cultural' | 'sports';

export type SubCategory =
  | 'fine_arts'
  | 'music_band'
  | 'dance'
  | 'choreoday'
  | 'dramatics'
  | 'fashion_show'
  | 'tekraft'
  | 'literary'
  | 'sports_boys'
  | 'sports_girls';

export interface Coordinator {
  name: string;
  role: string;
  phone: string;
  email?: string;
}

export interface FestEvent {
  id: string;
  title: string;
  category: EventCategory;
  subCategory: SubCategory;
  subCategoryLabel: string;
  genderCategory?: 'boys' | 'girls' | 'open';
  isGroup: boolean;
  teamSize: string;
  minTeamSize: number;
  maxTeamSize: number;
  shortDescription: string;
  description: string;
  rules: string[];
  judgingCriteria: string[];
  venue: string;
  dateTime: string;
  prizePool: string;
  firstPrize: string;
  secondPrize: string;
  thirdPrize?: string;
  coordinators: Coordinator[];
  image: string;
  registeredCount: number;
  featured?: boolean;
}

export interface TeamMember {
  name: string;
  rollNo: string;
  email?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventCategory: EventCategory;
  venue: string;
  dateTime: string;
  participantId: string;
  participantName: string;
  participantEmail: string;
  participantPhone?: string;
  participantType: ParticipantType;
  collegeName: string;
  enrollmentNumber: string;
  teamName?: string;
  teamMembers?: TeamMember[];
  registeredAt: string;
  ticketCode: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  tag: 'Urgent' | 'Schedule' | 'Highlight' | 'Rules' | 'Pro-Show';
  timestamp: string;
  isPinned?: boolean;
}

export interface EventResult {
  id: string;
  eventId: string;
  eventName: string;
  category: string;
  firstPlace: { name: string; college: string; notes?: string };
  secondPlace: { name: string; college: string; notes?: string };
  thirdPlace?: { name: string; college: string; notes?: string };
  publishedAt: string;
}

export interface StatsOverview {
  totalParticipants: number;
  internalCount: number;
  externalCount: number;
  collegesCount: number;
  eventsCount: number;
  totalRegistrations: number;
}
