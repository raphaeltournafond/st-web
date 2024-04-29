'use client'

import React, { useEffect, useState } from 'react';
import { checkBackend, fetchUserDetails } from "@/app/lib/api";
import { jsonToUser } from "@/app/lib/utils";
import { User } from "@/app/types/user";

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

    return <h1>My Page {userData?.id}</h1>
}
