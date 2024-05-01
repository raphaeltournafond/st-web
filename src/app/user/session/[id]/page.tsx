'use client'

import React, { useEffect, useState } from 'react';
import { checkBackend, fetchSession } from '@/app/lib/api';
import { Session, sessionDataToDataLines } from '@/app/types/session';
import { jsonToSession } from '@/app/lib/utils';
import DataViewer, { DataLine } from '@/app/components/session-viewer';

export default function Page({ params }: { params: { id: string } }) {
    const [session, setSession] = useState<Session>();

    let dataLines: DataLine[] = []

    if (session) {
        dataLines = sessionDataToDataLines(session.data);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkBackend();
                const sessionJsonData = await fetchSession(params.id)
                setSession(jsonToSession(sessionJsonData))
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [params.id]);
    

    return (
        <main className='bg-base-200'>
            <DataViewer data={dataLines} width={1600} height={900}/>
        </main>
    );
}
