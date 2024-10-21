import Header from '@/components/common/header';
import Footer from '@/components/common/footer'

export default function PrimaryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto h-full">
      <Header />
      <main className="flex-1 mb-10">{children}</main>
      <Footer />
    </div>
  )
}
