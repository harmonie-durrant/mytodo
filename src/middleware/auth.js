const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (!token || token.length == 0) {
            return res.status(498).json({"msg":"Token is not valid"});
        }
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({"msg":"Token is not valid"});
            }
            req.user = user["id"]
            next();
        });
    } else {
        res.status(401).json({"msg":"No token, authorization denied"});
    }
};
