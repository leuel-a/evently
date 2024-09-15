import Header from '@/components/common/header';

export default function PrimaryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-container mx-auto h-full flex flex-col">
      <Header />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
