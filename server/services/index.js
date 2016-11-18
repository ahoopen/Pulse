import UserService from './user/index';
import TeamService from './team/index';
import InternService from './intern';

export default (app) => {
    InternService(app);
    TeamService(app);
    UserService(app);
};
