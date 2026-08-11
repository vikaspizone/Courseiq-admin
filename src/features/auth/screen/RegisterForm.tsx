"use client";
/**
 * RegisterForm component.
 * Handles user registration and account creation.
 */

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/features/common/lang/contexts/LanguageContext";
import { AUTH_STRINGS } from "../constants";
import { AppLoader } from "@/features/common/components/AppLoader";
import { ROUTES } from '@/features/common/constants/routes';
import { useRegister } from "../hooks/useRegister";

export function RegisterForm() {
  const { loading, success, error, showPassword, setShowPassword, bgGradient, handleRegister } = useRegister();

  const { language } = useLanguage();
  const strings = AUTH_STRINGS[language];



  return (
    <div className="flex min-h-screen overflow-hidden bg-background text-on-background font-body-md w-full">
      {loading && <AppLoader message={strings.SETTING_UP_ACCOUNT} />}
      {/* Left Side: Split Screen Content */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary-container overflow-hidden items-center justify-center p-stack-gap-lg">
        {/* Background Animation Decorative Element */}
        <div className="absolute inset-0 z-0 opacity-40"></div>
        <div className="relative z-10 max-w-xl text-center text-on-primary-container">
          <h1 className="font-display-lg text-display-lg mb-stack-gap-md">{strings.ELEVATE_CAREER}</h1>
          <p className="font-body-lg text-body-lg text-primary-fixed-dim opacity-90 mb-stack-gap-lg">
            {strings.ELEVATE_SUBTITLE}
          </p>
          <div className="grid grid-cols-2 gap-stack-gap-md text-left">
            <div className="bg-surface-container-lowest/10 p-stack-gap-md rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="material-symbols-outlined text-primary-fixed mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <h3 className="font-headline-md text-headline-md text-primary-fixed mb-1">{strings.ACCREDITED}</h3>
              <p className="font-body-sm text-body-sm opacity-80">{strings.ACCREDITED_DESC}</p>
            </div>
            <div className="bg-surface-container-lowest/10 p-stack-gap-md rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="material-symbols-outlined text-primary-fixed mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              <h3 className="font-headline-md text-headline-md text-primary-fixed mb-1">{strings.COMMUNITY_TITLE}</h3>
              <p className="font-body-sm text-body-sm opacity-80">{strings.COMMUNITY_DESC}</p>
            </div>
          </div>
        </div>
        {/* Floating Image for Visual Interest */}
        <div className="absolute bottom-12 right-12 w-64 h-64 rounded-2xl shadow-2xl overflow-hidden border-4 border-surface-container-lowest/20 transform rotate-3">
          <img
            className="w-full h-full object-cover"
            alt="A high-resolution, professional studio photograph of a modern, organized home office setup with a sleek laptop displaying a data-rich learning dashboard."
            src="/images/auth/register.jpg"
          />
        </div>
      </div>

      {/* Right Side: Form */}
      <main
        className="w-full lg:w-1/2 flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface overflow-y-auto"
        style={{ background: bgGradient }}
      >
        <div className="w-full max-w-md">
          {/* Header/Logo Area */}
          <div className="mb-stack-gap-lg">
            <div className="flex items-center gap-unit mb-stack-gap-md">
              <div className="bg-primary p-2 rounded-lg text-white">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              </div>
              <span className="font-headline-lg text-headline-lg font-bold tracking-tight text-primary">COURSIQ</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">{strings.REGISTER_TITLE}</h2>
            <p className="font-body-md text-on-surface-variant">{strings.REGISTER_SUBTITLE}</p>
          </div>

          {/* Social Sign Up */}
          <button className="w-full flex items-center justify-center gap-stack-gap-sm px-stack-gap-md py-3 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-all duration-200 mb-stack-gap-lg group">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span className="font-body-md text-on-surface font-semibold">{strings.REGISTER_GOOGLE}</span>
          </button>

          <div className="relative mb-stack-gap-lg">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-surface text-label-caps text-outline uppercase font-label-caps">{strings.OR_USE_EMAIL}</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-stack-gap-md" id="signup-form">
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase" htmlFor="fullname">{strings.FULL_NAME}</label>
              <input
                className="w-full h-12 px-stack-gap-md rounded-lg border border-outline-variant bg-surface text-on-surface font-body-md transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,74,198,0.1)] focus:outline-none"
                id="fullname"
                name="fullname"
                placeholder={strings.FULL_NAME_PLACEHOLDER}
                required
                type="text"
              />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase" htmlFor="email">{strings.EMAIL_LABEL}</label>
              <input
                className="w-full h-12 px-stack-gap-md rounded-lg border border-outline-variant bg-surface text-on-surface font-body-md transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,74,198,0.1)] focus:outline-none"
                id="email"
                name="email"
                placeholder={strings.EMAIL_PLACEHOLDER}
                required
                type="email"
              />
            </div>
            <div className="relative">
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase" htmlFor="password">{strings.PASSWORD_LABEL}</label>
              <input
                className="w-full h-12 px-stack-gap-md rounded-lg border border-outline-variant bg-surface text-on-surface font-body-md transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,74,198,0.1)] focus:outline-none pr-10"
                id="password"
                name="password"
                placeholder={strings.PASSWORD_PLACEHOLDER}
                required
                type={showPassword ? "text" : "password"}
              />
              <button
                className="absolute right-3 top-10 text-outline hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                <span className="material-symbols-outlined" id="pw-icon">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            {/* Legal Checkbox */}
            <div className="flex items-start gap-3 mt-4">
              <div className="flex items-center h-5">
                <input
                  className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20 bg-white"
                  id="terms"
                  name="terms"
                  required
                  type="checkbox"
                />
              </div>
              <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="terms">
                {strings.I_AGREE_TO}<Link className="text-primary hover:underline font-semibold" href="#">{strings.TERMS}</Link>{strings.AND}<Link className="text-primary hover:underline font-semibold" href="#">{strings.PRIVACY}</Link>{strings.AGREEMENT_END}
              </label>
            </div>
            
            {error && (
              <div className="p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-sm border border-error/20 flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{error}</span>
              </div>
            )}

            <button
              className={`w-full h-12 text-white font-headline-md text-headline-md rounded-lg active:scale-[0.98] transition-all duration-100 shadow-md flex items-center justify-center gap-2 mt-stack-gap-lg ${
                success ? "bg-success" : "bg-primary hover:bg-primary-container"
              } ${loading || success ? "opacity-80 pointer-events-none" : ""}`}
              type="submit"
              disabled={loading || success}
            >
              {loading ? (
                <>
                  <span className="animate-spin material-symbols-outlined">progress_activity</span> {strings.SETTING_UP_ACCOUNT}
                </>
              ) : success ? (
                <>
                  <span className="material-symbols-outlined">check_circle</span> {strings.WELCOME}
                </>
              ) : (
                <>
                  {strings.CREATE_ACCOUNT_BUTTON}
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <p className="mt-stack-gap-lg text-center font-body-md text-on-surface-variant">
            {strings.ALREADY_HAVE_ACCOUNT}{" "}
            <Link className="text-primary font-semibold hover:underline" href={ROUTES.LOGIN}>
              {strings.SIGN_IN_BUTTON}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

