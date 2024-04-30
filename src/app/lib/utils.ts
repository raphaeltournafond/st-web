import { AccelerometerData, Session } from "../types/session";
import { User } from "../types/user";

function jsonToUser(json: any): User {
    return {
        id: json.id,
        firstName: json.first_name,
        lastName: json.last_name,
        email: json.email
    };
}

function jsonToAccelerometerData(json: any): AccelerometerData[] {
    const accelerometerDataList: AccelerometerData[] = JSON.parse(json).map((item: string) => {
        const [x, y, z] = item.split(',').map(parseFloat);
        return { x, y, z };
    });
    return accelerometerDataList;
}

function jsonToSession(json: any): Session {
    return {
        id: json.id,
        startDate: json.start_date,
        endDate: json.end_date,
        data: jsonToAccelerometerData(json.data),
        user: json.user,
    };
}

function formatDuration(durationInSeconds: number) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    let formattedDuration = '';
    if (hours > 0) {
        formattedDuration += `${hours}h `;
    }
    if (minutes > 0) {
        formattedDuration += `${minutes}m `;
    }
    if (seconds > 0) {
        formattedDuration += `${seconds}s`;
    }

    return formattedDuration.trim();
}

export { jsonToUser, jsonToSession, formatDuration }