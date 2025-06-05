import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';

interface Props {
    children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main className='flex flex-1'>
                {children}
            </main>
        </div>
    );
};