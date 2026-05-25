import React from 'react';
import MainNavbar from '@/components/MainNavbar';
import MainFooter from '@/components/MainFooter';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
      <MainNavbar />
      {children}
      <MainFooter />
    </div>
  );
}
