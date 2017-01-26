# flow-higher

## Intro

First let's cover a few topics before looking at how to use `flow-higher`.

#### Type Constructors

A _type constructor_ is like a function that operates on types. They enable type polymorphism by taking types as arguments and returning new types. Note that the type arguments must be _inhabited types_, which is discussed below.

Just like a call to a function with a set of arguments is called _function application_, a "call" to a _type constructor_ with a set of type arguments is called _type application_.

#### Kinds

Kinds refer to the arity of _type constructors_, or how many type arguments they take.

We define the _kind_ of an type constructor taking one argument as `* -> *`. This means it takes a type as an argument and returns a type. Types that don't take any arguments (which are also called _inhabited types_) are just denoted with a lone `*`.

#### Inhabited Types

When we apply types to a _type constructor_, the resulting _type application_ can be used to represent actual values. When a type actually holds a value, we say it is "inhabited". Type constructors. Since _type constructors_ can't hold values, so they are not _inhabited types_.

## 
