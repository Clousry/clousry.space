"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Mail } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";
import type { SiteCopy } from "@/lib/site-copy";

const easeCurve = [0.22, 1, 0.36, 1] as const;

const socialChannels = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/candogru/",
    lightIconSrc: "/social/linkedin-light.svg",
    darkIconSrc: "/social/linkedin-dark.svg",
  },
  {
    id: "behance",
    href: "https://www.behance.net/clousry",
    lightIconSrc: "/social/behance-light.svg",
    darkIconSrc: "/social/behance-dark.svg",
  },
] as const;

type FooterCtaProps = {
  content: SiteCopy["footer"];
  theme: "light" | "dark";
};

export function FooterCta({ content, theme }: FooterCtaProps) {
  const quickInfo = content.highlights.slice(0, 2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setSubmitState("idle");

    try {
      const response = await fetch("https://formspree.io/f/xdayneoq", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easeCurve }}
      className="px-4 pb-28 pt-16 sm:px-6 sm:pb-10 sm:pt-24 lg:px-8"
    >
      <div className="glass-panel liquid-panel relative mx-auto max-w-7xl overflow-hidden rounded-[32px] shadow-[var(--shadow-soft)]">
        <div className="soft-spotlight pointer-events-none absolute inset-0" />

        <div className="relative grid gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.88fr)] lg:gap-10 lg:px-12 lg:py-12">
          <div className="flex flex-col">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
              {content.eyebrow}
            </p>

            <h2 className="balanced-text mt-5 max-w-[11ch] text-[2.9rem] font-semibold leading-[0.94] tracking-[-0.07em] text-[var(--text-primary)] sm:text-[4.2rem]">
              {content.title}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
              {content.description}
            </p>

            <div className="mt-8 grid gap-4 sm:max-w-2xl sm:grid-cols-2">
              <motion.a
                href="mailto:ccansv4@gmail.com"
                whileHover={{ y: -4, boxShadow: "var(--shadow-hover)" }}
                transition={{ duration: 0.3, ease: easeCurve }}
                className="group soft-card flex items-center justify-between gap-4 rounded-[28px] p-5 sm:col-span-2"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[var(--surface-softer)] text-[var(--text-primary)] transition-transform duration-300 group-hover:scale-[1.05] group-hover:-rotate-3">
                    <Mail className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      {content.form.emailLabel}
                    </p>
                    <p className="mt-1 truncate text-base font-medium tracking-[-0.03em] text-[var(--text-primary)]">
                      ccansv4@gmail.com
                    </p>
                  </div>
                </div>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>

              {quickInfo.map(({ detail, title, value }) => (
                <BentoCard key={title} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[var(--surface-softer)] text-[var(--text-primary)]">
                      <Clock3 className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        {title}
                      </p>
                      <p className="mt-1 text-base font-medium tracking-[-0.03em] text-[var(--text-primary)]">
                        {value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {detail}
                      </p>
                    </div>
                  </div>
                </BentoCard>
              ))}
            </div>
          </div>

          <div className="relative">
            <BentoCard className="p-5 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
                {content.form.eyebrow}
              </p>
              <p className="mt-4 text-2xl font-medium tracking-[-0.05em] text-[var(--text-primary)]">
                {content.form.title}
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-6 grid gap-5"
              >
                <input type="hidden" name="_subject" value="New portfolio inquiry" />

                <label className="grid gap-2.5">
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    {content.form.nameLabel}
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={content.form.namePlaceholder}
                    className="min-h-14 w-full rounded-[18px] border border-[color:var(--line-soft)] bg-[var(--surface-soft)] px-5 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[color:var(--focus-ring)]"
                  />
                </label>

                <label className="grid gap-2.5">
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    {content.form.emailLabel}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={content.form.emailPlaceholder}
                    className="min-h-14 w-full rounded-[18px] border border-[color:var(--line-soft)] bg-[var(--surface-soft)] px-5 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[color:var(--focus-ring)]"
                  />
                </label>

                <label className="grid gap-2.5">
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    {content.form.messageLabel}
                  </span>
                  <textarea
                    name="message"
                    required
                    placeholder={content.form.messagePlaceholder}
                    rows={5}
                    className="min-h-40 w-full resize-none rounded-[18px] border border-[color:var(--line-soft)] bg-[var(--surface-soft)] px-5 py-4 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[color:var(--focus-ring)]"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="primary-button mt-1 inline-flex min-h-14 items-center justify-center rounded-full px-5 text-sm font-medium tracking-[0.02em] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {isSubmitting ? content.form.sendingLabel : content.form.submitLabel}
                </button>

                {submitState === "success" ? (
                  <p className="text-sm leading-6 text-emerald-500">
                    {content.form.successMessage}
                  </p>
                ) : null}

                {submitState === "error" ? (
                  <p className="text-sm leading-6 text-rose-500">
                    {content.form.errorMessage}
                  </p>
                ) : null}
              </form>
            </BentoCard>
          </div>
        </div>

        <div className="relative border-t border-[color:var(--line-soft)] px-6 py-5 sm:px-10 lg:px-12">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              {socialChannels.map(({ darkIconSrc, href, id, lightIconSrc }) => {
                const name = content.social.channels[id].name;
                const iconSrc = theme === "dark" ? darkIconSrc : lightIconSrc;

                return (
                  <motion.a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ duration: 0.24, ease: easeCurve }}
                    className="group inline-flex items-center justify-center rounded-[18px] transition-transform duration-300"
                  >
                    <div className="transition-transform duration-300 group-hover:scale-[1.06]">
                      <Image
                        src={iconSrc}
                        alt=""
                        aria-hidden
                        unoptimized
                        width={38}
                        height={38}
                        className="h-9.5 w-9.5 object-contain"
                      />
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <p className="text-center text-xs uppercase tracking-[0.16em] text-[var(--text-muted)] sm:text-right">
              &copy; 2024 CLOUSRY. {content.rightsReserved}
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
