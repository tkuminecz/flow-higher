// @flow
/* eslint-disable no-unused-expressions */
import type { A, Cons1, SwapA } from 'flow-type-list';
import { kind, TypeDef } from '../src/main';
import type { App } from '../src/main';
import test from 'tape';

const IsMaybe = kind(`Maybe`);

class Maybe<A> extends TypeDef<
		IsMaybe,
		Cons1<A>,
		| { tag: 'Just', val: [A] }
		| { tag: 'Nothing', val: [] }
	> {

	static Just<A>(a: A): Maybe<A> {
		return Maybe.inj(IsMaybe, { tag: 'Just', val: [a] });
	}

	static Nothing: Maybe<any> = Maybe.inj(IsMaybe, { tag: 'Nothing', val: [] })

	static cases<A, B>(cases: { Just: (v: [A]) => B, Nothing: () => B }, ma: Maybe<A>): B {
		const data = Maybe.prj(IsMaybe, ma);

		switch (data.tag) {
		case 'Just': {
			return cases.Just(data.val);
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
			Nothing: () => Maybe.Nothing
		}, ma);
	}

}

(Maybe: Matchable<IsMaybe, *, *>);
(Maybe: Functor<IsMaybe, *>);

interface Matchable<K, T, C> {
	cases<B>(cases: C, ma: App<K, T>): B
}

interface Functor<K, T> {
	map<B>(f: (a: A<T>) => B, fa: App<K, T>): App<K, SwapA<T, B>>
}

test('Higher', t => {
	t.plan(2);

	t.deepEqual(Maybe.map(a => a * 2, Maybe.Just(42)), Maybe.Just(84));
	t.deepEqual(Maybe.map(a => a * 2, Maybe.Nothing), Maybe.Nothing);
});
