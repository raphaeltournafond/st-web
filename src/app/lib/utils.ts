import { User } from "../types/user";

function jsonToUser(json: any): User {
    return {
        id: json.id,
        firstName: json.first_name,
        lastName: json.last_name,
        email: json.email
    };
}

export {jsonToUser}