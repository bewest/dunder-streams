
var es = require('event-stream');

var dunder = require('./')( );


function ex ( ) {
  var fix = [
    {foo: 'bar', aaa: 'aaa' }, {foo: 'hello', bbb: 'aaa' }
  ];
  return es.readArray(fix);
}

function done (err, results) {
  console.log(err, results);
}

function finish (msg) {
  function end (err, results) {
    console.log(msg, err, results);
  }
  return es.writeArray(end);
}

function sig (data) {
  var sig = data.foo + "://" + (data.bbb || 'unknown');
  return sig;
}

function has_aaa (data) { return 'aaa' in data; }

es.pipeline(ex( ), dunder.pick(['aaa']), finish('pick'));
es.pipeline(ex( ), dunder.lint(has_aaa, true), finish('lint'));
es.pipeline(ex( ), dunder.field('sig', sig), finish('field'));
es.pipeline(ex( ), dunder.omit('bbb'), finish('omit'));
es.pipeline(ex( ), dunder.dunder('merge', {aaa: 'default'}), finish('merge'));

