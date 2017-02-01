// @flow
/* eslint-disable no-unused-expressions */
import type { $1Type, $A, $End, $Head, $List, $ListOf1, $ListOf2, $ListOf3, $ListOf4, $SwapA, $Tail, $Union, $Tag } from '../src/main';
import { End, Type } from '../src/main';
import test from 'tape';

test('Higher', t => {
	t.plan(1);
	t.pass('stub');


	class IsMaybe {}

	class Maybe<A> extends Type<
			IsMaybe,
			$1Type<A>,
			| $Tag<'Just', [A]>
			| $Tag<'Nothing', []>
		> {

		static Just<A>(a: A): Maybe<A> {
			return Maybe.wrap(IsMaybe, { tag: 'Just', value: [a] });
		}

		static Nothing<A>(): Maybe<A> {
			return Maybe.wrap(IsMaybe, { tag: 'Nothing', value: [] });
		}

		static cases<A, B>(cases: { Just: (v: [A]) => B, Nothing: () => B }, ma: Maybe<A>): B {
			const data = Maybe.unwrap(IsMaybe, ma);

			switch (data.tag) {
			case 'Just': {
				return cases.Just(data.value);
			}

			case 'Nothing':
				return cases.Nothing();

			default:
				(data.tag: empty);
				throw new TypeError();
			}
		}

		static map<A, B>(f: (a: A) => B, ma: Maybe<A>): Maybe<B> {
			return Maybe.cases({
				Just: ([a]) => Maybe.Just(f(a)),
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

});

if (false) { // eslint-disable-line no-constant-condition
	// 1 type
	(['tim', End]: $List<string, $End>);
	// $FlowFixMe
	(['tim', End]: $List<number, $End>);
	(['tim', End]: $ListOf1<string>);
	// $FlowFixMe
	(['tim', End]: $ListOf1<number>);
	('tim': $Head<$ListOf1<string>>);
	(End: $Tail<$ListOf1<string>>);

	// 2 types
	(['tim', [29, End]]: $List<string, $List<number, $End>>);
	// $FlowFixMe
	(['tim', [29, End]]: $List<string, $List<string, $End>>);
	(['tim', [29, End]]: $ListOf2<string, number>);
	// $FlowFixMe
	(['tim', [true, End]]: $ListOf2<string, number>);
	('tim': $Head<$ListOf2<string, number>>);
	([29, End]: $Tail<$ListOf2<string, number>>);

	// 3 types
	(['tim', [29, [true, End]]]: $List<string, $List<number, $List<bool, $End>>>);
	// $FlowFixMe
	(['tim', [29, [42, End]]]: $List<string, $List<number, $List<bool, $End>>>);
	(['tim', [29, [true, End]]]: $ListOf3<string, number, bool>);
	// $FlowFixMe
	(['tim', [29, [42, End]]]: $ListOf3<string, number, bool>);
	('tim': $Head<$ListOf3<string, number, bool>>);
	([29, [true, End]]: $Tail<$ListOf3<string, number, bool>>);
	// $FlowFixMe
	([29, [42, End]]: $Tail<$ListOf3<string, number, bool>>);

	// 4 types
	(['tim', [29, [true, ['bar', End]]]]: $List<string, $List<number, $List<bool, $List<string, $End>>>>);
	// $FlowFixMe
	(['tim', [29, [true, [42, End]]]]: $List<string, $List<number, $List<bool, $List<string, $End>>>>);
	(['tim', [29, [true, ['bar', End]]]]: $ListOf4<string, number, bool, string>);
	// $FlowFixMe
	(['tim', [29, [true, [42, End]]]]: $ListOf4<string, number, bool, string>);
	('tim': $Head<$ListOf4<string, number, bool, string>>);
	([29, [true, ['bar', End]]]: $Tail<$ListOf4<string, number, bool, string>>);
	// $FlowFixMe
	([29, [true, [42, End]]]: $Tail<$ListOf4<string, number, bool, string>>);

	// union
	('tim': $Union<$ListOf2<string, number>>);
	(42: $Union<$ListOf2<string, number>>);
	// $FlowFixMe
	(true: $Union<$ListOf2<string, number>>);
}
