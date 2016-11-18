const ADD_TEAM_FIELD = 'add_team_member';
const REMOVE_TEAM_FIELD = 'remove_team_member';

export const addTeamFieldAction = () => ({
    type: ADD_TEAM_FIELD
});

export const removeTeamFieldAction = (id) => ({
    type: REMOVE_TEAM_FIELD,
    id
});

const initialState = [{
    id: 0
}];

const teamFieldReducer = ( (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAM_FIELD:
            return [...state, {
                id: state.reduce((maxId, field) => Math.max(field.id, maxId), -1) + 1,
            }];
        case REMOVE_TEAM_FIELD:
            return state.filter(field => field.id !== action.id);
        default:
            return state;
    }
});

export default teamFieldReducer;
