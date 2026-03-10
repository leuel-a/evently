import Image from 'next/image';
import {Mail, User as LaUser, ShieldCheck, Calendar, Fingerprint} from 'lucide-react';
import {GetSessionResult} from '@/app/dashboard/actions';
import {Badge} from '@/components/ui/badge';
import {formatDate} from '@/utils/date';

export interface GeneralInformationProps {
    data: GetSessionResult;
}

export interface InfoRowProps {
    icon: React.ComponentType<{className?: string}>;
    label: string;
    value: React.ReactNode;
    mono?: boolean;
}

export function InfoRow({icon: Icon, label, value, mono = false}: InfoRowProps) {
    return (
        <div className="flex items-start gap-3 rounded-xl px-1 py-3">
            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <Icon className="h-4 w-4 text-slate-500" />
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <div
                    className={`mt-1 text-sm text-slate-900 ${
                        mono ? 'break-all font-mono text-[13px]' : ''
                    }`}
                >
                    {value}
                </div>
            </div>
        </div>
    );
}

export function GeneralInformation({data}: GeneralInformationProps) {
    const {user} = data;

    return (
        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-4">
                <p className="text-sm font-semibold text-slate-900">General information</p>
                <p className="mt-1 text-sm text-slate-500">
                    Your profile details and account identity.
                </p>
            </div>

            <div className="px-6 py-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded ring-1 ring-slate-200 bg-slate-100">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name ?? 'User avatar'}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <LaUser className="h-7 w-7 text-slate-400" />
                                </div>
                            )}
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="truncate text-[22px] font-semibold tracking-tight text-slate-950">
                                    {user.name}
                                </h2>

                                <Badge
                                    variant="secondary"
                                    className={
                                        user.emailVerified
                                            ? 'rounded border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-emerald-700 hover:bg-emerald-50'
                                            : 'rounded border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-amber-700 hover:bg-amber-50'
                                    }
                                >
                                    <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                                    {user.emailVerified ? 'Verified' : 'Unverified'}
                                </Badge>
                            </div>

                            <p className="mt-1 truncate text-sm text-slate-500">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-1 lg:grid-cols-2">
                    <InfoRow icon={LaUser} label="Full name" value={user.name} />
                    <InfoRow icon={Mail} label="Email address" value={user.email} />
                    <InfoRow icon={Calendar} label="Joined" value={formatDate(user.createdAt)} />
                    <InfoRow
                        icon={ShieldCheck}
                        label="Email status"
                        value={user.emailVerified ? 'Verified account' : 'Pending verification'}
                    />
                    <InfoRow
                        icon={Calendar}
                        label="Last updated"
                        value={formatDate(user.updatedAt)}
                    />
                    <InfoRow icon={Fingerprint} label="User ID" value={user.id} mono />
                </div>
            </div>
        </div>
    );
}
