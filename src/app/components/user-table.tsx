'use client'

import React, { useState, useEffect } from 'react';
import { checkBackend, fetchUserList } from '@/app/lib/api';
import { User } from '../types/user';
import { jsonToUser } from '../lib/utils';

const UserTable: React.FC = () => {
    const [userData, setUserData] = useState<User[]>([]);

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

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
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
                {userData.map((user, index) => (
                    <tr key={index}>
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