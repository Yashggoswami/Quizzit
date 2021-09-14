const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./connections');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {

    // const user = await db.User.findOne({ where: { username } });
    const user = await db.User.scope('withHash').findOne({ where: { username } });

    if (!user)
        throw 'Incorrect Username';
    let flag = false;
    await bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
            console.log("It matches!")
        }
        else {
            console.log("Invalid password!");
        }
    })
    return user;
}


async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }
    // hash password
    if (params.password) {
        bcrypt.hash(params.password, 10, async function (err, hash) {
            // Store hash in database here
            params.password = hash;
            await db.User.create(params);
        });
    }
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}