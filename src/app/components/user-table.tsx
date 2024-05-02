'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { checkBackend, fetchUserList } from '@/app/lib/api';
import { User } from '../types/user';
import { jsonToUser } from '../lib/utils';

const UserTable: React.FC = () => {
    const [userData, setUserData] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await checkBackend();
                const jsonData = await fetchUserList()
                const userList: User[] = jsonData.map(jsonToUser);
                setUserData(userList);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
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
        <div className="overflow-x-auto">
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
                        <td><button className="btn btn-primary" onClick={e => handleWatchSessions(user.id.toString())}>Watch Sessions</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable;