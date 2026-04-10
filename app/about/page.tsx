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

      {/* TEACHING & MENTORING IN ACTION */}
      <section className="py-20 bg-[#121829] border-t border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Teaching in Action</h2>
            <p className="text-[#AAAAAA] font-mono text-lg">Real moments of mentoring, teaching, and knowledge transfer</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Classroom Teaching */}
            <div className="overflow-hidden rounded border border-[#1F2937] hover:border-[#00D9FF] transition">
              <div className="bg-[#0A0E27] aspect-video flex items-center justify-center relative overflow-hidden">
                <img 
                  src="/images/teaching/classroom-teaching.jpg" 
                  alt="Classroom Teaching Session - Live ML demonstrations"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-[#AAAAAA] text-sm absolute inset-0 flex items-center justify-center bg-[#0A0E27]/80">
                  Classroom Teaching Session
                </span>
              </div>
              <div className="p-6 bg-[#0A0E27]">
                <h3 className="text-lg font-bold text-[#00D9FF] mb-2">Interactive Classroom</h3>
                <p className="text-[#AAAAAA] font-mono text-sm">Deep dive into ML fundamentals and real-world applications</p>
              </div>
            </div>

            {/* Conference Speaking */}
            <div className="overflow-hidden rounded border border-[#1F2937] hover:border-[#FF6B35] transition">
              <div className="bg-[#0A0E27] aspect-video flex items-center justify-center relative overflow-hidden">
                <img 
                  src="/images/speaking/conference-speaking.jpg" 
                  alt="Conference Speaking - Industry engagement"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-[#AAAAAA] text-sm absolute inset-0 flex items-center justify-center bg-[#0A0E27]/80">
                  Conference Speaking
                </span>
              </div>
              <div className="p-6 bg-[#0A0E27]">
                <h3 className="text-lg font-bold text-[#FF6B35] mb-2">Industry Engagement</h3>
                <p className="text-[#AAAAAA] font-mono text-sm">Sharing research and insights at national & international conferences</p>
              </div>
            </div>

            {/* Mentoring */}
            <div className="overflow-hidden rounded border border-[#1F2937] hover:border-[#00D9FF] transition">
              <div className="bg-[#0A0E27] aspect-video flex items-center justify-center relative overflow-hidden">
                <img 
                  src="/images/mentoring/iit-mentoring.jpg" 
                  alt="Mentoring - One-on-one guidance"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-[#AAAAAA] text-sm absolute inset-0 flex items-center justify-center bg-[#0A0E27]/80">
                  Mentoring Moments
                </span>
              </div>
              <div className="p-6 bg-[#0A0E27]">
                <h3 className="text-lg font-bold text-[#00D9FF] mb-2">One-on-One Mentoring</h3>
                <p className="text-[#AAAAAA] font-mono text-sm">Guiding aspiring researchers and entrepreneurs in their journey</p>
              </div>
            </div>
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
