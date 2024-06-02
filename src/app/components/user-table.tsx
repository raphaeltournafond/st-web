import React from 'react';
import { fetchUserList } from '@/app/lib/api';
import { User } from '../types/user';
import { jsonToUser } from '../lib/utils';

interface Props {
    userData: User[];
    error: string | undefined;
}

function getProps(): Props {
    try {
        const jsonData = fetchUserList();
        const userList: User[] = jsonData.map(jsonToUser);
        return {
            userData: userList,
            error: undefined,
        };
    } catch (error: any) {
        console.error(error.message);
        return {
            userData: [],
            error: `Error fetching data: ${error.message}`,
        };
    }
}

const UserTable: React.FC = () => {
    const props = getProps();

    return (
        <div className="overflow-x-auto rounded-md">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>See sessions</th>
                </tr>
                </thead>
                <tbody>
                {props.userData.map((user, index) => (
                    <tr key={index} className="hover">
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td><a href={`/user/${user.id}`} className="btn bg-base-300 text-base-content animate-pulse">Watch Sessions</a></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {props.error && (
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{props.error}</span>
                </div>
            )}
        </div>
    )
}

export default UserTable;