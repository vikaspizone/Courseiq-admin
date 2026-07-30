"use client";
/**
 * LanguageSwitcher component.
 * Allows users to change the application language.
 */

import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { SUPPORTED_LANGUAGES } from "../constants";
import styles from "../styles/lang.module.css";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.switcherContainer}>
      <Globe className={styles.globeIcon} />
      <select 
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
        className={styles.selectInput}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className={styles.optionItem}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
