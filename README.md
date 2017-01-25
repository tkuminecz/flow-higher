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
import type { $List, $End, $Head } from 'flow-higher';

type TList = $List<string, $List<number, $End>>

// extract the head (ie the first element)
('foo': $Head<TList>); // OK

```

#### `type $Tail<List>`

The tail of the given `$List`. Either another `$List` or `$End`.

```javascript
import type { $List, $End, $Head, $Tail } from 'flow-higher';
import { End } from 'flow-higher';

type TList = $List<string, $List<number, $End>>

// extract the tail list
([ 42, End ]: $Tail<TList>); // OK

// extract the head of the tail list (ie the 2nd element)
(42: $Head<$Tail<TList>>); // OK
```

#### `type $Union<List>`

Represents the union of types in the given `$List`.

```javascript
import type { $List, $End, $Union } from 'flow-higher';

type SomeList = $List<string, $List<number, $End>>

type NumberOrString = $Union<SomeList>

('foo': NumberOrString); // OK
(42: NumberOrString); // OK
(true: NumberOrString); // Error!



```

#### `type $1List<A>`
#### `type $2List<A, B>`
#### `type $3List<A, B, C>`
#### `type $4List<A, B, C, D>`
#### `type $5List<A, B, C, D, E>`
#### `type $6List<A, B, C, D, E, F>`

Convenience types for `$List`s of up to six types.

```javascript
import type { $1list, $2List, $3list } from 'flow-higher';


```

#### `class Kind<List>`

Used to define higher-kinded types.

```javascript
import { type $2list, Kind } from 'flow-higher';

// define a higher-kinded type with two types
class MyType extends Kind<$2List<any, any>> {}
```

#### `type $Higher<HigherKind>`

Represents a value of the given kind.

```javascript
import { type $Higher } from 'flow-higher';
```

#### `function wrap(kind, value)`

Takes a `Kind` class and a compatible `$List` of values and returns a value of type `$Higher`.

```javascript
import { wrap } from 'flow-higher';
```

#### `function unwrap(kind, wrappedValue)`

Takes a `HigherKind` class and a compatible `$Higher` and returns a `$List` of values.

```javascript
import { unwrap } from 'flow-higher';
```
