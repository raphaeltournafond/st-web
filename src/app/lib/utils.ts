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

function jsonToAccelerometerData(json: any): AccelerometerData {
    return {
        x: json.x,
        y: json.y,
        z: json.z,
    };
}

function jsonToSession(json: any): Session {
    return {
        id: json.id,
        startDate: json.start_date,
        endDate: json.end_date,
        data: json.data.map(jsonToAccelerometerData),
        user: json.user,
    };
}

export {jsonToUser, jsonToSession}