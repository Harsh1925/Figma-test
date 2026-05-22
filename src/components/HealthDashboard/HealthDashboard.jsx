import { useState } from "react";
import { ChevronRight, Eye, EyeOff, ListChecks } from "lucide-react";
import {
  activities,
  slotPlacementOrder,
  stats,
} from "../../data/dashboardData";
import "./HealthDashboard.css";

function IconBox({ Icon, type = "default" }) {
  return (
    <div className={`icon-box ${type}`} aria-hidden="true">
      <Icon size={16} strokeWidth={3} />
    </div>
  );
}

function StatDetailCard({ item, slotNumber, visualSlot, onClose }) {
  const Icon = item.icon;

  return (
    <article className={`stat-detail-card ${item.iconClass} ${visualSlot}`}>
      <div className="stat-detail-top">
        <IconBox Icon={Icon} type={item.iconClass} />

        <div>
          <span>Slot {slotNumber}</span>
          <p>{item.label}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${item.label} details`}
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
    </article>
  );
}

function StatsSection({ isActivityExpanded, onToggleActivity }) {
  const [selectedStats, setSelectedStats] = useState([]);

  const allStatsOpen = selectedStats.length === stats.length;

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
    <section className="stats-section" aria-label="Health metrics">
      <div className="icon-dock" aria-label="Health and activity controls">
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
              aria-label={`${active ? "Remove" : "Show"} ${item.label.toLowerCase()} details`}
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
          aria-label={
            allStatsOpen ? "Hide all metric details" : "Show all metric details"
          }
          aria-pressed={allStatsOpen}
        >
          <IconBox Icon={allStatsOpen ? EyeOff : Eye} type="show-all" />
        </button>

        <button
          type="button"
          className={`icon-dock-btn activity-toggle-icon ${
            isActivityExpanded ? "active" : ""
          }`}
          onClick={onToggleActivity}
          data-tooltip={
            isActivityExpanded ? "Hide weekly activity" : "Show weekly activity"
          }
          aria-label={
            isActivityExpanded ? "Hide weekly activity" : "Show weekly activity"
          }
          aria-pressed={isActivityExpanded}
        >
          <IconBox
            Icon={isActivityExpanded ? EyeOff : ListChecks}
            type="activity"
          />
        </button>
      </div>

      {selectedStats.length > 0 && (
        <div className="stat-slots">
          {selectedStats.map((selectedId, index) => {
            const item = getStatById(selectedId);
            const visualSlot = slotPlacementOrder[index];

            if (!item) return null;

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
    </section>
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
    <section className={`activity-list ${allOpen ? "all-open" : ""}`}>
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
    </section>
  );
}

function ActivitySection({ isExpanded }) {
  return (
    <section
      className={`activity-section ${isExpanded ? "expanded" : "collapsed"}`}
      aria-label="Weekly activity"
    >
      <div className="activity-content-stack">
        {isExpanded && <ActivityList />}
      </div>
    </section>
  );
}

export default function HealthDashboard() {
  const [isActivityExpanded, setIsActivityExpanded] = useState(false);

  return (
    <main className="page">
      <div className="figma-label">Screen Recreation</div>

      <section className="outer-frame" aria-label="Figma screen recreation">
        <div className="screen-area">
          <div className="widget-cluster">
            <StatsSection
              isActivityExpanded={isActivityExpanded}
              onToggleActivity={() =>
                setIsActivityExpanded((current) => !current)
              }
            />

            <ActivitySection isExpanded={isActivityExpanded} />
          </div>
        </div>
      </section>
    </main>
  );
}
