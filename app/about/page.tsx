'use client';

export default function AboutPage() {
  const timeline = [
    {
      title: 'Researcher',
      subtitle: 'IIT Madras CNDE',
      description: 'Staff researcher with 8+ years of NDE research',
      achievements: ['12 peer-reviewed publications', 'Principal investigator on 5 funded projects', 'Advisor to 15+ research scholars'],
    },
    {
      title: 'Builder',
      subtitle: 'Co-founder, TIQ World',
      description: 'Building AI-powered NDE inspection platform',
      achievements: ['50+ enterprise clients', '3x revenue growth YoY', 'Raised $1.2M seed funding'],
    },
    {
      title: 'Educator',
      subtitle: 'Speaker & Trainer',
      description: 'Training engineers across India',
      achievements: ['5000+ engineers trained', '50+ speaking engagements', '15+ online courses published'],
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A0E27] text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Srijan</h1>
          <p className="text-xl text-[#AAAAAA] max-w-3xl mx-auto font-mono">
            Researcher, builder, and educator passionate about AI, NDE, and creating impact in the startup ecosystem.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">My Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="border-l-4 border-[#00D9FF] pl-6 bg-[#121829] p-8">
                <h3 className="text-2xl font-bold text-[#00D9FF] mb-1">{item.title}</h3>
                <p className="text-[#FF6B35] font-mono font-semibold mb-3">{item.subtitle}</p>
                <p className="text-[#AAAAAA] font-mono mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="text-[#AAAAAA] font-mono">
                      ✓ {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0E27] text-white py-20 text-center border-t border-[#1F2937]">
        <h2 className="text-4xl font-bold mb-6">Let's work together</h2>
        <p className="text-xl text-[#AAAAAA] font-mono mb-8 max-w-2xl mx-auto">
          Whether you need a keynote speaker, course creator, or technical consultant, I'm here to help.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#00D9FF] text-[#0A0E27] px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#00A8CC] transition"
        >
          → Get in Touch
        </a>
      </section>
    </>
  );
}
