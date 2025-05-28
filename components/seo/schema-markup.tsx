"use client"

import Script from "next/script"

interface SchemaMarkupProps {
  type: "article" | "faq" | "howto" | "product"
  data: any
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const getSchemaData = () => {
    const baseSchema = {
      "@context": "https://schema.org",
    }

    switch (type) {
      case "article":
        return {
          ...baseSchema,
          "@type": "Article",
          ...data,
        }
      case "faq":
        return {
          ...baseSchema,
          "@type": "FAQPage",
          ...data,
        }
      case "howto":
        return {
          ...baseSchema,
          "@type": "HowTo",
          ...data,
        }
      case "product":
        return {
          ...baseSchema,
          "@type": "SoftwareApplication",
          ...data,
        }
      default:
        return baseSchema
    }
  }

  return (
    <Script
      id={`schema-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchemaData()),
      }}
    />
  )
}
