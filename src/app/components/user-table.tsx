'use client'

import React, { useState, useEffect } from 'react';
import { checkBackend, fetchUserList } from '@/app/lib/api';
import { User } from '../types/user';
import { jsonToUser } from '../lib/utils';

const UserTable: React.FC = () => {
    const [userData, setUserData] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call the checkBackend function
                await checkBackend();
                const jsonData = await fetchUserList()
                const userList: User[] = jsonData.map(jsonToUser);
                setUserData(userList);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData(); // Call the function when the component mounts
    }, []); // Empty dependency array to only run once on mount

    const filteredUserData = userData.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(searchQuery.toLowerCase())
    );

    return (
        <div className="overflow-x-auto">
            <div className="form-control">
                <input 
                    type="text" 
                    placeholder="Athlete search"
                    className="input input-bordered w-24 md:w-auto"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>See sessions</th>
                </tr>
                </thead>
                <tbody>
                {filteredUserData.map((user, index) => (
                    <tr key={index} className="hover">
                        <th>{index + 1}</th>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.id}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable;