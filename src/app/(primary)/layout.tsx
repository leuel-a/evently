import Header from '@/components/common/header';

export default function PrimaryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      {children}
      <footer></footer>
    </div>
  );
}
