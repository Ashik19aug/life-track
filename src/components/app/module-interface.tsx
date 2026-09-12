import { CalendarDays, CheckSquare, HeartPulse, LockKeyhole } from "lucide-react";
const descriptions: Record<string, string> = {
  tasks: "Plan daily tasks and priorities.",
  calendar: "Organize events and schedules.",
  health: "Track your wellbeing and health metrics.",
  nutrition: "Understand meals and nutrition.",
  workouts: "Log movement and training.",
  goals: "Build meaningful goals and habits.",
  reports: "See your progress over time.",
  notifications: "Stay in the loop with reminders.",
};
export function ModuleInterface({ module }: { module: string }) {
  const title = module === "goals" ? "Goals & Habits" : module[0].toUpperCase() + module.slice(1);
  const Icon =
    module === "calendar" ? CalendarDays : module === "health" ? HeartPulse : CheckSquare;
  return (
    <div className="lt-stack">
      <div>
        <p className="lt-eyebrow">LifeTrack</p>
        <h1 className="lt-page-title">{title}</h1>
        <p className="lt-page-subtitle">{descriptions[module] ?? "Your LifeTrack workspace."}</p>
      </div>
      <section className="lt-card lt-module">
        <div className="lt-module-icon">
          <Icon size={29} />
        </div>
        <h2>{title} interface</h2>
        <p>This interface is in place. Its data model and actions will arrive in a later phase.</p>
        <div>
          <LockKeyhole size={15} /> Available soon
        </div>
      </section>
    </div>
  );
}
