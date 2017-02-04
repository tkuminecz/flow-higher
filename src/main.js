// @flow
import type { $List } from 'flow-type-list';

export class $App<K, T> {} // eslint-disable-line no-unused-vars

/**
 * `HigherType` class
 */
export class HigherType<K, T: $List<any, any>, V> {

	/**
	 * wrap :: Class k -> v -> $App k t
	 */
	static wrap(kind: Class<K>, data: V): $App<K, T> {
		return ((data: any): $App<K, T>);
	}

	/**
	 * unwrap :: Class k -> $App k t -> v
	 */
	static unwrap(kind: Class<K>, wrapped: $App<K, T>): V {
		return ((wrapped: any): V);
	}

}
