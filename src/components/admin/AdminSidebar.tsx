'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { stripLeadingLocaleFromPath } from '@/lib/locale-path'
import {
  ChevronDown,
  FolderOpen,
  ImageIcon,
  LayoutDashboard,
  Layers,
  Briefcase,
  FlaskConical,
  PanelLeft,
} from 'lucide-react'

const border = 'border-neutral-800'
const itemBase =
  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-neutral-900'
const itemActive = 'bg-neutral-900 text-white'
const itemIdle = 'text-neutral-400 hover:text-neutral-200'

function NavItem({
  href,
  icon: Icon,
  label,
  exact,
}: {
  href: string
  icon: React.ElementType
  label: string
  exact?: boolean
}) {
  const pathname = usePathname() ?? '/'
  const pathNorm = stripLeadingLocaleFromPath(pathname)
  const active = exact
    ? pathNorm === href || pathNorm === `${href}/`
    : pathNorm === href || pathNorm.startsWith(`${href}/`)
  return (
    <Link href={href} className={`${itemBase} ${active ? itemActive : itemIdle}`}>
      <Icon className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.5} />
      <span>{label}</span>
    </Link>
  )
}

export function AdminSidebar() {
  return (
    <aside
      className={`flex w-64 shrink-0 flex-col border-r ${border} bg-black`}
      aria-label="CMS navigation"
    >
      <div className={`border-b ${border} px-4 py-5`}>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">STEPS LAB</p>
        <p className="mt-1 font-semibold tracking-tight text-neutral-100">Content</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" exact />
        <div className="pt-2">
          <p className="mb-1 flex items-center gap-1 px-3 text-[11px] font-medium uppercase tracking-wider text-neutral-600">
            <PanelLeft className="h-3 w-3" />
            Pages
          </p>
          <div className="ml-1 space-y-0.5 border-l border-neutral-800 pl-2">
            <NavItem href="/admin/pages/home" icon={FolderOpen} label="Home" />
            <NavItem href="/admin/pages/about" icon={FolderOpen} label="About" />
            <NavItem href="/admin/pages/contacts" icon={FolderOpen} label="Contacts" />
            <NavItem href="/admin/pages/footer" icon={FolderOpen} label="Footer & template" />
          </div>
        </div>
        <div className={`my-2 border-t ${border}`} />
        <NavItem href="/admin/services" icon={Layers} label="Services" />
        <NavItem href="/admin/portfolio" icon={Briefcase} label="Portfolio" />
        <NavItem href="/admin/lab" icon={FlaskConical} label="Lab" />
        <NavItem href="/admin/media" icon={ImageIcon} label="Media" />
      </nav>
      <div className={`border-t ${border} p-3 text-[11px] text-neutral-600`}>
        <a href="/" className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-300">
          <ChevronDown className="h-3 w-3 -rotate-90" />
          Exit to site
        </a>
      </div>
    </aside>
  )
}
