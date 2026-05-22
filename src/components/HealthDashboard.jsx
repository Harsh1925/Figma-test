import { useMemo, useState } from "react";
import "./HealthDashboard.css";

import {
  ChevronRight,
  Dumbbell,
  Eye,
  EyeOff,
  Footprints,
  Heart,
  ListChecks,
  Moon,
} from "lucide-react";

const stats = [
  {
    id: "heart",
    icon: Heart,
    iconClass: "heart",
    label: "HEART RATE",
    value: "60",
    unit: "bpm",
    meta: "Resting",
    detail: "Your resting heart rate is in a calm range today.",
    tip: "Good recovery signal",
  },
  {
    id: "sleep",
    icon: Moon,
    iconClass: "sleep",
    label: "SLEEP",
    value: "7.4",
    unit: "hrs",
    meta: "↑ 12% this week",
    detail: "You slept longer than your weekly average.",
    tip: "Recovery is trending up",
  },
  {
    id: "steps",
    icon: Footprints,
    iconClass: "steps",
    label: "STEPS",
    value: "8,432",
    unit: "",
    meta: "of 10,000 goal",
    detail: "You are close to today’s movement goal.",
    tip: "1,568 steps remaining",
  },
  {
    id: "weight",
    icon: Dumbbell,
    iconClass: "weight",
    label: "WEIGHT",
    value: "115",
    unit: "lbs",
    meta: "↓ 1.2 lb this month",
    detail: "Your monthly weight trend is moving gradually.",
    tip: "Steady progress",
  },
];

const activities = [
  {
    icon: Footprints,
    iconClass: "steps",
    title: "Morning Run",
    date: "April 16, 2026",
    calories: "435 cal",
    duration: "38 min",
    note: "Outdoor cardio session with a strong calorie burn.",
  },
  {
    icon: Dumbbell,
    iconClass: "weight",
    title: "Strength Training",
    date: "April 15, 2026",
    calories: "210 cal",
    duration: "42 min",
    note: "Resistance workout focused on strength and consistency.",
  },
  {
    icon: Footprints,
    iconClass: "steps",
    title: "Yoga",
    date: "April 15, 2026",
    calories: "550 cal",
    duration: "55 min",
    note: "Longer mobility session that supports recovery and flexibility.",
  },
];

const slotPlacementOrder = ["slot-two", "slot-one", "slot-four", "slot-three"];

function IconBox({ Icon, type = "default" }) {
  return (
    <div className={`icon-box ${type}`}>
      <Icon size={16} strokeWidth={3} />
    </div>
  );
}

