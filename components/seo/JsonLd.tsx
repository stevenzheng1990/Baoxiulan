interface Props {
  data: Record<string, unknown> | Record<string, unknown>[]
}

// Injects JSON-LD structured data — place in <head> via layout or page
export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  )
}
