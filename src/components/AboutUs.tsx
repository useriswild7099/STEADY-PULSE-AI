import React from 'react';
import backgroundImg from '../assets/background.webp';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    bio: 'With over two decades of industry leadership, John has a proven track record of steering companies toward exponential growth. His vision and passion for innovation are the driving forces behind Steady Pulse AI.',
    imageUrl: backgroundImg,
  },
  {
    name: 'Jane Smith',
    role: 'Chief Technology Officer',
    bio: 'Jane is a technology powerhouse, renowned for architecting and scaling high-performance software solutions. She leads our engineering team in building the future of content management.',
    imageUrl: backgroundImg,
  },
  {
    name: 'Peter Jones',
    role: 'Head of Client Relations',
    bio: 'A master of communication and strategic problem-solving, Peter is dedicated to ensuring an exceptional client experience. He is the champion of our clients\' success.',
    imageUrl: backgroundImg,
  },
];

export default function AboutUs() {
  return (
    <div className="bg-white py-36 sm:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At Steady Pulse AI, we're not just a service provider; we're your strategic partner in growth. Our mission is to empower businesses with the tools and expertise they need to thrive in the digital landscape. We are committed to fostering innovation, driving results, and building relationships that last.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-20 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <img className="h-48 w-48 rounded-full object-cover" src={member.imageUrl} alt={member.name} />
              <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-gray-900">{member.name}</h3>
              <p className="text-base leading-6 text-gray-600">{member.role}</p>
              <p className="mt-4 text-sm leading-6 text-gray-500">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
