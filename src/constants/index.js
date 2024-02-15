const root = `/api/v1`
export const api = {
    login: `${root}/user/login`,
    logout: `${root}/user/logout`,
    formLive: `${root}/user/form-live`
};
export const navLinks = [
    {
        id: "/home",
        title: "Home",
    },
    {
        id: "courses",
        title: "Courses",
    },
];
export const footerLinks = [
    {
        title: "Useful Links",
        links: [
            {
                name: "Content",
                link: "https://www.hoobank.com/content/",
            },
            {
                name: "How it Works",
                link: "https://www.hoobank.com/how-it-works/",
            },
            {
                name: "Create",
                link: "https://www.hoobank.com/create/",
            },
            {
                name: "Explore",
                link: "https://www.hoobank.com/explore/",
            },
            {
                name: "Terms & Services",
                link: "https://www.hoobank.com/terms-and-services/",
            },
        ],
    },
    {
        title: "Community",
        links: [
            {
                name: "Help Center",
                link: "https://www.hoobank.com/help-center/",
            },
            {
                name: "Partners",
                link: "https://www.hoobank.com/partners/",
            },
            {
                name: "Suggestions",
                link: "https://www.hoobank.com/suggestions/",
            },
            {
                name: "Blog",
                link: "https://www.hoobank.com/blog/",
            },
            {
                name: "Newsletters",
                link: "https://www.hoobank.com/newsletters/",
            },
        ],
    },
    {
        title: "Partner",
        links: [
            {
                name: "Our Partner",
                link: "https://www.hoobank.com/our-partner/",
            },
            {
                name: "Become a Partner",
                link: "https://www.hoobank.com/become-a-partner/",
            },
        ],
    },
];
export const socialMedia = [
    {
        id: "social-media-1",
        icon: "instagram",
        link: "https://www.instagram.com/",
    },
    {
        id: "social-media-2",
        icon: "facebook",
        link: "https://www.facebook.com/",
    },
    {
        id: "social-media-3",
        icon: "twitter",
        link: "https://www.twitter.com/",
    },
    {
        id: "social-media-4",
        icon: "linkedin",
        link: "https://www.linkedin.com/",
    },
];
export const aboutUniversity = [
    {
        heading: "About Our University",
        title: "A Few Words About the University",
        info1: "From here… great scholars will spread the divine message of Sri Guru Granth Sahib among the people in the entire world in their respective languages resulting in universal peace and brotherhood:",
        info2: "Three centuries ago, the tenth Master, Guru Gobind Singh Ji stayed at Talwandi Sabo, finalized the compilation of Guru Granth Sahib Ji and prophesied that this place will manifest as Guru Ki Kashi-a great Centre of teaching and learning from where will emerge great scholars of Sikhism.",
        content: [
            {
                id: "01",
                title: "Unique at AU",
                content: "Our endeavour at Akal University is to help the students to discriminate between the valuable and the superficial in life.",
            },
            {
                id: "02",
                title: "Akal Alumni",
                content: "Since 2015 more than 700 students have graduated from Akal University and many of them are pursuing careers in the social sector.",
            },
            {
                id: "03",
                title: "Scientific Events",
                content: "The scientific events that shaped the decade. The microbes inside you, the edges of the known universe, and all the amazing stuff in between.",
            },
            {
                id: "04",
                title: "Societies & Clubs",
                content: "Clubs and societies are possibly one of the single most important aspects of student life.",
            },
        ],
    },
];
export const announcements = [
    {
        heading: " Info At A Glance",
        title: "Important Announcements",
        contentCard: [
            {
                title: "View all Announcements",
                content: "This is the announcement page. Click on the announcement to know more about it. Also see RESOURCES section in the Website Footer to get to this page",
                readmore: "https://auts.ac.in/announcement/view-all-announcements/",
            },
            {
                title: "100% Scholarship - Apply Now !",
                image: "./src/assets/announcements1.jpg",
                content: "",
                readmore: "",
            },
            {
                title: "",
                image: "",
                content: "",
                readmore: "",
            },
        ],
    },
]