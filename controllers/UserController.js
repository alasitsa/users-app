const userService = require('../services/UserService');

class UserController {
    async getUsers(req, res) {
        try {
            let users = await userService.getUsers();
            return res.status(200).send(users[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Internal server error"})
        }
    }

    async createUser(req, res) {
        try {
            let params = req.query;
            if (!params.email || !params.first_name || !params.last_name) {
                return res.status(422).send({message: "Invalid payload"});
            }
            await userService.createUser(params);
            return res.status(200).send({message: "Success"});
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Internal server error"})
        }
    }

    async updateUser(req, res) {
        try {
            let params = req.query;
            if (!params.id || !params.email || !params.first_name || !params.last_name) {
                return res.status(422).send({message: "Invalid payload"});
            }
            await userService.updateUser(params);
            return res.status(200).send({message: "Success"});
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Internal server error"})
        }
    }

    async deleteUser(req, res) {
        try {
            let params = req.query;
            if (!params.id) {
                return res.status(422).send({message: "Invalid payload"});
            }
            await userService.deleteUser(params.id);
            return res.status(200).send({message: "Success"});
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Internal server error"})
        }
    }
}

module.exports = new UserController();