// @flow
import * as maybe from './maybe';
import test from 'tape';

test('Higher', t => {
	t.plan(2);

	const timesTwo = (a: number): number => a * 2;

	t.deepEqual(maybe.map(timesTwo, maybe.Just(42)), maybe.Just(84));
	t.deepEqual(maybe.map(timesTwo, maybe.Nothing()), maybe.Nothing());
});
