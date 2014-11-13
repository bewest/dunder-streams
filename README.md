dunder-streams
==============

lodash/underscore + streams

### Install
`npm install dunder-streams`

### Usage
```javascript
var _ = require('lodash');
var dunder = require('dunder-streams')(_);

```

#### `pick (fields) -> stream` pick
Create a stream of elements where the elements in the stream only have
the selected `fields`, which should be an array of fieldnames or a
field name.

#### `field (name, define, ctx) -> stream`

Returns a stream where each `data` element in the stream has the `name`
method defined the return value of calling `define(data, ctx)`.

#### `lint (checker, loose) -> stream`

Use `checker(data) -> true/false` to determine whether or not there is
an error.  When `loose` is set to true, the data will be dropped, when
`loose` is set to falsey, the returned error emitted on the stream as
an error.

#### `dunder (op, args) -> stream`

Call `op` method, eg:
```javascript
dunder.dunder('merge', { 'a': 'b'});
```
Will return a stream that always has `a` set to `b` if it is missing.


#### `omit (fields) -> stream`
  https://lodash.com/docs#omit

Clone each object omitting the listed fields.

