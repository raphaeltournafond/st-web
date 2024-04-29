'use client'

import React, { useEffect, useState } from 'react';
import { checkBackend, fetchUserDetails } from '@/app/lib/api';
import { jsonToUser } from '@/app/lib/utils';
import { User } from '@/app/types/user';

export default function Page({ params }: { params: { id: string } }) {
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call the checkBackend function
                await checkBackend();
                const jsonData = await fetchUserDetails(params.id)
                const userData: User = jsonToUser(jsonData);
                setUserData(userData);
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
                    </div>
                </div>
            </div>
        </main>
    );
}
