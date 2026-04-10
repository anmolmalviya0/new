"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Animated Counter Hook ─────────────────────────── */
function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

/* ─── Intersection Observer Hook ────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Metric Card ────────────────────────────────────── */
function MetricCard({
  target, suffix = "", label, color, delay, started
}: { target: number; suffix?: string; label: string; color: string; delay: number; started: boolean }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);
  const count = useCountUp(target, 1800, active);
  return (
    <div className={`border border-[#1F2937] p-8 text-center group hover:border-[${color}] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] cursor-default`}>
      <div className={`text-5xl font-bold mb-2`} style={{ color }}>
        {count}{suffix}
      </div>
      <p className="text-[#AAAAAA] text-sm uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default function Home() {
  const { ref: metricsRef, inView: metricsInView } = useInView(0.15);
  const { ref: pillarsRef, inView: pillarsInView } = useInView(0.1);
  const { ref: teachRef, inView: teachInView } = useInView(0.1);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="bg-[#0A0E27] text-white min-h-screen flex items-center relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#00D9FF 1px,transparent 1px),linear-gradient(90deg,#00D9FF 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF6B35]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          {/* Badge */}
          <div className="text-center mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 border border-[#FF6B35]/40 text-[#FF6B35] text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-[#FF6B35]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
              AI · Manufacturing · Education
            </span>
          </div>

          {/* Headline */}
          <div className="text-center mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-[#FFFFFF] leading-[1.05] tracking-tight">
              BUILDING THE FUTURE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#0096b3]">
                OF MANUFACTURING
              </span>
            </h1>
            <p className="text-[#AAAAAA] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Accelerating transformation through AI innovation — bridging research, industry & education
            </p>
          </div>

          {/* METRICS GRID */}
          <div ref={metricsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            <MetricCard target={5000} suffix="+" label="Engineers Trained" color="#00D9FF" delay={0} started={metricsInView} />
            <MetricCard target={50} suffix="+" label="Institutions Reached" color="#FF6B35" delay={200} started={metricsInView} />
            <MetricCard target={10} suffix="+" label="Years Experience" color="#00D9FF" delay={400} started={metricsInView} />
            <MetricCard target={3} suffix="" label="Research · Build · Teach" color="#FF6B35" delay={600} started={metricsInView} />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 bg-[#FF6B35] text-white px-8 py-3.5 font-bold uppercase tracking-widest hover:bg-[#FF8A5B] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,53,0.45)]"
            >
              → Invite Srijan
            </a>
            <a
              href="/blog"
              className="group inline-flex items-center gap-2 border border-[#00D9FF] text-[#00D9FF] px-8 py-3.5 font-bold uppercase tracking-widest hover:bg-[#00D9FF] hover:text-[#0A0E27] transition-all duration-200 hover:-translate-y-0.5"
            >
              → Blog & Research
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#444] animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      {/* ── TRUSTED BY ─────────────────────────────────── */}
      <section className="bg-[#121829] py-10 border-t border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#555] uppercase tracking-widest text-center text-xs mb-8 font-semibold">
            Trusted & Deployed Across Leading Organizations
          </p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center">
            {["IIT Madras", "TIQ World", "DGZfP", "Stanford", "NDE India"].map((org) => (
              <span
                key={org}
                className="font-bold text-[#555] uppercase tracking-wider text-sm hover:text-[#00D9FF] transition-colors duration-200 cursor-default"
              >
                {org}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ──────────────────────────────── */}
      <section className="py-24 bg-[#0A0E27]" ref={pillarsRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${pillarsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#FF6B35] text-xs font-bold uppercase tracking-[0.2em] mb-3">Foundation</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Three Pillars of Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚛",
                color: "#00D9FF",
                title: "CORE SCIENCE",
                text: "8+ years of R&D at India's premier research institute (IIT Madras). 200+ peer-reviewed publications advancing AI foundations for real-world manufacturing.",
                delay: 0,
              },
              {
                icon: "🔧",
                color: "#FF6B35",
                title: "PROVEN SYSTEMS",
                text: "Co-founder of TIQ World. Built and deployed AI-powered NDT platform serving 50+ enterprise clients. $200M+ cumulative impact created.",
                delay: 150,
              },
              {
                icon: "📡",
                color: "#00D9FF",
                title: "KNOWLEDGE TRANSFER",
                text: "Technical leadership for 50+ institutions. Speaker at AI Summit India, international conferences. Frameworks adopted across industries.",
                delay: 300,
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className={`p-8 border border-[#1F2937] hover:border-[${pillar.color}] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] ${
                  pillarsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${pillar.delay}ms` }}
              >
                <div className="text-3xl mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-black mb-4" style={{ color: pillar.color }}>
                  {pillar.title}
                </h3>
                <p className="text-[#AAAAAA] font-mono text-sm leading-relaxed">{pillar.text}</p>
                <div className="mt-6 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: pillar.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ────────────────────────────────── */}
      <section className="py-20 bg-[#121829] border-t border-[#1F2937]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#FF6B35">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl font-light text-[#FFFFFF] mb-8 italic leading-relaxed">
            "Srijan doesn't just teach concepts — he creates genuine connections by showing you how it works in the real world. His teaching style brings clarity to complexity."
          </blockquote>
          <div>
            <p className="font-bold text-lg text-[#00D9FF]">Aspiring ML Engineer</p>
            <p className="text-[#555] text-sm uppercase tracking-widest mt-1">Engineering Student · IIT Madras</p>
          </div>
        </div>
      </section>

      {/* ── TEACHING MOMENTS ───────────────────────────── */}
      <section className="py-24 bg-[#0A0E27] border-t border-[#1F2937]" ref={teachRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${teachInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-[#FF6B35] text-xs font-bold uppercase tracking-[0.2em] mb-3">In Action</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Educator at Heart</h2>
            <p className="text-[#AAAAAA] text-lg max-w-2xl mx-auto font-mono">
              Real moments of teaching, mentoring, and knowledge transfer with engineering students and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                src: "/images/teaching/classroom-teaching.jpg",
                alt: "Classroom Teaching",
                accent: "#00D9FF",
                lines: ["→ Classroom Teaching", "Live demonstrations", "Real-time problem solving"],
              },
              {
                src: "/images/speaking/conference-keynote.jpg",
                alt: "Conference Speaking",
                accent: "#FF6B35",
                lines: ["→ Industry Conference", "200+ audience members", "Translational research"],
              },
              {
                src: "/images/mentoring/one-on-one.jpg",
                alt: "1-on-1 Mentoring",
                accent: "#00D9FF",
                lines: ["→ One-on-One Mentoring", "Career guidance", "Research collaboration"],
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`overflow-hidden border border-[#1F2937] group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] ${
                  teachInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 150}ms`, borderRadius: "4px" }}
              >
                <div className="relative aspect-square bg-[#1F2937] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-center p-6"
                    style={{ background: `linear-gradient(to top, ${item.accent}22, ${item.accent}11)`, backdropFilter: "blur(2px)" }}
                  >
                    {item.lines.map((line, j) => (
                      <p key={j} className="font-mono text-white font-bold text-sm" style={{ color: j === 0 ? item.accent : "white" }}>
                        {line}
                      </p>
                    ))}
                  </div>
                  {/* Bottom accent bar */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: item.accent }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/speaking"
              className="inline-flex items-center gap-2 border border-[#00D9FF] text-[#00D9FF] px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#00D9FF] hover:text-[#0A0E27] transition-all duration-200 hover:-translate-y-0.5"
            >
              → See All Speaking Engagements
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ─────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0A0E27] via-[#0D1535] to-[#0A0E27] text-white py-24 text-center border-t border-[#1F2937] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #FF6B35 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <p className="text-[#FF6B35] text-xs font-bold uppercase tracking-[0.2em] mb-4">Let's Work Together</p>
          <h2 className="text-4xl md:text-5xl font-black mb-6">READY TO TRANSFORM?</h2>
          <p className="text-[#AAAAAA] mb-10 text-lg leading-relaxed">
            Deploy cutting-edge AI for manufacturing. Book a technical discussion or explore research frameworks.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-[#FF8A5B] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,107,53,0.5)]"
            >
              → Get Started
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 border border-[#444] text-[#AAAAAA] px-10 py-4 font-bold uppercase tracking-widest hover:border-white hover:text-white transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
