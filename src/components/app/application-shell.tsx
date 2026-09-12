"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Apple,
  BarChart3,
  Bell,
  CalendarDays,
  CheckSquare,
  ChevronLeft,
  Dumbbell,
  HeartPulse,
  LayoutDashboard,
  Menu,
  Search,
  Target,
} from "lucide-react";
import { useState } from "react";
import { LogoutButton } from "@/src/components/app/logout-button";

const items = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/tasks", "Tasks", CheckSquare],
  ["/calendar", "Calendar", CalendarDays],
  ["/health", "Health", HeartPulse],
  ["/nutrition", "Nutrition", Apple],
  ["/workouts", "Workouts", Dumbbell],
  ["/goals", "Goals & Habits", Target],
  ["/reports", "Reports", BarChart3],
  ["/notifications", "Notifications", Bell],
] as const;

export function ApplicationShell({ children, name }: { children: React.ReactNode; name: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="lt-shell">
      <aside className={`lt-sidebar ${open ? "lt-sidebar-open" : ""}`}>
        <div className="lt-brand">
          <span className="lt-brand-icon">
            <Activity size={19} />
          </span>
          <span>
            <b>LifeTrack</b>
            <small>Your life, organized</small>
          </span>
          <button aria-label="Close menu" className="lt-close" onClick={() => setOpen(false)}>
            <ChevronLeft size={20} />
          </button>
        </div>
        <nav>
          <p className="lt-nav-label">Menu</p>
          {items.map(([href, label, Icon]) => (
            <Link
              key={href}
              onClick={() => setOpen(false)}
              className={`lt-nav-item ${pathname === href ? "active" : ""}`}
              href={href}
            >
              <Icon size={18} />
              <span>{label}</span>
              {href === "/tasks" && <em>5</em>}
              {href === "/notifications" && <em>3</em>}
            </Link>
          ))}
        </nav>
        <div className="lt-upgrade">
          <b>Go Premium</b>
          <p>Unlock advanced insights & unlimited tracking</p>
          <button>Upgrade now</button>
        </div>
        <div className="lt-signout">
          <LogoutButton />
        </div>
      </aside>
      {open && (
        <button
          aria-label="Close menu overlay"
          className="lt-overlay"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="lt-main">
        <header className="lt-topbar">
          <button className="lt-menu" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu size={21} />
          </button>
          <div className="lt-search">
            <Search size={16} />
            <input aria-label="Search" placeholder="Search..." />
          </div>
          <button className="lt-icon-button" aria-label="Notifications">
            <Bell size={19} />
            <span>3</span>
          </button>
          <Link aria-label="Open profile" href="/profile" className="lt-avatar">
            {initials}
          </Link>
        </header>
        <main className="lt-content">{children}</main>
      </div>
    </div>
  );
}
