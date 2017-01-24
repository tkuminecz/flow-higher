# flow-higher

Higher-kinded types for Flow

## API

#### `type $List<Head, Tail>`

A list of types. `Head` is the first type in the list, and `Tail` is either `$End` or another `$List`.

```javascript
import { type $List } from 'flow-higher';
```

#### `type $End`

The end of a `$List`. The only value of type `$End` is `End`.

```javascript
import { type $End, End } from 'flow-higher';
```

#### `type $Head<List>`

The head type of the given `$List`.

```javascript
import { type $Head } from 'flow-higher';
```

#### `type $Tail<List>`

The tail of the given `$List`. Either another `$List` or `$End`.

```javascript
import { type $Tail } from 'flow-higher';
```

####`type $Union<List>`

Represents the union of types in the given `$List`.

```javascript
import { type $Union } from 'flow-higher';
```

#### `type $1List<A>`

A `$List` with one type.

#### `type $2List<A, B>`

A `$List` with two types.

#### `type $3List<A, B, C>`

A `$List` with three types.

#### `type $4List<A, B, C, D>`

A `$List` with four types.

#### `type $5List<A, B, C, D, E>`

A `$List` with five types.

#### `type $6List<A, B, C, D, E, F>`

A `$List` with six types.

#### `class HigherKind<List>`

Used to define higher-kinded types.

```javascript
import { type $2List, HigherKind } from 'flow-higher';

// define a higher-kinded type with two types
class MyType extends HigherKind<$2List<any, any>> {}
```

#### `type $Higher<HigherKind>`

Represents a value of the given kind.

```javascript
import { type $Higher } from 'flow-higher';
```

#### `function wrap(kind, value)`

Takes a `HigherKind` class and a compatible `$List` of values and returns a value of type `$Higher`.

```javascript
import { wrap } from 'flow-higher';
```

#### `function unwrap(kind, wrappedValue)`

Takes a `HigherKind` class and a compatible `$Higher` and returns a `$List` of values.

```javascript
import { unwrap } from 'flow-higher';
```
