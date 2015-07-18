'use strict';

const Immutable = require('Immutable');

let USER_DATA = require('../../../data/users.js');


function getUsers(cb) {
    cb(null, USER_DATA);
}



function addUser(cb) {
    const id = USER_DATA.size + 1;

    USER_DATA = USER_DATA.push(
        Immutable.Map({id})
    );

    cb(null, id);
}



function getUser(id, cb) {
    const user = USER_DATA.find(u => u.get('id') === id);

    console.log(`__getUser(${id})`, user.toJS());

    if (user) {
        cb(null, user);
    }
    else {
        cb('NotFound', Immutable.Map({}));
    }
}



function setUserName(id, name, cb) {
    USER_DATA = USER_DATA.setIn([id - 1, 'name'], name);
    cb(null);
}




module.exports = {
    getUsers,
    addUser,
    getUser,
    setUserName,
};
