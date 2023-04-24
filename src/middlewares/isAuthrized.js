const jwt = require('jsonwebtoken');

module.exports = (endPoint) => {
    return (req, res, next) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (token) {
                const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET_KEY}`, async function (err, decoded) {
                    if (decoded) {
                        req.token = decoded;
                        next();

                    } else {
                        res.status(401).json({ error: "Unauthorized" });
                    }
                });

            } else {
                res.status(403).json({ error: 'Send the token first' });

            }



        } else {
            res.status(403).json({ error: 'Must send a token first' })
        }

    }
}