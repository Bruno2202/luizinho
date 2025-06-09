import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';

interface Props {
    children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
