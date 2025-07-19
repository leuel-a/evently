import Link from 'next/link';

export default function Page() {
    return (
        <div className="">
            Hello World <br />
            <Link href="/dashboard/events">Go to Dashboard</Link>
        </div>
    );
}
