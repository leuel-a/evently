import NextLink from 'next/link';

export default function Home() {
    return (
        <div className="p-10">
            <NextLink className="border border-green-200 h-12 p-2" href={'/dashboard'}>Dashboard</NextLink>
        </div>
    );
}
