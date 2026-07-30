/**
 * Instructor Detail Constants.
 * Contains strings and mock data for the instructor detail feature.
 */
export const INSTRUCTOR_DETAIL_STRINGS = {
  en: {
    BROWSE_COURSES: "Browse Courses",
    MY_LEARNING: "My Learning",
    PRICING: "Pricing",
    FOLLOW_INSTRUCTOR: "Follow Instructor",
    FOLLOWING: "Following",
    ABOUT: "About",
    CREDENTIALS: "Credentials",
    CONNECT: "Connect",
    STUDENTS: "Students",
    INSTRUCTOR_RATING: "Instructor Rating",
    COURSES: "Courses",
    REVIEWS: "Reviews",
    COURSES_BY: "Courses by",
    VIEW_ALL: "View All",
    BESTSELLER: "BESTSELLER",
    FREE_TRIAL: "FREE TRIAL"
  },
  hi: {
    BROWSE_COURSES: "कोर्स ब्राउज़ करें",
    MY_LEARNING: "मेरी सीख",
    PRICING: "मूल्य निर्धारण",
    FOLLOW_INSTRUCTOR: "इंस्ट्रक्टर को फॉलो करें",
    FOLLOWING: "फॉलो कर रहे हैं",
    ABOUT: "के बारे में",
    CREDENTIALS: "क्रेडेंशियल्स",
    CONNECT: "जुड़ें",
    STUDENTS: "छात्र",
    INSTRUCTOR_RATING: "इंस्ट्रक्टर रेटिंग",
    COURSES: "पाठ्यक्रम",
    REVIEWS: "समीक्षाएं",
    COURSES_BY: "द्वारा पाठ्यक्रम",
    VIEW_ALL: "सभी देखें",
    BESTSELLER: "बेस्टसेलर",
    FREE_TRIAL: "नि: शुल्क परीक्षण"
  }
};

export const MOCK_INSTRUCTOR_DETAIL = {
  id: 2,
  name: "Dr. Marcus Thorne",
  role: "Senior Fellow of Data Architecture & AI Ethics",
  location: "Stanford, CA",
  education: "PhD in Computer Science",
  about: "With over 15 years in Silicon Valley, Dr. Thorne focuses on the intersection of scalable data systems and ethical artificial intelligence. He has led engineering teams at Fortune 500 companies and contributed to 20+ open-source cloud frameworks.",
  skills: ["Cloud Architecture", "AI Ethics", "Scalability"],
  credentials: [
    {
      icon: "verified_user",
      title: "AWS Certified Architect",
      subtitle: "Professional Grade — 2023"
    },
    {
      icon: "history_edu",
      title: "published Author",
      subtitle: "\"The Data-First Enterprise\" — O'Reilly"
    }
  ],
  stats: {
    students: "12.5k",
    rating: "4.9",
    courses: "8",
    reviews: "1.2k"
  },
  courses: [
    {
      id: 1,
      title: "Modern Data Architecture: From SQL to Vector DBs",
      description: "Master the transition from legacy systems to high-performance AI-driven databases.",
      duration: "14h 30m",
      price: "$89.99",
      rating: "star",
      badge: "BESTSELLER",
      badgeClass: "bg-primary text-white",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8zkOUmeB2vq1IEuijnlRc-l8JTENC9BhriUMzoM7XqCpt1SPgGJWHB6aHYlzazIVmpPn-CQ3Okm-rIanReevme-wMzKsXk0lJ0hs3jQKGeWNzhObx0t8q-8zbwYHg8rG8VPMD3o0Gw17GclBHj20l8GEXLyQZU5bRKd-NJmWCjULkSALtK6arcaSklMX5hN3sxlP9MwzyDKEosMQgQghQn0GVknDyPZjx546vmV32IkdNwa3KP_zR6K70jueTkb9NGlC08wZKknj3"
    },
    {
      id: 2,
      title: "Ethical AI Frameworks for Product Leaders",
      description: "Implement responsible AI policies that balance innovation with safety and compliance.",
      duration: "8h 15m",
      price: "$54.99",
      badge: null,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxHh5DYMHEO9D-KBEvdvjiLAtQCNYjs38wz_dsLy-evYbR-8koLjPfslc_IrGV3iIfD5x2VyHFotWOUAmpAf2XYG1NJe2FKzJNhrfww2nZc2sPIYujXkRIcsWf_aw7wwwfTnu4TSyt1HomKZ6euBPNNYZNPAyHAgGFi_I2IAzRwqtMZdQXyqKROfx2R0K-ZxwfMG5bjfEC9tEJuNKKzg1g-EK2yVy2dXcJe-fgF85yNuM-4aw1hBMf4AoA4Nk_xSB1WfRmBdMZoRVn"
    },
    {
      id: 3,
      title: "Enterprise Cloud Security 2024",
      description: "Advanced strategies for securing multi-cloud environments against zero-day threats.",
      duration: "22h 45m",
      price: "$129.00",
      badge: null,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWz_kePitKEmgPSUd-gKMNBk4xOA-fLMcyHg18z0g3yiZ2M3-QX6rl5xES6SCp8d93UglXILvEnFmKkBu3qL1Nrdxu9yf8AQg1ORyPfzQjtyuWdH8_Cat7UO3w3bblJBcaI_4Kmwuo5WXT5wkDzsxuSvtmPehZ3qALIXTKUGJk1OPk-VkHC3Zfqcalb4r2Yiojw6ArtfPVPp5iFzDqvFzwWHncgCv86L3LtBD43Wkag8YgOD2ZNCKNOpZGvsfSeWHvN1Km6PvePUCd"
    },
    {
      id: 4,
      title: "Neural Networks: The Executive Overview",
      description: "Learn the fundamentals of deep learning without needing a math degree.",
      duration: "5h 00m",
      price: "$29.99",
      badge: "FREE TRIAL",
      badgeClass: "bg-on-surface-variant/80 text-white backdrop-blur",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCklsl26pcHAnM4VJlxyD5--DflxfbYOfngrq1x7QFNe2Ea_x7vqi1Flo-td6gf9iWlkSlS1z3J9br20sXmLMRj_vdDjFMqr5ACuP2qRWfV1WtHmjQOulXYtj9TzF3P2Khf65IxvwAvxCNwTbhZYGg7487nqyV5d9LSHbs-AaBBekSA-V82hWYD60ahRRuecrqa3GiuNWLcJNMxmnP6zE70gk4nQA8MHwn0s4ot23XKOWGrOpb6jA16GAYg6nPCpdRfq9GAFb6L9dG8"
    }
  ]
};
