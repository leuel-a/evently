import Header from "@/components/common/header";

export default function PrimaryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}
