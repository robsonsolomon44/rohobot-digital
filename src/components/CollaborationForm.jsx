import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Send,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  agencyInfo,
  collaborationServices,
  budgetRanges,
} from '../data/siteData';
import MagneticButton from './ui/MagneticButton';
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  LinkedInIcon,
} from './icons/SocialIcons';

export default function CollaborationForm({ preselectedTopic }) {
  const { cta } = agencyInfo;
  const [selectedServices, setSelectedServices] = useState(['social-media', 'video-content']);
  const [selectedBudget, setSelectedBudget] = useState(budgetRanges[0]);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    goals: preselectedTopic ? `Interested in: ${preselectedTopic}. ` : '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedTopic) {
      setFormData((prev) => {
        if (prev.goals && prev.goals.includes(preselectedTopic)) return prev;
        return {
          ...prev,
          goals: `Interested in: ${preselectedTopic}. ${prev.goals || ''}`,
        };
      });
    }
  }, [preselectedTopic]);

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email.';
    }
    if (!formData.company.trim()) newErrors.company = 'Please share your business or brand name.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  const selectedServiceNames = collaborationServices
    .filter((s) => selectedServices.includes(s.id))
    .map((s) => s.title);

  return (
    <section id="contact" className="py-24 bg-[#05070B] relative border-t border-amber-500/15 overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/10 blur-[60px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-600/10 blur-[60px] md:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Authentic Call to Action from User Brief */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-400 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contact ROHOBOT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
                {cta.headline}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {cta.subheadline}
              </p>
            </div>

            {/* Direct Connect Action Buttons with Original Logos */}
            <div className="space-y-3">
              <MagneticButton
                href={`https://wa.me/${agencyInfo.contact.whatsapp}?text=Hi%20ROHOBOT%20team,%20I'd%20like%20to%20talk%20about%20growing%20my%20business.`}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.2}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-black" />
                <span>Chat Directly on WhatsApp (+251 943 395 205)</span>
              </MagneticButton>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <MagneticButton
                  href="https://www.tiktok.com/@robi.digitalmarketing?_r=1&_t=ZS-9AXsn0n2jbN"
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.15}
                  className="py-2.5 px-3 rounded-xl bg-[#0A0D14] hover:bg-[#161B28] text-amber-300 hover:text-white border border-amber-500/25 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all group"
                >
                  <TikTokIcon className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
                  <span>TikTok</span>
                </MagneticButton>
                <MagneticButton
                  href="https://instagram.com/robihabeshawi_?srtk=YTlxdm5iOWk0dGhv"
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.15}
                  className="py-2.5 px-3 rounded-xl bg-[#0A0D14] hover:bg-[#161B28] text-amber-300 hover:text-white border border-amber-500/25 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all group"
                >
                  <InstagramIcon className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
                  <span>Instagram</span>
                </MagneticButton>
                <MagneticButton
                  href="https://www.linkedin.com/in/robera-solomon-561a43366?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.15}
                  className="py-2.5 px-3 rounded-xl bg-[#0A0D14] hover:bg-[#161B28] text-amber-300 hover:text-white border border-amber-500/25 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all group"
                >
                  <LinkedInIcon className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
                  <span>LinkedIn</span>
                </MagneticButton>
              </div>
            </div>

            {/* Agency Location & Direct Channels */}
            <div className="p-6 rounded-2xl bg-[#0A0D14] border border-amber-500/20 space-y-5 shadow-lg">
              <div className="space-y-2.5 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <a href={`mailto:${agencyInfo.contact.email}`} className="hover:text-amber-300 transition-colors">
                    {agencyInfo.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{agencyInfo.contact.responseTime}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{agencyInfo.contact.location}</span>
                </div>
              </div>

              {/* Official Social Media Channels with Original Brand Icons */}
              <div className="pt-4 border-t border-amber-500/15">
                <div className="text-[11px] font-mono text-amber-400/90 mb-2.5 uppercase tracking-wider">
                  Social Channels
                </div>
                <div className="flex flex-wrap gap-2">
                  {agencyInfo.socials.map((s, idx) => {
                    const getIcon = () => {
                      if (s.name.toLowerCase().includes('tiktok')) return <TikTokIcon className="w-3.5 h-3.5 text-amber-400" />;
                      if (s.name.toLowerCase().includes('instagram')) return <InstagramIcon className="w-3.5 h-3.5 text-amber-400" />;
                      if (s.name.toLowerCase().includes('linkedin')) return <LinkedInIcon className="w-3.5 h-3.5 text-amber-400" />;
                      return <WhatsAppIcon className="w-3.5 h-3.5 text-amber-400" />;
                    };
                    return (
                      <a
                        key={idx}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#05070B] border border-amber-500/20 text-[11px] font-mono text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors flex items-center gap-1.5"
                      >
                        {getIcon()}
                        <span>{s.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 1-Screen Interactive Inquiry Form */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#0A0D14] border border-amber-500/25 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-1">
                      {cta.actionTitle}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tell us about your brand, goals, and the services you're interested in. We reply within 2 working hours.
                    </p>
                  </div>

                  {/* Service Selection Pills */}
                  <div>
                    <label className="block text-xs font-mono text-amber-300/90 mb-2 uppercase tracking-wider">
                      Select Services You Need:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {collaborationServices.map((service) => {
                        const isSelected = selectedServices.includes(service.id);
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => toggleService(service.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                                : 'bg-[#05070B] text-slate-300 border border-amber-500/20 hover:border-amber-500/50'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                            <span>{service.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Scope / Plan Selection */}
                  <div>
                    <label className="block text-xs font-mono text-amber-300/90 mb-2 uppercase tracking-wider">
                      Project Scope / Engagement Level:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetRanges.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBudget(b)}
                          className={`p-2.5 rounded-xl border text-xs font-mono text-center transition-all ${
                            selectedBudget === b
                              ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                              : 'bg-[#05070B] text-slate-400 border-amber-500/20 hover:border-amber-500/40'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inputs: Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Solomon D."
                        className={`w-full bg-[#05070B] border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none ${
                          errors.name ? 'border-rose-500' : 'border-amber-500/20 focus:border-amber-400'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-rose-400 mt-1 block">{errors.name}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Business / Brand Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Acme Café or Health Clinic"
                        className={`w-full bg-[#05070B] border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none ${
                          errors.company ? 'border-rose-500' : 'border-amber-500/20 focus:border-amber-400'
                        }`}
                      />
                      {errors.company && (
                        <span className="text-[11px] text-rose-400 mt-1 block">{errors.company}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="hello@yourbusiness.com"
                        className={`w-full bg-[#05070B] border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none ${
                          errors.email ? 'border-rose-500' : 'border-amber-500/20 focus:border-amber-400'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-400 mt-1 block">{errors.email}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+251 ... or +1 ..."
                        className="w-full bg-[#05070B] border border-amber-500/20 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Goals */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      What are your goals or current challenges?
                    </label>
                    <textarea
                      name="goals"
                      rows={3}
                      value={formData.goals}
                      onChange={handleInputChange}
                      placeholder="Tell us about what you want to achieve (e.g. increase Instagram bookings, professional video shoot, run Meta Ads)..."
                      className="w-full bg-[#05070B] border border-amber-500/20 focus:border-amber-400 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button with Magnetic Physics */}
                  <MagneticButton
                    type="submit"
                    strength={0.25}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-all"
                  >
                    <span>Send Message &amp; Talk Growth</span>
                    <Send className="w-4 h-4 text-black" />
                  </MagneticButton>
                </motion.form>
              ) : (
                /* Success Confirmation */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2">
                      Inquiry Received!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-amber-200">{formData.name}</strong>. The ROHOBOT team is reviewing your details for{' '}
                      <strong className="text-amber-200">{formData.company}</strong>.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#05070B] border border-amber-500/25 text-left text-xs font-mono space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Selected Services:</span>
                      <span className="text-amber-200 text-right max-w-[200px] truncate">
                        {selectedServiceNames.join(', ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Scope:</span>
                      <span className="text-amber-400">{selectedBudget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Next Step:</span>
                      <span className="text-amber-300">We'll contact you within 2 hours</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <MagneticButton
                      href={`https://wa.me/${agencyInfo.contact.whatsapp}?text=Hi%20ROHOBOT,%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(
                        formData.company
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      strength={0.25}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-black" />
                      <span>Ping Us on WhatsApp for Instant Chat</span>
                    </MagneticButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
