// @flow
import type { App } from '../src/';

/**
 * `Matchable` type class
 */
export interface Matchable<K, T> {

	/**
	 * `cases`
	 *
	 * :: (*, App K T) -> B
	 */
	cases<B>(cases: *, ma: App<K, T>): B,

}
