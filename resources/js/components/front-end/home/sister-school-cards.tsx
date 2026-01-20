import { SisterSchool } from '@/types';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import GradualSpacingHeader from '../core/gradual-spacing-header';
interface CenterImageProps {
    isMobile: boolean; // string for mobile, MotionValue for large screens
}
interface HeroProps {
    isMobile: boolean; // string for mobile, MotionValue for large screens
}
const SisterSchoolCards = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024); // md breakpoint
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className="">
            <Nav />
            <Hero isMobile={isMobile} />
            <Schedule />
        </div>
    );
};

const Nav = () => {
    return (
        <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-3 text-white">
            {/* <SiSpacex className="text-3xl mix-blend-difference" /> */}
            <button
                onClick={() => {
                    document.getElementById('launch-schedule')?.scrollIntoView({
                        behavior: 'smooth',
                    });
                }}
                className="flex items-center gap-1 text-xs text-zinc-400"
            >
                {/* LAUNCH SCHEDULE <FiArrowRight /> */}
            </button>
        </nav>
    );
};

const SECTION_HEIGHT = 1500;

const Hero: React.FC<HeroProps> = ({ isMobile }) => {
    return (
        <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative hidden w-full md:block">
            <CenterImage isMobile={isMobile} />

            <ParallaxImages />

            <div className="absolute right-0 bottom-0 left-0 h-screen" />
        </div>
    );
};

const CenterImage: React.FC<CenterImageProps> = ({ isMobile }) => {
    const { scrollY } = useScroll();

    const clip1 = useTransform(scrollY, [1500, 1500], [25, 0]);
    const clip2 = useTransform(scrollY, [1500, 1500], [75, 100]);

    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

    // Transform background size only for large screens
    const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ['170%', '100%']);
    const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 1]);

    return (
        <motion.div
            className="sticky top-0 h-screen w-full"
            style={{
                clipPath,
                backgroundSize: isMobile ? 'cover' : backgroundSize,
                opacity,
                backgroundImage: `
      linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
      url('img/SKT_11.webp')
    `,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        />
        //     )}
        // </>
    );
};

const ParallaxImages = () => {
    return (
        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-[200px]">
            {/* 1. Middle Image (BFI) - Centered */}
            <div className="relative z-10 mb-10 flex justify-center">
                <ParallaxImg
                    src="img/bfi.webp"
                    alt="An example of a space launch"
                    start={0}
                    end={-100}
                    className="w-52" // Made slightly larger for emphasis
                />
            </div>

            {/* 2. Other 4 Images - Side by Side (Grid) */}
            {/* gap-4 creates space between them. items-start aligns them at the top of their row */}
            <div className="relative z-0 grid grid-cols-4 gap-4 px-4">
                <ParallaxImg src="img/skt_riverside_campus.webp" alt="Riverside Campus" start={100} end={-200} className="w-40" />

                <ParallaxImg
                    src="img/misa.webp"
                    alt="Misa Satellite"
                    start={100}
                    end={-250} // Different speed for visual interest
                    className="mt-10 w-40" // Added margin-top to stagger the starting position visually
                />

                <ParallaxImg src="img/nisa.webp" alt="Nisa Satellite" start={100} end={-250} className="mt-10 w-40" />

                <ParallaxImg src="img/skt_city_campus.webp" alt="City Campus" start={100} end={-200} className="w-40" />
            </div>
        </div>
    );
};

const ParallaxImg = ({ className, alt, src, start, end }: { className?: string; alt: string; src: string; start: number; end: number }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        // "start end" = when element top hits viewport bottom
        // "end start" = when element bottom hits viewport top
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

    // Maps scroll progress to the pixel values provided
    const y = useTransform(scrollYProgress, [0, 1], [start, end]);

    // Fixed syntax for motion template
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
        <motion.div ref={ref} className={`relative ${className}`} style={{ transform, opacity }}>
            <img
                src={src}
                alt={alt}
                className="h-full w-full rounded-lg object-cover" // Added basic styling for the image itself
            />
        </motion.div>
    );
};

const Schedule = () => {
    const [sisterSchoolData, setSisterSchoolData] = useState<SisterSchool[]>([]);
    const [sisterSchoolLoading, setSisterSchoolLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/sister_schools/get-all-sister-school')
            .then((res) => res.json())
            .then((res) => {
                setSisterSchoolData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <section id="launch-schedule" className="mx-auto max-w-5xl px-4 py-20">
            {/* <motion.h1
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.75 }}
                className="mb-20 text-4xl font-black uppercase dark:text-zinc-50"
            >
                Our Sister Schools
            </motion.h1> */}
            <img src="/img/bfi.webp" alt="" className="mx-auto block w-40 dark:hidden" />
            <img src="/img/bfi_b.webp" alt="" className="mx-auto hidden w-40 dark:block" />
            <GradualSpacingHeader text="BFI Group of Schools" />
            {sisterSchoolData.map((e) => (
                <ScheduleItem key={e.name} name={e.name} address={e.address} email={e.email} link={e.website_url} />
            ))}
            {/* <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
            <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" /> */}
        </section>
    );
};

const ScheduleItem = ({ name, address, email, link }: { name: string; address: string; email: string; link: string }) => {
    return (
        <motion.a
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.75 }}
            className="mb-9 flex flex-col items-center justify-between gap-4 border-b border-zinc-800 px-3 pb-9 sm:flex-row"
            href={link}
        >
            <div>
                <p className="mb-3 text-xl">{name}</p>
                <p className="text-sm uppercase">{address}</p>
            </div>
            <div className="flex items-center gap-3 text-end text-sm uppercase dark:text-green-600">
                <p>{email}</p>
                <FiMail />
            </div>
        </motion.a>
    );
};

export default SisterSchoolCards;
