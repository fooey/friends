'use strict';

var paths      = {};

paths.public   = './';

paths.css      = {};
paths.css.base = paths.public + '/css';
paths.css.src  = paths.css.base + '/src';
paths.css.dist = paths.css.base + '/dist';

paths.js       = {};
paths.js.base  = paths.public + '/js';
paths.js.src   = paths.js.base + '/src';
paths.js.dist  = paths.js.base + '/dist';


module.exports = paths;
