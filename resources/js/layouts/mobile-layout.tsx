import AppearanceToggleTab from '@/components/appearance-tabs';
import { Link } from '@inertiajs/react';
import { routePath } from './front-end-layout';

interface MobileLayoutProps {
    toggleSubMenu: (menu: string) => void;
    activeSubMenu: string | null;
    currentPath: string | null;
}
function MobileLayout({ toggleSubMenu, activeSubMenu, currentPath }: MobileLayoutProps) {
    return (
        <nav className="font-merriweather mt-16 space-y-4 p-6 text-gray-800 uppercase dark:text-white">
            {/* Home */}
            <div>
                <Link
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
                        activeSubMenu !== 'bfi_olympiads' &&
                        (activeSubMenu === 'about_us' ||
                            currentPath === routePath('our_history') ||
                            currentPath === routePath('vision_mission_value') ||
                            currentPath === routePath('philosophy') ||
                            currentPath === routePath('leadership_teams') ||
                            currentPath === routePath('bfi_advantage'))
                            ? 'max-h-64'
                            : 'max-h-0'
                    }`}
                >
                    <ul className="mt-2 ml-4 space-y-6 text-sm text-gray-600 dark:text-white">
                        <li>
                            <Link
                                href={route('our_history')}
                                className={`${currentPath === routePath('our_history') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                Our History
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('vision_mission_value')}
                                className={`${currentPath === routePath('vision_mission_value') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                Vision , Mission & Values
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('philosophy')}
                                className={`${currentPath === routePath('philosophy') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                Philosophy
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={route('leadership_teams')}
                                className={`${currentPath === routePath('leadership_teams') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                Leaderships Teams
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('bfi_advantage')}
                                className={`${currentPath === routePath('bfi_advantage') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                BFI Advantage
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Sister Schools */}
            <div>
                <button onClick={() => toggleSubMenu('sister_schools')} className="flex w-full items-center justify-between py-2 text-left uppercase">
                    Sister Schools
                    <span>{activeSubMenu === 'sister_schools' ? '▲' : '▼'}</span>
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        activeSubMenu !== 'about_us' &&
                        activeSubMenu !== 'curriculum' &&
                        activeSubMenu !== 'admissions' &&
                        activeSubMenu !== 'bfi_olympiads' &&
                        (activeSubMenu === 'sister_schools' ||
                            currentPath === routePath('skt_riverside') ||
                            currentPath === routePath('skt_riverside') ||
                            currentPath === routePath('skt_riverside') ||
                            currentPath === routePath('skt_riverside') ||
                            currentPath === routePath('skt_riverside'))
                            ? 'max-h-screen'
                            : 'max-h-0'
                    }`}
                >
                    <ul className="mt-2 ml-4 space-y-6 text-sm text-gray-600 dark:text-white">
                        <li>
                            <Link
                                href={route('skt_riverside')}
                                className={`${currentPath === routePath('skt_riverside') ? 'underline decoration-blue-800 underline-offset-4 dark:decoration-green-800' : ''}`}
                            >
                                SKT International School ( Riverside Campus )
                            </Link>
                        </li>
                        <li>
                            <Link href="#">SKT International PreSchool ( Riverside Campus )</Link>
                        </li>
                        <li>
                            <Link href="#">SKT International School ( City Campus )</Link>
                        </li>
                        <li>
                            <Link href="#">SKT International PreSchool ( City Campus )</Link>
                        </li>
                        <li>
                            <Link href="#">Mandalay International School of Acumen</Link>
                        </li>
                        <li>
                            <Link href="#">Mandalay International School of Acumen ( KinderGarten )</Link>
                        </li>
                        <li>
                            <Link href="#">Naypyitaw International School of Acumen</Link>
                        </li>
                        <li>
                            <Link href="#">Naypyitaw International School of Acumen ( KinderGarten )</Link>
                        </li>
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
                        activeSubMenu !== 'bfi_olympiads' &&
                        (activeSubMenu === 'curriculum' ||
                            currentPath === routePath('curriculum') ||
                            currentPath === routePath('curriculum') ||
                            currentPath === routePath('curriculum') ||
                            currentPath === routePath('curriculum') ||
                            currentPath === routePath('curriculum'))
                            ? 'max-h-screen'
                            : 'max-h-0'
                    }`}
                >
                    <ul className="mt-2 ml-4 space-y-6 text-sm text-gray-600 dark:text-white">
                        <li>
                            <Link href={route('curriculum')}> Pre-School (Ages 2-6)</Link>
                        </li>
                        <li>
                            <Link href="#">Primary School (Year 2-6)</Link>
                        </li>
                        <li>
                            <Link href="#">Lower Secondary School (Year 7-9)</Link>
                        </li>
                        <li>
                            <Link href="#">Upper Secondary School (Year 10-11)</Link>
                        </li>
                        <li>
                            <Link href="#">Foundation Program</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Admissions*/}
            <div>
                <button onClick={() => toggleSubMenu('admissions')} className="flex w-full items-center justify-between py-2 text-left uppercase">
                    Admissions
                    <span>{activeSubMenu === 'admissions' ? '▲' : '▼'}</span>
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        activeSubMenu !== 'about_us' &&
                        activeSubMenu !== 'sister_schools' &&
                        activeSubMenu !== 'curriculum' &&
                        activeSubMenu !== 'bfi_olympiads' &&
                        // (
                        activeSubMenu === 'admissions'
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
                            <Link href="#"> Applying to BFI Sister Schools</Link>
                        </li>
                        <li>
                            <Link href="#"> Admission Policies</Link>
                        </li>
                        <li>
                            <Link href="#">Frequently asked questions</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* BFI Olympiads*/}
            <div>
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
                            <Link href="#"> Mathemania Competition</Link>
                        </li>
                        <li>
                            <Link href="#">Spelling Bee Contest</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Career */}
            <div>
                <Link href="#" className="block py-2">
                    Contact
                </Link>
            </div>
            {/* Career */}
            <div>
                <Link href="#" className="block py-2">
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
