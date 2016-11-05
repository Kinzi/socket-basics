var moment = require('moment');
var now = moment();

console.log(now.format());
console.log(now.format('X'));
console.log(now.valueOf());

var timestamp = 1478345199332;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.format('D. MMM YYYY, HH:mm'));
// now.subtract(1, 'year');

// console.log(now.format());
// console.log(now.format('D. MMM YYYY, HH:mm'));

