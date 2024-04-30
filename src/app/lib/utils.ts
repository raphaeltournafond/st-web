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

export {jsonToUser, jsonToSession}