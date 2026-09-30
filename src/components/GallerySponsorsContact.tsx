import React, { useState } from 'react';
import {
  Camera,
  Trophy,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Users,
  ShieldCheck
} from 'lucide-react';
import { SPONSORS_LIST } from '../data/festEvents';

const GALLERY_ITEMS = [
  {
    title: 'Battle of the Bands Grand Finale',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    tags: 'Amphitheatre · Live Symphony'
  },
  {
    title: 'Inter-Collegiate Basketball Final Thriller',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    tags: 'Floodlit Arena · Overtime Win'
  },
  {
    title: 'Vogue Couture Fashion Runway',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    tags: 'Main Stadium · Eco Couture'
  },
  {
    title: 'Championship Volleyball Spike Clash',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    tags: 'Clay Court · 3-Set Thriller'
  },
  {
    title: 'Choreoday Thematic Extravaganza',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    tags: '30-Member Dance Symphony'
  },
  {
    title: 'Girls Throwball Fast-Paced Final',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
    tags: 'Pavilion Court · Trophy Match'
  }
];

export const GallerySponsorsContact: React.FC = () => {
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'cultural' | 'sports'>('all');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Event Query',
    message: ''
  });

  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    if (galleryFilter === 'all') return true;
    return item.category.toLowerCase() === galleryFilter.toLowerCase();
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', subject: 'Event Query', message: '' });
    }, 4000);
  };

  return (
    <div className="space-y-20 py-10">
      
      {/* 1. GALLERY SECTION */}
      <section id="gallery-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-widest mb-1.5">
              <Camera className="w-4 h-4 text-rose-700" />
              <span>COLORIDO Visual Archives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Festival Moments & Arenas
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              Glimpses of raw energy, electric crowds, breathtaking dance formations, and nail-biting sports deciders at R.V.R. & J.C. College campus.
            </p>
          </div>

          <div className="flex p-1 bg-slate-100 border border-slate-200 rounded-xl">
            <button
              onClick={() => setGalleryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                galleryFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (6)
            </button>
            <button
              onClick={() => setGalleryFilter('cultural')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                galleryFilter === 'cultural'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cultural
            </button>
            <button
              onClick={() => setGalleryFilter('sports')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                galleryFilter === 'sports'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sports
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 h-72 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-xs">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-200 mt-0.5">
                  {item.tags}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. SPONSORS SECTION */}
      <section id="sponsors-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-9">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-700 block mb-1">
            Partners & Benefactors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Proudly Sponsored By
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Backed by national industry partners, lifestyle brands, and premier federations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPONSORS_LIST.map((sponsor, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200 text-center flex flex-col items-center justify-center hover:border-slate-300 hover:shadow-xs transition-all group"
            >
              <span className="text-3xl mb-2 group-hover:scale-105 transition-transform">
                {sponsor.logo}
              </span>
              <span className="text-sm font-bold text-slate-900 block">
                {sponsor.name}
              </span>
              <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider block mt-1">
                {sponsor.tier}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {sponsor.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CONTACT & HELPDESK DIRECTORY */}
      <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left info column */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-widest mb-1.5">
              <Phone className="w-4 h-4 text-rose-700" />
              <span>Central Organizing Committee</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Get in Touch with COLORIDO
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Have questions regarding team registrations, event rules, or bus arrangements from CPT and Guntur? Our organizing desk is active to assist you.
            </p>

            {/* Contacts cards */}
            <div className="mt-7 space-y-3.5">
              
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                    Chief Cultural Convener
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Prof. K. Venkateswarlu</h4>
                  <p className="text-xs text-slate-500">R.V.R. & J.C. College of Engineering, Guntur</p>
                </div>
                <a
                  href="tel:+919848099887"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 text-xs font-bold text-slate-900 hover:bg-slate-100 font-mono border border-slate-200"
                >
                  +91 98480 99887
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                    Physical Director & Sports In-Charge
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Dr. P. Gopi Chand</h4>
                  <p className="text-xs text-slate-500">Sports & Stadium Complex, RVRJCE</p>
                </div>
                <a
                  href="tel:+919849087654"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 text-xs font-bold text-slate-900 hover:bg-slate-100 font-mono border border-slate-200"
                >
                  +91 98490 87654
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    College Bus Desk (CPT & Guntur)
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">Mr. Ramanujan / Transport Cell</h4>
                  <p className="text-xs text-slate-500">Buses from CPT & Guntur at 7:00 AM & 9:00 AM</p>
                </div>
                <a
                  href="tel:+919845111223"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 text-xs font-bold text-slate-900 hover:bg-slate-100 font-mono border border-slate-200"
                >
                  +91 98451 11223
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                    Official Fest Helpdesk Email
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">colorido2k26@rvrjcce.ac.in</h4>
                  <p className="text-xs text-slate-500">R.V.R. & J.C. College, Chowdavaram, Guntur - 522019</p>
                </div>
                <a
                  href="mailto:colorido2k26@rvrjcce.ac.in"
                  className="px-3 py-1.5 rounded-lg bg-slate-50 text-xs font-bold text-slate-900 hover:bg-slate-100 border border-slate-200"
                >
                  Email Us
                </a>
              </div>

            </div>
          </div>

          {/* Right inquiry form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Send Query to Fest Desk
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                Submit questions regarding event rules, teams, or bus arrivals.
              </p>

              {contactSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold text-slate-900">Query Dispatched Successfully!</p>
                  <p className="text-xs text-slate-600">
                    Our student coordinator will respond to your email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Ananya Sen"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Email ID
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. ananya@college.edu"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Query Subject
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-rose-600"
                    >
                      <option value="Event Query">Event Rules & Schedule Query</option>
                      <option value="Bus Transport Query">Bus Facility (CPT & Guntur) Query</option>
                      <option value="External College Teams">External College Teams Registration</option>
                      <option value="Pro-Show Tickets">Celebrity Pro-Show Tickets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message / Question Details
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="How can we assist your contingent?"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-rose-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Query</span>
                  </button>
                </form>
              )}
            </div>

            {/* Campus directions reminder */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Campus Reception Desk · Chowdavaram, Guntur</span>
              <span className="text-rose-700 font-semibold">COLORIDO 2K26 Secretariat</span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
