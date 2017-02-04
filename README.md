# flow-higher

Higher-kinded types for Flow

## Defining Types

Extending the `HigherType` class to define new higher-kinded types.

## API

### `class HigherType<K, T, V>`

Defines a new higher-kinded type.

```javascript
import { type $2Types, Type } from 'flow-higher';

class IsPair {}

export class Pair<A, B> extends Type<IsPair, $2Types<A, B>, [A, B]> {

  static Both<A, B>(a: A, b: B): Pair<A, B> {
    return Pair._wrap(IsPair, [a, b]);
  }

}
```

### `HigherType.wrap(kind, value)`

Takes a class as the kind and a compatible value and returns a `HigherType` instance.

### `HigherType.unwrap(kind, wrappedValue)`

Takes a class as the kind and a compatible `HigherType` instance and returns the contained value.

#### `type $App<K, T>`

Represents type application of the given kind and types.
