// @flow
import type { Cons } from 'flow-type-list';

/**
 * `Higher` class
 */
export class Higher<K, I, T> {

	kind: Class<K>

	getInstance: () => I

	value: T

	constructor(kind: Class<K>, getInstance: () => I, value: T) {
		this.kind = kind;
		this.getInstance = getInstance;
		this.value = value;
	}

}

/**
 * `TypeDef` class
 */
export class TypeDef<Kind, TypeSig, InnerValue> {

	/**
	 * `inj`
	 *
	 * :: (Class K, I, T) -> Higher K I T
	 */
	static inj<Instance>(kind: Class<Kind>, getInstance: () => Instance, value: InnerValue): Higher<Kind, Instance, TypeSig> {
		return new Higher(kind, getInstance, ((value: any): TypeSig));
	}

	/**
	 * `prj`
	 *
	 * :: (Class K, Higher K I T) -> T
	 */
	static prj<Instance>(kind: Class<Kind>, higher: Higher<Kind, Instance, TypeSig>): InnerValue {
		return ((higher.value: any): InnerValue);
	}

}

// `App` - represents type application
export type App<K, T> = Higher<K, *, T>

// convenience types for applications of varying arities
export type App1<K, A> = App<K, Cons<A, *>>
export type App2<K, A, B> = App<K, Cons<A, Cons<B, *>>>
export type App3<K, A, B, C> = App<K, Cons<A, Cons<B, Cons<C, *>>>>
export type App4<K, A, B, C, D> = App<K, Cons<A, Cons<B, Cons<C, Cons<D, *>>>>>
export type App5<K, A, B, C, D, E> = App<K, Cons<A, Cons<B, Cons<C, Cons<D, Cons<E, *>>>>>>
export type App6<K, A, B, C, D, E, F> = App<K, Cons<A, Cons<B, Cons<C, Cons<D, Cons<E, Cons<F, *>>>>>>>
