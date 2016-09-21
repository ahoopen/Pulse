import uuid from 'node-uuid';
import jwt from 'jsonwebtoken';
import User from 'server/models/user.model';
import UserReset from 'server/models/reset.user.model';
import sendEmail from 'server/utils/sendMail';
import hash from 'server/utils/hash';

class UserHandler {

    async login(request, response) {
        const {email, password} = request.body;
        const hashedPassword = hash(password);

        try {
            // find user
            const user = await User.findUser({
                email,
                password: hashedPassword
            });

            // check if user was found
            if (!user) {
                response.json({
                    success: false,
                    errorMessage: 'Email or password isnt correct'
                });
                return;
            }

            const jwtconfig = {
                secret: '$fdasf%Ts+__!REA!x'
            };
            const token = jwt.sign(user, jwtconfig.secret, {expiresIn: '1d'});

            response.json({
                success: true,
                token
            });
        } catch (e) {
            throw e;
        }
    }

    /**
     * Register a user
     *
     * @param request
     * @param response
     */
    async register(request, response) {
        const {username, password, email} = request.body;
        const hashedPassword = hash(password);
        const verifyId = uuid.v4();

        try {
            const userExist = await User.findOne({email});

            if (userExist) {
                response.json({
                    success: false,
                    errorMessage: 'User already exists'
                });
                return;
            }

            const user = await User.create({
                username,
                password: hashedPassword,
                email,
                verifyId,
                isValidEmail: false
            });

            // TODO check breaks on production
            if (process.env.NODE_ENV !== 'test') {
                await this.sendVerifyMail(username, email, verifyId);
            }

            response.json({
                success: true,
                token: user.verifyId
            });
        } catch (e) {
            throw e;
        }
    }

    /**
     * Send verify mail to user
     *
     * @param username
     * @param email
     * @param verifyId
     */
    sendVerifyMail(username, email, verifyId) {
        const host = 'wwww.languagecourse-guru.com';
        // send email
        const verifyLink = `http://${host}/api/user/verify/${verifyId}`;
        const text = `Hi ${username},
        Please Click on the link to verify your email: ${verifyLink}`;
        const html = `Hi ${username},<br/>
        Please Click on the link to verify your email.<br/>
        <a href="${verifyLink}">Click here to verify</a><br/>
        Or open this in a browser: ${verifyLink}`;

        // send email
        return sendEmail({
            to: email,
            subject: 'Languagecourse guru: Confirm Your Email',
            text,
            html
        });
    }

    /**
     * Check if user email is verified. Update user account that
     * email is valid.
     *
     * @param request
     * @param response
     */
    async verify(request, response) {
        const {id: verifyId} = request.params;

        if (verifyId === '0') {
            response.json({
                success: false,
                errorMessage: 'Incorrect verification token!'
            });
            return;
        }

        const user = await User.findOne({
            verifyId,
            isValidEmail: false
        });

        if (!user) {
            response.json({
                success: false,
                errorMessage: 'Incorrect verification token!'
            });
            return;
        }

        try {
            await User.update({_id: user._id}, {isValidEmail: true, verifyId: '0'});
        } catch (e) {
            throw e;
        }

        response.json({
            success: true
        });
    }


    async resetPassword(request, response) {
        const host = 'www.pulse.app';
        const {email} = request.body;
        const resetId = uuid.v4();

        const user = await User.findOne({email});

        // send email
        if (user) {
            // save token to db
            await UserReset.create({
                userId: user._id,
                token: resetId,
                date: Date.now()
            });

            // generate email
            const resetLink = `http://${host}/password/reset/${resetId}`;
            const text = `Hi there, Please Click on the link to reset your password: ${resetId}`;
            const html = `Hi there,<br/>Please Click on the link to reset your password.<br/>
            <a href="${resetLink}">Click here to reset password</a><br/>
             Or open this in a browser: ${resetLink}`;

            // TODO check breaks on production
            if (process.env.NODE_ENV !== 'test') {
                // send email
                await sendEmail({
                    to: email,
                    subject: 'Pulse app: password reset',
                    text,
                    html
                });
            }

            response.json({
                success: true
            });

        } else {
            response.json({
                success: false
            });
        }
    }

    async resetPasswordChange(request, response) {
        const {id: resetId} = request.params;
        if (resetId === '-1') {
            response.json({
                success: false,
                errorMessage: 'Password reset request not found!'
            });
            return;
        }

        const user = await UserReset.findOne({token: resetId});
        // check for user and time validity
        const now = new Date().getTime() - 60 * 60 * 1000; // 60 mins expiration

        if (!user || user.date < now) {
            if (user) {
                await UserReset.update({userId: user.userId}, {
                    token: '-1',
                    date: 0
                });
            }

            response.json({
                success: false,
                errorMessage: 'The password reset request has expired. You must complete the password reset within 60 minutes of the request'
            });

            return;
        }

        response.json({
            success: true
        });
    }

    async resetPasswordAccept(request, response) {
        const {id: resetId} = request.params;
        const {password, passwordRepeat} = request.body;

        if (password !== passwordRepeat) {
            response.json({
                success: false,
                errorMessage: 'Passwords do not match'
            });
            return;
        }

        const user = await UserReset.findOne({token: resetId});
        if (!user) {
            response.json({
                success: false,
                errorMessage: 'Password reset request not found!'
            });
            return;
        }

        const hashedPassword = hash(password);
        await User.update({_id: user.userId}, {password: hashedPassword});
        await UserReset.update({userId: user.userId}, {token: '-1', date: 0});

        response.json({
            success: true,
            message: 'Password reset successful completed'
        });
    }

}

export default new UserHandler();
