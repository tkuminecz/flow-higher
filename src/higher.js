// @flow
export class End {}

export type $End = Class<End>

export type $List<A, B: $End | $List<any, any>> = { head: A, tail: B }

export type $1List<A> = { head: A, tail: $End }
export type $2List<A, B> = { head: A, tail: $1List<B> }
export type $3List<A, B, C> = { head: A, tail: $2List<B, C> }
export type $4List<A, B, C, D> = { head: A, tail: $3List<B, C, D> }

export type $Head<T> = $PropertyType<T, 'value'>
export type $Tail<T> = $PropertyType<T, 'tail'>

export type $1<T> = $Head<T>
export type $2<T> = $Head<$Tail<T>>
export type $3<T> = $Head<$Tail<$Tail<T>>>
export type $4<T> = $Head<$Tail<$Tail<$Tail<T>>>>

export type $A<T> = $1<T>
export type $B<T> = $2<T>
export type $C<T> = $3<T>
export type $D<T> = $4<T>

type $KindTypes<K> = $PropertyType<K, 'types'>

export class Kind<T> {
	types: T
}

type $ParamTypes<P> = $PropertyType<P, 'type'>

export class TypeParams<T> {
	type: T
}

export const UnaryKind: Kind<$1List<any>> = new Kind();
export const BinaryKind: Kind<$2List<any>> = new Kind();


class TypeConstructor<K> {
	kind: K
}

class TypeApplication<K, T> {
	kind: K
	types: T
}

type $TypeApKind<A> = $PropertyType<A, 'kind'>
type $TypeApTypes<A> = $PropertyType<A, 'types'>

export function typeConstructor<K>(kind: K): Class<TypeConstructor<K>> {
	return class extends TypeConstructor<K> {};
}

class Data<Ctor, Tags> {

	constructor() {}

}



let MaybeT = typeConstructor(UnaryKind);

type MaybeTags<T> =
	| { tag: 'Just', value: $A<T> }
	| { tag: 'Nothing' }

class MaybeData<T> extends Data<MaybeT, MaybeTags<T>> {}


// type TypeConstructor<K> = <T>(params: TypeParams<T>) => TypeApplication<K, T>
//
//
// type $TypeApKind<A> = $PropertyType<A, 'kind'>
// type $TypeApTypes<A> = $PropertyType<A, 'types'>
//
// class TypeApplication<K, T> {
//
// 	kind: K
//
// 	types: T
//
// }
//
// export function typeConstructor<K>(kind: K): TypeConstructor<K> {
// 	return <T>(types): TypeApplication<K, T> => new TypeApplication();
// }
//
// class DataType<Ctor> {}
//
//
//
// let maybeT = typeConstructor(UnaryKind);
//
// let maybeParams: TypeParams<$1List<number>> = new TypeParams();
//
// maybeT(maybeParams);
//
// type MaybeTags<T> =
// 	| { tag: 'Just', value: $A<T> }
// 	| { tag: 'Nothing' }
//
//
// class MaybeData extends DataType<typeof maybeT> {}
