/**
 * Language Constants.
 * Defines supported languages and language-related constants.
 */

export interface LanguageOption {
  code: "en" | "hi";
  label: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" }
];

export const COMMON_STRINGS = {
  en: {
    LOADING: "Loading...",
    PLEASE_WAIT: "Please wait a moment while we process your request."
  },
  hi: {
    LOADING: "लोड हो रहा है...",
    PLEASE_WAIT: "कृपया प्रतीक्षा करें जबकि हम आपके अनुरोध पर कार्रवाई कर रहे हैं।"
  }
};
