import * as teamEnum from '../constants/team.constants';

export const CreateTeam = (data) => ({
    type: teamEnum.ADD_TEAM,
    payload: data
});
