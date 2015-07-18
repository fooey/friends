'use strict';


const _ = require('lodash');

const src = [
    'http://guilds.gw2w2w.com/guilds/arenanet/256.svg',
    'http://guilds.gw2w2w.com/guilds/undefined-guild-name/256.svg',
    'http://guilds.gw2w2w.com/guilds/omnom/256.svg',
    'http://guilds.gw2w2w.com/guilds/lotus-blut/256.svg',
];


let users = _.chain(src)
    .map((val, i) => {
        return {
            src: val,
            id: (i + 1),
        };
    })
    .indexBy('id')
    .value();


// console.log('users', users);

module.exports = users;
