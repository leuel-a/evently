import Header from '@/components/common/header';

export default function PrimaryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto h-full">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  )
}
