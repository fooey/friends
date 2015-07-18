'use strict';

require('babel/polyfill');

console.clear();

const React = require('react');

const Container = require('./components/container');


$(function() {

    React.render(
        <Container />,
        document.getElementById('app')
    );

});
