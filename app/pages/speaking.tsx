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
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Keynote Speaking</h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Inspiring audiences on AI, entrepreneurship, and making impact.
          </p>
        </div>
      </section>

      {/* TOPICS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-navy">Available Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {topics.map((topic, idx) => (
              <div key={idx} className="p-8 bg-off-white rounded-lg border border-light-gray hover:border-teal transition">
                <h3 className="text-2xl font-bold text-navy mb-3">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <p className="text-sm font-semibold text-teal">Duration: {topic.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-navy">Upcoming Speaking Engagements</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-teal">
                  <th className="pb-4 font-bold text-navy">Event</th>
                  <th className="pb-4 font-bold text-navy">Date</th>
                  <th className="pb-4 font-bold text-navy">Location</th>
                  <th className="pb-4 font-bold text-navy">Role</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, idx) => (
                  <tr key={idx} className="border-b border-light-gray hover:bg-white transition">
                    <td className="py-4">{event.event}</td>
                    <td className="py-4">{event.date}</td>
                    <td className="py-4">{event.location}</td>
                    <td className="py-4">
                      <span className="bg-teal text-white px-3 py-1 rounded-full text-sm">
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Want me at your event?</h2>
        <a
          href="/contact"
          className="inline-block bg-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-off-white hover:text-navy transition"
        >
          Book a Speaking Engagement
        </a>
      </section>
    </>
  );
}
