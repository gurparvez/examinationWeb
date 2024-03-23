import {announcement1} from "../assets/index.js";

const root = `https://examform.onrender.com/api/v1`
export const api = {
    login: `${root}/user/login`,
    logout: `${root}/user/logout`,
    formLive: `${root}/user/form-live`,
    updateProfile: `${root}/user/update-user`,
    allForms: `${root}/form/all-forms`,
    submitForm: `${root}/form//submit-form-data`,
    updatePassword: `${root}/user/update-password`,
    updateAvatar: `${root}/user/update-avatar`,
    updateForm: `${root}/form/update-from-data`,
    updatePrevYearData: `${root}/form/update-prev-year-data`,
    getUser: `${root}/user/get-user`
};
export const navLinks = [
    // id of first link should start with /
    {
        id: "/home",
        title: "Home",
    },
    {
        id: "courses",
        title: "Courses",
    },
];
export const navButtons = [
    {
        id: "examination",
        title: "Examination",
    },
]
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
        heading: "Important Announcements",
        title: "Info At A Glance",
        contentCard: [
            {
                title: "Scholarship Announcement",
                image: 'https://auts.ac.in/wp-content/uploads/2024/01/schlorship-ug-pg.png',
                content: "Apply Now for Scholarships to Secure Your Spot 100 percent Scholarship for UG Registration -Last date 15 January [...]",
                readMore: "https://auts.ac.in/announcement/100-percent-scholarship-apply-now/",
            },
            {
                title: "Ph.D Admission – Important Information and Entrance Exam Application",
                image: "https://auts.ac.in/wp-content/uploads/2023/12/phdpage-featured.jpg",
                content: "◉ Ph.D Admission Notice 2023 ◉ Syllabus for Ph.D entrance test ◉ Ph.D Entrance Examination 2023-2024 – Important Information ◉ Application Form for entrance test to admission to Ph.D. Programme 2024",
                readMore: "https://auts.ac.in/announcement/ph-d-admission-important-information-and-entrance-exam-application/",
            },
            {
                title: "ICSSR sponsored one day workshop (on 27 February, 2024)",
                image: "https://auts.ac.in/wp-content/uploads/2024/02/icssr-announcement-banner.jpg",
                content: "This workshop has a two-fold purpose. First to disseminate the key insights of the short-term empirical research project entitled [...]",
                readMore: "https://auts.ac.in/announcement/icssr-sponsored-one-day-workshop-on-27-february-2024/",
            },
        ],
    },
]
export const testimonials = [
    {
        heading: "Testimonials",
        title: "What Our Students Say",
        contentCard: [
            {
                title: "Resleen Kaur",
                image: "https://blog.auts.ac.in/wp-content/uploads/1.jpg",
                content: "My experience at Akal University is outstanding. I checked out many universities However, the other universities only offered specializations in Marketing, Finance, and Human Resources, and the fees were also relatively high. On the other hand, Akal University offers an MBA specializing in Business Analytics.",
            },
            {
                title: "Harjaganjot Kaur",
                image: "https://blog.auts.ac.in/wp-content/uploads/harjaganjot.png",
                content: "After completing my Grade 12th, I was looking for an institution that was highly equipped with the instruction of Physics, and that is when I stumbled upon Akal University. Akal University is highly equipped with advanced labs and faculty with outstanding credentials.",
            },
        ]
    }
]