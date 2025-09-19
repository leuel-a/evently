import {Features} from '@/components/pages/(site)/Home/Features';
import {Footer} from '@/components/pages/(site)/Home/Footer';
import {Hero} from '@/components/pages/(site)/Home/Hero';
import {Testimonials} from '@/components/pages/(site)/Home/Testimonials';

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
