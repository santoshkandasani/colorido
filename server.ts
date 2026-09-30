import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './server/db';
import { INITIAL_EVENTS } from './src/data/festEvents';
import { Participant, EventRegistration, ParticipantType } from './src/types/fest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // 1. Live Stats (separate internal vs external participant counts)
  app.get('/api/stats', (req, res) => {
    try {
      const stats = db.getStats();
      res.json({ success: true, stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 2. Events List with live registration counts
  app.get('/api/events', (req, res) => {
    try {
      const liveCounts = db.getEventCounts();
      const eventsWithLiveCounts = INITIAL_EVENTS.map(event => ({
        ...event,
        registeredCount: liveCounts[event.id] ?? event.registeredCount
      }));
      res.json({ success: true, events: eventsWithLiveCounts });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 3. User Registration (Separate Internal vs External)
  app.post('/api/auth/register', (req, res) => {
    try {
      const {
        userType,
        name,
        email,
        enrollmentNumber,
        phoneNumber,
        collegeName,
        department,
        password
      } = req.body;

      if (!userType || !name || !email || !enrollmentNumber) {
        return res.status(400).json({
          success: false,
          error: 'Please fill all mandatory fields (Name, Email, Enrollment Number).'
        });
      }

      if (userType === 'external' && (!phoneNumber || !collegeName)) {
        return res.status(400).json({
          success: false,
          error: 'External participants must provide Phone Number and College Name.'
        });
      }

      const existingUser = db.findParticipant(email) || db.findParticipant(enrollmentNumber);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'A participant with this Email or Enrollment Number is already registered.'
        });
      }

      const newParticipant: Participant = {
        id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        userType: userType as ParticipantType,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        enrollmentNumber: enrollmentNumber.trim().toUpperCase(),
        phoneNumber: phoneNumber ? phoneNumber.trim() : undefined,
        collegeName: userType === 'internal' ? 'R.V.R. & J.C. College of Engineering (Host)' : collegeName.trim(),
        department: department ? department.trim() : undefined,
        password: password || 'fest2026',
        createdAt: new Date().toISOString()
      };

      db.addParticipant(newParticipant);
      const updatedStats = db.getStats();

      // Return participant without password
      const { password: _, ...safeUser } = newParticipant;

      res.status(201).json({
        success: true,
        user: safeUser,
        stats: updatedStats,
        message: `Welcome to COLORIDO 2K26, ${safeUser.name}! Successfully registered as ${safeUser.userType === 'internal' ? 'Internal Student' : 'External Participant'}.`
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. User Login (Internal or External)
  app.post('/api/auth/login', (req, res) => {
    try {
      const { identifier, password } = req.body;

      if (!identifier) {
        return res.status(400).json({
          success: false,
          error: 'Please enter your Email or Enrollment Number.'
        });
      }

      const user = db.findParticipant(identifier);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'No participant found with this Email or Enrollment ID. Please register first.'
        });
      }

      // Check password if set
      if (user.password && password && user.password !== password) {
        return res.status(401).json({
          success: false,
          error: 'Incorrect credentials. Please try again.'
        });
      }

      const { password: _, ...safeUser } = user;
      const userRegistrations = db.getRegistrations(user.id);

      res.json({
        success: true,
        user: safeUser,
        registrations: userRegistrations
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 5. Register for Event (Solo or Group)
  app.post('/api/events/register', (req, res) => {
    try {
      const {
        eventId,
        participantId,
        teamName,
        teamMembers
      } = req.body;

      if (!eventId || !participantId) {
        return res.status(400).json({
          success: false,
          error: 'Event ID and Participant ID are required.'
        });
      }

      const participant = db.getParticipants().find(p => p.id === participantId);
      if (!participant) {
        return res.status(404).json({
          success: false,
          error: 'Participant profile not found. Please log in again.'
        });
      }

      const event = INITIAL_EVENTS.find(e => e.id === eventId);
      if (!event) {
        return res.status(404).json({
          success: false,
          error: 'Selected event not found.'
        });
      }

      // Check if already registered for this event
      const existing = db.getRegistrations(participantId).find(r => r.eventId === eventId);
      if (existing) {
        return res.status(409).json({
          success: false,
          error: `You are already registered for ${event.title}. View your digital fest pass.`
        });
      }

      // Generate verifiable ticket code
      const prefix = participant.userType === 'internal' ? 'INT' : 'EXT';
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const ticketCode = `COL26-${prefix}-${randomSuffix}`;

      const newRegistration: EventRegistration = {
        id: `reg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        eventId: event.id,
        eventTitle: event.title,
        eventCategory: event.category,
        venue: event.venue,
        dateTime: event.dateTime,
        participantId: participant.id,
        participantName: participant.name,
        participantEmail: participant.email,
        participantPhone: participant.phoneNumber,
        participantType: participant.userType,
        collegeName: participant.collegeName,
        enrollmentNumber: participant.enrollmentNumber,
        teamName: event.isGroup ? teamName : undefined,
        teamMembers: event.isGroup ? teamMembers : undefined,
        registeredAt: new Date().toISOString(),
        ticketCode
      };

      db.addRegistration(newRegistration);

      res.status(201).json({
        success: true,
        registration: newRegistration,
        message: `Successfully confirmed registration for ${event.title}! Your pass code is ${ticketCode}.`
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 6. Get Registrations by Participant
  app.get('/api/registrations/:participantId', (req, res) => {
    try {
      const { participantId } = req.params;
      const registrations = db.getRegistrations(participantId);
      res.json({ success: true, registrations });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 7. Cancel / Unregister from Event
  app.delete('/api/registrations/:regId', (req, res) => {
    try {
      const { regId } = req.params;
      const { participantId } = req.body;
      if (!participantId) {
        return res.status(400).json({ success: false, error: 'Participant ID is required.' });
      }

      const success = db.removeRegistration(regId, participantId);
      if (success) {
        res.json({ success: true, message: 'Registration cancelled successfully.' });
      } else {
        res.status(404).json({ success: false, error: 'Registration record not found.' });
      }
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 8. Announcements
  app.get('/api/announcements', (req, res) => {
    try {
      const announcements = db.getAnnouncements();
      res.json({ success: true, announcements });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 9. Results
  app.get('/api/results', (req, res) => {
    try {
      const results = db.getResults();
      res.json({ success: true, results });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // --- VITE MIDDLEWARE / STATIC ASSETS ---
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`COLORIDO 2K26 Full-Stack Portal running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start COLORIDO 2K26 server:', err);
  process.exit(1);
});
