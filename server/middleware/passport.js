import passport from 'passport';
import User from 'server/models/user.model';
import {config} from 'server/config/config';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user ID is the payload exists in our database
    // if it does, call 'done' with the user
    // otherwise call done without the user object
    User.findById(payload.sub, function (err, user) {
        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
