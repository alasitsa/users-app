const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

class UserService {
    connection;
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD
        }).promise();
    }
    async getUsers() {
        let response = await this.connection.query("SELECT * FROM users");
        return response[0];
    }

    async getUser(id) {
        let response = await this.connection.query("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
        return response[0][0];
    }

    async getUserByEmail(email) {
        let response = await this.connection.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
        return response[0][0];
    }

    async createUser(data) {
        this.connection.query("INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)", [data.email, data.first_name, data.last_name, data.password]);
    }

    async updateUser(data) {
        this.connection.query("UPDATE users SET email = ?, first_name = ?, last_name = ?, image = ? WHERE id = ?;", [data.email, data.first_name, data.last_name, data.image, data.id]);
    }

    async deleteUser(id) {
        this.connection.query("DELETE FROM users WHERE id = ?", [id]);
    }
}

module.exports = new UserService();