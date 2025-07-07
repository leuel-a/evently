import Link from 'next/link';

export default function Home() {
    return (
        <div className="">
            Hello World <br />
            <Link href="/dashboard/events">Go to Dashboard</Link>
        </div>
    );
}
