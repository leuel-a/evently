import {
    Hero,
    DiscoverSection,
    OrganizerSection,
    AttendeeSection,
    DashboardSection,
    CTASection,
} from '@/components/pages/Landing';

export default function HomePage() {
    return (
        <main>
            <Hero />
            <DiscoverSection />
            <OrganizerSection />
            <AttendeeSection />
            <DashboardSection />
            <CTASection />
        </main>
    );
}
