interface MobileLayoutProps {
    toggleSubMenu: (menu: string) => void;
    activeSubMenu: string | null;
}
function MobileLayout({ toggleSubMenu, activeSubMenu }: MobileLayoutProps) {
    return (
        <nav className="font-heading-font mt-16 space-y-4 p-6 text-gray-800 uppercase">
            {/* Home */}
            <div>
                <button onClick={() => toggleSubMenu('home')} className="flex w-full items-center justify-between py-2 text-left">
                    Home
                    <span>{activeSubMenu === 'home' ? '▲' : '▼'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeSubMenu === 'home' ? 'max-h-40' : 'max-h-0'}`}>
                    <ul className="mt-2 ml-4 space-y-4 text-sm text-gray-600">
                        <li>
                            <a href={route('home')}>Home style 1</a>
                        </li>
                        <li>
                            <a href="index-2.html">Home style 2</a>
                        </li>
                        <li>
                            <a href="index-3.html">Home style 3</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* About */}
            <div>
                <a href="about.html" className="block py-2">
                    About
                </a>
            </div>

            {/* Pages */}
            <div>
                <button onClick={() => toggleSubMenu('pages')} className="flex w-full items-center justify-between py-2 text-left">
                    Pages
                    <span>{activeSubMenu === 'pages' ? '▲' : '▼'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeSubMenu === 'pages' ? 'max-h-40' : 'max-h-0'}`}>
                    <ul className="mt-2 ml-4 space-y-2 text-sm text-gray-600">
                        <li>
                            <a href="team.html">Team</a>
                        </li>
                        <li>
                            <a href="service.html">Service</a>
                        </li>
                        <li>
                            <a href="faq.html">FAQ</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Contact */}
            <div>
                <a href="contact.html" className="block py-2">
                    Contact
                </a>
            </div>
        </nav>
    );
}

export default MobileLayout;
