import Mongoose, {Schema} from 'mongoose';
import loadClass from 'mongoose-class-wrapper';

const teamSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    projects: [{type: Schema.Types.ObjectId, ref: 'project'}],
    members: [{type: Schema.Types.ObjectId, ref: 'user'}]
});

class TeamModel {

    /**
     * Add user to a team
     *
     * @param user
     * @returns {Promise}
     */
    addUser(user) {
        return new Promise((resolve, reject) => {
            this.members.push(user);

            this.save(function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    addProject(project) {
        return new Promise((resolve, reject) => {
           this.projects.push(project);

            this.save(function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    /**
     * return a list of team members
     *
     * @param id
     * @returns {Promise}
     */
    static getTeamMemberListById({ id }) {
        return new Promise((resolve, reject) => {
            this.find({_id: id})
                .select('members')
                .populate('members')
                .exec(function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
        });
    }
}

teamSchema.plugin(loadClass, TeamModel);

export default Mongoose.model('Team', teamSchema);
