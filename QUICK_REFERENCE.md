# SrijanSpeaks.com — Quick Reference Guide

## 🚀 Essential Commands

```bash
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Check TypeScript errors
npm run sanity    # Start Sanity Studio on http://localhost:3333
```

## 📁 File Locations

| What | Where |
|------|-------|
| **Pages** | `app/pages/*.tsx` |
| **Components** | `app/components/*.tsx` |
| **Home Page** | `app/page.tsx` |
| **API Routes** | `app/api/*/route.ts` |
| **Styling** | `app/globals.css` + Tailwind classes |
| **Sanity** | `app/lib/sanity.ts` |
| **Config** | `tailwind.config.ts`, `next.config.ts` |

## 🎨 Color Classes

```tailwind
bg-navy        text-navy       border-navy
bg-teal        text-teal       border-teal
bg-off-white   text-off-white  border-light-gray
```

## 📝 Common Tailwind Utilities

```tailwind
/* Sizing */
w-full  h-screen  max-w-7xl

/* Layout */
flex  grid  gap-8  items-center  justify-between

/* Typography */
text-4xl  font-bold  font-semibold

/* Colors */
text-white  bg-navy  border-teal

/* Spacing */
p-8  m-6  my-4  px-6  py-3

/* Effects */
shadow-lg  hover:shadow-xl  transition

/* Responsive */
md:grid-cols-2  lg:max-w-7xl  sm:px-6
```

## 🔌 Using Sanity Data

### Fetch Data (Client Component)
```tsx
'use client'

import { client } from '@/app/lib/sanity'
import { BLOG_LIST_QUERY } from '@/app/lib/queries'

export default function Component() {
  useEffect(() => {
    client.fetch(BLOG_LIST_QUERY).then(data => {
      console.log(data)
    })
  }, [])
}
```

### Create New Page with Sanity Data
```tsx
import { client } from '@/app/lib/sanity'
import { ABOUT_PAGE_QUERY } from '@/app/lib/queries'

export async function generateMetadata() {
  const data = await client.fetch(ABOUT_PAGE_QUERY)
  return { title: 'About' }
}

export default async function AboutPage() {
  const data = await client.fetch(ABOUT_PAGE_QUERY)
  return <div>{data.timeline}</div>
}
```

## 📧 Email API

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Speaking Inquiry",
  "message": "I'd like to book you for...",
  "inquiryType": "speaking"
}
```

**Response:**
```json
{ "success": true, "message": "Email sent successfully" }
```

## 🎯 Component Props

### Button Component
```tsx
<Button 
  href="/contact"                    // Link destination
  onClick={() => console.log('clicked')}
  variant="primary"                  // primary | secondary | ghost
  size="md"                          // sm | md | lg
  disabled={false}                   // Optional
>
  Click Me
</Button>
```

## 🔍 Form Validation

```tsx
<input 
  type="text" 
  required 
  className="border-light-gray focus:ring-2 focus:ring-teal"
/>
```

## 📱 Responsive Breakpoints

```tailwind
xs: 320px    (mobile)
sm: 640px    (mobile landscape)
md: 768px    (tablet)
lg: 1024px   (desktop)
xl: 1280px   (large desktop)
```

Usage:
```tailwind
md:grid-cols-2    /* 2 columns on tablet+ */
lg:text-5xl       /* Larger text on desktop+ */
```

## 🎭 State Management

```tsx
'use client'

import { useState } from 'react'

export default function Component() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <input 
      name="email"
      value={formData.email}
      onChange={handleChange}
    />
  )
}
```

## 🔐 Environment Variables

### Required
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<id>
SANITY_API_TOKEN=<token>
SMTP_HOST=smtp.gmail.com
SMTP_USER=email@gmail.com
SMTP_PASSWORD=<app-password>
```

### Optional
```env
NEXT_PUBLIC_GA_ID=<analytics-id>
SMTP_FROM=noreply@srijanspeaks.com
CONTACT_EMAIL=contact@srijanspeaks.com
```

## 📊 Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Sanity Docs**: https://www.sanity.io/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **React Hooks**: https://react.dev/reference/react/hooks

## 🛠 Debugging Tips

```bash
# Check TypeScript errors
npm run lint

# Build and test locally
npm run build && npm run start

# Check for unused dependencies
npx depcheck

# Format code (if prettier installed)
npx prettier --write .
```

## 📚 Project Architecture

```
User Input (Form)
    ↓
Client Component (useState)
    ↓
API Route (/api/contact)
    ↓
External Service (Nodemailer)
    ↓
Email Sent ✓
```

## 🎯 Common Patterns

### Grid Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {items.map((item) => (
    <div key={item.id}>{item.title}</div>
  ))}
</div>
```

### Card Component
```tsx
<div className="p-6 bg-off-white rounded-lg border border-light-gray hover:border-teal transition">
  <h3 className="text-2xl font-bold text-navy mb-2">Title</h3>
  <p className="text-gray-600">Description</p>
</div>
```

### Button Group
```tsx
<div className="flex gap-4">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
</div>
```

### Responsive Text
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
  Responsive Heading
</h1>
```

## ☑️ Before Committing

```bash
npm run lint          # Fix TypeScript errors
npm run build         # Test production build
git status            # Check what's being committed
git diff              # Review changes
```

## 📞 Need Help?

1. **README.md** — Full setup & architecture guide
2. **DEPLOYMENT_CHECKLIST.md** — Deploy to production
3. **PROJECT_COMPLETE.md** — Project inventory
4. **Documentation** — See links above

---

**Happy coding! 🚀**
