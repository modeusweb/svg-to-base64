'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'Why use Base64 encoding for SVG files?',
    answer:
      'Base64 encoding allows you to embed SVG images directly into HTML or CSS files without additional HTTP requests. This improves page load times, reduces server load, and simplifies deployment. Common use cases include email templates, single-page applications, offline documentation, and any scenario where external file references are problematic.',
  },
  {
    question: 'What output formats are supported?',
    answer:
      'This free online tool supports three output formats: raw Base64 strings for custom implementations, CSS background-image rules ready for direct use in stylesheets, and complete HTML img tags with the src attribute pre-filled. You can switch between formats instantly using the format tabs.',
  },
  {
    question: 'Is there a file size limit?',
    answer:
      'Yes, the maximum file size is 4MB per SVG file. This limit ensures optimal performance and prevents browser slowdown during the conversion process. For best results, optimize your SVG files using tools like SVGO before converting.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. All conversion happens directly in your browser using JavaScript. Your SVG files are never uploaded to any server, ensuring complete privacy and security. No registration or sign-up is required to use this free online tool.',
  },
  {
    question: 'Can I use the output in commercial projects?',
    answer:
      'Yes, you can use the converted Base64 strings in any project, including commercial ones. This tool is free to use with no restrictions. The generated code is yours to use however you need.',
  },
  {
    question: 'Why is my Base64 output so long?',
    answer:
      'The length depends on the complexity of your SVG file. Enable the "Minify SVG markup" option to reduce the output size by removing unnecessary whitespace, comments, and editor metadata. This can significantly shorten the Base64 string.',
  },
]

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-gray-800 dark:text-white pr-4">
          {item.question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
      >
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </article>
  )
}
