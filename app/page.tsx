import {Features} from '@/components/pages/(site)/Landing/Features';
import {Footer} from '@/components/pages/(site)/Landing/Footer';
import {Hero} from '@/components/pages/(site)/Landing/Hero';
import {Testimonials} from '@/components/pages/(site)/Landing/Testimonials';

export interface PageProps {}

export default function Page() {
    return (
        <main className="min-h-screen w-full">
            <Hero />
            <Features />
            <Testimonials />
            <Footer />
        </main>
    );
}
