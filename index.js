
var es = require('event-stream');

function init (lo) {
  var _ = lo || require('lodash');

  function field (name, def, ctx) {
    function sync (data, next) {
      // data[name] = def.call(ctx, data);
      data[name] = def(data, ctx);
      next(null, data);
    }
    return es.map(sync);
  }


  function omit (fields ) {

    function iter (data, next) {
      next(null, _.omit(data, fields);
    }
    return es.map(iter);
  }

  function pick (fields ) {

    function iter (data, next) {
      next(null, _.pick(data, fields);
    }
    return es.map(iter);
  }

  function dunder (op) {
    var args = Array.prototype.slice(arguments);
    op = args.shift( );
    function iter (data, next) {
      var list = [data].concat(args.slice(0));
      var make = _[op];
      next(null, make.apply(_, list);
    }
    return es.map(iter);
  }


  function lint (checker, loose) {
    function iter (data, next) {
      var err = checker(data);
      if (err) {
        if (!loose) {
          next(err, data);
        } else {
          next( );
        }
      } else {
        next(err, data);
      }
    }
    return es.map(iter);
  }


  var streams = {
    pick: pick
  , omit: omit
  , field: field
  , lint: lint
  , dunder: dunder
  };
  return streams;
}

module.exports = init;

