const userService = require('../services/UserService');

class UserController {
    async getUsers(req, res) {
        try {
            let users = await userService.getUsers();
            users.forEach((user) => {
                delete user.password;
            });
            return res.status(200).send(users);
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Internal server error"})
        }
    }

    async getUser(req, res) {
        try {
            let params = req.user;
            if (!params.id) {
                return res.status(422).send({message: "Invalid payload"});
            }
            let user = await userService.getUser(params.id);
            if (!user) {
                return res.status(404).send({message: "User not found"});
            }
            delete user.password;
            return res.status(200).send(user);
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Internal server error"})
        }
    }
}

module.exports = new UserController();