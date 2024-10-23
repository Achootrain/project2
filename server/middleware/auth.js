const jwt = require('jsonwebtoken')
require('dotenv').config();

// Hai ----------------- jwt verification .
function validateToken(req, res, next) {

    // get token
    const pm_bearer_token_string = req.headers.authorization;
    let token_PMbearer;
    if (pm_bearer_token_string) {
        token_PMbearer = pm_bearer_token_string.split(' ')[1];
    }
    const token = (req.headers['token']) ? req.headers['token'] : token_PMbearer;

    if (!token) return res.status(401).json('Token expired !');

    const scret_key = (process.env.SECRET_KEY) ? process.env.SECRET_KEY : 'abcd-1234';
    try {
        const decoded = jwt.verify(token, scret_key);
        req.user = decoded;
        if (decoded)
            return next();
    } catch (err) {
        return res.status(403).json({ message: `Token (jwt) verification failed: ${err.message}` })
    }
}


module.exports = { validateToken };