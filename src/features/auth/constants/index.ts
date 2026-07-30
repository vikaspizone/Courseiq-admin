/**
 * Authentication Constants.
 * Defines constant values used across the auth feature.
 */

import { AuthUser } from "../types";

export const STATIC_USERS: AuthUser[] = [
  {
    id: "1",
    email: "ripu@gmail.com",
    password: "Ripu1234",
    name: "Ripu"
  }
];

export const AUTH_MESSAGES = {
  en: {
    INVALID_CREDENTIALS: "Invalid email or password",
    LOGIN_SUCCESS: "Login successful",
  },
  hi: {
    INVALID_CREDENTIALS: "अमान्य ईमेल या पासवर्ड",
    LOGIN_SUCCESS: "लॉगिन सफल",
  }
};

export const AUTH_STRINGS = {
  en: {
    TITLE: "Welcome Back",
    SUBTITLE: "Please enter your details to sign in to your account.",
    EMAIL_PLACEHOLDER: "name@company.com",
    PASSWORD_PLACEHOLDER: "••••••••",
    REMEMBER_ME: "Remember me for 30 days",
    FORGOT_PASSWORD: "Forgot password?",
    SIGN_IN_BUTTON: "Sign In",
    NO_ACCOUNT: "Don't have an account?",
    SIGN_UP_LINK: "Request Access",
    EMPOWERING: "Empowering Excellence",
    MASTER_FUTURE: "Master your future\nwith COURSIQ.",
    JOIN_STUDENTS: "Join over 50,000 students worldwide in a professional learning environment designed for deep focus and tangible career growth.",
    COMPLETION_RATE: "Course Completion Rate",
    SATISFACTION: "Student Satisfaction",
    CONTINUE_GOOGLE: "Continue with Google",
    OR_EMAIL: "Or sign in with email",
    TERMS: "Terms of Service",
    PRIVACY: "Privacy Policy",
    SUPPORT: "Support",
    EMAIL_LABEL: "Email Address",
    PASSWORD_LABEL: "Password",
    REGISTER_TITLE: "Create your account",
    REGISTER_SUBTITLE: "Start your learning journey today.",
    REGISTER_GOOGLE: "Sign up with Google",
    OR_USE_EMAIL: "Or use email",
    FULL_NAME: "Full Name",
    FULL_NAME_PLACEHOLDER: "Alex Johnson",
    I_AGREE_TO: "I agree to the ",
    AND: " and ",
    AGREEMENT_END: ".",
    SETTING_UP_ACCOUNT: "Setting up account...",
    WELCOME: "Welcome!",
    CREATE_ACCOUNT_BUTTON: "Create Account",
    ALREADY_HAVE_ACCOUNT: "Already have an account?",
    ELEVATE_CAREER: "Elevate Your Career",
    ELEVATE_SUBTITLE: "Join thousands of professionals mastering new skills through the most precise and focused learning platform.",
    ACCREDITED: "Accredited",
    ACCREDITED_DESC: "Industry-standard certificates accepted globally.",
    COMMUNITY_TITLE: "200k+",
    COMMUNITY_DESC: "Join a community of dedicated lifelong learners.",
    FORGOT_TITLE: "Forgot Password?",
    FORGOT_SUBTITLE: "No worries, it happens. Please enter the email address associated with your account.",
    REGISTERED_EMAIL: "Registered Email Address",
    SEND_RESET_LINK: "Send Reset Link",
    SENDING: "Sending...",
    RESET_SUCCESS: "Check your inbox! We've sent password reset instructions to your email.",
    BACK_TO_SIGNIN: "Back to Sign In",
    STILL_TROUBLE: "Still having trouble?",
    CONTACT_SUPPORT: "Contact Support"
  },
  hi: {
    TITLE: "वापसी पर स्वागत है",
    SUBTITLE: "अपने खाते में साइन इन करने के लिए कृपया अपना विवरण दर्ज करें।",
    EMAIL_PLACEHOLDER: "नाम@company.com",
    PASSWORD_PLACEHOLDER: "••••••••",
    REMEMBER_ME: "मुझे 30 दिनों के लिए याद रखें",
    FORGOT_PASSWORD: "पासवर्ड भूल गए?",
    SIGN_IN_BUTTON: "साइन इन करें",
    NO_ACCOUNT: "क्या आपके पास खाता नहीं है?",
    SIGN_UP_LINK: "पहुंच का अनुरोध करें",
    EMPOWERING: "उत्कृष्टता को सशक्त बनाना",
    MASTER_FUTURE: "COURSIQ के साथ\nअपने भविष्य को संवारें।",
    JOIN_STUDENTS: "गहरे ध्यान और वास्तविक करियर विकास के लिए डिज़ाइन किए गए पेशेवर सीखने के माहौल में दुनिया भर के 50,000 से अधिक छात्रों से जुड़ें।",
    COMPLETION_RATE: "पाठ्यक्रम पूरा होने की दर",
    SATISFACTION: "छात्र संतुष्टि",
    CONTINUE_GOOGLE: "Google के साथ जारी रखें",
    OR_EMAIL: "या ईमेल से साइन इन करें",
    TERMS: "सेवा की शर्तें",
    PRIVACY: "गोपनीयता नीति",
    SUPPORT: "सहयोग",
    EMAIL_LABEL: "ईमेल पता",
    PASSWORD_LABEL: "पासवर्ड",
    REGISTER_TITLE: "अपना खाता बनाएं",
    REGISTER_SUBTITLE: "आज ही अपनी सीखने की यात्रा शुरू करें।",
    REGISTER_GOOGLE: "Google के साथ साइन अप करें",
    OR_USE_EMAIL: "या ईमेल का उपयोग करें",
    FULL_NAME: "पूरा नाम",
    FULL_NAME_PLACEHOLDER: "एलेक्स जॉनसन",
    I_AGREE_TO: "मैं ",
    AND: " और ",
    AGREEMENT_END: " से सहमत हूं।",
    SETTING_UP_ACCOUNT: "खाता सेट किया जा रहा है...",
    WELCOME: "स्वागत है!",
    CREATE_ACCOUNT_BUTTON: "खाता बनाएं",
    ALREADY_HAVE_ACCOUNT: "क्या आपके पास पहले से खाता है?",
    ELEVATE_CAREER: "अपने करियर को ऊंचाइयों पर ले जाएं",
    ELEVATE_SUBTITLE: "सबसे सटीक और केंद्रित शिक्षण मंच के माध्यम से नए कौशल में महारत हासिल करने वाले हजारों पेशेवरों से जुड़ें।",
    ACCREDITED: "मान्यता प्राप्त",
    ACCREDITED_DESC: "वैश्विक स्तर पर स्वीकृत उद्योग-मानक प्रमाणपत्र।",
    COMMUNITY_TITLE: "2 लाख+",
    COMMUNITY_DESC: "समर्पित आजीवन शिक्षार्थियों के समुदाय में शामिल हों।",
    FORGOT_TITLE: "पासवर्ड भूल गए?",
    FORGOT_SUBTITLE: "कोई बात नहीं, ऐसा होता है। कृपया अपने खाते से जुड़ा ईमेल पता दर्ज करें।",
    REGISTERED_EMAIL: "पंजीकृत ईमेल पता",
    SEND_RESET_LINK: "रीसेट लिंक भेजें",
    SENDING: "भेजा जा रहा है...",
    RESET_SUCCESS: "अपना इनबॉक्स जांचें! हमने आपके ईमेल पर पासवर्ड रीसेट निर्देश भेज दिए हैं।",
    BACK_TO_SIGNIN: "साइन इन पर वापस जाएं",
    STILL_TROUBLE: "अभी भी परेशानी हो रही है?",
    CONTACT_SUPPORT: "समर्थन से संपर्क करें"
  }
};
