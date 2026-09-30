import { FestEvent, Announcement, EventResult } from '../types/fest';

export const INITIAL_EVENTS: FestEvent[] = [
  // --- CULTURAL EVENTS (Dec 26, 2026) ---
  // 1. Fine Arts
  {
    id: 'cul-fine-arts',
    title: 'Fine Arts: Canvas & Expression',
    category: 'cultural',
    subCategory: 'fine_arts',
    subCategoryLabel: 'Fine Arts',
    genderCategory: 'open',
    isGroup: false,
    teamSize: 'Solo (1 participant)',
    minTeamSize: 1,
    maxTeamSize: 1,
    shortDescription: 'Unleash your imagination through canvas painting, oil pastels, charcoal sketching and live thematic art.',
    description: 'Fine Arts at COLORIDO 2K26 is the ultimate playground for visual storytellers at R.V.R. & J.C. College of Engineering. Participants will be provided blank canvases and drawing sheets to interpret the fest theme.',
    rules: [
      'Time duration is 2.5 hours strictly.',
      'Drawing sheets and basic canvases will be provided by host college. Bring your own specialty brushes, paints, or charcoals.',
      'Use of mobile phones or reference images during the competition is strictly prohibited.',
      'Originality, composition, interpretation of theme, and neatness will be primary judging factors.'
    ],
    judgingCriteria: ['Creativity & Originality (30%)', 'Technical Skill & Detailing (30%)', 'Relevance to Theme (25%)', 'Neatness & Presentation (15%)'],
    venue: 'Silver Jubilee Block Drawing Halls, 2nd Floor',
    dateTime: 'Dec 26, 2026 - 10:00 AM to 12:30 PM',
    prizePool: '₹25,000',
    firstPrize: '₹12,000 + Trophy & Certificate',
    secondPrize: '₹8,000 + Medal & Certificate',
    thirdPrize: '₹5,000 + Certificate',
    coordinators: [
      { name: 'Dr. T. S. Rao', role: 'Faculty Coordinator', phone: '+91 98490 12341' },
      { name: 'Karthik Raja', role: 'Student Secretary', phone: '+91 91234 56789' }
    ],
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
    registeredCount: 42,
    featured: true
  },

  // 2. Music & Band (Solo & Group)
  {
    id: 'cul-music-solo',
    title: 'Sur-Sangam: Solo Vocals (Eastern & Western)',
    category: 'cultural',
    subCategory: 'music_band',
    subCategoryLabel: 'Music & Band',
    genderCategory: 'open',
    isGroup: false,
    teamSize: 'Solo (1 singer + 1 optional accompanist)',
    minTeamSize: 1,
    maxTeamSize: 2,
    shortDescription: 'Solo vocal competition spanning Classical, Semi-Classical, Indian Pop, and Western Acoustic genres.',
    description: 'Showcase your vocal prowess and pitch precision in front of a live collegiate audience and renowned industry music jury.',
    rules: [
      'Time limit: 4 minutes performance + 1 minute sound check.',
      'One live accompanist (keyboard/guitar) or karaoke track on clean USB drive is allowed.',
      'No explicit language or offensive lyrics will be tolerated.',
      'Judging based on pitch (Sur), rhythm (Taal), voice modulation, and stage presence.'
    ],
    judgingCriteria: ['Vocal Pitch & Accuracy (30%)', 'Rhythm & Tempo Control (25%)', 'Expression & Dynamics (25%)', 'Stage Presence (20%)'],
    venue: 'Ch. Madhusudhana Rao Open Air Theatre (OAT)',
    dateTime: 'Dec 26, 2026 - 11:00 AM to 01:30 PM',
    prizePool: '₹30,000',
    firstPrize: '₹15,000 + Trophy',
    secondPrize: '₹10,000 + Medal',
    thirdPrize: '₹5,000 + Certificate',
    coordinators: [
      { name: 'Dr. Ch. Srinivas Rao', role: 'Faculty In-Charge', phone: '+91 98490 44321' },
      { name: 'Meghana Sen', role: 'Music Club Lead', phone: '+91 98765 43210' }
    ],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    registeredCount: 56,
    featured: true
  },
  {
    id: 'cul-battle-of-bands',
    title: 'Battle of the Bands: Group Symphony',
    category: 'cultural',
    subCategory: 'music_band',
    subCategoryLabel: 'Music & Band',
    genderCategory: 'open',
    isGroup: true,
    teamSize: 'Team (3 to 8 members)',
    minTeamSize: 3,
    maxTeamSize: 8,
    shortDescription: 'The thunderous rock, metal, indie, and fusion clash of collegiate bands across the state.',
    description: 'Electrify the main college stage! Bands battle it out with custom original scores and high-octane cover medleys. Standard PA system and 5-piece drum kit provided.',
    rules: [
      'Time limit: 12 minutes (including sound check and exit).',
      'At least one original composition or creative adaptation must be performed.',
      'Standard drum kit, DI boxes, and microphones provided. Bands must bring their own guitars, keyboards, pedals, and drumsticks.',
      'Pre-recorded backing tracks are strictly forbidden.'
    ],
    judgingCriteria: ['Tightness & Groove (30%)', 'Originality & Arrangement (30%)', 'Crowd Engagement (20%)', 'Vocal & Instrumental Mastery (20%)'],
    venue: 'RVR & JC Central Amphitheatre Ground',
    dateTime: 'Dec 26, 2026 - 05:00 PM to 07:30 PM',
    prizePool: '₹60,000',
    firstPrize: '₹35,000 + Rolling Trophy',
    secondPrize: '₹20,000 + Trophy',
    thirdPrize: '₹5,000 + Gift Hampers',
    coordinators: [
      { name: 'Prof. K. Ravindra', role: 'Faculty Advisor', phone: '+91 99112 33445' },
      { name: 'Rohan Deshmukh', role: 'Student Convener', phone: '+91 95432 10987' }
    ],
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    registeredCount: 18,
    featured: true
  },

  // 3. Dance (Solo & Group)
  {
    id: 'cul-dance-solo',
    title: 'Footloose: Solo Dance Championship',
    category: 'cultural',
    subCategory: 'dance',
    subCategoryLabel: 'Dance',
    genderCategory: 'open',
    isGroup: false,
    teamSize: 'Solo (1 dancer)',
    minTeamSize: 1,
    maxTeamSize: 1,
    shortDescription: 'Solo dance face-off spanning Contemporary, Hip-hop, Popping, Bollywood, and Classical Fusion.',
    description: 'Own the spotlight! Dancers are judged on choreography, facial expressions, fluid transitions, and rhythm coordination.',
    rules: [
      'Time limit: 3 to 4 minutes maximum.',
      'Soundtracks must be submitted in MP3 format during morning registration desk reporting.',
      'Props allowed but must not soil or damage stage floor (no fire, water, or glass).',
      'Decisions of the jury are final and binding.'
    ],
    judgingCriteria: ['Choreography & Musicality (35%)', 'Execution & Energy (30%)', 'Stage Presence & Expressions (20%)', 'Costume & Styling (15%)'],
    venue: 'Auditorium Block Stage A',
    dateTime: 'Dec 26, 2026 - 09:30 AM to 12:00 PM',
    prizePool: '₹30,000',
    firstPrize: '₹15,000 + Trophy',
    secondPrize: '₹10,000 + Medal',
    thirdPrize: '₹5,000 + Certificate',
    coordinators: [
      { name: 'Dr. M. Sreelatha', role: 'Faculty Coordinator', phone: '+91 97654 32109' },
      { name: 'Pooja Hegde', role: 'Dance Captain', phone: '+91 90123 45678' }
    ],
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    registeredCount: 64,
    featured: true
  },
  {
    id: 'cul-dance-group',
    title: 'Rhythm Clash: Western & Folk Group Dance',
    category: 'cultural',
    subCategory: 'dance',
    subCategoryLabel: 'Dance',
    genderCategory: 'open',
    isGroup: true,
    teamSize: 'Team (6 to 16 members)',
    minTeamSize: 6,
    maxTeamSize: 16,
    shortDescription: 'High-octane team dance routine featuring synchronization, formations, and raw energy.',
    description: 'Assemble your collegiate crew! Compete in synchronized group routines combining urban street styles, folk dances, or contemporary storylines.',
    rules: [
      'Time duration: 6 to 8 minutes on stage.',
      'Minimum 6 dancers and maximum 16 dancers on stage at any given moment.',
      'Props are permitted with advance approval from coordinators.',
      'Clean audio track must be provided on pen drive.'
    ],
    judgingCriteria: ['Synchronization & Formations (35%)', 'Choreographic Innovation (30%)', 'Energy & Stage Coverage (20%)', 'Costumes & Visual Impact (15%)'],
    venue: 'Auditorium Block Stage A',
    dateTime: 'Dec 26, 2026 - 01:30 PM to 04:00 PM',
    prizePool: '₹50,000',
    firstPrize: '₹30,000 + Trophy',
    secondPrize: '₹15,000 + Trophy',
    thirdPrize: '₹5,000 + Certificate',
    coordinators: [
      { name: 'Dr. M. Sreelatha', role: 'Faculty Coordinator', phone: '+91 97654 32109' },
      { name: 'Tanvi Joshi', role: 'Student Secretary', phone: '+91 98220 11223' }
    ],
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    registeredCount: 22,
    featured: false
  },

  // 4. Choreoday (Theme Based)
  {
    id: 'cul-choreoday',
    title: 'Choreoday: Thematic Mega Showcase',
    category: 'cultural',
    subCategory: 'choreoday',
    subCategoryLabel: 'Choreoday',
    genderCategory: 'open',
    isGroup: true,
    teamSize: 'Team (12 to 30 members)',
    minTeamSize: 12,
    maxTeamSize: 30,
    shortDescription: 'The flagship cinematic storytelling dance drama where colleges bring full-scale themes alive.',
    description: 'Choreoday is the grandest spectacle of COLORIDO 2K26. Teams portray powerful social, historical, or futuristic themes through synchronized dance, dramatic transitions, lighting interplay, and theatrical costumes.',
    rules: [
      'Performance duration: 10 to 14 minutes.',
      'Theme explanation script must be submitted 2 hours prior to event commencement.',
      'Props, backdrops, and safe visual stage effects are allowed.',
      'Soundtrack narration or voiceovers must be blended seamlessly into the submitted track.'
    ],
    judgingCriteria: ['Theme Depiction & Storyline (30%)', 'Choreographic Excellence & Formations (30%)', 'Prop Usage & Theatrical Impact (20%)', 'Costumes & Makeup (20%)'],
    venue: 'Main OAT Stage & Ground',
    dateTime: 'Dec 26, 2026 - 03:30 PM to 06:00 PM',
    prizePool: '₹75,000',
    firstPrize: '₹45,000 + Grand Champion Trophy',
    secondPrize: '₹20,000 + Runners Trophy',
    thirdPrize: '₹10,000 + Plaque',
    coordinators: [
      { name: 'Prof. K. Venkateswarlu', role: 'Chief Cultural Convener', phone: '+91 98480 99887' },
      { name: 'Varun Teja', role: 'Student President', phone: '+91 93456 78901' }
    ],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    registeredCount: 14,
    featured: true
  },

  // 5. Dramatics
  {
    id: 'cul-dramatics',
    title: 'Rangmanch: Street Play & Stage Drama',
    category: 'cultural',
    subCategory: 'dramatics',
    subCategoryLabel: 'Dramatics',
    genderCategory: 'open',
    isGroup: true,
    teamSize: 'Team (6 to 18 members)',
    minTeamSize: 6,
    maxTeamSize: 18,
    shortDescription: 'Nukkad Natak (Street Play) & Stage Dramatics highlighting pressing societal themes, wit, and acting grit.',
    description: 'Vibrant dholak beats, hard-hitting dialogues, and thought-provoking satire in the central campus quadrangle.',
    rules: [
      'Time duration: 15 to 20 minutes.',
      'No electronic microphones or amplification allowed for Street Play. Acoustic instruments encouraged.',
      'Language: Telugu, Hindi, or English.',
      'No defamatory content permitted.'
    ],
    judgingCriteria: ['Script & Content Message (35%)', 'Acting & Voice Modulation (30%)', 'Crowd Interaction & Formations (20%)', 'Use of Rhythm & Music (15%)'],
    venue: 'Central Quadrangle Arena',
    dateTime: 'Dec 26, 2026 - 11:30 AM to 02:00 PM',
    prizePool: '₹40,000',
    firstPrize: '₹22,000 + Trophy',
    secondPrize: '₹12,000 + Trophy',
    thirdPrize: '₹6,000 + Certificate',
    coordinators: [
      { name: 'Dr. G. Rama Mohan', role: 'Faculty Coordinator', phone: '+91 94401 23456' },
      { name: 'Arjun Verma', role: 'Dramatics Secretary', phone: '+91 91987 65432' }
    ],
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    registeredCount: 16,
    featured: false
  },

  // 6. Fashion Show
  {
    id: 'cul-fashion-show',
    title: 'Vogue Couture: Runway Championship',
    category: 'cultural',
    subCategory: 'fashion_show',
    subCategoryLabel: 'Fashion Show',
    genderCategory: 'open',
    isGroup: true,
    teamSize: 'Team (10 to 18 models + 2 stylists)',
    minTeamSize: 10,
    maxTeamSize: 20,
    shortDescription: 'High fashion elegance, avant-garde haute couture, and traditional weaves on an illuminated ramp.',
    description: 'Colleges present thematic runway collections highlighting sustainable weaves, heritage silks, or futuristic glam.',
    rules: [
      'Time limit: 10 to 12 minutes per college crew.',
      'Theme must be articulated clearly before the walk.',
      'Vulgarity or offensive attire is strictly disqualified.',
      'Submit background music cue track by 12:00 PM at AV desk.'
    ],
    judgingCriteria: ['Theme Interpretation & Garment Design (35%)', 'Model Poise, Walk & Synchronization (30%)', 'Music & Lighting Coordination (20%)', 'Originality (15%)'],
    venue: 'Main Indoor Auditorium Ramp',
    dateTime: 'Dec 26, 2026 - 06:30 PM to 08:30 PM',
    prizePool: '₹65,000',
    firstPrize: '₹40,000 + Rolling Trophy',
    secondPrize: '₹18,000 + Runners Trophy',
    thirdPrize: '₹7,000 + Plaque',
    coordinators: [
      { name: 'Prof. P. Sudha', role: 'Faculty Advisor', phone: '+91 98230 45678' },
      { name: 'Simran Walia', role: 'Event Convener', phone: '+91 98711 22334' }
    ],
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    registeredCount: 12,
    featured: true
  },

  // 7. Tekraft Events
  {
    id: 'cul-tekraft',
    title: 'Tekraft: Digital Art & Creative Tech Craft',
    category: 'cultural',
    subCategory: 'tekraft',
    subCategoryLabel: 'Tekraft Events',
    genderCategory: 'open',
    isGroup: false,
    teamSize: 'Solo or Duo (1-2 members)',
    minTeamSize: 1,
    maxTeamSize: 2,
    shortDescription: 'Digital creativity meets tech: 3D modeling, interactive generative art, UI/UX crafts, and poster design.',
    description: 'Tekraft challenges digital artists and creative coders to produce compelling creative artifacts using modern digital tools.',
    rules: [
      'Prompt/theme revealed on spot.',
      'Participants may use laptops and graphic tablets with Figma, Blender, Illustrator, or Procreate.',
      'All assets must be created during the 2.5-hour sprint; stock downloads prohibited.',
      'Export final files in high-resolution PNG/MP4.'
    ],
    judgingCriteria: ['Aesthetic Quality & Visual Hierarchy (35%)', 'Creative Concept (30%)', 'Technical Execution (20%)', 'Tool Proficiency (15%)'],
    venue: 'CSE Digital Computing Center, 3rd Floor',
    dateTime: 'Dec 26, 2026 - 10:30 AM to 01:00 PM',
    prizePool: '₹25,000',
    firstPrize: '₹14,000 + Tech Gadgets & Trophy',
    secondPrize: '₹7,000 + Certificate',
    thirdPrize: '₹4,000 + Certificate',
    coordinators: [
      { name: 'Dr. Ch. Aparna', role: 'Faculty Coordinator', phone: '+91 98499 12345' },
      { name: 'Nikhil Nair', role: 'Design Lead', phone: '+91 99887 76655' }
    ],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    registeredCount: 38,
    featured: false
  },

  // 8. Literary
  {
    id: 'cul-literary',
    title: 'WordSmiths: Debate, Quiz & Poetry Slam',
    category: 'cultural',
    subCategory: 'literary',
    subCategoryLabel: 'Literary',
    genderCategory: 'open',
    isGroup: false,
    teamSize: 'Solo or Duo (1-2 members)',
    minTeamSize: 1,
    maxTeamSize: 2,
    shortDescription: 'Parliamentary debate, festival general quiz, and bilingual slam poetry competition.',
    description: 'Wield the power of words! Debate compelling topics, crack pop-culture and history trivia, or touch hearts with spoken word poetry.',
    rules: [
      'Round 1: Rapid-fire preliminary written quiz / extempore qualifier.',
      'Round 2: Debate finals & 3-minute poetry slam.',
      'Cross-questioning and rebuttal discipline enforced by the moderator.',
      'Plagiarism leads to instant disqualification.'
    ],
    judgingCriteria: ['Articulateness & Diction (30%)', 'Logical Rebuttal & Depth (30%)', 'Factual Accuracy (20%)', 'Stage Charisma (20%)'],
    venue: 'Seminar Hall 1, Central Library Block',
    dateTime: 'Dec 26, 2026 - 09:30 AM to 01:00 PM',
    prizePool: '₹25,000',
    firstPrize: '₹12,000 + Trophy & Books',
    secondPrize: '₹8,000 + Medal',
    thirdPrize: '₹5,000 + Certificate',
    coordinators: [
      { name: 'Dr. K. Swarnalatha', role: 'Faculty Coordinator', phone: '+91 94411 98765' },
      { name: 'Dhruv Khurana', role: 'Literary Secretary', phone: '+91 97123 45670' }
    ],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    registeredCount: 48,
    featured: false
  },

  // --- SPORTS EVENTS (BOYS) - Dec 26, 2026 ---
  // 1. Basketball (Boys)
  {
    id: 'spo-bb-boys',
    title: 'Slam Dunk: Basketball Tournament (Boys)',
    category: 'sports',
    subCategory: 'sports_boys',
    subCategoryLabel: 'Sports - Boys',
    genderCategory: 'boys',
    isGroup: true,
    teamSize: 'Team (5 playing + up to 5 substitutes)',
    minTeamSize: 5,
    maxTeamSize: 10,
    shortDescription: 'Inter-collegiate 5v5 full-court knockout basketball championship on synthetic floodlit courts.',
    description: 'Fast transition offense and lockdown defense! Official FIBA rules apply. Knockout rounds starting 08:30 AM on Dec 26, 2026.',
    rules: [
      'FIBA standard rules of 4 quarters of 8 minutes each (knockout format).',
      'Matching jerseys with visible numbers compulsory.',
      'Standard 24-second shot clock.',
      'Referees decisions are final.'
    ],
    judgingCriteria: ['Knockout Bracket Elimination'],
    venue: 'RVR & JC Floodlit Basketball Arena',
    dateTime: 'Dec 26, 2026 - 08:30 AM to 05:00 PM',
    prizePool: '₹40,000',
    firstPrize: '₹25,000 + Rolling Trophy & Medals',
    secondPrize: '₹15,000 + Runners Trophy & Medals',
    coordinators: [
      { name: 'Dr. P. Gopi Chand', role: 'Physical Director', phone: '+91 98490 87654' },
      { name: 'Vikram Singh', role: 'Basketball Captain', phone: '+91 91234 89012' }
    ],
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    registeredCount: 16,
    featured: true
  },

  // 2. Volleyball (Boys)
  {
    id: 'spo-vb-boys',
    title: 'Spikefest: Volleyball Championship (Boys)',
    category: 'sports',
    subCategory: 'sports_boys',
    subCategoryLabel: 'Sports - Boys',
    genderCategory: 'boys',
    isGroup: true,
    teamSize: 'Team (6 playing + up to 6 substitutes)',
    minTeamSize: 6,
    maxTeamSize: 12,
    shortDescription: 'Inter-collegiate 6v6 volleyball championship played on tournament-grade courts.',
    description: 'Thundering spikes, defensive blocks, and athletic dives. High-octane knockout bracket leading to grand finals.',
    rules: [
      'Best-of-3 sets (25 points each; 3rd deciding set 15 points).',
      'Standard rotational rules and Libero substitutions apply.',
      'College jersey with numbers mandatory.',
      'Any unsporting conduct will result in sanctions.'
    ],
    judgingCriteria: ['FIVB Knockout Scoring'],
    venue: 'Volleyball Courts Complex, Sports Pavilion',
    dateTime: 'Dec 26, 2026 - 08:30 AM to 04:30 PM',
    prizePool: '₹35,000',
    firstPrize: '₹22,000 + Championship Trophy',
    secondPrize: '₹13,000 + Runners Trophy',
    coordinators: [
      { name: 'Sri K. Hari Prasad', role: 'Sports Officer', phone: '+91 94405 67890' },
      { name: 'Kiran Reddy', role: 'Volleyball Captain', phone: '+91 95500 12345' }
    ],
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    registeredCount: 14,
    featured: true
  },

  // 3. Table Tennis (Boys)
  {
    id: 'spo-tt-boys',
    title: 'Smash Point: Table Tennis (Boys)',
    category: 'sports',
    subCategory: 'sports_boys',
    subCategoryLabel: 'Sports - Boys',
    genderCategory: 'boys',
    isGroup: false,
    teamSize: 'Solo (Singles) or Duo (Doubles)',
    minTeamSize: 1,
    maxTeamSize: 2,
    shortDescription: 'Fast-paced spin battles in both Singles and Doubles categories on ITTF approved Stag tables.',
    description: 'Precision spins, ferocious top-spins, and rapid reflexes on competition-grade tables in the Indoor Sports Complex.',
    rules: [
      'ITTF 11-point best-of-5 games format.',
      'Non-marking indoor sports shoes are compulsory.',
      'Standard ITTF approved rubbers only.',
      'Toss determines service and court side.'
    ],
    judgingCriteria: ['ITTF Official Knockout Rules'],
    venue: 'Indoor Sports Complex, 1st Floor TT Arena',
    dateTime: 'Dec 26, 2026 - 09:30 AM to 03:00 PM',
    prizePool: '₹20,000',
    firstPrize: '₹12,000 + Trophy & Racquet',
    secondPrize: '₹8,000 + Medal',
    coordinators: [
      { name: 'Sri B. Sudheer', role: 'Indoor Sports Incharge', phone: '+91 98855 43210' },
      { name: 'Rahul Bose', role: 'TT Club Secretary', phone: '+91 90001 23456' }
    ],
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80',
    registeredCount: 32,
    featured: false
  },

  // --- SPORTS EVENTS (GIRLS) - Dec 26, 2026 ---
  // 1. Throwball (Girls)
  {
    id: 'spo-tb-girls',
    title: 'Strike Wave: Throwball Championship (Girls)',
    category: 'sports',
    subCategory: 'sports_girls',
    subCategoryLabel: 'Sports - Girls',
    genderCategory: 'girls',
    isGroup: true,
    teamSize: 'Team (7 playing + up to 5 substitutes)',
    minTeamSize: 7,
    maxTeamSize: 12,
    shortDescription: 'Thrilling inter-college throwball tournament with lightning fast aerial throws and rapid catches.',
    description: 'Fast catches, cross-court shots, and team coordination on outdoor courts.',
    rules: [
      'Official Throwball Federation of India (TFI) rules apply.',
      'Best of 3 sets of 25 points each (rally score system).',
      'The ball should not touch any part of the body other than palms and fingers.',
      'Two-handed catch and one-handed throw within 3 seconds.'
    ],
    judgingCriteria: ['TFI Tournament Elimination Rules'],
    venue: 'Girls Sports Enclosure - Court 1',
    dateTime: 'Dec 26, 2026 - 09:00 AM to 03:30 PM',
    prizePool: '₹35,000',
    firstPrize: '₹22,000 + Trophy & Medals',
    secondPrize: '₹13,000 + Runners Trophy',
    coordinators: [
      { name: 'Smt. K. Jayalakshmi', role: 'Physical Directress', phone: '+91 94901 12233' },
      { name: 'Divya Nair', role: 'Throwball Captain', phone: '+91 98765 12340' }
    ],
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
    registeredCount: 12,
    featured: true
  },

  // 2. TenniKoit (Girls)
  {
    id: 'spo-tk-girls',
    title: 'Ring Master: TenniKoit Tournament (Girls)',
    category: 'sports',
    subCategory: 'sports_girls',
    subCategoryLabel: 'Sports - Girls',
    genderCategory: 'girls',
    isGroup: false,
    teamSize: 'Solo (Singles) or Duo (Doubles)',
    minTeamSize: 1,
    maxTeamSize: 2,
    shortDescription: 'Agility, precision, and quick reflexes in Singles & Doubles ring tennis championships.',
    description: 'Catch and release the rubber ring across the high net without hesitating. High-intensity matches testing agility and positioning.',
    rules: [
      'Matches played best of 3 sets of 21 points each.',
      'No delay in returning the ring: catch and throw must be one continuous movement.',
      'Ring must travel cleanly above the net without touching the body.',
      'Proper sports attire and rubber sole shoes mandatory.'
    ],
    judgingCriteria: ['TenniKoit Federation Rules'],
    venue: 'Girls Sports Enclosure - Court 2 & 3',
    dateTime: 'Dec 26, 2026 - 09:30 AM to 02:30 PM',
    prizePool: '₹20,000',
    firstPrize: '₹12,000 + Trophy',
    secondPrize: '₹8,000 + Medal',
    coordinators: [
      { name: 'Smt. K. Jayalakshmi', role: 'Physical Directress', phone: '+91 94901 12233' },
      { name: 'Sneha Patil', role: 'TenniKoit Coordinator', phone: '+91 96543 21987' }
    ],
    image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80',
    registeredCount: 24,
    featured: false
  },

  // 3. Table Tennis (Girls)
  {
    id: 'spo-tt-girls',
    title: 'Ace Rally: Table Tennis (Girls)',
    category: 'sports',
    subCategory: 'sports_girls',
    subCategoryLabel: 'Sports - Girls',
    genderCategory: 'girls',
    isGroup: false,
    teamSize: 'Solo (Singles) or Duo (Doubles)',
    minTeamSize: 1,
    maxTeamSize: 2,
    shortDescription: 'Speed, spin, and focus: Table Tennis Singles & Doubles championship for girls.',
    description: 'Compete against the best collegiate paddlers in the region. Full tournament setup with ITTF approved equipment.',
    rules: [
      'ITTF 11-point best-of-5 games format.',
      'Non-marking indoor shoes are strictly required.',
      'Two serves per player alternating until game point.',
      'Certified referees presiding over all matches.'
    ],
    judgingCriteria: ['ITTF Official Knockout Rules'],
    venue: 'Indoor Sports Complex, 1st Floor TT Arena',
    dateTime: 'Dec 26, 2026 - 10:00 AM to 03:00 PM',
    prizePool: '₹20,000',
    firstPrize: '₹12,000 + Trophy',
    secondPrize: '₹8,000 + Medal',
    coordinators: [
      { name: 'Smt. K. Jayalakshmi', role: 'Physical Directress', phone: '+91 94901 12233' },
      { name: 'Priya Sharma', role: 'Girls TT Captain', phone: '+91 94321 09876' }
    ],
    image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=800&q=80',
    registeredCount: 26,
    featured: false
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Buses will be available from CPT and Guntur at 7:00 AM and 9:00 AM',
    content: 'College buses will be available from CPT (Collectorate / Central Point) and Guntur City points sharp at 7:00 AM and 9:00 AM on Dec 26, 2026 to R.V.R. & J.C. College campus. Return buses will be provided after the fest events and pro-show.',
    tag: 'Schedule',
    timestamp: 'Today, 08:00 AM',
    isPinned: true
  },
  {
    id: 'ann-2',
    title: 'One-Day Grand Fest Schedule: Dec 26, 2026',
    content: 'All sports matches, cultural events, and stage competitions will be conducted across simultaneous arenas on Saturday, December 26, 2026. Participants must report at the reception desks by 08:30 AM.',
    tag: 'Schedule',
    timestamp: 'Yesterday, 04:00 PM',
    isPinned: true
  },
  {
    id: 'ann-3',
    title: 'ID Verification & Desk Reporting Guidelines',
    content: 'Internal students of R.V.R. & J.C. must present their College Smart ID Card. External participants must carry their valid College ID Card and Government Photo Proof at Desk A (Central Reception).',
    tag: 'Rules',
    timestamp: 'Dec 24, 2026'
  },
  {
    id: 'ann-4',
    title: 'Grand Pro-Show & DJ Evening at OAT',
    content: 'Grand evening cultural pro-show and musical performance commences at 07:00 PM at Ch. Madhusudhana Rao Open Air Theatre. Return buses to CPT and Guntur will depart after the conclusion of the show.',
    tag: 'Pro-Show',
    timestamp: 'Dec 24, 2026'
  }
];

