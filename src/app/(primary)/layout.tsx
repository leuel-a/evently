import Header from '@/components/common/header';

export default function PrimaryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <footer></footer>
    </>
  );
}
