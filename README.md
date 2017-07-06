flow-higher
===========

Higher-kinded types for `Flow`

## API

### `class HigherType<Kind, TypeSig, InnerValue>`

Defines a new higher-kinded type.

```js
import type { Cons2 } from 'flow-type-list';
import { Higher } from 'flow-higher';

// define the kind
class PairK {}

// type signature - a type list with two types
type PairT<A, B> = Cons2<A, B>

// value type - tuple of two values
type PairV<A, B> = [A, B]

// the Pair type definition class
class PairType<A, B> extends HigherType<
  PairK,
  PairT<A, B>,
  PairV<A, B>
> {}

// define the exposed Pair type
export type Pair<A, B> = Higher<PairK, PairT<A, B>>

// data constructor
export const Both = <A, B>(a: A, b: B): Pair<A, B> => {
  return PairType.inj(PairK, [a, b]);
}

// catamorphism
export const cases = <A, B>(patterns: { Both: (v: [A, B]) => C }, pab: Pair<A, B>): C => {
  const data = PairType.prj(PairK, pab);
  return patterns.Both(data);
}
```

### `HigherType.inj(kind, value)`

Takes a class as the kind and a compatible value and returns a `Higher` instance.

### `HigherType.prj(kind, wrappedValue)`

Takes a class as the kind and a compatible `Higher` instance and returns the contained value.