export const INITIAL_RESULTS: EventResult[] = [
  {
    id: 'res-1',
    eventId: 'cul-fine-arts',
    eventName: 'Fine Arts: Canvas & Expression',
    category: 'Cultural',
    firstPlace: { name: 'Aarav Mehta', college: 'National Institute of Design (NID)' },
    secondPlace: { name: 'Sanjana Roy', college: 'R.V.R. & J.C. College of Engineering' },
    thirdPlace: { name: 'Vikram Joshi', college: 'VR Siddhartha Engineering College, Vijayawada' },
    publishedAt: 'Dec 26, 2026'
  },
  {
    id: 'res-2',
    eventId: 'spo-bb-boys',
    eventName: 'Basketball Tournament (Boys)',
    category: 'Sports',
    firstPlace: { name: 'RVRJC Titans', college: 'R.V.R. & J.C. College of Engineering (Host)', notes: 'Score: 68 - 62 in Finals' },
    secondPlace: { name: 'Thunderbolts', college: 'Loyola College, Vijayawada' },
    thirdPlace: { name: 'Spartans', college: 'Andhra University College of Engineering' },
    publishedAt: 'Dec 26, 2026'
  },
  {
    id: 'res-3',
    eventId: 'cul-battle-of-bands',
    eventName: 'Battle of the Bands: Group Symphony',
    category: 'Cultural',
    firstPlace: { name: 'The Lucid Echoes', college: 'KL University' },
    secondPlace: { name: 'RVR Raga Project', college: 'R.V.R. & J.C. College of Engineering' },
    thirdPlace: { name: 'Crimson Sky', college: 'IIT Tirupati' },
    publishedAt: 'Dec 26, 2026'
  },
  {
    id: 'res-4',
    eventId: 'spo-tb-girls',
    eventName: 'Throwball Championship (Girls)',
    category: 'Sports',
    firstPlace: { name: 'RVRJC Phoenix', college: 'R.V.R. & J.C. College of Engineering (Host)', notes: 'Won 2-1 (25-23, 22-25, 15-11)' },
    secondPlace: { name: 'St. Joseph Hawks', college: 'St. Joseph\'s College, Guntur' },
    thirdPlace: { name: 'Vignan Vipers', college: 'Vignan University, Vadlamudi' },
    publishedAt: 'Dec 26, 2026'
  }
];

