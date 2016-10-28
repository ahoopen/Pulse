import uuid from 'node-uuid';
import jwt from 'jwt-simple';
import User from 'server/models/user.model';
import UserReset from 'server/models/reset.user.model';
import sendEmail from 'server/utils/sendMail';
import { config } from 'server/config/config';

class UserHandler {

    /**
     * sub: subject of jwt token
     * iat: issued at time
     *
     * @param user
     * @returns {*}
     */
    tokenForUser(user) {
        const timestamp = new Date().getTime();
        return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
    }

    signin(request, response) {
        // user has already had there email and password authenticated
        // just need to give them a token
        response.json({
            success: true,
            token: this.tokenForUser(request.user)
        });
    }

    /**
     * Register a user
     *
     * @param request
     * @param response
     */
    async register(request, response) {
        const {
            name,
            lastname,
            password,
            email
        } = request.body;
        // const verifyId = uuid.v4();
        //TODO use verifyId when email server is set up.
        const verifyId = 123;

        try {
            const existingUser = await User.findOne({email});

            if (existingUser) {
                return response.json({
                    success: false,
                    errorMessage: 'User already exists'
                });
            }

            const user = await User.create({
                name,
                lastname,
                password,
                email,
                verifyId,
                isValidEmail: false
            });

            // // TODO check breaks on production
            // if (process.env.NODE_ENV !== 'test') {
            //     await this.sendVerifyMail(username, email, verifyId);
            // }

            response.json({
                success: true,
                token: this.tokenForUser(user)
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
        const host = 'wwww.pulse.app';
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
            subject: 'Pulse app: Confirm Your Email',
            text,
            html
        });
    }

    /**
     * Activate user
     *
     * @param request
     * @param response
     */

    //TODO refactor to merge with verify method
    async activate(request, response) {
        const { activateCode } = request.body;

        const user = await User.findOne({
            verifyId: activateCode,
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
            await User.update({_id: user._id}, {
                isValidEmail: true,
                verifyId: '0'
            });
        } catch (e) {
            throw e;
        }

        response.json({
            success: true,
            token: this.tokenForUser(user)
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
            // if (process.env.NODE_ENV !== 'test') {
            //     // send email
            //     await sendEmail({
            //         to: email,
            //         subject: 'Pulse app: password reset',
            //         text,
            //         html
            //     });
            // }

            response.json({
                success: true,
                resetId
            });

        } else {
            response.json({
                success: false,
                errorMessage: 'Email doesnt exist'
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

        await User.update({_id: user.userId}, {$set: { password }});
        await UserReset.update({userId: user.userId}, {token: '-1', date: 0});

        response.json({
            success: true,
            token: this.tokenForUser(user.userId),
            message: 'Password reset successful completed'
        });
    }

}

export default new UserHandler();
