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

type $KindTypes<K> = $PropertyType<K, 'types'>

class Kind<T> {
  types: T
}

type $ParamTypes<P> = $PropertyType<P, 'type'>

class TypeParams<T> {
  type: T
}

const UnaryKind: Kind<$1List<any>> = new Kind();
const BinaryKind: Kind<$2List<any>> = new Kind();

interface TypeConstructorClass<K> {
  apply<T: $KindTypes<K>>(params: TypeParams<T>): TypeApplication<K, T>
}

type TypeConstructor<K> = <T>(params: TypeParams<T>) => TypeApplication<K, T>

class TypeApplication<K, T> {}

function typeConstructor<K>(kind: K): TypeConstructor<K> {
  return <T>(types): TypeApplication<K, T> => new TypeApplication();
}

/*

class _Key {}
class TypeConstructor<K: Kind<any>> {

  static kind: K

  /**
   * of :: (Kind k) => k -> TypeConstructor k
   *
  static of<K: Kind<any>>(kind: K): TypeConstructorClass<K> {
    return class extends TypeConstructor<K> {

      static apply<T: $KindTypes<K>>(params: TypeParams<T>): TypeApplication<K, T> {
  		return new TypeApplication();
      }

    };
  }

}


class TypeApplication<K, T> {

  kind: K

  typeParams: T

  /**
   * of :: TypeConstructor k -> TypeParams t -> TypeApplication k t
   *
  static of<K, T>(typeCtor: Class<TypeConstructor<K>>, params: TypeParams<T>): TypeApplication<K, T> {
    return new TypeApplication();
  }

}


let MaybeKind = TypeConstructor.of(UnaryKind);

let NumParam: TypeParams<$1List<number>> = new TypeParams();

(MaybeKind.apply(NumParam): TypeApplication<MaybeKind, $1List<number>>);
*/
