'use client'

import React, { useEffect, useState, useRef } from 'react';
import { checkBackend, fetchSession } from '@/app/lib/api';
import { Session, exportSessionData } from '@/app/types/session';
import { formatDate, jsonToSession } from '@/app/lib/utils';
import DataViewer, { DataLine } from '@/app/components/data-viewer';
import { extractStepsStats, extractPeaks, normalizeData } from '@/app/lib/processor';

export default function Page({ params }: { params: { id: string } }) {
    const [session, setSession] = useState<Session>();
    const [stepCountValue, setStepCount] = useState<number>(0);
    const [stepFrequencyValue, setStepFrequency] = useState<number>(0);
    const [stepRegularityValue, setStepRegularity] = useState<number>(0);
    const [stepVariationValue, setStepVariation] = useState<number>(0);

    const length = useRef<number>(1000);

    let dataLines = useRef<DataLine[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkBackend();
                const sessionJsonData = await fetchSession(params.id)
                setSession(jsonToSession(sessionJsonData))
            } catch (error: any) {
                console.error('[Session] Error fetching data:', error.message);
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
            const { stepCount, stepFrequency, stepRegularity, averageMagnitudeVariation } = extractStepsStats(peaks);
            setStepCount(stepCount);
            setStepFrequency(stepFrequency);
            setStepRegularity(stepRegularity);
            setStepVariation(averageMagnitudeVariation);

            dataLines.current.push({
                data: peaks,
                color: 'cornflowerblue',
                label: 'Steps',
            });
        }
    }, [session, dataLines]);

    return (
        <main className='bg-base-200 min-h-screen flex justify-center text-base-content'>
            <div className="container mt-2 mx-auto p-4">
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="stat shadow bg-base-100 rounded-lg p- flex items-center">
                            <div className="stat-figure mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512" className="inline-block w-8 h-8 stroke-current fill-info">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M416 0C352.3 0 256 32 256 32V160c48 0 76 16 104 32s56 32 104 32c56.4 0 176-16 176-96S512 0 416 0zM128 96c0 35.3 28.7 64 64 64h32V32H192c-35.3 0-64 28.7-64 64zM288 512c96 0 224-48 224-128s-119.6-96-176-96c-48 0-76 16-104 32s-56 32-104 32V480s96.3 32 160 32zM0 416c0 35.3 28.7 64 64 64H96V352H64c-35.3 0-64 28.7-64 64z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <div className="stat-title text-lg">Steps</div>
                                <div className="stat-value">{stepCountValue}</div>
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
                                <div className="stat-value">{stepFrequencyValue.toFixed(2)}s</div>
                                <div className="stat-desc text-sm">step length</div>
                            </div>
                        </div>

                        <div className="stat shadow bg-base-100 rounded-lg p-4 flex items-center">
                            <div className="stat-figure mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512" className="inline-block w-8 h-8 stroke-current fill-info">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H160V320c0 17.7 14.3 32 32 32s32-14.3 32-32V208H336c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V32zM0 480c0 17.7 14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <div className="stat-title text-lg">Rythm</div>
                                <div className="stat-value">{stepRegularityValue.toFixed(1)}%</div>
                                <div className="stat-desc text-sm">deviation</div>
                            </div>
                        </div>

                        <div className="stat shadow bg-base-100 rounded-lg p-4 flex items-center">
                            <div className="stat-figure mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512" className="inline-block w-8 h-8 stroke-current fill-info">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M128 176a128 128 0 1 1 256 0 128 128 0 1 1 -256 0zM391.8 64C359.5 24.9 310.7 0 256 0S152.5 24.9 120.2 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H391.8zM296 224c0-10.6-4.1-20.2-10.9-27.4l33.6-78.3c3.5-8.1-.3-17.5-8.4-21s-17.5 .3-21 8.4L255.7 184c-22 .1-39.7 18-39.7 40c0 22.1 17.9 40 40 40s40-17.9 40-40z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <div className="stat-title text-lg">Force</div>
                                <div className="stat-value">{stepVariationValue.toFixed(1)}%</div>
                                <div className="stat-desc text-sm">irregularity</div>
                            </div>
                        </div>

                        <div className="stat shadow bg-base-100 rounded-lg p-4 flex items-center indicator">
                            <span className="indicator-item badge badge-accent">coming soon</span> 
                            <div className="stat-figure mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512" className="inline-block w-8 h-8 stroke-current fill-info">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M384 32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H398.4c-5.2 25.8-22.9 47.1-46.4 57.3V448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-23.5-10.3-41.2-31.6-46.4-57.3H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288H584.4L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320H199.3L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <div className="stat-title text-lg">Balance</div>
                                <div className="stat-value">--%</div>
                                <div className="stat-desc text-sm">more on LEFT</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-base-100 rounded-lg shadow-lg m-6 overflow-x-auto">
                    <DataViewer data={dataLines.current} width={length.current} height={600} />
                </div>
                <p>{formatDate(Number(session?.startDate))}</p>
            </div>
        </main>

    );
}
