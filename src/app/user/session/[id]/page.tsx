'use client'

import React, { useEffect, useState } from 'react';
import { checkBackend, fetchSession } from '@/app/lib/api';
import { Session, exportSessionData } from '@/app/types/session';
import { jsonToSession } from '@/app/lib/utils';
import DataViewer, { DataLine } from '@/app/components/data-viewer';
import { extractStepsStats, extractPeaks, normalizeData } from '@/app/lib/processor';

export default function Page({ params }: { params: { id: string } }) {
    const [session, setSession] = useState<Session>();

    let dataLines: DataLine[] = [];

    let length: number = 1000;

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
        length = peaks.length * 10;
        const { stepCount, stepFrequency, stepRegularity } = extractStepsStats(peaks);
        console.log(stepCount);
        console.log(stepFrequency);
        console.log(stepRegularity);

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
        <main className='bg-base-200 min-h-screen flex items-center justify-center'>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Session analysis</h1>
                <div className="bg-base-100 rounded-lg shadow-lg m-6 overflow-x-auto">
                    <DataViewer data={dataLines} width={length} height={600} />
                </div>
            </div>
        </main>
    );
}
