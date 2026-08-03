"use client";
/**
 * LoginForm component.
 * Handles user authentication and login submission.
 */

import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { AUTH_MESSAGES, AUTH_STRINGS } from "../constants";
import { useLanguage } from "@/features/common/lang/contexts/LanguageContext";
import { useState } from "react";
import { AppLoader } from "@/features/common/components/AppLoader";
import { ROUTES } from "@/features/common/constants/routes";

export function LoginForm() {
  const { 
    email, setEmail, password, setPassword, error, loading, handleLogin, 
    sessionExpired, setSessionExpired 
  } = useAuth();
  const { language } = useLanguage();
  const strings = AUTH_STRINGS[language];
  const messages = AUTH_MESSAGES[language];
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden bg-background text-on-background font-body-md selection:bg-primary-fixed-dim w-full">
      {loading && <AppLoader message={`${strings.SIGN_IN_BUTTON}...`} />}
      
      {/* Session Expired Modal */}
      {sessionExpired && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="flex flex-col items-center p-8 bg-surface rounded-2xl shadow-2xl border border-outline-variant/30 max-w-sm w-[90%] mx-auto">
            <div className="relative flex items-center justify-center w-20 h-20 mb-6 text-error">
              <div className="absolute inset-0 bg-error/20 rounded-full animate-ping"></div>
              <div className="absolute inset-2 bg-error/10 rounded-full animate-pulse"></div>
              <span className="material-symbols-outlined text-4xl relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
            </div>
            
            <h3 className="text-xl font-headline-md font-semibold text-on-surface mb-2 tracking-tight text-center">
              {strings.SESSION_ENDED}
            </h3>
            <p className="text-sm font-body-sm text-on-surface-variant text-center max-w-[250px] mb-8">
              {strings.SESSION_EXPIRED}
            </p>

            <button 
              onClick={() => setSessionExpired(false)}
              className="w-full py-3 px-6 bg-primary text-on-primary font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-on-primary-fixed-variant transition-all active:scale-[0.98] duration-100"
            >
              {strings.LOG_IN_AGAIN}
            </button>
          </div>
        </div>
      )}

      {/* Left Side: Inspiring Academic Visual */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-primary-container items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 to-primary-container/40 z-10"></div>
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDapdRlcyVoKOmf4nEHove8mHmqK9X_xTx1MJNH77rTl1nxeR42ve8_WjsD1T-XBcg_ImCIFLkwX2c3dk1OhAkeVdE9_QHp34bfDRHGdiPW3_Ms_Uj9icJOQfbP9XS7OfaQ_9dr13mNN6dpbk6PmoPKfOKo8LeSkwnWl74TtCiNeAv0USTkcrxTXAUbCfqxpKrlOgtOzLq0OGg6F0m_STFJnIlmwf-ozndoK6kEn32LT6F-y5d_sR4bjw')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 px-margin-desktop max-w-xl text-white">
          <div className="mb-stack-gap-lg">
            <span className="inline-flex items-center gap-2 bg-white/10 glass-effect px-4 py-2 rounded-full mb-6">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
              <span className="font-label-caps text-label-caps tracking-widest uppercase">
                {strings.EMPOWERING}
              </span>
            </span>
            <h1 className="font-display-lg text-display-lg mb-6 leading-tight">
              {strings.MASTER_FUTURE}
            </h1>
            <p className="font-body-lg text-body-lg text-white/80 max-w-md">
              {strings.JOIN_STUDENTS}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-gutter pt-stack-gap-lg border-t border-white/20">
            <div>
              <p className="font-headline-md text-headline-md text-white">92%</p>
              <p className="font-body-sm text-body-sm text-white/60">
                {strings.COMPLETION_RATE}
              </p>
            </div>
            <div>
              <p className="font-headline-md text-headline-md text-white">4.9/5</p>
              <p className="font-body-sm text-body-sm text-white/60">
                {strings.SATISFACTION}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary rounded-full opacity-30 blur-3xl"></div>
      </section>

      {/* Right Side: Auth Form */}
      <section className="w-full lg:w-1/2 flex flex-col bg-surface overflow-y-auto">
        {/* Mobile Header Only */}
        <header className="lg:hidden flex items-center h-16 px-margin-mobile border-b border-outline-variant">
          <span className="font-headline-lg-mobile text-headline-lg-mobile font-extrabold text-primary tracking-tight">
            COURSIQ
          </span>
        </header>

        <div className="flex-grow flex items-center justify-center py-16 px-margin-mobile">
          <div className="w-full max-w-[420px]">
            {/* Header */}
            <div className="mb-stack-gap-lg text-center lg:text-left">
              <div className="hidden lg:block mb-12">
                <span className="font-headline-lg text-headline-lg font-extrabold text-primary tracking-tighter">
                  COURSIQ
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
                {strings.TITLE}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {strings.SUBTITLE}
              </p>
            </div>

            {/* Social Login */}
            <div className="mb-8">
              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-outline-variant rounded-xl font-medium text-on-surface hover:bg-surface-container transition-all active:scale-[0.98] duration-100">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="fill-info"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="fill-success"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    className="fill-warning"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="fill-error"
                  ></path>
                </svg>
                {strings.CONTINUE_GOOGLE}
              </button>
            </div>

            <div className="relative mb-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <span className="relative px-4 bg-surface text-on-surface-variant font-label-caps text-label-caps uppercase">
                {strings.OR_EMAIL}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label
                  className="font-label-caps text-label-caps text-on-surface-variant ml-1"
                  htmlFor="email"
                >
                  {strings.EMAIL_LABEL}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">mail</span>
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={strings.EMAIL_PLACEHOLDER}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label
                    className="font-label-caps text-label-caps text-on-surface-variant"
                    htmlFor="password"
                  >
                    {strings.PASSWORD_LABEL}
                  </label>
                  <Link
                    href={ROUTES.FORGOT_PASSWORD}
                    className="text-xs font-semibold text-primary hover:underline transition-all"
                  >
                    {strings.FORGOT_PASSWORD}
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">lock</span>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={strings.PASSWORD_PLACEHOLDER}
                    className="w-full pl-11 pr-12 py-3 bg-white border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface placeholder:text-outline/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-primary bg-white border-outline-variant rounded focus:ring-primary/20 transition-colors"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 font-body-sm text-body-sm text-on-surface-variant cursor-pointer"
                >
                  {strings.REMEMBER_ME}
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-primary text-on-primary font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-on-primary-fixed-variant hover:shadow-xl transition-all active:scale-[0.98] duration-100 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {strings.SIGN_IN_BUTTON}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {strings.NO_ACCOUNT}{" "}
                <Link
                  href={ROUTES.REGISTER}
                  className="font-semibold text-primary hover:underline transition-all"
                >
                  {strings.SIGN_UP_LINK}
                </Link>
              </p>
            </div>

            <div className="mt-16 flex justify-center gap-6 font-label-caps text-[10px] text-outline uppercase tracking-widest">
              <Link href="#" className="hover:text-primary transition-colors">
                {strings.TERMS}
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                {strings.PRIVACY}
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                {strings.SUPPORT}
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="hidden lg:block absolute bottom-12 right-12 opacity-[0.03] pointer-events-none">
          <span className="material-symbols-outlined text-[120px]">
            architecture
          </span>
        </div>
      </section>
    </div>
  );
}
