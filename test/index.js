// @flow
import type { Cons, Nil } from 'flow-type-list';
import { type Higher, HigherType } from '../src/';
import test from 'tape';

test('Higher', t => {
	t.plan(1);

	class FooK {}

	type FooT<A> = Cons<A, Nil>

	type FooV<A> = A

	class FooType<A> extends HigherType<FooK, FooT<A>, FooV<A>> {}

	type Foo<A> = Higher<FooK, FooT<A>>

	const wrapped: Foo<number> = FooType.inj(FooK, 42);

	t.equal(FooType.prj(FooK, wrapped), 42);
});