export const SPONSORS_LIST = [
  { name: 'RedBull Energy', tier: 'Title Partner', logo: '⚡', category: 'Energy & Beverage' },
  { name: 'Decathlon Sports', tier: 'Official Sports Gear', logo: '🏸', category: 'Sports Equipment' },
  { name: 'Monster Energy', tier: 'Powered By', logo: '🔥', category: 'Beverage Partner' },
  { name: 'Sony Music India', tier: 'Entertainment Partner', logo: '🎵', category: 'Audio & Pro-Shows' },
  { name: 'Radio Mirchi 98.3', tier: 'Official Radio Partner', logo: '📻', category: 'Media Broadcaster' },
  { name: 'State Bank of India', tier: 'Banking Partner', logo: '🏦', category: 'Financial Services' }
];

export const TRANSPORT_DETAILS = {
  announcement: 'Buses will be available from CPT and Guntur at 7:00 AM and 9:00 AM',
  busSummary: 'Buses will be available from CPT and Guntur to R.V.R. & J.C. College of Engineering campus at 7:00 AM and 9:00 AM. Return buses will depart after the event schedule and pro-show.',
  departureTimes: ['07:00 AM', '09:00 AM'],
  returnTimes: ['06:00 PM', '09:00 PM'],
  pickupPoints: [
    {
      location: 'CPT (Collectorate / Central Point, Guntur)',
      morningTimings: '07:00 AM & 09:00 AM',
      description: 'Major transit junction for students traveling from surrounding areas.'
    },
    {
      location: 'Guntur City (Bus Stand / Railway Station Points)',
      morningTimings: '07:00 AM & 09:00 AM',
      description: 'Designated college bus bays across Guntur city route.'
    }
  ],
  transportIncharge: {
    name: 'Mr. Ramanujan / Transport Cell',
    office: 'R.V.R. & J.C. Transport Section',
    phone: '+91 98451 11223'
  }
};
