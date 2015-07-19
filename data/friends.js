'use strict';

const _       = require('lodash');
const shortid = require('shortid');

const USER_DATA = require('./users');

const RICHARD = _.find(USER_DATA, user => user.name === 'Richard').id;
const KATE = _.find(USER_DATA, user => user.name === 'Kate').id;
const JAVIER = _.find(USER_DATA, user => user.name === 'Javier').id;
const KEVIN = _.find(USER_DATA, user => user.name === 'Kevin').id;
const ALEXIS = _.find(USER_DATA, user => user.name === 'Alexis').id;
const MARTHA = _.find(USER_DATA, user => user.name === 'Martha').id;
const LANIE = _.find(USER_DATA, user => user.name === 'Lanie').id;


const friends = [
    {userId: RICHARD, friendId: KATE},
    {userId: RICHARD, friendId: JAVIER},
    {userId: RICHARD, friendId: KEVIN},
    {userId: RICHARD, friendId: ALEXIS},
    {userId: RICHARD, friendId: MARTHA},
    {userId: RICHARD, friendId: LANIE},

    {userId: KATE, friendId: RICHARD},
    {userId: KATE, friendId: JAVIER},
    {userId: KATE, friendId: KEVIN},
    {userId: KATE, friendId: LANIE},

    {userId: JAVIER, friendId: RICHARD},
    {userId: JAVIER, friendId: KATE},
    {userId: JAVIER, friendId: KEVIN},
    {userId: JAVIER, friendId: LANIE},

    {userId: KEVIN, friendId: RICHARD},
    {userId: KEVIN, friendId: KATE},
    {userId: KEVIN, friendId: JAVIER},

    {userId: ALEXIS, friendId: RICHARD},
    {userId: ALEXIS, friendId: KATE},
    {userId: ALEXIS, friendId: MARTHA},
    {userId: ALEXIS, friendId: LANIE},

    {userId: MARTHA, friendId: RICHARD},
    {userId: MARTHA, friendId: ALEXIS},

    {userId: LANIE, friendId: KATE},
    {userId: LANIE, friendId: JAVIER},
    {userId: LANIE, friendId: KEVIN},
    {userId: LANIE, friendId: ALEXIS},
];


let users = _.chain(friends)
    .map(obj => {
        obj.id = shortid.generate();
        return obj;
    })
    .indexBy('id')
    .value();


// console.log('users', users);

module.exports = users;
