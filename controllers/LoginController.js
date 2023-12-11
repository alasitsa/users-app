const userService = require('../services/UserService');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/TokenService');

class LoginController {
    async registration(req, res) {
        try {
            let params = req.query;
            if (!params.email || !params.first_name || !params.last_name || !params.password) {
                return res.status(422).send({message: "Invalid payload"});
            }
            const hashedPassword = bcrypt.hashSync(params.password, 10);
            await userService.createUser({
                email: params.email,
                first_name: params.first_name,
                last_name: params.last_name,
                password: hashedPassword
            });
            return res.status(200).send({message: "Success"});

        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Internal server error"});
        }
    }

    async login(req, res) {
        try {
            let params = req.query;
            if (!params.email || !params.password) {
                return res.status(422).send({message: "Invalid payload"});
            }
            let user = await userService.getUserByEmail(params.email);
            if (!user || !bcrypt.compareSync(params.password, user.password)) {
                return res.status(404).send({message: "User not found"});
            }
            return res.status(200).send({token: tokenService.encode({id: user.id, email: user.email})});
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Internal server error"});
        }
    }
}

module.exports = new LoginController();