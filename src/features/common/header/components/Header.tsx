"use client";
/**
 * Header component.
 * Renders the top navigation and user menu.
 */

import React from "react";
import { LogOut, User } from "lucide-react";
import { useLanguage } from "../../lang/contexts/LanguageContext";
import { LanguageSwitcher } from "../../lang/components/LanguageSwitcher";
import { HEADER_STRINGS } from "../constants";
import styles from "../styles/header.module.css";

interface HeaderProps {
  userEmail?: string | null;
  onLogout?: () => void;
}

export function Header({ userEmail, onLogout }: HeaderProps) {
  const { language } = useLanguage();
  const strings = HEADER_STRINGS[language];

  return (
    <nav className={styles.headerNav}>
      <div className={styles.headerContainer}>
        <div className={styles.headerInner}>
          <div className="flex items-center">
            <span className={styles.logoText}>
              {strings.APP_NAME}
            </span>
          </div>
          
          <div className={styles.actionsContainer}>
            <LanguageSwitcher />

            {/* User Profile & Logout (Conditional) */}
            {userEmail && onLogout && (
              <>
                <div className={styles.userProfile}>
                  <User className={styles.userIcon} />
                  <span>{userEmail}</span>
                </div>
                <button
                  onClick={onLogout}
                  className={styles.logoutButton}
                >
                  <LogOut className={styles.logoutIcon} />
                  <span className={styles.logoutText}>{strings.LOGOUT_BUTTON}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}