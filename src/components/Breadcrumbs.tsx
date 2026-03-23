import Link from 'next/link'

type BreadcrumbItem = {
  name: string
  path: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-text-dark/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-text-dark font-medium">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                  <span>/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
