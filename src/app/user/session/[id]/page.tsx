'use client'

import React, { useEffect, useState } from 'react';
import { checkBackend, fetchSession } from '@/app/lib/api';
import { Session, exportSessionData } from '@/app/types/session';
import { jsonToSession } from '@/app/lib/utils';
import DataViewer, { DataLine } from '@/app/components/session-viewer';
import { countSteps, extractPeaks, normalizeData } from '@/app/lib/processor';

export default function Page({ params }: { params: { id: string } }) {
    const [session, setSession] = useState<Session>();

    let dataLines: DataLine[] = []

    if (session) {
        const [xValues, yValues, zValues] = exportSessionData(normalizeData(session.data));
        
        dataLines.push({
            data: xValues,
            color: 'gray',
            label: 'X'
        });

        dataLines.push({
            data: yValues,
            color: 'gray',
            label: 'Y'
        });

        dataLines.push({
            data: zValues,
            color: 'gray',
            label: 'Z'
        });

        const peaks = extractPeaks(session.data)
        const stepsCount = countSteps(peaks);
        console.log(stepsCount);

        dataLines.push({
            data: peaks,
            color: 'red',
            label: 'Steps',
        });
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
