/**
 * Instructor Directory Constants.
 * Defines strings and mock data used in the instructor directory feature.
 */

export const INSTRUCTOR_DIRECTORY_STRINGS = {
  en: {
    TITLE: "Instructor Directory",
    SUBTITLE: "Learn from the world's leading experts in AI, Data Science, and Modern Technology. Our faculty are practitioners at the forefront of their fields.",
    SEARCH_PLACEHOLDER: "Search by name or keyword...",
    ALL_EXPERTS: "All Experts",
    AI: "Artificial Intelligence",
    DATA_SCIENCE: "Data Science",
    SAAS: "SaaS Leadership",
    UX: "UX Engineering",
    TOP_RATED: "Top Rated",
    VIEW_PROFILE: "View Profile",
    CTA_TITLE: "Want to Join Our Faculty?",
    CTA_DESC: "Share your expertise with over 500,000 students worldwide. We provide the tools, you provide the knowledge.",
    APPLY_TEACH: "Apply to Teach",
    BROWSE_COURSES: "Browse Courses",
    HOME: "Home",
    SEARCH: "Search",
    LEARNING: "Learning",
    PROFILE: "Profile"
  },
  hi: {
    TITLE: "इंस्ट्रक्टर डायरेक्टरी",
    SUBTITLE: "AI, डेटा साइंस और आधुनिक तकनीक के दुनिया के अग्रणी विशेषज्ञों से सीखें। हमारे संकाय अपने क्षेत्रों में सबसे आगे हैं।",
    SEARCH_PLACEHOLDER: "नाम या कीवर्ड से खोजें...",
    ALL_EXPERTS: "सभी विशेषज्ञ",
    AI: "आर्टिफिशियल इंटेलिजेंस",
    DATA_SCIENCE: "डेटा साइंस",
    SAAS: "SaaS लीडरशिप",
    UX: "UX इंजीनियरिंग",
    TOP_RATED: "टॉप रेटेड",
    VIEW_PROFILE: "प्रोफ़ाइल देखें",
    CTA_TITLE: "क्या आप हमारे संकाय में शामिल होना चाहते हैं?",
    CTA_DESC: "दुनिया भर के 500,000 से अधिक छात्रों के साथ अपनी विशेषज्ञता साझा करें। हम उपकरण प्रदान करते हैं, आप ज्ञान प्रदान करते हैं।",
    APPLY_TEACH: "पढ़ाने के लिए आवेदन करें",
    BROWSE_COURSES: "कोर्स ब्राउज़ करें",
    HOME: "होम",
    SEARCH: "खोजें",
    LEARNING: "सीखना",
    PROFILE: "प्रोफ़ाइल"
  }
};

