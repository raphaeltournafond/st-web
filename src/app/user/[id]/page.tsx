import React from 'react';
import { fetchUserDetails, fetchSessionList } from '@/app/lib/api';
import { formatDate, formatDuration, jsonToSession, jsonToUser } from '@/app/lib/utils';
import { User } from '@/app/types/user';
import { Session, sessionDataToDataLines } from '@/app/types/session';
import DataViewer from '@/app/components/data-viewer';
import { reduceDataToSize } from '@/app/lib/processor';

interface Props {
    userData: User | undefined;
    sessionData: Session[] | undefined;
    error: string | undefined;
}

function getProps(id: string): Props {
    try {
        let jsonData = fetchUserDetails(id);
        const userJsonData: User = jsonToUser(jsonData);
        jsonData = fetchSessionList(id)
        const sessionJsonData: Session[] = jsonData.map(jsonToSession)
        return {
            userData: userJsonData,
            sessionData: sessionJsonData,
            error: undefined,
        };
    } catch (error: any) {
        console.error(error.message);
        return {
            userData: undefined,
            sessionData: undefined,
            error: `Error fetching data: ${error.message}`,
        };
    }
}

export default function Page({ params }: { params: { id: string } }) {
    const props = getProps(params.id);
    console.log(props);
    const userData = props.userData;
    const sessionData = props.sessionData;

    return (
        <main className='bg-base-200 text-base-content'>
            <div className='container mx-auto p-8'>
                <div className='p-6'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-lg font-semibold'>Welcome {userData?.firstName}!</p>
                            <p className='text-md'>Check out your last sessions.</p>
                        </div>
                    </div>
                    <div className='p-16 flex flex-wrap justify-center mb-48'>
                    {sessionData?.length === 0 ? (
                        <div className="text-center w-full">
                            <p className="text-2xl font-bold text-neutral m-10">You don&apos;t have any session recorded yet.</p>
                        </div>
                        ) : (
                            sessionData?.slice().reverse().map(session => (
                                <div key={session.id} className="card bg-base-100 shadow-xl m-6">
                                    <figure className="shadow-md">
                                        <DataViewer data={sessionDataToDataLines(reduceDataToSize(session.data, 100))} width={300} height={200} showAxes={false} />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{formatDate(Number(session.startDate))}</h2>
                                        <p>Duration: {formatDuration(Number(session.endDate) - Number(session.startDate))}</p>
                                        <div className="card-actions justify-end">
                                            <a href={`/user/session/${session.id}/`} className="btn bg-base-300 text-base-content">Analyse</a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );    
}
