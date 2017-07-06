// @flow
import type { $A, $SwapA } from 'flow-type-list';
import type { App } from '../src';

/**
 * `Monad` type class
 */
export interface Monad<K, T> {

	/**
	 * `andThen`
	 *
	 * :: (A -> App K ($SwapA T B), ma: App K T) -> App K ($SwapA T B)
	 */
	andThen<B>(next: (a: $A<T>) => App<K, $SwapA<T, B>>, ma: App<K, T>): App<K, $SwapA<T, B>>,
}
