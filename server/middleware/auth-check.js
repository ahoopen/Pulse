import {config} from 'server/config/config';
import jwt from 'jsonwebtoken';

/**
 * Check if authorization token is present and
 * that the token is valid.
 *
 * @param request
 * @param response
 * @param next
 * @returns {*}
 */
export default (request, response, next) => {
    const {authorization} = request.headers;

    if (authorization) {
        const auth = authorization.split(' ');
        const [identifier, token] = auth;

        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return response.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                }

                request.token = decoded;
                next();
            });
        }
    } else {
        return response.json({
            success: false,
            message: 'No token provided.'
        });
    }
};
