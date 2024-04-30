'use client'

import React, { useEffect, useState } from 'react';
import { checkBackend, fetchUserDetails, fetchSessions } from '@/app/lib/api';
import { jsonToSession, jsonToUser } from '@/app/lib/utils';
import { User } from '@/app/types/user';
import { Session } from '@/app/types/session';
import SessionViewer from '@/app/components/session-viewer';

export default function Page({ params }: { params: { id: string } }) {
    const [userData, setUserData] = useState<User>();
    const [sessionData, setSessionData] = useState<Session[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call the checkBackend function
                await checkBackend();
                let jsonData = await fetchUserDetails(params.id)
                const userData: User = jsonToUser(jsonData);
                setUserData(userData);
                jsonData = await fetchSessions(params.id)
                const sessionData: Session[] = jsonData.map(jsonToSession)
                setSessionData(sessionData);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <main className='bg-base-100'>
            <div className='container mx-auto py-8'>
                <div className='p-6'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-lg font-semibold'>Welcome {userData?.firstName}!</p>
                            <p className='text-md'>Check out your last sessions.</p>
                        </div>
                        <SessionViewer session={sessionData[sessionData.length-1]}/>
                    </div>
                </div>
            </div>
        </main>
    );
}
