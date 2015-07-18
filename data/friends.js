'use strict';


const _ = require('lodash');

const friends = [
    {userId: 1, friendId: 2},
    {userId: 1, friendId: 3},
    {userId: 1, friendId: 4},
    {userId: 1, friendId: 5},
    {userId: 1, friendId: 6},
    {userId: 1, friendId: 7},

    {userId: 2, friendId: 1},
    {userId: 2, friendId: 3},
    {userId: 2, friendId: 4},
    {userId: 2, friendId: 7},

    {userId: 3, friendId: 1},
    {userId: 3, friendId: 2},
    {userId: 3, friendId: 4},
    {userId: 3, friendId: 7},

    {userId: 4, friendId: 1},
    {userId: 4, friendId: 2},
    {userId: 4, friendId: 3},

    {userId: 5, friendId: 1},
    {userId: 5, friendId: 2},
    {userId: 5, friendId: 6},
    {userId: 5, friendId: 7},

    {userId: 6, friendId: 1},
    {userId: 6, friendId: 5},

    {userId: 7, friendId: 2},
    {userId: 7, friendId: 3},
    {userId: 7, friendId: 4},
    {userId: 7, friendId: 5},
];


let users = _.chain(friends)
    .map((obj, i) => {
        obj.id = i + 1;
        return obj;
    })
    .indexBy('id')
    .value();


// console.log('users', users);

module.exports = users;
