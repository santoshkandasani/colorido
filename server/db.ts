import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Participant, EventRegistration, Announcement, EventResult, StatsOverview } from '../src/types/fest';
import { INITIAL_EVENTS, INITIAL_ANNOUNCEMENTS, INITIAL_RESULTS } from '../src/data/festEvents';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

interface DatabaseSchema {
  participants: Participant[];
  registrations: EventRegistration[];
  announcements: Announcement[];
  results: EventResult[];
  eventCounts: Record<string, number>;
}

// Seed initial participants so dashboard is populated with realistic counts right away
const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 'int-1',
    userType: 'internal',
    name: 'Santosh Kandasani',
    email: 'santosh.kandasani@gmail.com',
    enrollmentNumber: 'Y22BCE10042',
    department: 'Computer Science & Engineering',
    collegeName: 'R.V.R. & J.C. College of Engineering (Host)',
    password: 'password123',
    createdAt: '2026-12-20T10:00:00.000Z'
  },
  {
    id: 'int-2',
    userType: 'internal',
    name: 'Sanjana Rao',
    email: 'sanjana.rao@rvrjcce.ac.in',
    enrollmentNumber: 'Y22BEC10188',
    department: 'Electronics & Communication',
    collegeName: 'R.V.R. & J.C. College of Engineering (Host)',
    password: 'password123',
    createdAt: '2026-12-20T11:30:00.000Z'
  },
  {
    id: 'int-3',
    userType: 'internal',
    name: 'Aditya Varma',
    email: 'aditya.v@rvrjcce.ac.in',
    enrollmentNumber: 'Y23BME10012',
    department: 'Mechanical Engineering',
    collegeName: 'R.V.R. & J.C. College of Engineering (Host)',
    password: 'password123',
    createdAt: '2026-12-21T09:15:00.000Z'
  },
  {
    id: 'ext-1',
    userType: 'external',
    name: 'Rahul Bose',
    email: 'rahul.bose@bits-pilani.ac.in',
    enrollmentNumber: 'BITS2023-4412',
    phoneNumber: '+91 98450 99881',
    collegeName: 'BITS Pilani',
    password: 'password123',
    createdAt: '2026-12-21T14:20:00.000Z'
  },
  {
    id: 'ext-2',
    userType: 'external',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@iitm.ac.in',
    enrollmentNumber: 'IITM-EE-2022',
    phoneNumber: '+91 97112 33445',
    collegeName: 'IIT Madras',
    password: 'password123',
    createdAt: '2026-12-22T10:45:00.000Z'
  },
  {
    id: 'ext-3',
    userType: 'external',
    name: 'Karthik Shenoy',
    email: 'karthik.s@loyola.edu',
    enrollmentNumber: 'LOY-COMM-219',
    phoneNumber: '+91 99801 22334',
    collegeName: 'Loyola College, Vijayawada',
    password: 'password123',
    createdAt: '2026-12-22T16:10:00.000Z'
  }
];

// Add extra synthetic counter baseline to represent large-scale fest
const BASELINE_INTERNAL = 248;
const BASELINE_EXTERNAL = 184;
const BASELINE_COLLEGES = 34;

