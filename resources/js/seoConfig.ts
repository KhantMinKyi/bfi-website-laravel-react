interface PageSEO {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    type?: 'website' | 'article';
}

interface SEOConfig {
    [key: string]: PageSEO;
}

export const seoConfig: SEOConfig = {
    // ==========================================
    // HOME PAGE
    // ==========================================
    home: {
        title: 'BFI Education Services - World-Class International Schools in Myanmar',
        description: 'BFI Education Services manages 9+ international schools across Myanmar, offering world-class programmes, foreign teachers, IB Diploma pathways, events, and admissions support.',
        keywords: 'BFI Education, international schools Myanmar, IB Diploma, foreign teachers, education services',
        image: '/img/bfi.webp',
    },
    
    // ==========================================
    // ABOUT US PAGES
    // Route name format: 'front-end.about_us.ourhistory' becomes 'our_history'
    // ==========================================
    'front-end.about_us.ourhistory': {
        title: 'Our History | BFI Education Services',
        description: 'Established in June 2000 in Yangon, BFI schools (formerly Horizon International Schools) are committed to providing high-quality international education. Every parent hopes for the best learning environment for their child—one that is positive, enriching, and well-equipped to prepare them for future challenges in an increasingly interconnected world.',
        keywords: 'BFI history, education Myanmar, international schools history, Horizon 2000, MISA 2004, SKT 2010, NISA 2013',
        image: '/img/banner5.webp',
    },
    
    'front-end.about_us.visionmissionvalue': {
        title: 'Vision, Mission & Values | BFI Education Services',
        description: 'We nurture students to become lifelong learners, responsible global citizens, and compassionate individuals through a challenging and balanced curriculum in a safe and caring environment.',
        keywords: 'BFI mission, education vision, core values, international schools Myanmar',
        image: '/img/bfi.webp',
    },
    
    'front-end.about_us.ourphilosophy': {
        title: 'Our Philosophy | BFI Education Services',
        description: 'Explore the five pillars of BFI Education Services philosophy - our commitment to excellence, holistic development, and creating future leaders.',
        keywords: 'education philosophy, holistic development, BFI pillars, international education Myanmar',
        image: '/img/bfi.webp',
    },
    
    
    'front-end.about_us.communityserviceactivities': {
        title: 'Community Service Activities | BFI Education Services',
        description: 'BFI Schools believe that it is essential to contribute to its community in meaningful ways. For this purpose the school promotes community service through the Creativity Action and Service (CAS) program as part of its holistic and balanced international education.',
        keywords: 'community service, student activities, social responsibility, BFI Myanmar',
        image: '/img/bfi.webp',
    },
    
    // ==========================================
    // SISTER SCHOOLS
    // Dynamic routes: handled by route params
    // Example: 'front-end.sister_schools.school-data.{slug}'
    // ==========================================
    'sister_school.indexpage': {
        title: 'Our Schools | BFI Education Services',
        description: 'Explore our group of world-class international schools providing exceptional education across Myanmar.',
        keywords: 'BFI schools, international schools Myanmar, sister schools',
        image: '/img/bfi.webp',
    },
    
    // ==========================================
    // CURRICULUM / ACADEMICS
    // Dynamic routes: handled by route params
    // ==========================================
    'curriculum.indexpage': {
        title: 'Academic Programmes | BFI Education Services',
        description: 'Discover our comprehensive range of international educational programmes including IB Diploma, Cambridge Curriculum, and more.',
        keywords: 'IB Diploma Myanmar, Cambridge curriculum, international programmes, academic excellence',
        image: '/img/bfi.webp',
    },
    
    // ==========================================
    // COMPETITION
    // Dynamic routes: handled by route params
    // ==========================================
    'competition.indexpage': {
        title: 'Competitions | BFI Education Services',
        description: 'Explore academic and sports competitions organized by BFI Education Services including Mathemania, Spelling Bee, Science Projects, and more.',
        keywords: 'BFI competitions, academic competitions Myanmar, sports tournaments, student competitions',
        image: '/img/bfi.webp',
    },
    
    // ==========================================
    // COMMUNITY
    // ==========================================
    'newsevent': {
        title: 'News & Events | BFI Education Services',
        description: 'Stay updated with the latest news, events, and achievements from BFI Education Services and our network of international schools in Myanmar.',
        keywords: 'BFI news, school events Myanmar, education updates, student achievements',
        image: '/img/bfi.webp',
        type: 'article',
    },
    
    'front-end.community.alumni': {
        title: 'Alumni Network | BFI Education Services',
        description: 'Join our global network of BFI alumni making a difference around the world. Connect, share experiences, and stay engaged.',
        keywords: 'BFI alumni, graduates network, international school alumni Myanmar',
        image: '/img/bfi.webp',
    },
    
    'front-end.community.contactus': {
        title: 'Contact Us | BFI Education Services',
        description: 'Get in touch with BFI Education Services. Find our contact information, locations, and reach out to us for admissions, inquiries, or support.',
        keywords: 'contact BFI, education Myanmar contact, international schools inquiry, BFI address',
        image: '/img/bfi.webp',
    },
    
    'front-end.community.faq': {
        title: 'Frequently Asked Questions | BFI Education Services',
        description: 'Find answers to common questions about admissions, curriculum, facilities, and more at BFI Education Services.',
        keywords: 'BFI FAQ, school questions, admissions help, international schools Myanmar',
        image: '/img/bfi.webp',
    },
    
    // ==========================================
    // CAREER
    // ==========================================
    'front-end.career.career': {
        title: 'Careers | BFI Education Services',
        description: 'Join our team of dedicated educators and professionals. Explore career opportunities at BFI Education Services.',
        keywords: 'BFI careers, teaching jobs Myanmar, international school jobs, education careers',
        image: '/img/bfi.webp',
    },
    
    // Job detail page (dynamic)
    'front-end.career.careerjobdetail': {
        title: 'Job Opportunities | BFI Education Services',
        description: 'Explore exciting career opportunities at BFI Education Services and join our team of world-class educators.',
        keywords: 'teaching positions Myanmar, international school jobs, BFI recruitment',
        image: '/img/bfi.webp',
    },
    
    // ==========================================
    // POST DETAIL (dynamic)
    // ==========================================
    'postdetail': {
        title: 'News & Updates | BFI Education Services',
        description: 'Read the latest news and updates from BFI Education Services.',
        keywords: 'BFI news, school updates, education Myanmar',
        image: '/img/bfi.webp',
        type: 'article',
    },
    
    // ==========================================
    // DEFAULT FALLBACK
    // ==========================================
    default: {
        title: 'BFI Education Services - International Schools in Myanmar',
        description: 'BFI Education Services provides world-class international education across Myanmar with experienced foreign teachers and comprehensive programmes.',
        keywords: 'BFI Education, international schools Myanmar, quality education',
        image: '/img/bfi.webp',
    },
};

export const getSEOConfig = (routeName?: string): PageSEO => {
    if (!routeName) return seoConfig.default;
    
    // Try exact match first
    if (seoConfig[routeName]) {
        return seoConfig[routeName];
    }
    
    // Try without 'front-end.' prefix for fallback
    const withoutPrefix = routeName.replace(/^front-end\./, '');
    if (seoConfig[withoutPrefix]) {
        return seoConfig[withoutPrefix];
    }
    
    // Return default if no match
    return seoConfig.default;
};