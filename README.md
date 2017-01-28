# flow-higher

Higher-kinded types for Flow

## Defining Types

We can define higher-kinded types using by extending the `Type` class.

## API

### `type $List<Head, Tail>`

A list of types. `Head` is the first type in the list, and `Tail` is either `$End` or another `$List`.

```javascript
import { type $List } from 'flow-higher';
```

### `type $End`

The end of a `$List`. The only value of type `$End` is `End`.

```javascript
import { type $End, End } from 'flow-higher';
```

### `type $Head<List>`

The head type of the given `$List`.

```javascript
import type { $List, $End, $Head } from 'flow-higher';

type TList = $List<string, $List<number, $End>>

// extract the head (ie the first element)
('foo': $Head<TList>); // OK
```

### `type $Tail<List>`

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

### `type $Union<List>`

Represents the union of types in the given `$List`.

```javascript
import type { $List, $End, $Union } from 'flow-higher';

type SomeList = $List<string, $List<number, $End>>

type NumberOrString = $Union<SomeList>

('foo': NumberOrString); // OK
(42: NumberOrString); // OK
(true: NumberOrString); // Error!
```

### `type $ListOf1<A>`
### `type $ListOf2<A, B>`
### `type $ListOf3<A, B, C>`
### `type $ListOf4<A, B, C, D>`

Convenience types for `$List`s of up to six types.

```javascript
import type { $1list, $2List, $3list } from 'flow-higher';
```

### `class Type<Kind, Signature, Data>`

Defines a new higher-kinded type.

```javascript
import { type $2Types, Type } from 'flow-higher';

class IsPair {}

export class Pair<A, B> extends Type<IsPair, $2Types<A, B>, [A, B]> {

  static Pair: <A, B>(a: A, b: B) => Pair<A, B>
    = (a, b) => Pair._wrap(IsPair, [a, b]);

}
```

### `function wrap(kind, value)`

Takes a `Kind` class and a compatible `$List` of values and returns a value of type `$Higher`.

```javascript
import { wrap } from 'flow-higher';
```

### `function unwrap(kind, wrappedValue)`

Takes a `HigherKind` class and a compatible `$Higher` and returns a `$List` of values.

```javascript
import { unwrap } from 'flow-higher';
```
