import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'What kind of ROI can I expect with Steady Pulse AI?',
    answer: 'While results vary based on your industry and goals, our clients typically see a significant return on investment within the first six months. We focus on delivering measurable results and sustainable growth.',
  },
  {
    question: 'Is Steady Pulse AI a good fit for my small business?',
    answer: 'Absolutely. We offer scalable solutions that are tailored to the unique needs of small businesses. Our platform is designed to help you compete and win, regardless of your company\'s size.',
  },
  {
    question: 'What level of support do you provide?',
    answer: 'We pride ourselves on offering best-in-class customer support. Every client is assigned a dedicated account manager, and our technical support team is available 24/7 to assist you.',
  },
  {
    question: 'Can Steady Pulse AI integrate with my existing tools?',
    answer: 'Yes. Our platform is built to be flexible and features a robust API. We offer seamless integrations with a wide range of popular marketing and sales tools.',
  },
  {
    question: 'How do I get started with Steady Pulse AI?',
    answer: 'Getting started is easy. You can sign up for a personalized demo with one of our specialists or start a 14-day free trial to experience the platform for yourself.',
  },
];

export const FAQ: React.FC = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Questions, Answered</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe in transparency and empowering our clients with information. If you don't find the answer you're looking for, our team is always here to help.
          </p>
        </div>
        <div className="mt-16 max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
