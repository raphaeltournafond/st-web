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
                console.log(userList);
                setUserData(userList); // Update state with fetched data
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
                    <th>Level</th>
                    <th>See sessions</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserTable;