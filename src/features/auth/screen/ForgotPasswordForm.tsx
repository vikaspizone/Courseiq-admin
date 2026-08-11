"use client";
/**
 * ForgotPasswordForm component.
 * Handles the user input for password recovery.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { AUTH_STRINGS } from "../constants";
import { useLanguage } from "@/features/common/lang/contexts/LanguageContext";
import { AppLoader } from "@/features/common/components/AppLoader";
import { ROUTES } from '@/features/common/constants/routes';

export function ForgotPasswordForm() {
    const { language } = useLanguage();
    const strings = AUTH_STRINGS[language];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md overflow-hidden relative w-full">
            {isSubmitting && <AppLoader message={`${strings.SENDING}...`} />}
            {/* Hero Background Animation Element */}
            <div className="fixed inset-0 z-0"></div>

            {/* Centered Content Area */}
            <main className="relative z-10 flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop w-full">
                <div className="w-full max-w-[480px] space-y-stack-gap-lg">
                    
                    {/* Branding / Logo Area */}
                    <div className="flex flex-col items-center text-center space-y-unit">
                        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">COURSIQ</h1>
                        <div className="h-1 w-12 bg-primary rounded-full"></div>
                    </div>

                    {/* Recovery Card */}
                    <section className="bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-xl rounded-xl p-stack-gap-lg md:p-10 transform transition-all duration-500 hover:shadow-2xl">
                        <header className="text-center mb-stack-gap-lg">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-fixed rounded-full mb-stack-gap-md text-primary">
                                <span className="material-symbols-outlined text-4xl">lock_reset</span>
                            </div>
                            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">{strings.FORGOT_TITLE}</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px] mx-auto">
                                {strings.FORGOT_SUBTITLE}
                            </p>
                        </header>

                        {/* Form / Success State */}
                        {!isSuccess ? (
                            <form className="space-y-stack-gap-md" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="email" className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest ml-1">
                                        {strings.REGISTERED_EMAIL}
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-xl">mail</span>
                                        </div>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email" 
                                            placeholder="name@company.com" 
                                            required 
                                            className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                                        />
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-primary text-on-primary py-4 rounded-lg font-headline-md text-[18px] flex items-center justify-center gap-2 shadow-md hover:bg-surface-tint active:scale-[0.98] transition-all duration-150 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin">progress_activity</span> 
                                            <span>{strings.SENDING}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{strings.SEND_RESET_LINK}</span>
                                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-4 space-y-stack-gap-md animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 text-success rounded-full">
                                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                                </div>
                                <p className="font-body-md text-on-surface">
                                    {strings.RESET_SUCCESS}
                                </p>
                            </div>
                        )}

                        {/* Navigation Footer */}
                        <footer className="mt-stack-gap-lg pt-stack-gap-lg border-t border-outline-variant/30 flex justify-center">
                            <Link href={ROUTES.LOGIN} className="inline-flex items-center gap-2 text-primary font-body-md hover:underline group">
                                <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                {strings.BACK_TO_SIGNIN}
                            </Link>
                        </footer>
                    </section>

                    {/* Support / Help */}
                    <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
                        {strings.STILL_TROUBLE} <Link href="#" className="text-primary font-semibold hover:underline">{strings.CONTACT_SUPPORT}</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
