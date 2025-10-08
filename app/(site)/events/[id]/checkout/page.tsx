import {CheckoutForm, CheckoutOrderSummary} from '@/components/pages/(site)/Checkout';
import {GoBackLink} from '@/components/pages/common';
import {APP_ROUTES} from '@/config/routes';

export interface PageProps {
    searchParams: Promise<{
        id?: string;
        quantity?: string;
    }>;
}

export default async function Page(props: PageProps) {
    const params = await props.searchParams;

    return (
        <div className="min-h-screen bg-zinc-900 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <GoBackLink
                        label="Go back"
                        href={`${APP_ROUTES.events.base}/${params.id}`}
                    />

                    <div className="text-center mt-6 space-y-3">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            Complete Your Purchase
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Secure your spot with a few quick details
                        </p>
                    </div>
                </div>

                <div className="">
                    <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700 p-8 shadow-xl">
                        <div className="mb-8 space-y-3">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                Ticket & Contact Information
                            </h2>
                            <p className="text-zinc-400">
                                Select your tickets and provide your contact details for ticket
                                delivery
                            </p>
                        </div>
                        <CheckoutForm />
                    </div>
                </div>

                <div className="text-center mt-12">
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-zinc-800/30 rounded-xl border border-zinc-700">
                        <div className="flex items-center gap-2 text-zinc-400">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">
                                Secure checkout · Encrypted payment · Instant confirmation
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
