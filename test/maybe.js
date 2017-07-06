// @flow
import { type Higher, TypeDef } from '../src/';
import type { Cons, Nil } from 'flow-type-list';
import type { Functor } from './functor';
import type { Matchable } from './matchable';
import type { Monad } from './monad';

class MaybeK {}

type MaybeT<A> = Cons<A, Nil>

type MaybeV<A> =
	| { tag: 'Just', value: A }
	| { tag: 'Nothing' }

class MaybeDef<A> extends TypeDef<MaybeK, MaybeT<A>, MaybeV<A>> {}

export type Maybe<A> = Higher<MaybeK, *, MaybeT<A>>

/**
 * `Just`
 *
 * :: A -> Maybe A
 */
export const Just = <A>(value: A): Maybe<A> => {
	return MaybeDef.inj(MaybeK, getMaybeImpl, { tag: 'Just', value });
};

/**
 * `Nothing`
 *
 * :: () -> Maybe A
 */
export const Nothing = <A>(): Maybe<A> => {
	return MaybeDef.inj(MaybeK, getMaybeImpl, { tag: 'Nothing' });
};

/**
 * `cases`
 *
 * :: { Just: A -> B, Nothing: () -> B } -> B
 */
export const cases = <A, B>(cases: { Just: (v: A) => B, Nothing: () => B }, ma: Maybe<A>): B => {
	const data = MaybeDef.prj(MaybeK, ma);

	switch (data.tag) {
		case 'Just':
			return cases.Just(data.value);

		case 'Nothing':
			return cases.Nothing();

		default:
			return (data.tag: empty);
	}
};

/**
 * `map`
 *
 * :: (A -> B, Maybe A) -> Maybe B
 */
export const map = <A, B>(f: (a: A) => B, ma: Maybe<A>): Maybe<B> => {
	return cases({
		Just: (a: A) => Just(f(a)),
		Nothing: () => Nothing(),
	}, ma);
};

/**
 * `andThen`
 *
 * :: (A -> Maybe B, Maybe A) -> Maybe B
 */
export const andThen = <A, B>(next: (a: A) => Maybe<B>, ma: Maybe<A>): Maybe<B> => {
	return cases({
		Just: (a: A) => next(a),
		Nothing: () => Nothing(),
	}, ma);
};

function getMaybeImpl() {
	return {
		cases,
		map,
		andThen,
	};
}

(getMaybeImpl(): Functor<MaybeK, *>); // eslint-disable-line no-unused-expressions
(getMaybeImpl(): Matchable<MaybeK, *>); // eslint-disable-line no-unused-expressions
(getMaybeImpl(): Monad<MaybeK, *>); // eslint-disable-line no-unused-expressions
