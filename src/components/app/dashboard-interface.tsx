import { ArrowUpRight, CheckSquare, Droplets, Flame, Moon, Plus, Repeat } from "lucide-react";
const metrics = [
  [CheckSquare, "24", "Tasks completed", "+18%"],
  [Moon, "7.5h", "Avg. sleep", "+0.3h"],
  [Flame, "1,120", "Calories burned", "+8%"],
  [Repeat, "87%", "Habit consistency", "-3%"],
] as const;
export function DashboardInterface({ name }: { name: string }) {
  return (
    <div className="lt-stack">
      <section className="lt-hero">
        <div>
          <p>Today</p>
          <h1>Good morning, {name}!</h1>
          <span>Your LifeTrack workspace is ready for the modules ahead.</span>
        </div>
        <div className="lt-progress">
          <b>0%</b>
          <small>Today&apos;s progress</small>
        </div>
      </section>
      <section className="lt-metrics">
        {metrics.map(([Icon, value, label, change]) => (
          <article key={label} className="lt-card lt-metric">
            <div className="lt-metric-icon">
              <Icon size={20} />
            </div>
            <span className={change.startsWith("-") ? "down" : "up"}>
              {!change.startsWith("-") && <ArrowUpRight size={13} />} {change}
            </span>
            <b>{value}</b>
            <p>{label}</p>
            <i />
          </article>
        ))}
      </section>
      <section className="lt-columns">
        <div className="lt-card lt-panel">
          <div className="lt-panel-head">
            <div>
              <h2>Today&apos;s Tasks</h2>
              <p>Ready for your first tasks</p>
            </div>
            <button>View all</button>
          </div>
          <div className="lt-empty">
            <CheckSquare size={25} />
            <strong>No tasks yet</strong>
            <span>Task management is coming next.</span>
            <button>
              <Plus size={15} /> Add task
            </button>
          </div>
        </div>
        <div className="lt-card lt-panel">
          <div className="lt-panel-head">
            <div>
              <h2>Daily Habits</h2>
              <p>Keep the streak alive</p>
            </div>
            <button>View all</button>
          </div>
          <div className="lt-empty">
            <Droplets size={25} />
            <strong>No habits yet</strong>
            <span>Build small routines when habits arrive.</span>
          </div>
        </div>
      </section>
      <section className="lt-card lt-panel">
        <div className="lt-panel-head">
          <div>
            <h2>This week</h2>
            <p>Your activity visualization will appear here.</p>
          </div>
        </div>
        <div className="lt-bars">
          {[38, 62, 47, 74, 55, 87, 65].map((height, index) => (
            <div key={height}>
              <i style={{ height: `${height}%` }} />
              <span>{["M", "T", "W", "T", "F", "S", "S"][index]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
