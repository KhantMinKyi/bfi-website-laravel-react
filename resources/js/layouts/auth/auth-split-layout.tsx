import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name } = usePage<SharedData>().props;

    return (
        <div
            className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0"
            style={{
                backgroundImage: "url('/img/footer-banner.png')", // put your image path here
                backgroundSize: 'cover',
                opacity: 0.9,
            }}
        >
            <div className="relative hidden h-full flex-col p-10 lg:flex dark:border-r dark:text-white">
                <div className="absolute inset-0" />
                <Link href={route('home')} className="font-merriweather relative z-20 flex items-center text-2xl">
                    {name}
                </Link>
                <div className="flex h-full w-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <img src="/img/bfi.png" className="max-w-64 dark:hidden" alt="BFI Logo" />
                        <img src="/img/bfi_b.png" className="hidden max-w-64 dark:block" alt="BFI Logo" />
                        <h2 className="font-merriweather text-xl font-bold uppercase">
                            Inspiring Brilance , <span className="text-blue-600 dark:text-green-600">Building Brighter Futures</span>{' '}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="flex h-full w-full items-center justify-center lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 rounded-2xl bg-white p-4 shadow sm:h-[500px] sm:w-[450px] dark:bg-neutral-900">
                    <Link href={route('home')} className="relative z-20 my-4 flex items-center justify-center lg:hidden">
                        <img src="/img/bfi.png" className="max-w-10 dark:hidden" alt="BFI Logo" />
                        <img src="/img/bfi_b.png" className="hidden max-w-10 dark:block" alt="BFI Logo" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
            <div className="absolute bottom-0 w-full">
                <p className="mb-4 text-center text-base text-gray-800 dark:text-gray-100">&copy; 2025 BFI Education Services' Developer</p>
            </div>
        </div>
    );
}