export const MOCK_INSTRUCTORS = [
  {
    id: 1,
    name: "Dr. Elena Vance",
    role: "AI Research Lead",
    description: "Former Senior Researcher at DeepMind, specializing in neural architecture and ethical AI implementation.",
    rating: 4.9,
    reviews: "2.4k",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVVP8B_Os-nKUAIVE0sGGzTDRaK70oSUtF7hGvce0hZ3X1QKyu3AZUTTpP59MoAeYkYuv2NeP3cLh2sPBCgnHMhiR3ud_sox1423sANkgs7P8jyJBBtqk8jU_vkqxNJ-iGJpcTBbg875z0P6psdeKXXUkU2xGaPmwfRvtzJZ7r8fTTtBJtSksD3P-TP2mYHJFNAukgpb95OhOQZHhXW40bpAOOlNhD1IiVHp7VF-AJo16E2P84xXmdZ7hMnZENWZTdGyUlCbFpPIHP",
    isTopRated: true,
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Senior Data Architect",
    description: "Specializes in scaling cloud data lakes and real-time streaming architectures for Fortune 500 companies.",
    rating: 4.8,
    reviews: "1.1k",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8YN6RMC2MECTqU8y9JnG5mqkipOsVlXeDwKRMxjzDO2EkhLmgVpkKcCYPyX1Xszanya4EcmQNZ9O5LBSwfzPFCbJxk6UZrHM7P8cRbqbj8Jx2bbUCShTGq-mgrbfEkFlukYTNxWxscJv3A3ClTe45LnR0-nhtg6uBOeNzo6tM8ZJit0CW91M0nU5GhJRnEBXwuTGVyqyDPn2UH2th2rVZNKNsCdmMJ5hdPzYUFQHD2pLprHniBTKo_eETF1dtRtvgYsALB4-B6s2u",
    isTopRated: false,
  },
  {
    id: 3,
    name: "Sienna Blake",
    role: "Lead Product Designer",
    description: "Champion of user-centric design systems and accessible interface architectures in complex SaaS environments.",
    rating: 5.0,
    reviews: "890",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVTHApx8c_K_rAWMimnFX0qZhdJYMznFqx1s7k07rWD26eDb_npqaDLbeGcCoet_vZ8B8JkRISiY60x4GOFNnMAOKixgslisnWunoA19fF6P_UAVTHxoAJQyIjdZ7kpBds0wWbw7UegnBDUgwF48hKu3njIWhD0Wfwt48TBREr8z8W3PjFTATcvwnrO6Cr5Tr6mndVWYSP53A-ntri0p31AFPvGJAAAj-XfV61PRDI0O5YrYjkaFAytrCpNNbgSWE5GNRuGTC2_sIH",
    isTopRated: false,
  },
  {
    id: 4,
    name: "Dr. Julian Reed",
    role: "SaaS Strategy Fellow",
    description: "Academic lead for global SaaS strategy at Harvard, advisor to multiple unicorn startups across Europe and the US.",
    rating: 4.7,
    reviews: "3.5k",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2XdjzKD7wVKc4ot_0KFV705GKUdU3Mv8Wxodt7fDtTFwjR70Z1QNsBCNiljg1l9fg_rEnn3JKlmWcBtrm--oEC987aFkyvLIVuSsQGaAjdpcVWcxc-d8U3gMN-Uyb6-WfrzZ9xJn_vopunrW1OpHFuj7T1ZeTEN811pkzwc6XWNtQegDI5dB2IxuRAdVoR1dHIGKAfydKTVgoupwmxZqj64okQEth3JRYmLXwofy1HH19SL8HOmh5ESsLNhCzioofcRxHoNJMub_3",
    isTopRated: false,
  },
  {
    id: 5,
    name: "Kai Nakamura",
    role: "Cloud Security Lead",
    description: "Expert in zero-trust architecture and ethical hacking, former security consultant for international banking systems.",
    rating: 4.9,
    reviews: "1.8k",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuANKkHkUpRQ1VQrpfjmQ1orhTVnlutvb0PEolQeHJFvuhUYpqkSFNH0z4D8Gz5OGF2Amms2XYVxuNLvsy8eV-6v_0nU-MG9rsWIEaDNNo7HU2tSy0m-AgAZfTmSwX6mayjlIj6e1a6F2nkwxmPfDrz_bDGKAI-pc-iiW4HCnR8uQIgjeI8K5iqg6Ere8Afnl1Fqn7y5Ir8xoaS7K0Fso24UhzVoIZcLg84rD8QeuoTYBUISS3RmQBg0LmeE2uORGz45jjwCERPPk4V2",
    isTopRated: false,
  },
  {
    id: 6,
    name: "Aria Solis",
    role: "Creative Director",
    description: "Merging fine arts with digital product design to create emotional and impactful user journeys across platforms.",
    rating: 4.8,
    reviews: "650",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj2h9Qx6BGNDKc6gcB12-UVrqHZw393JOHzXR8ikdf6in2j0qLqCunnxeJjTqeFe0Ij3bK7yUaUw1QxYUJ2QDQBQGfua9Luush0h-7_E5Q6qeSYzlldGu0LpCRSQv93FqjyHAl9P040qtiCD_S0FHdZ6gek1BY-Hart8N0e6wqFBTZTTSorbQcEy_2N03ATa_fGKQLzsuFWvnk0ihkCOdrshxSHK9xSRHrfTtYeXQi4j91ooprQTnF8r80E47-ltOb4FdKvuKM4AXl",
    isTopRated: false,
  }
];
