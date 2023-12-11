const jwt = require("jsonwebtoken");

class TokenService {
    encode(payload) {
        return jwt.sign(payload, process.env.SECRET_KEY);
    }

    decode(token) {
        return jwt.verify(token, process.env.SECRET_KEY);
    }
}

module.exports = new TokenService();