import Mongoose, {Schema} from 'mongoose';
import loadClass from 'mongoose-class-wrapper';

const teamSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    project: { type: String },
    // projects: [{type: Schema.Types.ObjectId, ref: 'project'}],
    organization: { type: String },
    members: [{type: Schema.Types.ObjectId, ref: 'user'}]
});

class TeamModel {

    /**
     * Add user to a team
     *
     * @param userId
     * @returns {Promise}
     */
    addTeamMember(userId) {
        return new Promise((resolve, reject) => {
            this.members.push(userId);

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

    static getAllTeams() {
        return this.find()
            .populate('members', '_id name lastname email');
    }
}

teamSchema.plugin(loadClass, TeamModel);

export default Mongoose.model('Team', teamSchema);