export class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadDatabase();
  }

  private loadDatabase(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.error('Error loading database, initializing fresh:', err);
    }

    // Default initial schema
    const initialData: DatabaseSchema = {
      participants: [...INITIAL_PARTICIPANTS],
      registrations: [
        {
          id: 'reg-demo-1',
          eventId: 'cul-fine-arts',
          eventTitle: 'Fine Arts: Canvas & Expression',
          eventCategory: 'cultural',
          venue: 'Silver Jubilee Block Drawing Halls',
          dateTime: 'Dec 26, 2026 - 10:00 AM',
          participantId: 'int-1',
          participantName: 'Santosh Kandasani',
          participantEmail: 'santosh.kandasani@gmail.com',
          participantType: 'internal',
          collegeName: 'R.V.R. & J.C. College of Engineering (Host)',
          enrollmentNumber: 'Y22BCE10042',
          registeredAt: '2026-12-20T12:00:00.000Z',
          ticketCode: 'COL26-INT-10042'
        },
        {
          id: 'reg-demo-2',
          eventId: 'spo-bb-boys',
          eventTitle: 'Slam Dunk: Basketball Tournament (Boys)',
          eventCategory: 'sports',
          venue: 'RVR & JC Floodlit Basketball Arena',
          dateTime: 'Dec 26, 2026 - 08:30 AM',
          participantId: 'ext-1',
          participantName: 'Rahul Bose',
          participantEmail: 'rahul.bose@bits-pilani.ac.in',
          participantPhone: '+91 98450 99881',
          participantType: 'external',
          collegeName: 'BITS Pilani',
          enrollmentNumber: 'BITS2023-4412',
          teamName: 'Pilani Ballers',
          teamMembers: [
            { name: 'Rahul Bose', rollNo: 'BITS2023-4412' },
            { name: 'Sameer Sen', rollNo: 'BITS2023-4413' },
            { name: 'Arun Iyer', rollNo: 'BITS2023-4414' },
            { name: 'Tejas Patel', rollNo: 'BITS2023-4415' },
            { name: 'Nikhil Roy', rollNo: 'BITS2023-4416' }
          ],
          registeredAt: '2026-12-21T10:00:00.000Z',
          ticketCode: 'COL26-EXT-4412'
        }
      ],
      announcements: [...INITIAL_ANNOUNCEMENTS],
      results: [...INITIAL_RESULTS],
      eventCounts: {
        'cul-fine-arts': 42,
        'cul-music-solo': 56,
        'cul-battle-of-bands': 18,
        'cul-dance-solo': 64,
        'cul-dance-group': 22,
        'cul-choreoday': 14,
        'cul-dramatics': 16,
        'cul-fashion-show': 12,
        'cul-tekraft': 38,
        'cul-literary': 48,
        'spo-bb-boys': 16,
        'spo-vb-boys': 14,
        'spo-tt-boys': 32,
        'spo-tb-girls': 12,
        'spo-tk-girls': 24,
        'spo-tt-girls': 26
      }
    };

    this.saveData(initialData);
    return initialData;
  }

  private saveData(data: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      this.data = data;
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  public getStats(): StatsOverview {
    const liveInternal = this.data.participants.filter(p => p.userType === 'internal').length;
    const liveExternal = this.data.participants.filter(p => p.userType === 'external').length;
    
    // Colleges count (unique external colleges + host college)
    const uniqueColleges = new Set(
      this.data.participants.map(p => p.collegeName.trim().toLowerCase())
    );

    return {
      totalParticipants: BASELINE_INTERNAL + BASELINE_EXTERNAL + this.data.participants.length - INITIAL_PARTICIPANTS.length,
      internalCount: BASELINE_INTERNAL + (liveInternal - 3),
      externalCount: BASELINE_EXTERNAL + (liveExternal - 3),
      collegesCount: Math.max(BASELINE_COLLEGES, uniqueColleges.size + 30),
      eventsCount: INITIAL_EVENTS.length,
      totalRegistrations: this.data.registrations.length + 380
    };
  }

  public getParticipants(): Participant[] {
    return this.data.participants;
  }

  public findParticipant(emailOrRoll: string): Participant | undefined {
    const term = emailOrRoll.trim().toLowerCase();
    return this.data.participants.find(
      p => p.email.toLowerCase() === term || p.enrollmentNumber.toLowerCase() === term
    );
  }

  public addParticipant(participant: Participant): Participant {
    this.data.participants.push(participant);
    this.saveData(this.data);
    return participant;
  }

  public getRegistrations(participantId?: string): EventRegistration[] {
    if (participantId) {
      return this.data.registrations.filter(r => r.participantId === participantId);
    }
    return this.data.registrations;
  }

  public addRegistration(registration: EventRegistration): EventRegistration {
    this.data.registrations.push(registration);
    if (!this.data.eventCounts[registration.eventId]) {
      this.data.eventCounts[registration.eventId] = 0;
    }
    this.data.eventCounts[registration.eventId]++;
    this.saveData(this.data);
    return registration;
  }

  public removeRegistration(registrationId: string, participantId: string): boolean {
    const idx = this.data.registrations.findIndex(
      r => r.id === registrationId && r.participantId === participantId
    );
    if (idx !== -1) {
      const reg = this.data.registrations[idx];
      if (this.data.eventCounts[reg.eventId] > 0) {
        this.data.eventCounts[reg.eventId]--;
      }
      this.data.registrations.splice(idx, 1);
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  public getAnnouncements(): Announcement[] {
    return this.data.announcements;
  }

  public getResults(): EventResult[] {
    return this.data.results;
  }

  public getEventCounts(): Record<string, number> {
    return this.data.eventCounts;
  }
}

export const db = new Database();
