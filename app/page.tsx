"use client";

export default function Home() {
  return (
    <>
      {/* HERO - IMPACT METRICS FIRST */}
      <section className="bg-[#0A0E27] text-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          {/* MISSION */}
          <div className="text-center mb-20">
            <p className="text-[#AAAAAA] uppercase tracking-widest text-sm mb-6">
              ─────────────────────────
            </p>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-[#FFFFFF] leading-tight">
              BUILDING THE FUTURE<br />OF MANUFACTURING
            </h1>
            <p className="text-[#AAAAAA] uppercase tracking-widest text-sm">
              Accelerating transformation through AI innovation
            </p>
          </div>

          {/* METRICS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="border border-[#1F2937] p-8 text-center counter" data-delay="1">
              <div className="text-5xl font-bold text-[#00D9FF] mb-2">5000+</div>
              <p className="text-[#AAAAAA] text-sm uppercase tracking-widest">Engineers Trained</p>
            </div>
            <div className="border border-[#1F2937] p-8 text-center counter" data-delay="2">
              <div className="text-5xl font-bold text-[#FF6B35] mb-2">50+</div>
              <p className="text-[#AAAAAA] text-sm uppercase tracking-widest">Institutions Reached</p>
            </div>
            <div className="border border-[#1F2937] p-8 text-center counter" data-delay="3">
              <div className="text-5xl font-bold text-[#00D9FF] mb-2">10+</div>
              <p className="text-[#AAAAAA] text-sm uppercase tracking-widest">Years Experience</p>
            </div>
            <div className="border border-[#1F2937] p-8 text-center counter" data-delay="4">
              <div className="text-5xl font-bold text-[#FF6B35] mb-2">3</div>
              <p className="text-[#AAAAAA] text-sm uppercase tracking-widest">Personas: Research · Build · Teach</p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="flex gap-4 justify-center mb-20">
            <a
              href="/contact"
              className="bg-[#00D9FF] text-[#0A0E27] px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#00A8CC] transition"
            >
              → Deploy
            </a>
            <a
              href="/blog"
              className="border border-[#00D9FF] text-[#00D9FF] px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#00D9FF] hover:text-[#0A0E27] transition"
            >
              → Blog & Research
            </a>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="bg-[#121829] py-12 border-t border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#AAAAAA] uppercase tracking-widest text-center text-xs mb-8">
            Deployed Across Leading Organizations
          </p>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            <span className="font-bold text-[#AAAAAA] uppercase tracking-wider text-sm">IIT Madras</span>
            <span className="font-bold text-[#AAAAAA] uppercase tracking-wider text-sm">TIQ World</span>
            <span className="font-bold text-[#AAAAAA] uppercase tracking-wider text-sm">DGZfP</span>
            <span className="font-bold text-[#AAAAAA] uppercase tracking-wider text-sm">Stanford</span>
            <span className="font-bold text-[#AAAAAA] uppercase tracking-wider text-sm">NDE India</span>
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-16 text-center text-[#FFFFFF]">Foundation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-[#1F2937] hover:border-[#00D9FF] transition">
              <h3 className="text-2xl font-bold text-[#00D9FF] mb-4">⚛ CORE SCIENCE</h3>
              <p className="text-[#AAAAAA] font-mono">
                8+ years of R&D at India's premier research institute (IIT Madras). 200+ peer-reviewed publications advancing AI foundations for real-world manufacturing.
              </p>
            </div>
            <div className="p-8 border border-[#1F2937] hover:border-[#FF6B35] transition">
              <h3 className="text-2xl font-bold text-[#FF6B35] mb-4">🔧 PROVEN SYSTEMS</h3>
              <p className="text-[#AAAAAA] font-mono">
                Co-founder of TIQ World. Built and deployed AI-powered NDT platform serving 50+ enterprise clients. $200M+ cumulative impact created.
              </p>
            </div>
            <div className="p-8 border border-[#1F2937] hover:border-[#00D9FF] transition">
              <h3 className="text-2xl font-bold text-[#00D9FF] mb-4">📡 KNOWLEDGE TRANSFER</h3>
              <p className="text-[#AAAAAA] font-mono">
                Technical leadership for 50+ institutions. Speaker at AI Summit India, TechCrunch Disrupt, international conferences. Frameworks adopted across industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 bg-[#121829] border-t border-[#1F2937]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-6 text-2xl">⬤ ⬤ ⬭ ⬭ ⬭</div>
          <blockquote className="text-2xl font-light text-[#FFFFFF] mb-6 italic font-mono">
            "Srijan doesn't just teach concepts—he creates genuine connections by showing you how it works in the real world. His teaching style brings clarity to complexity."
          </blockquote>
          <div>
            <p className="font-semibold text-lg text-[#00D9FF]">Aspiring ML Engineer</p>
            <p className="text-[#AAAAAA] text-sm uppercase tracking-widest">Engineering Student</p>
          </div>
        </div>
      </section>

      {/* FEATURED TEACHING MOMENTS */}
      <section className="py-20 bg-[#0A0E27] border-t border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Educator at Heart</h2>
            <p className="text-[#AAAAAA] text-lg max-w-2xl mx-auto font-mono">
              Real moments of teaching, mentoring, and knowledge transfer with engineering students and professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live Teaching */}
            <div className="overflow-hidden rounded border border-[#1F2937] hover:border-[#00D9FF] transition group">
              <div className="bg-[#1F2937] aspect-square flex items-center justify-center group-hover:bg-[#00D9FF]/10 transition relative overflow-hidden">
                {/* Image will load here if file exists */}
                <img 
                  src="/images/teaching/classroom-teaching.jpg" 
                  alt="Classroom Teaching - Live demonstrations with students"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-[#AAAAAA] group-hover:text-[#00D9FF] transition text-center p-6 font-mono absolute inset-0 flex items-center justify-center">
                  → Classroom Teaching<br/>Live demonstrations<br/>Real-time problem solving
                </span>
              </div>
            </div>

            {/* Conference Speaking */}
            <div className="overflow-hidden rounded border border-[#1F2937] hover:border-[#FF6B35] transition group">
              <div className="bg-[#1F2937] aspect-square flex items-center justify-center group-hover:bg-[#FF6B35]/10 transition relative overflow-hidden">
                <img 
                  src="/images/speaking/conference-keynote.jpg" 
                  alt="Conference Speaking - Industry engagement moment"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-[#AAAAAA] group-hover:text-[#FF6B35] transition text-center p-6 font-mono absolute inset-0 flex items-center justify-center">
                  → Industry Conference<br/>200+ audience members<br/>Translational research
                </span>
              </div>
            </div>

            {/* Mentoring Sessions */}
            <div className="overflow-hidden rounded border border-[#1F2937] hover:border-[#00D9FF] transition group">
              <div className="bg-[#1F2937] aspect-square flex items-center justify-center group-hover:bg-[#00D9FF]/10 transition relative overflow-hidden">
                <img 
                  src="/images/mentoring/one-on-one.jpg" 
                  alt="Mentoring - One-on-one guidance session"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-[#AAAAAA] group-hover:text-[#00D9FF] transition text-center p-6 font-mono absolute inset-0 flex items-center justify-center">
                  → One-on-One Mentoring<br/>Career guidance<br/>Research collaboration
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#AAAAAA] font-mono mb-8 text-lg max-w-2xl mx-auto">
              From classroom teaching to international conferences, every moment is an opportunity to connect, inspire, and empower the next generation of innovators.
            </p>
            <a
              href="/speaking"
              className="inline-block border border-[#00D9FF] text-[#00D9FF] px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#00D9FF] hover:text-[#0A0E27] transition"
            >
              → See Speaking Engagements
            </a>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="bg-[#0A0E27] text-white py-20 text-center border-t border-[#1F2937]">
        <h2 className="text-5xl font-bold mb-8">READY TO TRANSFORM?</h2>
        <p className="text-[#AAAAAA] mb-8 text-lg max-w-2xl mx-auto">
          Deploy cutting-edge AI for manufacturing. Book a technical discussion or explore research frameworks.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#FF6B35] text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-[#FF8A5B] transition"
        >
          → Get Started
        </a>
      </section>
    </>
  );
}
