// Sanity GROQ queries for fetching content across all pages and sections
import { groq } from 'next-sanity'

export const HOMEPAGE_QUERY = groq`
  *[_type == "homepage"][0] {
    heroHeadline,
    heroSubheading,
    heroImage,
    socialProofLogos[],
    ctas[]
  }
`;

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "about"][0] {
    timeline[]{
      title,
      subtitle,
      description,
      achievements[]
    },
    testimonials[] -> {
      quote,
      author,
      role,
      image
    }
  }
`;

export const SPEAKING_PAGE_QUERY = groq`
  *[_type == "speaking"][0] {
    topics[]{
      title,
      description,
      duration
    },
    upcomingEvents[]{
      event,
      date,
      location,
      link
    }
  }
`;

export const COURSES_PAGE_QUERY = groq`
  *[_type == "courses"][0] {
    courses[]{
      title,
      description,
      price,
      duration,
      level,
      image,
      enrolled
    },
    faq[]{
      question,
      answer
    }
  }
`;

export const BLOG_LIST_QUERY = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    image,
    category -> {
      name,
      slug
    }
  }
`;

export const BLOG_POST_QUERY = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    image,
    category -> {
      name,
      slug
    },
    author -> {
      name,
      image
    }
  }
`;

export const RELATED_POSTS_QUERY = groq`
  *[_type == "blog" && category._ref == $categoryId && _id != $postId] | order(publishedAt desc)[0:3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    image
  }
`;

export const CONTACT_PAGE_QUERY = groq`
  *[_type == "contact"][0] {
    teamEmail,
    businessEmail,
    socialLinks,
    faqSections[]{
      title,
      faqs[]{
        question,
        answer
      }
    }
  }
`;

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonials"] {
    _id,
    quote,
    author,
    role,
    image,
    starRating
  }
`;

export const BLOG_CATEGORIES_QUERY = groq`
  *[_type == "blogCategory"] {
    _id,
    name,
    slug
  }
`;
