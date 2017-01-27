// @flow
import type { $End, $1Type, $A, $List, $SwapA } from './main';


class Type<Kind, Types, Data> {

	static wrap<I: Type<Kind, Types, Data>>(kind: Class<Kind>, data: Data): I {
		return ((data: any): I);
	}

	static unwrap<I: Type<Kind, Types, Data>>(kind: Class<Kind>, wrapped: I): Data {
		return ((wrapped: any): Data);
	}

}


class IsMaybe {}

class Maybe<A> extends Type<
		IsMaybe,
		$1Type<A>,
		| { tag: 'Just', value: A }
		| { tag: 'Nothing' }
	> {

	static Just<A>(a: A): Maybe<A> {
		return Maybe.wrap(IsMaybe, { tag: 'Just', value: a });
	}

	static Nothing<A>(): Maybe<A> {
		return Maybe.wrap(IsMaybe, { tag: 'Nothing' });
	}

	static cases<A, B>(cases: { Just: (a: A) => B, Nothing: () => B }, ma: Maybe<A>): B {
		const data = Maybe.unwrap(IsMaybe, ma);

		switch (data.tag) {
			case 'Just':
				return cases.Just(data.value);

			case 'Nothing':
				return cases.Nothing();

			default:
				(data.tag: empty);
				throw new TypeError();
		}
	}

	static map<A, B>(f: (a: A) => B, ma: Maybe<A>): Maybe<B> {
		return Maybe.cases({
			Just: (a) => Maybe.Just(f(a)),
			Nothing: () => Maybe.Nothing()
		}, ma);
	}

}

(Maybe: Matchable<IsMaybe, *, *>);
(Maybe: Functor<IsMaybe, *>);

interface Matchable<K, T, C> {
	cases<B>(cases: C, ma: $Subtype<Type<K, T, *>>): B
}

interface Functor<K, T> {
	map<B>(f: (a: $A<T>) => B, fa: $Subtype<Type<K, T, *>>): $Subtype<Type<K, $SwapA<T, B>, *>>
}