function StatDetailCard({ item, slotNumber, visualSlot, onClose }) {
  const Icon = item.icon;

  return (
    <div className={`stat-detail-card ${item.iconClass} ${visualSlot}`}>
      <div className="stat-detail-top">
        <IconBox Icon={Icon} type={item.iconClass} />
        <div>
          <span>Slot {slotNumber}</span>
          <p>{item.label}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${item.label}`}
        >
          ×
        </button>
      </div>

      <div className="stat-value-row">
        <span className="stat-value">{item.value}</span>
        {item.unit && (
          <span className={`stat-unit ${item.iconClass}`}>{item.unit}</span>
        )}
      </div>

      <p className={`stat-meta ${item.iconClass}`}>{item.meta}</p>
      <p className="stat-detail">{item.detail}</p>
      <div className={`stat-tip ${item.iconClass}`}>{item.tip}</div>
    </div>
  );
}

function StatsSection() {
  const [selectedStats, setSelectedStats] = useState([]);

  const allStatsOpen = useMemo(
    () => selectedStats.length === stats.length,
    [selectedStats.length],
  );

  const getStatById = (id) => stats.find((item) => item.id === id);

  const handleIconClick = (id) => {
    setSelectedStats((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  const toggleAllStats = () => {
    setSelectedStats((current) =>
      current.length === stats.length ? [] : stats.map((item) => item.id),
    );
  };

  return (
    <div className="stats-section">
      <div className="icon-dock" aria-label="Health metric icons">
        {stats.map((item) => {
          const Icon = item.icon;
          const active = selectedStats.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              className={`icon-dock-btn ${active ? "active" : ""}`}
              onClick={() => handleIconClick(item.id)}
              data-tooltip={`${active ? "Remove" : "Show"} ${item.label.toLowerCase()}`}
              aria-pressed={active}
            >
              <IconBox Icon={Icon} type={item.iconClass} />
            </button>
          );
        })}

        <button
          type="button"
          className={`icon-dock-btn show-all-icon ${allStatsOpen ? "active" : ""}`}
          onClick={toggleAllStats}
          data-tooltip={allStatsOpen ? "Hide all details" : "Show all details"}
          aria-pressed={allStatsOpen}
        >
          <IconBox Icon={allStatsOpen ? EyeOff : Eye} type="show-all" />
        </button>
      </div>

      {selectedStats.length > 0 && (
        <div className="stat-slots">
          {selectedStats.map((selectedId, index) => {
            const item = getStatById(selectedId);
            const visualSlot = slotPlacementOrder[index];

            return (
              <StatDetailCard
                key={selectedId}
                item={item}
                slotNumber={index + 1}
                visualSlot={visualSlot}
                onClose={() => handleIconClick(item.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function ActivityRow({ item, isOpen, onToggle, isLast }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      className={`activity-row ${isOpen ? "open" : ""} ${isLast ? "last" : ""}`}
      onClick={onToggle}
      aria-expanded={isOpen}
      data-tooltip={`Open ${item.title}`}
    >
      <div className="activity-main-line">
        <div className="activity-left">
          <IconBox Icon={Icon} type={item.iconClass} />

          <div>
            <h4>{item.title}</h4>
            <p>{item.date}</p>
          </div>
        </div>

        <div className="activity-right">
          <strong>{item.calories}</strong>
          <ChevronRight size={14} className="activity-chevron" />
        </div>
      </div>

      <div className="activity-details">
        <div>
          <span>Duration</span>
          <strong>{item.duration}</strong>
        </div>
        <p>{item.note}</p>
      </div>
    </button>
  );
}

function ActivityList() {
  const [openActivity, setOpenActivity] = useState(null);
  const [showAllActivities, setShowAllActivities] = useState(false);

  const allOpen = showAllActivities;

  return (
    <div className={`activity-list ${allOpen ? "all-open" : ""}`}>
      <div className="activity-header">
        <div>
          <h3>This week</h3>
          <p>Tap any activity to preview more context.</p>
        </div>

        <button
          type="button"
          className="view-all-btn"
          onClick={() => {
            setShowAllActivities((current) => !current);
            setOpenActivity(null);
          }}
        >
          {allOpen ? "Collapse" : "Expand all"}
        </button>
      </div>

      {activities.map((item, index) => {
        const isOpen = allOpen || openActivity === item.title;

        return (
          <ActivityRow
            key={item.title}
            item={item}
            isOpen={isOpen}
            isLast={index === activities.length - 1}
            onToggle={() => {
              setShowAllActivities(false);
              setOpenActivity((current) =>
                current === item.title ? null : item.title,
              );
            }}
          />
        );
      })}
    </div>
  );
}

function ActivitySection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`activity-section ${isExpanded ? "expanded" : "collapsed"}`}
    >
      <div className="activity-content-stack">
        {isExpanded && <ActivityList />}
      </div>

      <button
        type="button"
        className={`activity-toggle-icon ${isExpanded ? "active" : ""}`}
        onClick={() => setIsExpanded((current) => !current)}
        data-tooltip={
          isExpanded ? "Hide weekly activity" : "Show weekly activity"
        }
        aria-pressed={isExpanded}
      >
        <IconBox Icon={isExpanded ? EyeOff : ListChecks} type="activity" />
      </button>
    </div>
  );
}

export default function HealthDashboard() {
  return (
    <main className="page">
      <div className="figma-label">Screen Recreation</div>

      <section className="outer-frame">
        <div className="screen-area">
          <div className="widget-cluster">
            <StatsSection />
            <ActivitySection />
          </div>
        </div>
      </section>
    </main>
  );
}
