'use client';
/**
 * InstructorDirectoryView component.
 * Renders the instructor directory interface for users.
*/

import Link from 'next/link';
import { useInstructorDirectory } from '../hooks/useInstructorDirectory';
import { Header } from "@/features/common/header/components/Header";
import { NavigationMenu } from "@/features/common/header/components/NavigationMenu";
import { useLanguage } from "@/features/common/lang/contexts/LanguageContext";
import { INSTRUCTOR_DIRECTORY_STRINGS, MOCK_INSTRUCTORS } from '../constants';
import styles from '../styles/instructor_directory.module.css';
import { ROUTES } from '@/features/common/constants/routes';

export const InstructorDirectoryView = () => {
    const { userEmail, isSidebarOpen, setIsSidebarOpen, handleLogout } = useInstructorDirectory();
    const { language } = useLanguage();
    const strings = INSTRUCTOR_DIRECTORY_STRINGS[language];

    if (!userEmail) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden text-gray-900">
            {/* Sidebar */}
            <NavigationMenu isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative bg-[#faf8ff] text-[#191b23]">
                <Header 
                    userEmail={userEmail} 
                    onLogout={handleLogout}
                    isSidebarOpen={isSidebarOpen}
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <main className="pt-8 pb-32 px-6 lg:px-10 min-h-screen w-full">
                    {/* Hero Section */}
                    <div className="mb-stack-gap-lg">
                        <h2 className="font-display-lg text-display-lg text-on-surface mb-stack-gap-sm">{strings.TITLE}</h2>
                        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
                            {strings.SUBTITLE}
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <section className="mb-stack-gap-lg flex flex-wrap items-center gap-stack-gap-md">
                        <div className="flex-1 min-w-[300px] relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
                            <input className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-body-md" placeholder={strings.SEARCH_PLACEHOLDER} type="text" />
                        </div>
                        <div className="flex gap-stack-gap-sm overflow-x-auto pb-2 scrollbar-hide">
                            <button className="whitespace-nowrap px-6 py-2 bg-primary text-on-primary rounded-full font-label-caps text-label-caps shadow-md active:scale-95 transition-transform">{strings.ALL_EXPERTS}</button>
                            <button className="whitespace-nowrap px-6 py-2 bg-surface text-on-surface-variant border border-outline-variant rounded-full font-label-caps text-label-caps hover:bg-surface-container-high active:scale-95 transition-all">{strings.AI}</button>
                            <button className="whitespace-nowrap px-6 py-2 bg-surface text-on-surface-variant border border-outline-variant rounded-full font-label-caps text-label-caps hover:bg-surface-container-high active:scale-95 transition-all">{strings.DATA_SCIENCE}</button>
                            <button className="whitespace-nowrap px-6 py-2 bg-surface text-on-surface-variant border border-outline-variant rounded-full font-label-caps text-label-caps hover:bg-surface-container-high active:scale-95 transition-all">{strings.SAAS}</button>
                            <button className="whitespace-nowrap px-6 py-2 bg-surface text-on-surface-variant border border-outline-variant rounded-full font-label-caps text-label-caps hover:bg-surface-container-high active:scale-95 transition-all">{strings.UX}</button>
                        </div>
                    </section>

                    {/* Instructor Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-stack-gap-md">
                        {MOCK_INSTRUCTORS.map((instructor) => (
                            <div key={instructor.id} className={`${styles.instructorCard} group relative bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300`}>
                                <div className="aspect-[4/5] w-full overflow-hidden relative">
                                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={`Portrait of ${instructor.name}`} src={instructor.imageUrl} />
                                    {instructor.isTopRated && (
                                        <div className="absolute top-3 right-3 bg-success/90 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">{strings.TOP_RATED}</div>
                                    )}
                                </div>
                                <div className="p-stack-gap-md">
                                    <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{instructor.name}</h3>
                                    <p className="text-primary font-bold text-body-sm uppercase tracking-wide mb-3">{instructor.role}</p>
                                    <p className="text-on-surface-variant text-body-sm line-clamp-2">{instructor.description}</p>
                                </div>
                                <div className="px-stack-gap-md pb-stack-gap-md pt-0 flex justify-between items-center">
                                    <div className="flex items-center gap-1 text-warning">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-body-sm font-bold">{instructor.rating}</span>
                                        <span className="text-outline text-[12px] font-normal">({instructor.reviews})</span>
                                    </div>
                                    <Link href={`${ROUTES.INSTRUCTOR_DIRECTORY}/${instructor.id}`} className="text-primary font-label-caps text-label-caps hover:underline">{strings.VIEW_PROFILE}</Link>
                                </div>
                            </div>
                        ))}

                        {/* Become an Instructor CTA Card */}
                        <div className="col-span-1 sm:col-span-2 flex flex-col justify-center items-center p-stack-gap-lg bg-primary-fixed text-on-primary-fixed rounded-xl border-2 border-dashed border-primary/20 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-primary text-3xl">school</span>
                                </div>
                                <h3 className="font-headline-lg text-headline-lg mb-2">{strings.CTA_TITLE}</h3>
                                <p className="text-body-md font-body-md mb-6 max-w-md mx-auto text-on-primary-fixed-variant">{strings.CTA_DESC}</p>
                                <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps text-label-caps shadow-lg hover:shadow-xl active:scale-95 transition-all">{strings.APPLY_TEACH}</button>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="mt-stack-gap-lg flex justify-center items-center gap-4">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <span className="font-label-caps text-label-caps text-primary bg-primary-container/20 w-10 h-10 flex items-center justify-center rounded-full">1</span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high cursor-pointer transition-colors">2</span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high cursor-pointer transition-colors">3</span>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};
