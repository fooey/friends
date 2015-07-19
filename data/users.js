'use strict';


const _ = require('lodash');
const shortid = require('shortid');


const names = [
    'Richard',
    'Kate',
    'Javier',
    'Kevin',
    'Alexis',
    'Martha',
    'Lanie',
];


let users = _.chain(names)
    .map(val => {
        return {
            name: val,
            id: shortid.generate(),
            avatarId: _.random(1, 4),
        };
    })
    .indexBy('id')
    .value();


// console.log('users', users);

module.exports = users;
