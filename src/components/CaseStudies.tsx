import React, { useState } from 'react';
import backgroundImg from '../assets/background.jpg';

const caseStudies = [
  {
    client: 'Global Tech Inc.',
    industry: 'Technology',
    challenge: 'Facing a plateau in user growth and engagement, Global Tech Inc. needed a transformative strategy to revitalize their brand and platform.',
    solution: 'Our team performed an in-depth market analysis and user behavior audit. We then executed a full-scale rebranding, a UI/UX overhaul, and a precision-targeted marketing campaign to re-engage their audience.',
    results: [
      'Achieved a 40% surge in daily active users.',
      'Grew new user acquisition by 25% in the first quarter.',
      'Dramatically improved brand sentiment and media mentions.',
    ],
    tags: ['Branding', 'UI/UX', 'Marketing'],
    resources: [
      { name: 'View Project', href: '#' },
      { name: 'Download PDF', href: '#' },
    ],
    imageUrl: backgroundImg,
  },

];

const industries = [...new Set(caseStudies.map((study) => study.industry))];
const allTags = [...new Set(caseStudies.flatMap((study) => study.tags))];

export const CaseStudies: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredStudies = caseStudies.filter((study) => {
    if (selectedIndustry && study.industry !== selectedIndustry) {
      return false;
    }
    if (selectedTag && !study.tags.includes(selectedTag)) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white py-36 sm:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center px-8 sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Success Stories</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We don't just promise results; we deliver them. Explore how we've partnered with businesses to overcome challenges and unlock their growth potential.
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button onClick={() => setSelectedIndustry(null)} className={`px-4 py-2 rounded-full text-sm font-semibold ${!selectedIndustry ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>All Industries</button>
          {industries.map((industry) => (
            <button key={industry} onClick={() => setSelectedIndustry(industry)} className={`px-4 py-2 rounded-full text-sm font-semibold ${selectedIndustry === industry ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>{industry}</button>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button onClick={() => setSelectedTag(null)} className={`px-3 py-1 rounded-full text-xs font-medium ${!selectedTag ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>All Solutions</button>
          {allTags.map((tag) => (
            <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-3 py-1 rounded-full text-xs font-medium ${selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>{tag}</button>
          ))}
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-24 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {filteredStudies.map((study, index) => (
            <div key={index} className="flex flex-col items-start justify-between rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
              <div className="relative w-full">
                <img
                  src={study.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={new Date().toISOString()} className="text-gray-500">
                    {study.industry}
                  </time>
                  {study.tags.map((tag) => (
                    <span key={tag} className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {study.client}
                    </a>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600">{study.challenge}</p>
                  <p className="mt-5 text-sm leading-6 text-gray-600">{study.solution}</p>
                </div>
                <div className="mt-6">
                  <h4 className="text-base font-semibold leading-6 text-gray-900">Quantifiable Results</h4>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-600">
                    {study.results.map((result, i) => (
                      <li key={i}>{result}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                  {study.resources.map((resource) => (
                    <a
                      key={resource.name}
                      href={resource.href}
                      className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 mr-4"
                    >
                      {resource.name} &rarr;
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
