import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

export type DashboardLinkProps = React.LiHTMLAttributes<HTMLLIElement> & {
  name: string
  Icon: LucideIcon
  to: string
}

export const DashboardLink = ({ name, Icon, to, className, ...props }: DashboardLinkProps) => {
  return (
    <li className="flex items-center gap-2">
      <Icon />
      <Link href={to}>{name}</Link>
    </li>
  )
}
