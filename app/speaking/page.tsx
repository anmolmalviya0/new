'use client';

export default function SpeakingPage() {
  const topics = [
    {
      title: 'AI & Machine Learning in NDT',
      description: 'How AI is transforming non-destructive testing. Deep dive into ML models, deployment challenges, and real-world use cases.',
      duration: '45-60 min',
    },
    {
      title: 'Building Your First Startup',
      description: 'From idea to 50+ clients. Lessons from founding TIQ World, raising funding, and scaling an AI startup.',
      duration: '45-60 min',
    },
    {
      title: 'The Art of Technical Speaking',
      description: 'Crafting memorable keynotes, engaging technical audiences, and making complex ideas simple.',
      duration: '30-45 min',
    },
    {
      title: 'Research to Market: Commercializing Science',
      description: 'How to transition from academic research to building a profitable product company.',
      duration: '45 min',
    },
  ];

  const events = [
    { event: 'AI India Summit 2024', date: 'Jun 15, 2024', location: 'Delhi, India', status: 'Keynote' },
    { event: 'TechCrunch Disrupt', date: 'Sep 9-11, 2024', location: 'San Francisco', status: 'Panel' },
    { event: 'IIT Madras Alumni Meet', date: 'Jul 22, 2024', location: 'Chennai', status: 'Keynote' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A0E27] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Keynote Speaking</h1>
          <p className="text-xl md:text-2xl text-[#AAAAAA] font-mono">
            Inspiring audiences on AI, entrepreneurship, and making impact.
          </p>
        </div>
      </section>

      {/* TOPICS */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Available Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {topics.map((topic, idx) => (
              <div key={idx} className="p-8 bg-[#121829] border border-[#1F2937] hover:border-[#00D9FF] transition">
                <h3 className="text-2xl font-bold text-[#00D9FF] mb-3">{topic.title}</h3>
                <p className="text-[#AAAAAA] font-mono mb-4">{topic.description}</p>
                <p className="text-sm font-semibold text-[#FF6B35] font-mono">Duration: {topic.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-20 bg-[#121829]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Upcoming Speaking Engagements</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-[#1F2937]">
              <thead>
                <tr className="border-b-2 border-[#00D9FF] bg-[#0A0E27]">
                  <th className="pb-4 px-6 font-bold text-[#00D9FF]">Event</th>
                  <th className="pb-4 px-6 font-bold text-[#00D9FF]">Date</th>
                  <th className="pb-4 px-6 font-bold text-[#00D9FF]">Location</th>
                  <th className="pb-4 px-6 font-bold text-[#00D9FF]">Role</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, idx) => (
                  <tr key={idx} className="border-b border-[#1F2937] hover:bg-[#0A0E27] transition">
                    <td className="py-4 px-6 text-[#AAAAAA] font-mono">{event.event}</td>
                    <td className="py-4 px-6 text-[#AAAAAA] font-mono">{event.date}</td>
                    <td className="py-4 px-6 text-[#AAAAAA] font-mono">{event.location}</td>
                    <td className="py-4 px-6 text-[#FF6B35] font-mono font-semibold">{event.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0E27] text-white py-20 text-center border-t border-[#1F2937]">
        <h2 className="text-4xl font-bold mb-6">Book me for your event</h2>
        <p className="text-lg text-[#AAAAAA] font-mono mb-8 max-w-2xl mx-auto">
          Available for keynotes, panels, workshops, and consulting engagements worldwide.
        </p>
        <a
          href="/contact"
          className="inline-block bg-[#FF6B35] text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-[#FF8A5B] transition"
        >
          → Inquire Now
        </a>
      </section>
    </>
  );
}
