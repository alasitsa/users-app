const tokenService = require("../services/TokenService");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send({message: "Unauthorized"});
        }
        req.user = tokenService.decode(token);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({message: "Unauthorized"});
    }
}