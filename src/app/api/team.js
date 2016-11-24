import * as fetch from 'axios';

export function postData(url, data) {
    return fetch.post(url, data);
}

export function getData(url) {
    return fetch.get(url);
}

export function createTeam(team) {
    return postData('/api/team/create', team);
}

export function listTeams() {
    return getData('/api/team/list');
}

export function updateTeam(team) {
    return postData('/api/team/update', team);
}

export function deleteTeam(team) {
    return postData('/api/team/delete', team);
}
