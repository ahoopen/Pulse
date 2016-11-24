import TeamModel from 'server/models/team.model';
import UserModel from 'server/models/user.model';

export default (app) => {

    app.route('/api/team/create')
        .post(async(request, response) => {
            const {
                name,
                project,
                teamMembers
            } = request.body;

            // create team
            const team = await TeamModel.create({
                name,
                project
            });

            // add team members to the team
            for (let member of teamMembers) {
                await team.addTeamMember(member);
            }

            if (team) {
                response.json({
                    success: true,
                    id: team._id
                });
            }

            // TeamModel.getTeamMemberListById({
            //     id: team._id
            // })
            //     .then((result) => {
            //         console.log(result);
            //     })
            //     .catch((err) => console.log);

        });

    app.route('/api/team/list')
        .get(async(request, response) => {
            const teams = await TeamModel.getAllTeams();

            response.json({
                teams
            });
        });

    app.route('/api/team/delete')
        .post(async(request, response) => {
            const {_id} = request.body;

            await TeamModel.remove({_id});
            const teams = await TeamModel.getAllTeams();

            response.json({
                teams
            });
        });

    app.route('/api/team/update')
        .post(async(request, response) => {
            TeamModel.findByIdAndUpdate(id, request.body, {new: true})
                .then(() => response.json({
                    success: true
                }));
        });

};
