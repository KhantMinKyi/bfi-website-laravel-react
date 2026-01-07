import AppearanceToggleTab from '@/components/appearance-tabs';
import { Link, usePage } from '@inertiajs/react';
import { routePath } from './front-end-layout';

interface MobileLayoutProps {
    toggleSubMenu: (menu: string) => void;
    activeSubMenu: string | null;
    currentPath: string | null;
}
interface SisterSchoolNav {
    slug: string;
    name: string;
    // add any other fields
}
interface CurriculumNav {
    slug: string;
    name: string;
    // add any other fields
}
interface CompetitionNav {
    slug: string;
    name: string;
    // add any other fields
}

interface SharedProps {
    sisterSchools: SisterSchoolNav[];
    curriculum: CurriculumNav[];
    competitions: CompetitionNav[];
    [key: string]: any; //
}

function MobileLayout({ toggleSubMenu, activeSubMenu, currentPath }: MobileLayoutProps) {
    const { sisterSchools, curriculum, competitions } = usePage<SharedProps>().props;
    return (
        <nav className="font-merriweather mt-16 space-y-4 p-6 text-gray-800 uppercase dark:text-white">
            {/* Home */}
            <div>
                <Link
                    prefetch
                    href={route('home')}
                    className={`block py-2 uppercase ${currentPath === routePath('home') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                >
                    Home
                </Link>
            </div>

            {/* About us  */}
            <div>
                <button onClick={() => toggleSubMenu('about_us')} className="flex w-full items-center justify-between py-2 text-left uppercase">
                    About Us
                    <span>{activeSubMenu === 'about_us' ? '▲' : '▼'}</span>
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        activeSubMenu !== 'sister_schools' &&
                        activeSubMenu !== 'curriculum' &&
                        activeSubMenu !== 'admissions' &&
                        activeSubMenu !== 'competition' &&
                        activeSubMenu !== 'community' &&
                        (activeSubMenu === 'about_us' ||
                            currentPath === routePath('our_history') ||
                            currentPath === routePath('vision_mission_value') ||
                            currentPath === routePath('philosophy') ||
                            // currentPath === routePath('leadership_teams') ||
                            currentPath === routePath('community_service_activities') ||
                            currentPath === routePath('bfi_advantage'))
                            ? 'max-h-64'
                            : 'max-h-0'
                    }`}
                >
                    <ul className="mt-2 ml-4 space-y-6 text-sm text-gray-600 dark:text-white">
                        <li>
                            <Link
                                prefetch
                                href={route('our_history')}
                                className={`${currentPath === routePath('our_history') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                Our History
                            </Link>
                        </li>
                        <li>
                            <Link
                                prefetch
                                href={route('vision_mission_value')}
                                className={`${currentPath === routePath('vision_mission_value') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                Vision , Mission & Values
                            </Link>
                        </li>
                        <li>
                            <Link
                                prefetch
                                href={route('philosophy')}
                                className={`${currentPath === routePath('philosophy') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                Philosophy
                            </Link>
                        </li>

                        {/* <li>
                            <Link prefetch
                                href={route('leadership_teams')}
                                className={`${currentPath === routePath('leadership_teams') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                Leaderships Teams
                            </Link>
                        </li> */}
                        <li>
                            <Link
                                prefetch
                                href={route('bfi_advantage')}
                                className={`${currentPath === routePath('bfi_advantage') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                BFI Advantage
                            </Link>
                        </li>
                        <li>
                            <Link
                                prefetch
                                href={route('community_service_activities')}
                                className={`${currentPath === routePath('community_service_activities') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                Community Service Activities
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Sister Schools */}
            <div>
                <button onClick={() => toggleSubMenu('sister_schools')} className="flex w-full items-center justify-between py-2 text-left uppercase">
                    Schools
                    <span>{activeSubMenu === 'sister_schools' ? '▲' : '▼'}</span>
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        activeSubMenu !== 'about_us' &&
                        activeSubMenu !== 'curriculum' &&
                        activeSubMenu !== 'admissions' &&
                        activeSubMenu !== 'competition' &&
                        activeSubMenu !== 'community' &&
                        (activeSubMenu === 'sister_schools' || sisterSchools.some((ss) => currentPath === '/sister_schools/school-data/' + ss.slug))
                            ? 'max-h-screen'
                            : 'max-h-0'
                    }`}
                >
                    <ul className="mt-2 ml-4 space-y-6 text-sm text-gray-600 dark:text-white">
                        {sisterSchools.map((ss) => (
                            <li key={ss.slug}>
                                <Link
                                    prefetch
                                    href={route('sister_school.data', ss.slug)}
                                    className={`${currentPath === '/sister_schools/school-data/' + ss.slug ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                                >
                                    {ss.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Curriculum*/}
            <div>
                <button onClick={() => toggleSubMenu('curriculum')} className="flex w-full items-center justify-between py-2 text-left uppercase">
                    Curriculum
                    <span>{activeSubMenu === 'curriculum' ? '▲' : '▼'}</span>
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        activeSubMenu !== 'about_us' &&
                        activeSubMenu !== 'sister_schools' &&
                        activeSubMenu !== 'admissions' &&
                        activeSubMenu !== 'competition' &&
                        activeSubMenu !== 'community' &&
                        (activeSubMenu === 'curriculum' || curriculum.some((cc) => currentPath === '/curriculum/curriculum-data/' + cc.slug))
                            ? 'max-h-screen'
                            : 'max-h-0'
                    }`}
                >
                    <ul className="mt-2 ml-4 space-y-6 text-sm text-gray-600 dark:text-white">
                        {curriculum.map((cc) => (
                            <li key={cc.slug}>
                                <Link
                                    prefetch
                                    href={route('curriculum.data', cc.slug)}
                                    className={`${currentPath === '/curriculum/curriculum-data/' + cc.slug ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                                >
                                    {cc.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* COMPETITION*/}
            <div>
                <button onClick={() => toggleSubMenu('competition')} className="flex w-full items-center justify-between py-2 text-left uppercase">
                    COMPETITION
                    <span>{activeSubMenu === 'competition' ? '▲' : '▼'}</span>
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        activeSubMenu !== 'about_us' &&
                        activeSubMenu !== 'sister_schools' &&
                        activeSubMenu !== 'admissions' &&
                        activeSubMenu !== 'curriculum' &&
                        activeSubMenu !== 'community' &&
                        (activeSubMenu === 'competition' || competitions.some((cp) => currentPath === '/competition/competition-data/' + cp.slug))
                            ? 'max-h-screen'
                            : 'max-h-0'
                    }`}
                >
                    <ul className="mt-2 ml-4 space-y-6 text-sm text-gray-600 dark:text-white">
                        {competitions.map((cp) => (
                            <li key={cp.slug}>
                                <Link
                                    prefetch
                                    href={route('competition.data', cp.slug)}
                                    className={`${currentPath === '/competition/competition-data/' + cp.slug ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                                >
                                    {cp.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* <div>
                <button onClick={() => toggleSubMenu('bfi_olympiads')} className="flex w-full items-center justify-between py-2 text-left uppercase">
                    BFI Olympiads
                    <span>{activeSubMenu === 'bfi_olympiads' ? '▲' : '▼'}</span>
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        activeSubMenu !== 'about_us' &&
                        activeSubMenu !== 'sister_schools' &&
                        activeSubMenu !== 'admissions' &&
                        // (
                        activeSubMenu === 'bfi_olympiads'
                            ? // ||
                              // currentPath === routePath('curriculum') ||
                              // currentPath === routePath('curriculum') ||
                              // currentPath === routePath('curriculum') ||
                              // currentPath === routePath('curriculum') ||
                              // currentPath === routePath('curriculum'))
                              'max-h-screen'
                            : 'max-h-0'
                    }`}
                >
                    <ul className="mt-2 ml-4 space-y-6 text-sm text-gray-600 dark:text-white">
                        <li>
                            <Link prefetch href="#"> Mathemania Competition</Link>
                        </li>
                        <li>
                            <Link prefetch href="#">Spelling Bee Contest</Link>
                        </li>
                    </ul>
                </div>
            </div> */}
            {/* BFI Olympiads */}
            {/* <div>
                <Link
                    prefetch
                    href={route('bfi_olympiads')}
                    className={`${currentPath === routePath('bfi_olympiads') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                >
                    BFI Olympiads
                </Link>
            </div> */}
            {/* Community */}
            <div>
                <button onClick={() => toggleSubMenu('community')} className="flex w-full items-center justify-between py-2 text-left uppercase">
                    Community
                    <span>{activeSubMenu === 'community' ? '▲' : '▼'}</span>
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        activeSubMenu !== 'about_us' &&
                        activeSubMenu !== 'sister_schools' &&
                        activeSubMenu !== 'curriculum' &&
                        activeSubMenu !== 'admissions' &&
                        activeSubMenu !== 'competition' &&
                        (activeSubMenu === 'community' || currentPath === routePath('contact_us') || currentPath === routePath('faq'))
                            ? 'max-h-screen'
                            : 'max-h-0'
                    }`}
                >
                    <ul className="mt-2 ml-4 space-y-6 text-sm text-gray-600 dark:text-white">
                        <li>
                            <Link
                                prefetch
                                href={route('contact_us')}
                                className={`${currentPath === routePath('contact_us') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                {' '}
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                prefetch
                                href={route('faq')}
                                className={`${currentPath === routePath('faq') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                Frequently asked questions
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Career
            <div>
                <Link prefetch href="#" className="block py-2">
                    Contact
                </Link>
            </div> */}
            {/* Career */}
            <div>
                <Link
                    prefetch
                    href={route('career')}
                    className={`${currentPath === routePath('career') || currentPath?.startsWith('/career/job-detail/') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                >
                    Career
                </Link>
            </div>
            {/* AppearanceToggleTab */}
            <div>
                <AppearanceToggleTab className="bg-neutral-100 p-1 dark:bg-gray-900" />
            </div>
        </nav>
    );
}

export default MobileLayout;
