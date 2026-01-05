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
        <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative w-full">
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
      url('img/SKT_11.jpg')
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
        <div className="relative mx-auto max-w-5xl px-4 pb-[200px]">
            <ParallaxImg src="img/skt_riverside_campus.png" alt="And example of a space launch" start={-200} end={200} className="w-1/4" />
            <ParallaxImg src="img/bfi.png" alt="An example of a space launch" start={-100} end={-250} className="mx-auto w-2/4" />
            <ParallaxImg src="img/misa.png" alt="Orbiting satellite" start={-200} end={200} className="ml-auto w-1/4" />
            <ParallaxImg src="img/nisa.png" alt="Orbiting satellite" start={0} end={-500} className="mx-auto w-4/12" />
            <ParallaxImg src="img/skt_city_campus.png" alt="Orbiting satellite" start={-800} end={-1000} className="mr-auto w-4/12" />
        </div>
    );
};

const ParallaxImg = ({ className, alt, src, start, end }: { className?: string; alt: string; src: string; start: number; end: number }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`${start}px end`, `end ${end * -1}px`],
    });

    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

    const y = useTransform(scrollYProgress, [0.5, 1], [start, end]);
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
        <motion.div ref={ref} className={`relative ${className}`}>
            <motion.img src={src} alt={alt} style={{ transform, opacity }} />
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
        <section id="launch-schedule" className="mx-auto max-w-5xl px-4 py-48">
            {/* <motion.h1
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.75 }}
                className="mb-20 text-4xl font-black uppercase dark:text-zinc-50"
            >
                Our Sister Schools
            </motion.h1> */}
            <GradualSpacingHeader text="Our Sister Schools" />
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
            className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
            href={link}
        >
            <div>
                <p className="mb-1.5 text-xl">{name}</p>
                <p className="text-sm uppercase">{address}</p>
            </div>
            <div className="flex items-center gap-1.5 text-end text-sm uppercase">
                <p>{email}</p>
                <FiMail />
            </div>
        </motion.a>
    );
};

export default SisterSchoolCards;
