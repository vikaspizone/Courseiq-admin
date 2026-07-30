/**
 * Dashboard Constants.
 * Defines constant values used across the dashboard feature.
 */

import { DashboardModule } from "../types";

export const DASHBOARD_MODULES: DashboardModule[] = [
  {
    id: "mod-1",
    title: "Module 1",
    description: "Interactive component showcasing dashboard capabilities and layout structure.",
    iconType: "default"
  },
  {
    id: "mod-2",
    title: "Module 2",
    description: "Manage your profile, settings, and other relevant information.",
    iconType: "default"
  },
  {
    id: "mod-3",
    title: "Module 3",
    description: "Analyze your performance with our advanced analytics tools.",
    iconType: "default"
  }
];

export const DASHBOARD_STRINGS = {
  en: {
    WELCOME_BACK: "Welcome back,",
    SUCCESS_MSG: "You've successfully logged in using our custom authentication hook with static credentials. This is your personal dashboard.",
  },
  hi: {
    WELCOME_BACK: "वापसी पर स्वागत है,",
    SUCCESS_MSG: "आपने स्थिर क्रेडेंशियल के साथ हमारे कस्टम प्रमाणीकरण हुक का उपयोग करके सफलतापूर्वक लॉग इन किया है। यह आपका व्यक्तिगत डैशबोर्ड है।",
  }
};
