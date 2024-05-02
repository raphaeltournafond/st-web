'use client'

import React, { useEffect, useState, useRef } from 'react';
import { checkBackend, fetchSession } from '@/app/lib/api';
import { Session, exportSessionData } from '@/app/types/session';
import { jsonToSession } from '@/app/lib/utils';
import DataViewer, { DataLine } from '@/app/components/data-viewer';
import { extractStepsStats, extractPeaks, normalizeData } from '@/app/lib/processor';

export default function Page({ params }: { params: { id: string } }) {
    const [session, setSession] = useState<Session>();
    const [stepCount, setStepCount] = useState<number>(0);
    const [stepFrequency, setStepFrequency] = useState<number>(0);
    const [stepRegularity, setStepRegularity] = useState<number>(0);

    const length = useRef<number>(1000);

    let dataLines = useRef<DataLine[]>([]);

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

    useEffect(() => {
        if (session) {
            const [xValues, yValues, zValues] = exportSessionData(normalizeData(session.data));

            dataLines.current.push({
                data: xValues,
                color: 'gray',
                label: 'X'
            });

            dataLines.current.push({
                data: yValues,
                color: 'gray',
                label: 'Y'
            });

            dataLines.current.push({
                data: zValues,
                color: 'gray',
                label: 'Z'
            });

            const peaks = extractPeaks(session.data)
            length.current = peaks.length * 10;
            const { stepCount, stepFrequency, stepRegularity } = extractStepsStats(peaks);
            setStepCount(stepCount);
            setStepFrequency(stepFrequency);
            setStepRegularity(stepRegularity);

            dataLines.current.push({
                data: peaks,
                color: '#00B2FF',
                label: 'Steps',
            });
        }
    }, [session, dataLines]);

    return (
        <main className='bg-base-200 min-h-screen flex items-center justify-center text-base-content'>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Session analysis</h1>
                <div className="bg-base-100 rounded-lg shadow-lg m-6 overflow-x-auto">
                    <DataViewer data={dataLines.current} width={length.current} height={600} />
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="stat shadow bg-base-100 rounded-lg p-4 flex items-center">
                            <div className="stat-figure mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512" className="inline-block w-8 h-8 stroke-current fill-info">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M416 0C352.3 0 256 32 256 32V160c48 0 76 16 104 32s56 32 104 32c56.4 0 176-16 176-96S512 0 416 0zM128 96c0 35.3 28.7 64 64 64h32V32H192c-35.3 0-64 28.7-64 64zM288 512c96 0 224-48 224-128s-119.6-96-176-96c-48 0-76 16-104 32s-56 32-104 32V480s96.3 32 160 32zM0 416c0 35.3 28.7 64 64 64H96V352H64c-35.3 0-64 28.7-64 64z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <div className="stat-title text-lg">Steps</div>
                                <div className="stat-value">{stepCount}</div>
                                <div className="stat-desc text-sm">total count</div>
                            </div>
                        </div>

                        <div className="stat shadow bg-base-100 rounded-lg p-4 flex items-center">
                            <div className="stat-figure mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512" className="inline-block w-8 h-8 stroke-current fill-info">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <div className="stat-title text-lg">Duration</div>
                                <div className="stat-value">{stepFrequency.toFixed(2)}s</div>
                                <div className="stat-desc text-sm">between steps</div>
                            </div>
                        </div>

                        <div className="stat shadow bg-base-100 rounded-lg p-4 flex items-center">
                            <div className="stat-figure mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512" className="inline-block w-8 h-8 stroke-current fill-info">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H160V320c0 17.7 14.3 32 32 32s32-14.3 32-32V208H336c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V32zM0 480c0 17.7 14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <div className="stat-title text-lg">Deviation</div>
                                <div className="stat-value">{stepRegularity.toFixed(2)}s</div>
                                <div className="stat-desc text-sm">average irregularity</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}
