'use client';

import { PortableText as SanityPortableText } from '@portabletext/react';

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <img
        src={value.asset.url}
        alt={value.alt || 'Blog image'}
        className="w-full rounded-lg my-8"
      />
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-navy my-6">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-navy my-5">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-navy my-4">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-base text-gray-700 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-teal pl-4 italic text-gray-700 my-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value.href} className="text-teal hover:text-navy underline">
        {children}
      </a>
    ),
    code: ({ children }: any) => (
      <code className="bg-off-white px-2 py-1 rounded text-sm font-mono text-navy">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

export function PortableTextRenderer({ value }: { value: any }) {
  return <SanityPortableText value={value} components={portableTextComponents} />;
}
