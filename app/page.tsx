"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Custom cursor ─────────────────────────────────── */
function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);

    const links = () => document.querySelectorAll('a,button,[data-magnetic]');

    const enterLink = () => { ringRef.current?.classList.add('cursor-hover'); };
    const leaveLink = () => { ringRef.current?.classList.remove('cursor-hover'); };

    const attach = () => {
      links().forEach(el => {
        el.addEventListener('mouseenter', enterLink);
        el.addEventListener('mouseleave', leaveLink);
      });
    };
    attach();

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ── Animated counter ──────────────────────────────── */
function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const step = Math.ceil(target / (duration / 16));
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setCount(cur);
      if (cur >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [target, duration, started]);
  return count;
}

/* ── Intersection observer ─────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── 3D Tilt ───────────────────────────────────────── */
function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(10px)`;
  }, [intensity]);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
  }, []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.addEventListener('mousemove', handleMove as EventListener);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove as EventListener);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleLeave]);
  return ref;
}

/* ── Magnetic button ───────────────────────────────── */
function MagneticButton({ href, className, children, style }: {
  href: string; className?: string; children: React.ReactNode; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.35;
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0,0) scale(1)';
  }, []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.addEventListener('mousemove', handleMove as EventListener);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove as EventListener);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleLeave]);
  return (
    <a ref={ref} href={href} className={className} style={{ ...style, transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease' }}>
      {children}
    </a>
  );
}

/* ── Typewriter ────────────────────────────────────── */
function Typewriter({ words }: { words: string[] }) {
  const [wi, setWi]     = useState(0);
  const [text, setText] = useState('');
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const word = words[wi];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        if (text.length < word.length) {
          setText(word.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDel(true), 1600);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setDel(false);
          setWi((wi + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, wi, words]);

  return (
    <span style={{ color: 'var(--cyan)', borderRight: '2px solid var(--cyan)', paddingRight: '2px', animation: 'blink 0.8s step-end infinite' }}>
      {text}
    </span>
  );
}

/* ── Metric card ───────────────────────────────────── */
function MetricCard({ target, suffix = "", label, accent, delay, started, icon }: {
  target: number; suffix?: string; label: string; accent: string; delay: number; started: boolean; icon: string;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);
  const count = useCountUp(target, 2000, go);
  const tiltRef = useTilt(6);
  return (
    <div ref={tiltRef} className="metric-card" style={{
      background: 'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.015) 100%)',
      border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
      padding: 'clamp(1.5rem,3vw,2.25rem)', textAlign: 'center',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      transition: 'transform 0.15s ease,box-shadow 0.3s ease', cursor: 'default',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.06)',
      transformStyle: 'preserve-3d', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)' }} />
      <div style={{ position:'absolute',bottom:0,left:'20%',right:'20%',height:'40px',background:accent.includes('cyan')?'rgba(0,217,255,0.08)':'rgba(255,94,26,0.08)',filter:'blur(12px)',borderRadius:'50%' }} />
      <div style={{ fontSize:'1.5rem',marginBottom:'0.5rem',filter:'drop-shadow(0 0 8px currentColor)' }}>{icon}</div>
      <div style={{ fontSize:'clamp(2.2rem,5vw,3.2rem)',fontWeight:900,color:accent,lineHeight:1,marginBottom:'0.5rem',fontFamily:'var(--font-display)',
        textShadow: accent.includes('cyan') ? '0 0 30px rgba(0,217,255,0.5)' : '0 0 30px rgba(255,94,26,0.5)',
      }}>{count}{suffix}</div>
      <p style={{ fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--fg-muted)',margin:0 }}>{label}</p>
    </div>
  );
}

/* ── Pillar card ───────────────────────────────────── */
function PillarCard({ pillar, inView, delay }: {
  pillar: { icon:string;gradient:string;borderColor:string;accent:string;glowColor:string;title:string;text:string };
  inView: boolean; delay: number;
}) {
  const tiltRef = useTilt(8);
  return (
    <div ref={tiltRef} className="pillar-card" style={{
      padding: 'clamp(1.75rem,3vw,2.25rem)',
      transition: `all 0.6s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms, transform 0.15s ease`,
      opacity: inView ? 1 : 0, transform: inView ? 'perspective(800px) rotateX(0) rotateY(0)' : 'translateY(40px) scale(0.96)',
      background: pillar.gradient, border: `1px solid ${pillar.borderColor}`, borderRadius: '20px',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.07)',
      transformStyle: 'preserve-3d', position: 'relative', overflow: 'hidden', cursor: 'default',
    }}>
      <div style={{ position:'absolute',bottom:'-20px',left:'20%',right:'20%',height:'60px',background:pillar.glowColor,filter:'blur(20px)',borderRadius:'50%' }} />
      <div style={{ fontSize:'2.5rem',marginBottom:'1.25rem',display:'inline-flex',alignItems:'center',justifyContent:'center',
        width:'56px',height:'56px',background:pillar.glowColor,border:`1px solid ${pillar.borderColor}`,borderRadius:'14px',
        boxShadow:`0 4px 16px ${pillar.glowColor},inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}>{pillar.icon}</div>
      <h3 style={{ color:pillar.accent,fontSize:'1rem',fontWeight:800,letterSpacing:'0.06em',textTransform:'uppercase',marginBottom:'0.85rem',textShadow:`0 0 20px ${pillar.accent}60` }}>
        {pillar.title}
      </h3>
      <p style={{ fontSize:'0.9rem',color:'var(--fg-2)',lineHeight:1.75,margin:0 }}>{pillar.text}</p>
      <div className="pillar-line" style={{ marginTop:'1.75rem',height:'2px',width:'0',background:`linear-gradient(90deg,${pillar.accent},transparent)`,borderRadius:'999px',transition:'width 0.5s ease',boxShadow:`0 0 8px ${pillar.accent}80` }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════ */
export default function Home() {
  const { ref: metricsRef, inView: metricsInView } = useInView(0.1);
  const { ref: pillarsRef, inView: pillarsInView } = useInView(0.08);
  const { ref: timelineRef, inView: timelineInView } = useInView(0.08);
  const { ref: teachRef,   inView: teachInView   } = useInView(0.08);
  const heroBrandRef = useTilt(4);

  const pillars = [
    { icon:"⚛", gradient:"linear-gradient(135deg,rgba(0,217,255,0.08) 0%,rgba(0,217,255,0.02) 100%)", borderColor:"rgba(0,217,255,0.15)", accent:"var(--cyan)", glowColor:"rgba(0,217,255,0.12)", title:"Core Science", text:"8+ years of R&D at IIT Madras CNDE. 200+ peer-reviewed publications advancing AI for real-world manufacturing & NDE." },
    { icon:"🔧", gradient:"linear-gradient(135deg,rgba(255,94,26,0.08) 0%,rgba(255,94,26,0.02) 100%)", borderColor:"rgba(255,94,26,0.15)", accent:"var(--accent)", glowColor:"rgba(255,94,26,0.12)", title:"Proven Systems", text:"Co-founder of TIQ World. Built AI-powered NDT platforms serving 50+ enterprise clients. $200M+ cumulative business impact." },
    { icon:"📡", gradient:"linear-gradient(135deg,rgba(139,92,246,0.08) 0%,rgba(139,92,246,0.02) 100%)", borderColor:"rgba(139,92,246,0.15)", accent:"var(--purple)", glowColor:"rgba(139,92,246,0.12)", title:"Knowledge Transfer", text:"Technical leadership for 50+ institutions. Speaker at AI Summit India, international conferences. Frameworks adopted globally." },
  ];

  const timeline = [
    { year:"2012", label:"IIT Madras", detail:"Joined Centre for NDE as researcher. First contact with AI-driven defect detection.", icon:"🎓", accent:"var(--cyan)" },
    { year:"2016", label:"First Keynote", detail:"Delivered first international talk at DGZfP Conference, Germany. 400+ attendees.", icon:"🎤", accent:"var(--accent)" },
    { year:"2019", label:"Co-founded TIQ World", detail:"Built AI-NDT SaaS platform from scratch. Scaled to 50+ enterprise clients.", icon:"🚀", accent:"var(--purple)" },
    { year:"2022", label:"5,000 Engineers", detail:"Hit milestone: trained over 5,000 engineers across 50+ institutions worldwide.", icon:"🌍", accent:"var(--cyan)" },
    { year:"2024", label:"AI Summit India", detail:"Keynote speaker. $200M+ cumulative business impact documented across deployments.", icon:"⚡", accent:"var(--accent)" },
  ];

  const events = [
    { name:"DGZfP Conference", city:"Berlin, Germany",      year:"2016", audience:"400+",  type:"International" },
    { name:"AI Summit India",  city:"Bengaluru, India",      year:"2024", audience:"1200+", type:"Keynote" },
    { name:"NDE India",        city:"Mumbai, India",         year:"2023", audience:"800+",  type:"Workshop" },
    { name:"IIT Madras",       city:"Chennai, India",        year:"2022", audience:"500+",  type:"Masterclass" },
    { name:"TIQ World Summit", city:"Hybrid",                year:"2023", audience:"2000+", type:"Summit" },
    { name:"Stanford AI Lab",  city:"Palo Alto, USA",        year:"2024", audience:"300+",  type:"Seminar" },
  ];

  const moments = [
    { src:"/images/teaching/classroom-teaching.jpg",  accent:"var(--cyan)",   label:"Classroom Teaching",   sub:"Live ML demos · real-time problem solving" },
    { src:"/images/speaking/conference-keynote.jpg",  accent:"var(--accent)", label:"Industry Conference",   sub:"200+ audience · translational research" },
    { src:"/images/mentoring/one-on-one.jpg",         accent:"var(--cyan)",   label:"1-on-1 Mentoring",      sub:"Career guidance · research collaboration" },
  ];

  return (
    <>
      <CustomCursor />

      {/* ═══ HERO ════════════════════════════════════ */}
      <section style={{
        background:'radial-gradient(ellipse 120% 80% at 50% -10%,#0d1d45 0%,#050a18 60%)',
        minHeight:'100svh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', width:'100%',
      }}>
        {/* Perspective grid */}
        <div style={{ position:'absolute',bottom:0,left:0,right:0,height:'50%',
          backgroundImage:'linear-gradient(rgba(0,217,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,217,255,0.04) 1px,transparent 1px)',
          backgroundSize:'60px 60px', transform:'perspective(400px) rotateX(60deg)', transformOrigin:'bottom center',
          maskImage:'linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)',
          WebkitMaskImage:'linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)', pointerEvents:'none',
        }} />
        <div className="hero-grid" style={{ position:'absolute',inset:0,pointerEvents:'none' }} />

        {/* Aurora blobs */}
        {[
          { top:'5%', left:'-5%', size:'clamp(300px,45vw,600px)', color:'rgba(0,217,255,0.18),rgba(0,100,255,0.08)', dur:'12s', dir:'normal' },
          { top:'auto', left:'auto', size:'clamp(250px,40vw,500px)', color:'rgba(255,94,26,0.22),rgba(255,50,0,0.08)', dur:'15s', dir:'reverse', bottom:'10%', right:'-5%' },
          { top:'30%', left:'35%', size:'clamp(200px,30vw,400px)', color:'rgba(139,92,246,0.12),transparent', dur:'18s', dir:'normal' },
        ].map((b, i) => (
          <div key={i} style={{
            position:'absolute', top:b.top, left:b.left, bottom:(b as {bottom?:string}).bottom, right:(b as {right?:string}).right,
            width:b.size, height:b.size,
            background:`radial-gradient(circle,${b.color} 0%,transparent 70%)`,
            borderRadius:'50%', filter:'blur(60px)', pointerEvents:'none',
            animation:`aurora ${b.dur} ease-in-out infinite ${b.dir}`,
          }} />
        ))}

        {/* Floating orbs */}
        {[
          { top:'20%',right:'8%',size:'clamp(60px,8vw,100px)',bg:'radial-gradient(circle at 35% 35%,rgba(0,217,255,0.7) 0%,rgba(0,100,200,0.4) 40%,rgba(0,50,100,0.1) 100%)',shadow:'0 0 30px rgba(0,217,255,0.4),0 0 60px rgba(0,217,255,0.2),inset -10px -10px 20px rgba(0,0,0,0.3)',dur:'8s',delay:'0s' },
          { bottom:'25%',left:'6%',size:'clamp(40px,5vw,70px)',bg:'radial-gradient(circle at 35% 35%,rgba(255,94,26,0.8) 0%,rgba(200,50,0,0.4) 40%,rgba(100,20,0,0.1) 100%)',shadow:'0 0 25px rgba(255,94,26,0.5),inset -8px -8px 16px rgba(0,0,0,0.3)',dur:'10s',delay:'2s' },
          { top:'60%',right:'15%',size:'clamp(25px,3vw,45px)',bg:'radial-gradient(circle at 35% 35%,rgba(139,92,246,0.9) 0%,rgba(100,50,200,0.4) 40%,transparent 100%)',shadow:'0 0 20px rgba(139,92,246,0.5),inset -5px -5px 10px rgba(0,0,0,0.3)',dur:'7s',delay:'1s' },
        ].map((o, i) => (
          <div key={i} style={{
            position:'absolute', top:(o as {top?:string}).top, right:(o as {right?:string}).right,
            bottom:(o as {bottom?:string}).bottom, left:(o as {left?:string}).left,
            width:o.size, height:o.size, background:o.bg, borderRadius:'50%',
            boxShadow:o.shadow, animation:`float ${o.dur} ease-in-out infinite ${o.delay}`, pointerEvents:'none',
          }} />
        ))}

        <div className="container" style={{ position:'relative',zIndex:1,paddingTop:'6rem',paddingBottom:'7rem' }}>

          {/* Badge */}
          <div className="animate-fade-up" style={{ display:'flex',justifyContent:'center',marginBottom:'2rem' }}>
            <span style={{ display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'0.35rem 1rem',borderRadius:'9999px',background:'rgba(0,217,255,0.06)',border:'1px solid rgba(0,217,255,0.2)',fontSize:'0.68rem',fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--cyan)',boxShadow:'0 0 20px rgba(0,217,255,0.1)',backdropFilter:'blur(12px)' }}>
              <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--cyan)',animation:'pulse-dot 2s ease-in-out infinite',display:'inline-block',boxShadow:'0 0 8px var(--cyan)' }} />
              AI · Speaker · Educator · Builder
            </span>
          </div>

          {/* Hero headline */}
          <div ref={heroBrandRef} className="animate-fade-up delay-100" style={{ textAlign:'center',marginBottom:'3rem',transformStyle:'preserve-3d',transition:'transform 0.15s ease' }}>
            <h1 className="text-shimmer" style={{
              fontFamily:'var(--font-display,Syne)',fontWeight:900,marginBottom:'0.75rem',
              letterSpacing:'-0.04em',lineHeight:1,
              background:'linear-gradient(105deg,#e8f0ff 0%,#e8f0ff 35%,#00d9ff 50%,#e8f0ff 65%,#e8f0ff 100%)',
              backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
              animation:'shimmer 5s linear infinite',filter:'drop-shadow(0 0 40px rgba(0,217,255,0.25))',
            }}>
              SRIJAN TIWARI
            </h1>

            {/* Typewriter rotating subtitle */}
            <p style={{ fontSize:'clamp(1.2rem,3vw,1.7rem)',fontFamily:'var(--font-display,Syne)',fontWeight:700,letterSpacing:'-0.01em',marginBottom:'2rem',height:'2.2rem' }}>
              <Typewriter words={["AI Keynote Speaker", "Educator & Mentor", "Tech Entrepreneur", "Research Scientist", "Innovation Catalyst"]} />
            </p>

            {/* Description glass card */}
            <div style={{ display:'inline-block',maxWidth:'680px',padding:'clamp(1.25rem,3vw,1.75rem) clamp(1.5rem,4vw,2.5rem)',background:'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.015) 100%)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'20px',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',boxShadow:'0 20px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06)',position:'relative',overflow:'hidden' }}>
              <div style={{ position:'absolute',top:0,left:'10%',right:'10%',height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }} />
              <p style={{ fontSize:'clamp(1.05rem,2vw,1.2rem)',color:'var(--fg-2)',lineHeight:1.85,fontWeight:400,margin:0 }}>
                I help <strong style={{ color:'var(--fg)',fontWeight:600 }}>engineers, organizations, and innovators</strong> understand, build, and deploy AI at scale — through keynotes, educational programs, and technical consulting.
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div ref={metricsRef} style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'clamp(0.75rem,2vw,1.25rem)',margin:'3rem 0' }}>
            <MetricCard target={5000} suffix="+" label="Engineers Trained"    accent="var(--cyan)"   delay={0}   started={metricsInView} icon="🎓" />
            <MetricCard target={50}   suffix="+" label="Institutions Reached" accent="var(--accent)" delay={200} started={metricsInView} icon="🏛" />
            <MetricCard target={10}   suffix="+" label="Years Experience"     accent="var(--cyan)"   delay={400} started={metricsInView} icon="⏱" />
            <MetricCard target={200}  suffix="+" label="Publications & Talks" accent="var(--accent)" delay={600} started={metricsInView} icon="📚" />
          </div>

          {/* CTAs — magnetic */}
          <div className="animate-fade-up delay-400" style={{ display:'flex',flexWrap:'wrap',gap:'1rem',justifyContent:'center' }}>
            <MagneticButton href="/contact" className="btn btn-primary" style={{ fontSize:'0.9rem',padding:'1rem 2.25rem' }}>
              ✦ Invite Srijan
            </MagneticButton>
            <MagneticButton href="/speaking" className="btn btn-outline" style={{ fontSize:'0.9rem',padding:'1rem 2.25rem' }}>
              See Speaking Engagements →
            </MagneticButton>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:'absolute',bottom:'2rem',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.4rem',color:'var(--fg-muted)',animation:'bounce 2s ease-in-out infinite' }}>
          <span style={{ fontSize:'0.6rem',letterSpacing:'0.2em',textTransform:'uppercase' }}>Scroll</span>
          <div style={{ width:'24px',height:'38px',border:'1.5px solid rgba(255,255,255,0.12)',borderRadius:'12px',display:'flex',justifyContent:'center',paddingTop:'6px' }}>
            <div style={{ width:'4px',height:'8px',borderRadius:'2px',background:'var(--cyan)',boxShadow:'0 0 8px var(--cyan)',animation:'scroll-dot 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE TRUST BAR ══════════════════════ */}
      <section style={{ background:'linear-gradient(180deg,var(--bg) 0%,var(--bg-2) 100%)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'1.75rem 0',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:0,left:0,right:0,bottom:0,backgroundImage:'linear-gradient(90deg,var(--bg) 0%,transparent 8%,transparent 92%,var(--bg) 100%)',zIndex:2,pointerEvents:'none' }} />
        <p style={{ textAlign:'center',fontSize:'0.66rem',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--fg-muted)',marginBottom:'1.25rem' }}>
          Trusted Across Leading Organisations
        </p>
        <div style={{ overflow:'hidden', position:'relative' }}>
          <div className="marquee-track">
            {[...["IIT Madras","TIQ World","DGZfP","Stanford","NDE India","AI Summit India","IIT Bombay","DRDO","Boeing","Tata Steel"],...["IIT Madras","TIQ World","DGZfP","Stanford","NDE India","AI Summit India","IIT Bombay","DRDO","Boeing","Tata Steel"]].map((org, i) => (
              <span key={i} className="org-badge" style={{ display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'0.4rem 1.25rem',flexShrink:0,fontSize:'0.78rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--fg-muted)',border:'1px solid transparent',borderRadius:'8px',transition:'all 0.25s ease',cursor:'default',whiteSpace:'nowrap' }}>
                <span style={{ width:5,height:5,borderRadius:'50%',background:'var(--border-strong)',display:'inline-block' }} />
                {org}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THREE PILLARS ══════════════════════════ */}
      <section className="section" ref={pillarsRef} style={{ background:'var(--bg)',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:'60%',height:'300px',background:'radial-gradient(ellipse,rgba(0,217,255,0.04) 0%,transparent 70%)',filter:'blur(40px)',pointerEvents:'none' }} />
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:'4rem',transition:'all 0.8s cubic-bezier(0.34,1.2,0.64,1)',opacity:pillarsInView?1:0,transform:pillarsInView?'none':'translateY(30px)' }}>
            <span className="section-label" style={{ marginBottom:'1rem',display:'inline-flex' }}>Foundation</span>
            <h2 style={{ color:'var(--fg)' }}>Three Pillars of Impact</h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem' }}>
            {pillars.map((p, i) => <PillarCard key={i} pillar={p} inView={pillarsInView} delay={i*150} />)}
          </div>
        </div>
      </section>

      {/* ═══ STORY TIMELINE ═════════════════════════ */}
      <section className="section" ref={timelineRef} style={{ background:'linear-gradient(180deg,var(--bg) 0%,var(--bg-2) 100%)',borderTop:'1px solid var(--border)',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',left:'50%',top:0,bottom:0,width:'1px',background:'linear-gradient(180deg,transparent 0%,var(--border-strong) 20%,var(--border-strong) 80%,transparent 100%)',transform:'translateX(-50%)',pointerEvents:'none' }} />
        <div className="container" style={{ maxWidth:'900px' }}>
          <div style={{ textAlign:'center',marginBottom:'4rem',transition:'all 0.8s cubic-bezier(0.34,1.2,0.64,1)',opacity:timelineInView?1:0,transform:timelineInView?'none':'translateY(30px)' }}>
            <span className="section-label" style={{ marginBottom:'1rem',display:'inline-flex' }}>The Journey</span>
            <h2 style={{ color:'var(--fg)' }}>Built Over a Decade</h2>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:'0' }}>
            {timeline.map((t, i) => (
              <div key={i} style={{
                display:'grid', gridTemplateColumns:'1fr 60px 1fr',
                alignItems:'center', gap:'0',
                transition:`all 0.7s cubic-bezier(0.34,1.2,0.64,1) ${i*120}ms`,
                opacity: timelineInView ? 1 : 0,
                transform: timelineInView ? 'none' : `translateY(30px)`,
              }}>
                {/* Left side */}
                <div style={{ textAlign:'right', paddingRight:'2rem', paddingBottom:'2.5rem', ...(i % 2 === 0 ? {} : { opacity:0, pointerEvents:'none' }) }}>
                  {i % 2 === 0 && (
                    <div style={{ display:'inline-block',background:'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))',border:`1px solid ${t.accent}30`,borderRadius:'14px',padding:'1rem 1.25rem',backdropFilter:'blur(16px)',maxWidth:'260px' }}>
                      <p style={{ color:t.accent,fontWeight:800,fontSize:'0.7rem',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.35rem' }}>{t.year}</p>
                      <p style={{ color:'var(--fg)',fontWeight:700,fontSize:'1rem',marginBottom:'0.35rem' }}>{t.label}</p>
                      <p style={{ color:'var(--fg-2)',fontSize:'0.82rem',lineHeight:1.6,margin:0 }}>{t.detail}</p>
                    </div>
                  )}
                </div>
                {/* Center dot */}
                <div style={{ display:'flex',justifyContent:'center',alignItems:'flex-start',paddingTop:'1.25rem',paddingBottom:'2.5rem' }}>
                  <div style={{ width:'40px',height:'40px',borderRadius:'50%',background:`radial-gradient(circle,${t.accent} 0%,${t.accent}60 100%)`,border:`2px solid ${t.accent}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',boxShadow:`0 0 20px ${t.accent}60,0 0 40px ${t.accent}30`,flexShrink:0 }}>
                    {t.icon}
                  </div>
                </div>
                {/* Right side */}
                <div style={{ paddingLeft:'2rem', paddingBottom:'2.5rem', ...(i % 2 === 1 ? {} : { opacity:0, pointerEvents:'none' }) }}>
                  {i % 2 === 1 && (
                    <div style={{ display:'inline-block',background:'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))',border:`1px solid ${t.accent}30`,borderRadius:'14px',padding:'1rem 1.25rem',backdropFilter:'blur(16px)',maxWidth:'260px' }}>
                      <p style={{ color:t.accent,fontWeight:800,fontSize:'0.7rem',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'0.35rem' }}>{t.year}</p>
                      <p style={{ color:'var(--fg)',fontWeight:700,fontSize:'1rem',marginBottom:'0.35rem' }}>{t.label}</p>
                      <p style={{ color:'var(--fg-2)',fontSize:'0.82rem',lineHeight:1.6,margin:0 }}>{t.detail}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SPEAKING REEL (horizontal scroll) ══════ */}
      <section className="section" style={{ background:'var(--bg)',borderTop:'1px solid var(--border)',overflow:'hidden' }}>
        <div className="container" style={{ marginBottom:'2.5rem' }}>
          <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem' }}>
            <div>
              <span className="section-label" style={{ marginBottom:'0.75rem',display:'inline-flex' }}>On Stage</span>
              <h2 style={{ color:'var(--fg)',margin:0 }}>Speaking Reel</h2>
            </div>
            <a href="/speaking" style={{ color:'var(--cyan)',fontSize:'0.82rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',display:'inline-flex',alignItems:'center',gap:'0.4rem',borderBottom:'1px solid rgba(0,217,255,0.3)',paddingBottom:'2px' }}>
              View All Events →
            </a>
          </div>
        </div>
        {/* Horizontal scroll strip */}
        <div style={{ paddingLeft:'max(1.25rem,calc((100vw - 1280px)/2 + 1.25rem))', overflow:'auto', paddingBottom:'1rem', cursor:'grab' }} className="scroll-reel">
          <div style={{ display:'flex',gap:'1.25rem',width:'max-content',paddingRight:'2rem' }}>
            {events.map((ev, i) => (
              <div key={i} style={{
                width:'280px',flexShrink:0,
                background:'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))',
                border:'1px solid rgba(255,255,255,0.08)',borderRadius:'18px',
                padding:'1.5rem',backdropFilter:'blur(16px)',
                boxShadow:'0 8px 32px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.06)',
                transition:'transform 0.3s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s ease',
                cursor:'pointer',position:'relative',overflow:'hidden',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(-6px) scale(1.02)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 20px 60px rgba(0,0,0,0.6),0 0 30px rgba(0,217,255,0.08),inset 0 1px 0 rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform='none'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 8px 32px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.06)'; }}
              >
                <div style={{ position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)' }} />
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1rem' }}>
                  <span style={{ fontSize:'0.65rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:i%2===0?'var(--cyan)':'var(--accent)',background:i%2===0?'rgba(0,217,255,0.08)':'rgba(255,94,26,0.08)',border:`1px solid ${i%2===0?'rgba(0,217,255,0.2)':'rgba(255,94,26,0.2)'}`,borderRadius:'6px',padding:'0.25rem 0.6rem' }}>
                    {ev.type}
                  </span>
                  <span style={{ fontSize:'1.8rem',fontWeight:900,color:'rgba(255,255,255,0.06)',fontFamily:'var(--font-display)',lineHeight:1 }}>{ev.year}</span>
                </div>
                <h3 style={{ color:'var(--fg)',fontSize:'1.05rem',fontWeight:700,marginBottom:'0.4rem',lineHeight:1.3 }}>{ev.name}</h3>
                <p style={{ color:'var(--fg-muted)',fontSize:'0.78rem',marginBottom:'1rem',display:'flex',alignItems:'center',gap:'0.35rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 13 8 13s8-7.75 8-13a8 8 0 0 0-8-8z"/></svg>
                  {ev.city}
                </p>
                <div style={{ display:'flex',alignItems:'center',gap:'0.5rem' }}>
                  <span style={{ fontSize:'0.7rem',color:'var(--fg-muted)',textTransform:'uppercase',letterSpacing:'0.1em' }}>Audience</span>
                  <span style={{ fontSize:'1rem',fontWeight:800,color:'var(--fg)' }}>{ev.audience}</span>
                </div>
                <div style={{ marginTop:'1rem',height:'2px',width:'100%',background:`linear-gradient(90deg,${i%2===0?'var(--cyan)':'var(--accent)'},transparent)`,borderRadius:'999px',opacity:0.4 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WATCH ME SPEAK ═════════════════════════ */}
      <section className="section" style={{ background:'linear-gradient(180deg,var(--bg-2) 0%,var(--bg) 100%)',borderTop:'1px solid var(--border)',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:'30%',left:'50%',transform:'translateX(-50%)',width:'50%',height:'300px',background:'radial-gradient(ellipse,rgba(255,94,26,0.06) 0%,transparent 70%)',filter:'blur(60px)',pointerEvents:'none' }} />
        <div className="container" style={{ maxWidth:'860px' }}>
          <div style={{ textAlign:'center',marginBottom:'3rem' }}>
            <span className="section-label" style={{ marginBottom:'1rem',display:'inline-flex' }}>Watch</span>
            <h2 style={{ color:'var(--fg)',marginBottom:'0.75rem' }}>See Srijan in Action</h2>
            <p style={{ color:'var(--fg-2)',maxWidth:'500px',margin:'0 auto' }}>Watch a keynote excerpt — from complex AI theory to room-holding clarity in minutes.</p>
          </div>
          {/* Video placeholder / embed */}
          <div style={{ position:'relative',borderRadius:'20px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.08)',boxShadow:'0 30px 80px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.06)',aspectRatio:'16/9',background:'#0a1020',cursor:'pointer' }}
            onClick={() => window.open('https://www.youtube.com/@srijanspeaks','_blank')}
          >
            {/* Fake thumbnail gradient */}
            <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 80% at 40% 50%,rgba(0,80,160,0.5) 0%,rgba(5,10,24,0.9) 100%)' }} />
            <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'40px 40px' }} />
            {/* Play button */}
            <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem' }}>
              <div style={{ width:'80px',height:'80px',borderRadius:'50%',background:'linear-gradient(135deg,var(--accent),#e84800)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 40px rgba(255,94,26,0.5),0 0 80px rgba(255,94,26,0.2)',animation:'pulse-play 2s ease-in-out infinite' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ marginLeft:'3px' }}>
                  <path d="M5 3l14 9-14 9V3z"/>
                </svg>
              </div>
              <span style={{ color:'var(--fg)',fontSize:'0.85rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',textShadow:'0 2px 10px rgba(0,0,0,0.8)' }}>Watch Keynote Excerpt</span>
            </div>
            {/* Bottom bar */}
            <div style={{ position:'absolute',bottom:0,left:0,right:0,padding:'1.5rem',background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 100%)',display:'flex',alignItems:'center',gap:'1rem' }}>
              <span style={{ fontSize:'0.75rem',color:'rgba(255,255,255,0.6)',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase' }}>AI Summit India 2024 · Bengaluru</span>
              <span style={{ marginLeft:'auto',fontSize:'0.75rem',color:'var(--cyan)',fontWeight:700,border:'1px solid rgba(0,217,255,0.3)',borderRadius:'6px',padding:'0.2rem 0.6rem' }}>1200+ Attendees</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ════════════════════════════ */}
      <section className="section" style={{ background:'var(--bg)',borderTop:'1px solid var(--border)',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'400px',height:'200px',background:'radial-gradient(ellipse,rgba(255,94,26,0.06) 0%,transparent 70%)',filter:'blur(40px)',pointerEvents:'none' }} />
        <div className="container" style={{ maxWidth:'720px',textAlign:'center' }}>
          <div style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.015) 100%)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'24px',padding:'clamp(2rem,5vw,3.5rem)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',boxShadow:'0 20px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06)',position:'relative' }}>
            <div style={{ position:'absolute',top:'-10px',left:'2rem',fontSize:'6rem',lineHeight:1,fontFamily:'Georgia,serif',color:'var(--accent)',opacity:0.2,fontWeight:900 }}>&#8220;</div>
            <div style={{ display:'flex',justifyContent:'center',gap:'4px',marginBottom:'1.5rem' }}>
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)" style={{ filter:'drop-shadow(0 0 4px rgba(255,94,26,0.5))' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <blockquote style={{ fontSize:'clamp(1.1rem,2.5vw,1.35rem)',fontWeight:300,color:'var(--fg)',fontStyle:'italic',lineHeight:1.8,marginBottom:'2rem' }}>
              "Srijan doesn't just teach concepts — he creates genuine connections by showing you how it works in the real world. His teaching style brings clarity to complexity."
            </blockquote>
            <div style={{ width:'40px',height:'2px',background:'linear-gradient(90deg,var(--accent),var(--cyan))',borderRadius:'999px',margin:'0 auto 1.25rem' }} />
            <p style={{ fontWeight:700,color:'var(--cyan)',fontSize:'1rem',margin:0 }}>Aspiring ML Engineer</p>
            <p style={{ fontSize:'0.72rem',color:'var(--fg-muted)',letterSpacing:'0.12em',textTransform:'uppercase',marginTop:'0.25rem' }}>Engineering Student · IIT Madras</p>
          </div>
        </div>
      </section>

      {/* ═══ TEACHING MOMENTS ═══════════════════════ */}
      <section className="section" ref={teachRef} style={{ background:'linear-gradient(180deg,var(--bg) 0%,var(--bg-2) 100%)',borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:'3.5rem',transition:'all 0.8s cubic-bezier(0.34,1.2,0.64,1)',opacity:teachInView?1:0,transform:teachInView?'none':'translateY(30px)' }}>
            <span className="section-label" style={{ marginBottom:'1rem',display:'inline-flex' }}>In Action</span>
            <h2 style={{ color:'var(--fg)',marginBottom:'1rem' }}>Educator at Heart</h2>
            <p style={{ color:'var(--fg-2)',maxWidth:'520px',margin:'0 auto' }}>Real moments of teaching, mentoring, and knowledge transfer with engineers worldwide.</p>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem' }}>
            {moments.map((m, i) => (
              <div key={i} className="card moment-card" style={{ overflow:'hidden',transition:`all 0.6s cubic-bezier(0.34,1.2,0.64,1) ${i*150}ms`,opacity:teachInView?1:0,transform:teachInView?'none':'translateY(40px) scale(0.96)',boxShadow:'0 8px 32px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                <div style={{ position:'relative',aspectRatio:'4/3',background:'var(--bg-3)',overflow:'hidden' }}>
                  <img src={m.src} alt={m.label} style={{ width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.6s ease',display:'block' }} className="moment-img" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
                  <div className="moment-overlay" style={{ position:'absolute',inset:0,background:`linear-gradient(to top,${m.accent==='var(--cyan)'?'rgba(0,217,255,0.3)':'rgba(255,94,26,0.3)'} 0%,transparent 60%)`,opacity:0,transition:'opacity 0.3s ease',display:'flex',alignItems:'flex-end',padding:'1.25rem' }}>
                    <span style={{ fontSize:'0.8rem',fontWeight:700,color:m.accent,fontFamily:'var(--font-mono,monospace)',textShadow:'0 0 10px currentColor' }}>→ {m.label}</span>
                  </div>
                  <div className="moment-bar" style={{ position:'absolute',bottom:0,left:0,height:'3px',width:'0',background:`linear-gradient(90deg,${m.accent},transparent)`,transition:'width 0.5s ease' }} />
                </div>
                <div style={{ padding:'1.5rem' }}>
                  <p style={{ fontWeight:700,color:'var(--fg)',fontSize:'1rem',marginBottom:'0.4rem' }}>{m.label}</p>
                  <p style={{ fontSize:'0.8rem',color:'var(--fg-muted)',fontFamily:'var(--font-mono,monospace)' }}>{m.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center',marginTop:'3rem' }}>
            <MagneticButton href="/speaking" className="btn btn-outline">See All Speaking Engagements →</MagneticButton>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═════════════════════════════ */}
      <section className="section" style={{ background:'linear-gradient(135deg,#050a18 0%,#0a0f25 50%,#050a18 100%)',borderTop:'1px solid var(--border)',textAlign:'center',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:'-50px',left:'50%',transform:'translateX(-50%)',width:'600px',height:'300px',background:'radial-gradient(ellipse,rgba(0,217,255,0.08) 0%,transparent 70%)',filter:'blur(30px)',pointerEvents:'none' }} />
        <div style={{ position:'absolute',bottom:'-50px',left:'50%',transform:'translateX(-50%)',width:'400px',height:'200px',background:'radial-gradient(ellipse,rgba(255,94,26,0.06) 0%,transparent 70%)',filter:'blur(30px)',pointerEvents:'none' }} />
        <div className="container" style={{ maxWidth:'680px',position:'relative',zIndex:1 }}>
          <span className="section-label" style={{ marginBottom:'1.25rem',display:'inline-flex' }}>Let's Work Together</span>
          <h2 style={{ color:'var(--fg)',marginBottom:'1.25rem' }}>Ready to Transform?</h2>
          <p style={{ color:'var(--fg-2)',fontSize:'1.05rem',lineHeight:1.8,margin:'0 auto 2.5rem',maxWidth:'520px' }}>
            Deploy cutting-edge AI. Book a keynote, technical workshop, or research consultation.
          </p>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'1rem',justifyContent:'center' }}>
            <MagneticButton href="/contact" className="btn btn-primary" style={{ fontSize:'0.9rem',padding:'1rem 2.25rem' }}>✦ Get Started</MagneticButton>
            <MagneticButton href="/about" className="btn btn-ghost" style={{ fontSize:'0.9rem' }}>Learn More</MagneticButton>
          </div>
        </div>
      </section>

      <style>{`
        /* Custom cursor */
        .cursor-dot {
          position: fixed; top: 0; left: 0; width: 8px; height: 8px;
          background: var(--cyan); border-radius: 50%;
          pointer-events: none; z-index: 9999;
          box-shadow: 0 0 8px var(--cyan), 0 0 16px var(--cyan);
          mix-blend-mode: screen;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0; width: 40px; height: 40px;
          border: 1.5px solid rgba(0,217,255,0.5); border-radius: 50%;
          pointer-events: none; z-index: 9999;
          transition: border-color 0.2s, width 0.2s, height 0.2s, background 0.2s;
        }
        .cursor-ring.cursor-hover {
          width: 56px; height: 56px;
          border-color: var(--accent);
          background: rgba(255,94,26,0.06);
          margin: -8px;
        }
        @media (pointer: coarse) { .cursor-dot, .cursor-ring { display: none; } }

        /* Typewriter blink */
        @keyframes blink {
          0%,100% { border-color: var(--cyan); }
          50%      { border-color: transparent; }
        }

        /* Marquee */
        .marquee-track {
          display: flex; gap: 0; width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Hover states */
        .org-badge:hover { color: var(--cyan) !important; border-color: rgba(0,217,255,0.2) !important; background: rgba(0,217,255,0.04) !important; box-shadow: 0 0 20px rgba(0,217,255,0.08) !important; }
        .metric-card:hover { transform: perspective(800px) rotateX(0) rotateY(0) translateZ(20px) !important; box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,217,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.14) !important; }
        .pillar-card:hover .pillar-line { width: 100% !important; }
        .moment-card:hover .moment-img { transform: scale(1.08) !important; }
        .moment-card:hover .moment-overlay { opacity: 1 !important; }
        .moment-card:hover .moment-bar { width: 100% !important; }
        .moment-card:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,217,255,0.08) !important; }

        /* Scroll reel */
        .scroll-reel { scrollbar-width: thin; scrollbar-color: rgba(0,217,255,0.3) transparent; }
        .scroll-reel::-webkit-scrollbar { height: 4px; }
        .scroll-reel::-webkit-scrollbar-track { background: transparent; }
        .scroll-reel::-webkit-scrollbar-thumb { background: rgba(0,217,255,0.3); border-radius: 4px; }
        .scroll-reel:active { cursor: grabbing; }

        /* Play button pulse */
        @keyframes pulse-play {
          0%, 100% { box-shadow: 0 0 40px rgba(255,94,26,0.5), 0 0 80px rgba(255,94,26,0.2); }
          50%       { box-shadow: 0 0 60px rgba(255,94,26,0.7), 0 0 100px rgba(255,94,26,0.3); }
        }

        /* Scroll cue */
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes scroll-dot {
          0%   { transform: translateY(0); opacity: 1; }
          80%  { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </>
  );
}
