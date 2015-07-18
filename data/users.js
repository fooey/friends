'use strict';


const _ = require('lodash');

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
    .map((n, i) => {
        return {
            name: n,
            id: i + 1,
            avatarId: _.random(1, 4),
        };
    })
    .indexBy('id')
    .value();


// console.log('users', users);

module.exports = users;
