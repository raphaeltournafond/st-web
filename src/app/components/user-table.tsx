'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { checkBackend, fetchUserList } from '@/app/lib/api';
import { User } from '../types/user';
import { jsonToUser } from '../lib/utils';

const UserTable: React.FC = () => {
    const [userData, setUserData] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkBackend();
                const jsonData = await fetchUserList()
                const userList: User[] = jsonData.map(jsonToUser);
                setUserData(userList);
            } catch (error: any) {
                setError(`Error fetching data: ${error.message}`);
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const filteredUserData = userData.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(searchQuery.toLowerCase())
    );

    const router = useRouter();

    const handleWatchSessions = (userId: string) => {
    router.push(`/user/${userId}`);
    };

    return (
        <div className="overflow-x-auto rounded-md">
            <div className="form-control">
                <input 
                    type="text" 
                    placeholder="Athlete search"
                    className="input input-bordered w-auto"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>See sessions</th>
                </tr>
                </thead>
                <tbody>
                {filteredUserData.map((user, index) => (
                    <tr key={index} className="hover">
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td><button className="btn bg-base-300 text-base-content" onClick={e => handleWatchSessions(user.id.toString())}>Watch Sessions</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {error && (
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    )
}

export default UserTable;