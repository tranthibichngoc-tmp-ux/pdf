import Link from "next/link";
import { LucideIcon } from "lucide-react";

export default function ToolCard({
  href, title, description, Icon, badge
}: {
  href: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  badge?: string;
}) {
  return (
    <Link href={href} className="group card p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{title}</h3>
            {badge && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium">{badge}</span>}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}
