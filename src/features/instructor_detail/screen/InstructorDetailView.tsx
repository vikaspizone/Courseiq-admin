'use client';
/**
 * InstructorDetailView component.
 * Displays the detailed profile of an instructor including their credentials and courses.
 */

import { useInstructorDetail } from '../hooks/useInstructorDetail';
import { Header } from "@/features/common/header/components/Header";
import { NavigationMenu } from "@/features/common/header/components/NavigationMenu";
import { useLanguage } from "@/features/common/lang/contexts/LanguageContext";
import { INSTRUCTOR_DETAIL_STRINGS, MOCK_INSTRUCTOR_DETAIL } from '../constants';
import { MOCK_INSTRUCTORS } from '@/features/instructor_directory/constants';
import styles from '../styles/instructor_detail.module.css';

export const InstructorDetailView = ({ id }: { id?: string }) => {
    const { 
        userEmail, 
        isSidebarOpen, 
        setIsSidebarOpen, 
        handleLogout,
        isFollowing,
        handleFollow,
        showToast 
    } = useInstructorDetail();
    
    const { language } = useLanguage();
    // Assuming 'en' by default as language fallback
    const strings = INSTRUCTOR_DETAIL_STRINGS[language as keyof typeof INSTRUCTOR_DETAIL_STRINGS] || INSTRUCTOR_DETAIL_STRINGS.en;
    
    const baseInstructor = MOCK_INSTRUCTORS.find(inst => inst.id.toString() === id) || MOCK_INSTRUCTORS[1];
    const instructor = {
        ...MOCK_INSTRUCTOR_DETAIL,
        name: baseInstructor.name,
        role: baseInstructor.role,
        about: baseInstructor.description,
        imageUrl: baseInstructor.imageUrl
    };

    if (!userEmail) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#faf8ff] overflow-hidden text-[#191b23] selection:bg-primary-fixed selection:text-on-primary-fixed font-body-md">
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

                <main className="pb-32 px-6 lg:px-10 min-h-screen w-full">
                    {/* Instructor Hero Section */}
                    <section className="mb-8">
                        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-[-80px] z-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-end gap-8 px-4 md:px-8">
                            <div className="relative group">
                                <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl border-4 border-[#faf8ff] shadow-xl overflow-hidden bg-white">
                                    <img className="w-full h-full object-cover" alt={instructor.name} src={instructor.imageUrl} />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-2 border-[#faf8ff] shadow-lg" title="Verified Expert">
                                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-end w-full pb-4">
                                <div className="mb-4 md:mb-0">
                                    <h2 className="font-headline-lg text-3xl text-gray-900 font-bold">{instructor.name}</h2>
                                    <p className="font-body-md text-blue-700 font-semibold">{instructor.role}</p>
                                    <div className="flex items-center gap-4 mt-2 text-gray-600 font-body-sm">
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">location_on</span> {instructor.location}</span>
                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">school</span> {instructor.education}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={handleFollow}
                                        className={`px-6 py-2.5 font-label-caps text-[12px] font-bold uppercase rounded-lg shadow-sm active:scale-95 transition-all ${isFollowing ? 'bg-gray-200 text-gray-900' : 'bg-blue-700 text-white hover:opacity-90'}`}
                                    >
                                        {isFollowing ? strings.FOLLOWING : strings.FOLLOW_INSTRUCTOR}
                                    </button>
                                    <button className="p-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="material-symbols-outlined">mail</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Bento Grid Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-20">
                        {/* Sidebar: About & Socials */}
                        <aside className="lg:col-span-4 space-y-6">
                            {/* Bio Card */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <h3 className="font-headline-md text-[20px] mb-4 text-gray-900 font-semibold">{strings.ABOUT} {instructor.name.split(' ').pop()}</h3>
                                <p className="font-body-md text-gray-600 leading-relaxed">
                                    {instructor.about}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {instructor.skills.map((skill, index) => (
                                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full font-label-caps text-[12px] text-gray-700 font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Credentials Card */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <h3 className="font-headline-md text-[20px] mb-4 text-gray-900 font-semibold">{strings.CREDENTIALS}</h3>
                                <ul className="space-y-4">
                                    {instructor.credentials.map((cred, index) => (
                                        <li key={index} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-blue-600">{cred.icon}</span>
                                            </div>
                                            <div>
                                                <p className="font-label-caps text-[12px] text-gray-900 font-bold uppercase">{cred.title}</p>
                                                <p className="text-[12px] text-gray-500">{cred.subtitle}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Social Links */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <h3 className="font-label-caps text-[12px] text-gray-500 uppercase font-bold mb-4">{strings.CONNECT}</h3>
                                <div className="flex gap-4">
                                    <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-all text-gray-600" href="#">
                                        <span className="material-symbols-outlined text-[20px]">public</span>
                                    </a>
                                    <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-all text-gray-600" href="#">
                                        <span className="material-symbols-outlined text-[20px]">link</span>
                                    </a>
                                    <a className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-all text-gray-600" href="#">
                                        <span className="material-symbols-outlined text-[20px]">group</span>
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content: Courses & Stats */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Instructor Stats Bento Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
                                    <p className="font-headline-lg text-3xl font-bold text-blue-700">{instructor.stats.students}</p>
                                    <p className="font-label-caps text-[12px] text-gray-600 font-medium uppercase mt-1">{strings.STUDENTS}</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
                                    <p className="font-headline-lg text-3xl font-bold text-blue-700">{instructor.stats.rating}</p>
                                    <p className="font-label-caps text-[12px] text-gray-600 font-medium uppercase mt-1">{strings.INSTRUCTOR_RATING}</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
                                    <p className="font-headline-lg text-3xl font-bold text-blue-700">{instructor.stats.courses}</p>
                                    <p className="font-label-caps text-[12px] text-gray-600 font-medium uppercase mt-1">{strings.COURSES}</p>
                                </div>
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
                                    <p className="font-headline-lg text-3xl font-bold text-blue-700">{instructor.stats.reviews}</p>
                                    <p className="font-label-caps text-[12px] text-gray-600 font-medium uppercase mt-1">{strings.REVIEWS}</p>
                                </div>
                            </div>

                            {/* Course List */}
                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-headline-md text-2xl font-bold text-gray-900">{strings.COURSES_BY} {instructor.name.split(' ').pop()}</h3>
                                    <a className="text-blue-700 font-label-caps text-[12px] font-bold uppercase hover:underline" href="#">{strings.VIEW_ALL}</a>
                                </div>

                                {/* Course Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {instructor.courses.map((course) => (
                                        <div key={course.id} className={`${styles.courseCardHover} group bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300`}>
                                            <div className="h-40 overflow-hidden relative">
                                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={course.title} src={course.imageUrl} />
                                                {course.badge && (
                                                    <div className={`absolute top-2 left-2 font-label-caps text-[10px] px-2 py-0.5 rounded-full font-bold ${course.badgeClass || 'bg-blue-700 text-white'}`}>
                                                        {course.badge}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 flex flex-col h-[calc(100%-10rem)]">
                                                <div className="flex justify-between items-start mb-1 gap-2">
                                                    <h4 className="font-headline-md text-[18px] font-bold text-gray-900 leading-tight flex-1">{course.title}</h4>
                                                    <span className="material-symbols-outlined text-yellow-500 text-[20px]" style={{fontVariationSettings: course.rating ? "'FILL' 1" : "'FILL' 0"}}>star</span>
                                                </div>
                                                <p className="text-body-sm text-[14px] text-gray-600 line-clamp-2 mb-4 flex-1">{course.description}</p>
                                                <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                                                    <span className="font-body-sm text-[14px] text-gray-600 flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[16px]">schedule</span> {course.duration}
                                                    </span>
                                                    <p className="font-headline-md text-[18px] font-bold text-blue-700">{course.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Success Modal Interaction */}
            <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl font-label-caps text-[12px] font-bold uppercase pointer-events-none transition-all duration-300 z-[100] ${showToast ? 'opacity-100' : 'opacity-0'}`}>
                Following {instructor.name}
            </div>
        </div>
    );
};
