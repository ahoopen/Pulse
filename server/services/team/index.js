import TeamModel from 'server/models/team.model';
import UserModel from 'server/models/user.model';

export default (app) => {

    app.route('/api/team/create')
        .post(async(request, response) => {
            const team = await TeamModel.create(request.body);

            if (team) {
                response.json({
                    success: true,
                    id: team._id
                });
            }

            // const user = await UserModel.findOne({email: 'a.tenhoopen+1@gmail.com'});
            // await team.addUser(user);


            // TeamModel.getTeamMemberListById({id: '582b28f2ed48da6468e6d608'})
            //     .then((result) => {
            //         response.json(result);
            //     })
            //     .catch((err) => console.log);
        });

    app.route('/api/team/remove')
        .post(async(request, response) => {
            const {id} = response.body;

            TeamModel.remove({_id: id}).then(() => response.json({
                success: true
            }));
        });

    app.route('/api/team/update')
        .post(async(request, response) => {
            TeamModel.findByIdAndUpdate(id, response.body, {new: true})
                .then(() => response.json({
                    success: true
                }));
        });

};
