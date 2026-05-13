// Contact section — floating label form, social links, success animation
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconSend, IconCheck } from '@tabler/icons-react';
import { SectionHeading } from '@/components/sections/About';
import bioData from '@/data/bio.json';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    if (!data.get('name')) errs.name = 'Name is required';
    const email = data.get('email') as string;
    if (!email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email';
    if (!data.get('message')) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setErrors({});
    setLoading(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-5xl mx-auto">
      <SectionHeading label="Contact" title="Let's build something" />
      <p className="text-slate-400 mt-4 mb-16 text-lg">
        Let&apos;s build something cool together 🚀 — I&apos;m always open to new projects and ideas.
      </p>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessMessage key="success" onReset={() => setSubmitted(false)} />
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FloatingField name="name" label="Your Name" type="text" error={errors.name} />
                <FloatingField name="email" label="Email Address" type="email" error={errors.email} />
                <FloatingField name="subject" label="Subject" type="text" />
                <FloatingField name="message" label="Your Message" type="textarea" error={errors.message} />

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-ripple w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-heading font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-all"
                >
                  {loading ? (
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <IconSend size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social links & info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          <div>
            <h3 className="font-heading text-white font-bold text-lg mb-4">Connect with me</h3>
            <div className="flex flex-col gap-3">
              {bioData.socialLinks.map((link) => (
                <SocialLink key={link.platform} platform={link.platform} url={link.url} />
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <p className="text-slate-400 text-sm leading-relaxed">
              Based in <span className="text-cyan-400">Hungary 🇭🇺</span>. Available for freelance work,
              collaborations, and interesting internship opportunities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Floating label input / textarea ---
function FloatingField({
  name,
  label,
  type,
  error,
}: {
  name: string;
  label: string;
  type: string;
  error?: string;
}) {
  const baseClass =
    'w-full bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-500/60 transition-colors resize-none';
  const borderClass = error ? 'border-red-500/60' : 'border-white/10';

  return (
    <div className="floating-label">
      {type === 'textarea' ? (
        <textarea
          name={name}
          id={name}
          placeholder={label}
          rows={5}
          className={`${baseClass} ${borderClass} pt-6 pb-2 px-4`}
          aria-label={label}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : (
        <input
          name={name}
          id={name}
          type={type}
          placeholder={label}
          className={`${baseClass} ${borderClass} pt-6 pb-2 px-4 h-14`}
          aria-label={label}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      <label htmlFor={name}>{label}</label>
      {error && (
        <p id={`${name}-error`} className="text-red-400 text-xs mt-1 ml-1">
          {error}
        </p>
      )}
    </div>
  );
}

// --- Social link with hover microanimation ---
function SocialLink({ platform, url }: { platform: string; url: string }) {
  const icons: Record<string, React.ElementType> = {
    GitHub: IconBrandGithub,
    LinkedIn: IconBrandLinkedin,
    Email: IconMail,
  };
  const Icon = icons[platform] ?? IconMail;

  return (
    <motion.a
      href={url}
      target={url.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      whileHover={{ x: 8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-4 glass-card px-4 py-3 group"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.4 }}
        className="text-cyan-400"
      >
        <Icon size={20} />
      </motion.div>
      <span className="text-slate-300 group-hover:text-white transition-colors font-heading text-sm">
        {platform}
      </span>
    </motion.a>
  );
}

// --- Success animation ---
function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-6 py-16 text-center"
    >
      {/* Checkmark circle draws itself */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <IconCheck size={36} className="text-white" />
        </motion.div>
      </motion.div>
      <h3 className="font-heading font-bold text-white text-2xl">Message sent!</h3>
      <p className="text-slate-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
      <button
        onClick={onReset}
        className="text-cyan-400 hover:text-cyan-300 text-sm underline"
      >
        Send another message
      </button>
    </motion.div>
  );
}
