export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div>Dashboard Layout</div>
      {children}
    </div>
  );
}
