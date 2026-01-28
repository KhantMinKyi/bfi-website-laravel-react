<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GeneralPageRouteController extends Controller
{
    //
    public function ourHistoryPage(){
        return Inertia::render('front-end/about_us/OurHistory', [
            // 1. We pass this 'seo' object to the frontend
            'seo' => [
                'title' => 'Our History | BFI Education Services',
                'description' => 'Established in June 2000 in Yangon, BFI schools (formerly Horizon International Schools) are committed to providing high-quality international education. Every parent hopes for the best learning environment for their child—one that is positive, enriching, and well-equipped to prepare them for future challenges in an increasingly interconnected world.',
                'keywords' => 'BFI history, education Myanmar, international schools history, Horizon 2000, MISA 2004, SKT 2010, NISA 2013',
                'image' => asset('/img/bfi.webp'), 
                'canonicalUrl' => url()->current(),
            ]
        ]);
    }
    public function ourVMVPage(){
        return Inertia::render('front-end/about_us/VisionMissionValue', [
            // 1. We pass this 'seo' object to the frontend
            'seo' => [
                'title' => 'Vision, Mission & Values | BFI Education Services',
                'description' => 'We nurture students to become lifelong learners, responsible global citizens, and compassionate individuals through a challenging and balanced curriculum in a safe and caring environment.',
                'keywords' => 'BFI mission, education vision, core values, international schools Myanmar',
                'image' => asset('/img/bfi.webp'), 
                'canonicalUrl' => url()->current(),
            ]
        ]);
    }
    public function ourPhilosophyPage(){
        return Inertia::render('front-end/about_us/OurPhilosophy', [
            // 1. We pass this 'seo' object to the frontend
            'seo' => [
                'title' => 'Our Philosophy | BFI Education Services',
                'description' => 'Explore the five pillars of BFI Education Services philosophy - our commitment to excellence, holistic development, and creating future leaders.',
                'keywords' => 'education philosophy, holistic development, BFI pillars, international education Myanmar',
                'image' => asset('/img/bfi.webp'), 
                'canonicalUrl' => url()->current(),
            ]
        ]);
    }
    public function ourCSAPage(){
        return Inertia::render('front-end/about_us/CommunityServiceActivities', [
            // 1. We pass this 'seo' object to the frontend
            'seo' => [
                'title' => 'Community Service Activities | BFI Education Services',
                'description' => 'BFI Schools believe that it is essential to contribute to its community in meaningful ways. For this purpose the school promotes community service through the Creativity Action and Service (CAS) program as part of its holistic and balanced international education.',
                'keywords' => 'community service, student activities, social responsibility, BFI Myanmar',
                'image' => asset('/img/bfi.webp'), 
                'canonicalUrl' => url()->current(),
            ]
        ]);
    }
}
