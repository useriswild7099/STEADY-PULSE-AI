import React from 'react';

const testimonials = [
  {
    quote: 'Steady Pulse AI has been a game-changer for our content strategy. Their platform is intuitive, powerful, and has directly contributed to a 40% increase in our organic traffic.',
    author: 'Sarah Johnson',
    company: 'TechCorp',
  },
  {
    quote: 'The ROI with Steady Pulse AI has been phenomenal. Their team provided exceptional support, and the results speak for themselves. I wholeheartedly recommend them.',
    author: 'Mark Lee',
    company: 'Innovate LLC',
  },
  {
    quote: 'In a crowded market, Steady Pulse AI is a cut above the rest. Their expertise in content optimization and distribution is unparalleled. We\'ve seen a dramatic improvement in our lead generation.',
    author: 'Emily Chen',
    company: 'Solutions Inc.',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <div className="bg-gray-50 py-36 sm:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center px-8 sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trusted by Industry Leaders</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We've empowered businesses across the globe to achieve their content marketing goals. Here's what some of our valued partners have to say about their journey with Steady Pulse AI.
          </p>
        </div>
        <div className="mx-auto mt-24 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col border-t border-gray-200 pt-8 sm:pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <blockquote className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 text-base">
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-gray-600">{testimonial.company}</div>
              </figcaption>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
