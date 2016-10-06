import User from './user';
import UserModel from 'server/models/user.model';

export default (app) => {

    app.route('/api/user/login')
        .get((request, response) => {
            UserModel.find( {}, (err, users) => {
                if (err) {
                    throw err;
                }

                response.json(users);
            });
        })
        .post(User.login);

    app.route('/api/user/register')
        .post(User.register);

    app.route('/api/user/verify/:id')
        .get(User.verify);

    app.route('/api/user/password/reset')
        .post(User.resetPassword);

    app.route('/api/user/password/reset/:id')
        .get(User.resetPasswordChange)
        .post(User.resetPasswordAccept);

};
