export interface SchemaTemplate {
  name: string;
  id: string;
  description: string;
  code: string;
}

export const schemaTemplates: SchemaTemplate[] = [
  {
    name: 'WebApplication Schema',
    id: 'web-application',
    description: 'Tells search engines that Dr Watermark is a highly functional interactive web application, driving rich snippets in Google searches.',
    code: `{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://dr-watermark.in/#webapp",
  "url": "https://dr-watermark.in/",
  "name": "Dr Watermark",
  "applicationCategory": "Utility",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "description": "Dr Watermark is a specialized client-side web application designed to clean hidden Unicode tracking symbols, zero-width spaces, and typographic text watermarks from documents.",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "screenshot": "https://dr-watermark.in/og-image.png"
}`
  },
  {
    name: 'FAQPage Schema',
    id: 'faq-page',
    description: 'Structures frequently asked questions to appear directly as collapsible drop-downs within organic Google Search engine results.',
    code: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is removing watermarks illegal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Removing watermarks is legal if you own the copyright of the image or have obtained explicit permission/license from the copyright holder. Removing watermarks from copyrighted works owned by others without authorization violates copyright law."
      }
    },
    {
      "@type": "Question",
      "name": "What are zero-width characters in text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zero-width characters are non-printing Unicode characters (such as U+200B Zero-Width Space) that carry zero visual width on screens, but are used strategically as hidden identifiers to track copy-pasted leaks."
      }
    }
  ]
}`
  },
  {
    name: 'BlogPosting Schema',
    id: 'blog-posting',
    description: 'Optimizes blog posts to show clear author, publishing date, and article images in Google Discover and News feeds.',
    code: `{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dr-watermark.in/blog/is-removing-watermarks-illegal-complete-guide"
  },
  "headline": "Is Removing Watermarks Illegal? The Complete Legal and Ethical Playbook",
  "description": "Discover the legal boundaries of removing watermarks. Learn about DMCA Section 1202, Fair Use exceptions, and how to safely edit images with permissions.",
  "image": "https://dr-watermark.in/images/legal-guide-cover.jpg",
  "author": {
    "@type": "Person",
    "name": "Dr Watermark Editorial Team",
    "url": "https://dr-watermark.in/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dr Watermark",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dr-watermark.in/logo.png"
    }
  },
  "datePublished": "2026-07-08T00:00:00-07:00",
  "dateModified": "2026-07-08T01:30:00-07:00"
}`
  },
  {
    name: 'BreadcrumbList Schema',
    id: 'breadcrumb-list',
    description: 'Implements site hierarchy trails inside Google search results to help users and crawler bots navigate categories easily.',
    code: `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://dr-watermark.in/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tools",
      "item": "https://dr-watermark.in/tools"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Visible Watermark Remover",
      "item": "https://dr-watermark.in/tools/visible-watermark-remover"
    }
  ]
}`
  },
  {
    name: 'Organization Schema',
    id: 'organization',
    description: 'Establishes the Google Knowledge Panel representation of the Dr Watermark brand identity, logos, and support options.',
    code: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dr Watermark",
  "alternateName": "DrWatermark",
  "url": "https://dr-watermark.in/",
  "logo": "https://dr-watermark.in/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "",
    "contactType": "customer support",
    "email": "support@dr-watermark.in",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://twitter.com/dr_watermark",
    "https://www.linkedin.com/company/dr-watermark"
  ]
}`
  },
  {
    name: 'Website SearchBox Schema',
    id: 'website',
    description: 'Links Google search queries directly back to an online search-box feature on the dr-watermark.in platform.',
    code: `{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://dr-watermark.in/",
  "name": "Dr Watermark",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://dr-watermark.in/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}`
  },
  {
    name: 'ImageObject Schema',
    id: 'image-object',
    description: 'Declares copyright boundaries, licensing records, and origin details of individual image assets on the web.',
    code: `{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://dr-watermark.in/images/inpainting-comparison.jpg",
  "creator": {
    "@type": "Person",
    "name": "Dr Watermark Photographer"
  },
  "copyrightNotice": "Copyright 2026 Dr Watermark. Licensed for educational study under CC-BY-SA.",
  "license": "https://dr-watermark.in/terms#licensing"
}`
  },
  {
    name: 'HowTo Schema',
    id: 'how-to',
    description: 'Instructs Google to render step-by-step images, durations, and instructions as rich visual carousel cards.',
    code: `{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Remove a Logo from an Image Legally",
  "totalTime": "PT2M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "text": "Confirm you own the image copyright or have licensed permissions to edit it.",
      "name": "Verify License Rights"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "text": "Upload the file to the Dr Watermark Visible Watermark Remover canvas.",
      "name": "Upload to Canvas"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "text": "Paint the brush over the logo overlay cleanly and click Erase.",
      "name": "Apply Smart Brush"
    }
  ]
}`
  }
];
