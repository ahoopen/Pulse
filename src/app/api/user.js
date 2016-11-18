import * as fetch from 'axios';

const fetchAllUsers = () => fetch.get('/api/user/all');

export function getUsers(action) {
    switch (action) {
        case 'all':
            return fetchAllUsers();
        default:
            throw new Error(`no method found for action: ${action}`);
    }
}
