import { Dumbbell, Footprints, Heart, Moon } from "lucide-react";

export const stats = [
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

export const activities = [
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

export const slotPlacementOrder = [
  "slot-two",
  "slot-one",
  "slot-four",
  "slot-three",
];
