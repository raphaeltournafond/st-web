'use client'

import React, { useEffect, useState } from 'react';
import { checkBackend, fetchUserDetails } from '@/app/lib/api';
import { Session } from '@/app/types/session';
import SessionViewer from '@/app/components/session-viewer';

export default function Page({ params }: { params: { id: string } }) {
    const [sessionData, setSessionData] = useState<Session>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkBackend();
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <main className='bg-base-200'>
            <SessionViewer session={sessionData} width={1600} height={900} length={sessionData?.data.length ?? 0}/>
        </main>
    );
}
