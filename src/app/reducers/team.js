const ADD_TEAM_FIELD = 'add_team_member';
const REMOVE_TEAM_FIELD = 'remove_team_member';
const UPDATE_TEAM_FIELD = 'update_team_member';

export const addTeamFieldAction = (payload) => ({
    type: ADD_TEAM_FIELD,
    payload
});

export const updateTeamFieldAction = (payload) => ({
    type: UPDATE_TEAM_FIELD,
    payload
});

export const removeTeamFieldAction = (id) => ({
    type: REMOVE_TEAM_FIELD,
    id
});

const initialState = [{
    id: 0,
    text: 'placeholder text'
}];

const teamFieldReducer = ( (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEAM_FIELD:
            return [...state, {
                id: state.reduce((maxId, field) => Math.max(field.id, maxId), -1) + 1,
                text: 'placeholder text'
            }];
        case REMOVE_TEAM_FIELD:
            return state.filter(field =>
                field.id !== action.id
            );
        case UPDATE_TEAM_FIELD:
            const {id, text, value} = action.payload;

            return state.map(field => {
                if (field.id === id) {
                    return {...field, text, value}
                }
                return field;
            });
        default:
            return state;
    }
});

export default teamFieldReducer;
