// @flow
import type { $List } from 'flow-type-list';

export type $App<K, T> = $Subtype<HigherType<K, T, *>>

/**
 * `HigherType` class
 */
export class HigherType<K, T: $List<any, any>, V> {

	/**
	 * wrap :: Class k -> v -> HigherType k t v
	 */
	static wrap<I: HigherType<K, T, V>>(kind: Class<K>, data: V): I {
		return ((data: any): I);
	}

	/**
	 * unwrap :: Class k -> HigherType k t v -> v
	 */
	static unwrap<I: HigherType<K, T, V>>(kind: Class<K>, wrapped: I): V {
		return ((wrapped: any): V);
	}

}
