# flow-higher

```javascript
let Maybe = createDataType(

	// data constructors
	{

		Just(value) {},

		Nothing() {}

	},

	// implementation
	(T, getData) => class extends Impl<T> {

		map(f): Reader<T, > {
			return getData();
		}

	}
);

let just42 = Maybe.Just(42);

Maybe.map(a => a / 2, just42);

compose(
    Maybe.map(n => n.length),
    Maybe.map(n => n / 2),
)(just42);

```
