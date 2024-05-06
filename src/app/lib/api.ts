import fs from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'public/demo-data', 'users.json');
const sessionsPath = path.join(process.cwd(), 'public/demo-data', 'sessions.json');

function fetchUserList() {
    try {
        const data = fs.readFileSync(usersPath, 'utf8');
        return JSON.parse(data);
    } catch (error: any) {
        console.error(error.message);
        throw new Error(`Failed to fetch user list: ${error.message}.`);
    }
}

function fetchUserDetails(id: string) {
    try {
        const data = fs.readFileSync(usersPath, 'utf8');
        const users = JSON.parse(data);
        const user = users.find((user: any) => user.id === id);
        if (!user) {
            throw new Error(`User with ID ${id} not found.`);
        }
        return user;
    } catch (error: any) {
        console.error(error.message);
        throw new Error(`Failed to fetch user details: ${error.message}.`);
    }
}

function fetchSessionList(userId: string) {
    try {
        const data = fs.readFileSync(sessionsPath, 'utf8');
        const sessions = JSON.parse(data);
        return sessions.filter((session: any) => session.user === userId);
    } catch (error: any) {
        console.error(error.message);
        throw new Error(`Failed to fetch session list: ${error.message}.`);
    }
}

function fetchSession(id: string) {
    try {
        const data = fs.readFileSync(sessionsPath, 'utf8');
        const sessions = JSON.parse(data);
        const session = sessions.find((session: any) => session.id === id);
        if (!session) {
            throw new Error(`Session with ID ${id} not found.`);
        }
        return session;
    } catch (error: any) {
        console.error(error.message);
        throw new Error(`Failed to fetch session: ${error.message}.`);
    }
}

export { fetchUserList, fetchUserDetails, fetchSessionList, fetchSession };
