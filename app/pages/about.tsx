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
      <section className="bg-off-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-navy mb-6">About Srijan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Researcher, builder, and educator passionate about AI, NDE, and creating impact in the startup ecosystem.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-navy">My Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="border-l-4 border-teal pl-6">
                <h3 className="text-2xl font-bold text-navy mb-1">{item.title}</h3>
                <p className="text-teal font-semibold mb-3">{item.subtitle}</p>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-700">
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
      <section className="bg-navy text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Let's work together</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Whether you need a keynote speaker, course creator, or technical consultant, I'm here to help.
        </p>
        <a
          href="/contact"
          className="inline-block bg-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-off-white hover:text-navy transition"
        >
          Get in Touch
        </a>
      </section>
    </>
  );
}

