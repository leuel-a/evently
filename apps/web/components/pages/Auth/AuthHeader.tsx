interface AuthHeaderProps {
    title: string;
    subtitle: string;
}

export function AuthHeader(props: AuthHeaderProps) {
    const {title, subtitle} = props;

    return (
        <div className="mb-6 text-center">
            <div className="mx-auto mb-3 h-8 w-32 rounded bg-indigo-600/10 ring-1 ring-indigo-600/20 flex items-center justify-center">
                <span className="text-indigo-700 font-semibold">Evently</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>
    );
}
