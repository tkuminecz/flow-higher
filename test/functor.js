// @flow
import type { $A, $SwapA } from 'flow-type-list';
import type { App } from '../src/';

/**
 * `Functor` type class
 */
export interface Functor<K, T> {

	/**
	 * `map`
	 *
	 * :: ($A T -> B, App K T) -> App K ($SwapA T B)
	 */
	map<B>(f: (a: $A<T>) => B, fa: App<K, T>): App<K, $SwapA<T, B>>,

}
