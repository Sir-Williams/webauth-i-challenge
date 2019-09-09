const db = require('../data/dbConfig.js');

module.exports = {
    getUsers,
    add,
    find
}

function getUsers() {
    return db('users').select('id', 'username', 'password')
}

function add(user) {
    return db('users').insert(user)
}

function find(filter) {
    return db("users").where(filter);
  }

