//user auth helper functions
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// Sets a JWT cookie after user is logged in or signed up; takes in response and session user and generates JWT using imported secret
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

//to be used for certain auth route that will require identity of current session user, to be used as pre-middleware in route handlers
//will restore session user based on contents of JWT cookie
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

//Will require authentication of session user before can access route; to be used as pre-middleware in route handlers
// If there is no current user, return an error
const requireAuth = [
    restoreUser,
    function (req, _res, next) {
        if (req.user) return next();

        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }
];


module.exports = { setTokenCookie, restoreUser, requireAuth };
