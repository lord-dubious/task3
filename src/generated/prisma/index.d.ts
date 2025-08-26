
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserSettings
 * 
 */
export type UserSettings = $Result.DefaultSelection<Prisma.$UserSettingsPayload>
/**
 * Model Tweet
 * 
 */
export type Tweet = $Result.DefaultSelection<Prisma.$TweetPayload>
/**
 * Model MediaLibrary
 * 
 */
export type MediaLibrary = $Result.DefaultSelection<Prisma.$MediaLibraryPayload>
/**
 * Model Agent
 * 
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>
/**
 * Model SchedulerStatus
 * 
 */
export type SchedulerStatus = $Result.DefaultSelection<Prisma.$SchedulerStatusPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TweetStatus: {
  draft: 'draft',
  scheduled: 'scheduled',
  posted: 'posted',
  failed: 'failed'
};

export type TweetStatus = (typeof TweetStatus)[keyof typeof TweetStatus]

}

export type TweetStatus = $Enums.TweetStatus

export const TweetStatus: typeof $Enums.TweetStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSettings`: Exposes CRUD operations for the **UserSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSettings
    * const userSettings = await prisma.userSettings.findMany()
    * ```
    */
  get userSettings(): Prisma.UserSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tweet`: Exposes CRUD operations for the **Tweet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tweets
    * const tweets = await prisma.tweet.findMany()
    * ```
    */
  get tweet(): Prisma.TweetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mediaLibrary`: Exposes CRUD operations for the **MediaLibrary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaLibraries
    * const mediaLibraries = await prisma.mediaLibrary.findMany()
    * ```
    */
  get mediaLibrary(): Prisma.MediaLibraryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.AgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedulerStatus`: Exposes CRUD operations for the **SchedulerStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SchedulerStatuses
    * const schedulerStatuses = await prisma.schedulerStatus.findMany()
    * ```
    */
  get schedulerStatus(): Prisma.SchedulerStatusDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserSettings: 'UserSettings',
    Tweet: 'Tweet',
    MediaLibrary: 'MediaLibrary',
    Agent: 'Agent',
    SchedulerStatus: 'SchedulerStatus'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userSettings" | "tweet" | "mediaLibrary" | "agent" | "schedulerStatus"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserSettings: {
        payload: Prisma.$UserSettingsPayload<ExtArgs>
        fields: Prisma.UserSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          findFirst: {
            args: Prisma.UserSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          findMany: {
            args: Prisma.UserSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>[]
          }
          create: {
            args: Prisma.UserSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          createMany: {
            args: Prisma.UserSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>[]
          }
          delete: {
            args: Prisma.UserSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          update: {
            args: Prisma.UserSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          deleteMany: {
            args: Prisma.UserSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>[]
          }
          upsert: {
            args: Prisma.UserSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          aggregate: {
            args: Prisma.UserSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSettings>
          }
          groupBy: {
            args: Prisma.UserSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<UserSettingsCountAggregateOutputType> | number
          }
        }
      }
      Tweet: {
        payload: Prisma.$TweetPayload<ExtArgs>
        fields: Prisma.TweetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TweetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TweetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload>
          }
          findFirst: {
            args: Prisma.TweetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TweetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload>
          }
          findMany: {
            args: Prisma.TweetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload>[]
          }
          create: {
            args: Prisma.TweetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload>
          }
          createMany: {
            args: Prisma.TweetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TweetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload>[]
          }
          delete: {
            args: Prisma.TweetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload>
          }
          update: {
            args: Prisma.TweetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload>
          }
          deleteMany: {
            args: Prisma.TweetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TweetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TweetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload>[]
          }
          upsert: {
            args: Prisma.TweetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TweetPayload>
          }
          aggregate: {
            args: Prisma.TweetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTweet>
          }
          groupBy: {
            args: Prisma.TweetGroupByArgs<ExtArgs>
            result: $Utils.Optional<TweetGroupByOutputType>[]
          }
          count: {
            args: Prisma.TweetCountArgs<ExtArgs>
            result: $Utils.Optional<TweetCountAggregateOutputType> | number
          }
        }
      }
      MediaLibrary: {
        payload: Prisma.$MediaLibraryPayload<ExtArgs>
        fields: Prisma.MediaLibraryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaLibraryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaLibraryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload>
          }
          findFirst: {
            args: Prisma.MediaLibraryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaLibraryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload>
          }
          findMany: {
            args: Prisma.MediaLibraryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload>[]
          }
          create: {
            args: Prisma.MediaLibraryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload>
          }
          createMany: {
            args: Prisma.MediaLibraryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaLibraryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload>[]
          }
          delete: {
            args: Prisma.MediaLibraryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload>
          }
          update: {
            args: Prisma.MediaLibraryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload>
          }
          deleteMany: {
            args: Prisma.MediaLibraryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaLibraryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaLibraryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload>[]
          }
          upsert: {
            args: Prisma.MediaLibraryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaLibraryPayload>
          }
          aggregate: {
            args: Prisma.MediaLibraryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaLibrary>
          }
          groupBy: {
            args: Prisma.MediaLibraryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaLibraryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaLibraryCountArgs<ExtArgs>
            result: $Utils.Optional<MediaLibraryCountAggregateOutputType> | number
          }
        }
      }
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>
        fields: Prisma.AgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
          }
        }
      }
      SchedulerStatus: {
        payload: Prisma.$SchedulerStatusPayload<ExtArgs>
        fields: Prisma.SchedulerStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchedulerStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchedulerStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload>
          }
          findFirst: {
            args: Prisma.SchedulerStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchedulerStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload>
          }
          findMany: {
            args: Prisma.SchedulerStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload>[]
          }
          create: {
            args: Prisma.SchedulerStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload>
          }
          createMany: {
            args: Prisma.SchedulerStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchedulerStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload>[]
          }
          delete: {
            args: Prisma.SchedulerStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload>
          }
          update: {
            args: Prisma.SchedulerStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload>
          }
          deleteMany: {
            args: Prisma.SchedulerStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchedulerStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SchedulerStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload>[]
          }
          upsert: {
            args: Prisma.SchedulerStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulerStatusPayload>
          }
          aggregate: {
            args: Prisma.SchedulerStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedulerStatus>
          }
          groupBy: {
            args: Prisma.SchedulerStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchedulerStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchedulerStatusCountArgs<ExtArgs>
            result: $Utils.Optional<SchedulerStatusCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userSettings?: UserSettingsOmit
    tweet?: TweetOmit
    mediaLibrary?: MediaLibraryOmit
    agent?: AgentOmit
    schedulerStatus?: SchedulerStatusOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tweets: number
    agents: number
    media: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tweets?: boolean | UserCountOutputTypeCountTweetsArgs
    agents?: boolean | UserCountOutputTypeCountAgentsArgs
    media?: boolean | UserCountOutputTypeCountMediaArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTweetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TweetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAgentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaLibraryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tweets?: boolean | User$tweetsArgs<ExtArgs>
    settings?: boolean | User$settingsArgs<ExtArgs>
    agents?: boolean | User$agentsArgs<ExtArgs>
    media?: boolean | User$mediaArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tweets?: boolean | User$tweetsArgs<ExtArgs>
    settings?: boolean | User$settingsArgs<ExtArgs>
    agents?: boolean | User$agentsArgs<ExtArgs>
    media?: boolean | User$mediaArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tweets: Prisma.$TweetPayload<ExtArgs>[]
      settings: Prisma.$UserSettingsPayload<ExtArgs> | null
      agents: Prisma.$AgentPayload<ExtArgs>[]
      media: Prisma.$MediaLibraryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tweets<T extends User$tweetsArgs<ExtArgs> = {}>(args?: Subset<T, User$tweetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    settings<T extends User$settingsArgs<ExtArgs> = {}>(args?: Subset<T, User$settingsArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    agents<T extends User$agentsArgs<ExtArgs> = {}>(args?: Subset<T, User$agentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    media<T extends User$mediaArgs<ExtArgs> = {}>(args?: Subset<T, User$mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.tweets
   */
  export type User$tweetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
    where?: TweetWhereInput
    orderBy?: TweetOrderByWithRelationInput | TweetOrderByWithRelationInput[]
    cursor?: TweetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TweetScalarFieldEnum | TweetScalarFieldEnum[]
  }

  /**
   * User.settings
   */
  export type User$settingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    where?: UserSettingsWhereInput
  }

  /**
   * User.agents
   */
  export type User$agentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    cursor?: AgentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * User.media
   */
  export type User$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
    where?: MediaLibraryWhereInput
    orderBy?: MediaLibraryOrderByWithRelationInput | MediaLibraryOrderByWithRelationInput[]
    cursor?: MediaLibraryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaLibraryScalarFieldEnum | MediaLibraryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserSettings
   */

  export type AggregateUserSettings = {
    _count: UserSettingsCountAggregateOutputType | null
    _min: UserSettingsMinAggregateOutputType | null
    _max: UserSettingsMaxAggregateOutputType | null
  }

  export type UserSettingsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    twitterApiKey: string | null
    twitterApiSecret: string | null
    accessToken: string | null
    accessTokenSecret: string | null
  }

  export type UserSettingsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    twitterApiKey: string | null
    twitterApiSecret: string | null
    accessToken: string | null
    accessTokenSecret: string | null
  }

  export type UserSettingsCountAggregateOutputType = {
    id: number
    userId: number
    twitterApiKey: number
    twitterApiSecret: number
    accessToken: number
    accessTokenSecret: number
    _all: number
  }


  export type UserSettingsMinAggregateInputType = {
    id?: true
    userId?: true
    twitterApiKey?: true
    twitterApiSecret?: true
    accessToken?: true
    accessTokenSecret?: true
  }

  export type UserSettingsMaxAggregateInputType = {
    id?: true
    userId?: true
    twitterApiKey?: true
    twitterApiSecret?: true
    accessToken?: true
    accessTokenSecret?: true
  }

  export type UserSettingsCountAggregateInputType = {
    id?: true
    userId?: true
    twitterApiKey?: true
    twitterApiSecret?: true
    accessToken?: true
    accessTokenSecret?: true
    _all?: true
  }

  export type UserSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSettings to aggregate.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSettings
    **/
    _count?: true | UserSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSettingsMaxAggregateInputType
  }

  export type GetUserSettingsAggregateType<T extends UserSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSettings[P]>
      : GetScalarType<T[P], AggregateUserSettings[P]>
  }




  export type UserSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSettingsWhereInput
    orderBy?: UserSettingsOrderByWithAggregationInput | UserSettingsOrderByWithAggregationInput[]
    by: UserSettingsScalarFieldEnum[] | UserSettingsScalarFieldEnum
    having?: UserSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSettingsCountAggregateInputType | true
    _min?: UserSettingsMinAggregateInputType
    _max?: UserSettingsMaxAggregateInputType
  }

  export type UserSettingsGroupByOutputType = {
    id: string
    userId: string
    twitterApiKey: string | null
    twitterApiSecret: string | null
    accessToken: string | null
    accessTokenSecret: string | null
    _count: UserSettingsCountAggregateOutputType | null
    _min: UserSettingsMinAggregateOutputType | null
    _max: UserSettingsMaxAggregateOutputType | null
  }

  type GetUserSettingsGroupByPayload<T extends UserSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], UserSettingsGroupByOutputType[P]>
        }
      >
    >


  export type UserSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    twitterApiKey?: boolean
    twitterApiSecret?: boolean
    accessToken?: boolean
    accessTokenSecret?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSettings"]>

  export type UserSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    twitterApiKey?: boolean
    twitterApiSecret?: boolean
    accessToken?: boolean
    accessTokenSecret?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSettings"]>

  export type UserSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    twitterApiKey?: boolean
    twitterApiSecret?: boolean
    accessToken?: boolean
    accessTokenSecret?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSettings"]>

  export type UserSettingsSelectScalar = {
    id?: boolean
    userId?: boolean
    twitterApiKey?: boolean
    twitterApiSecret?: boolean
    accessToken?: boolean
    accessTokenSecret?: boolean
  }

  export type UserSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "twitterApiKey" | "twitterApiSecret" | "accessToken" | "accessTokenSecret", ExtArgs["result"]["userSettings"]>
  export type UserSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSettings"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      twitterApiKey: string | null
      twitterApiSecret: string | null
      accessToken: string | null
      accessTokenSecret: string | null
    }, ExtArgs["result"]["userSettings"]>
    composites: {}
  }

  type UserSettingsGetPayload<S extends boolean | null | undefined | UserSettingsDefaultArgs> = $Result.GetResult<Prisma.$UserSettingsPayload, S>

  type UserSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSettingsCountAggregateInputType | true
    }

  export interface UserSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSettings'], meta: { name: 'UserSettings' } }
    /**
     * Find zero or one UserSettings that matches the filter.
     * @param {UserSettingsFindUniqueArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSettingsFindUniqueArgs>(args: SelectSubset<T, UserSettingsFindUniqueArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSettingsFindUniqueOrThrowArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsFindFirstArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSettingsFindFirstArgs>(args?: SelectSubset<T, UserSettingsFindFirstArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsFindFirstOrThrowArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSettings
     * const userSettings = await prisma.userSettings.findMany()
     * 
     * // Get first 10 UserSettings
     * const userSettings = await prisma.userSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSettingsWithIdOnly = await prisma.userSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSettingsFindManyArgs>(args?: SelectSubset<T, UserSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSettings.
     * @param {UserSettingsCreateArgs} args - Arguments to create a UserSettings.
     * @example
     * // Create one UserSettings
     * const UserSettings = await prisma.userSettings.create({
     *   data: {
     *     // ... data to create a UserSettings
     *   }
     * })
     * 
     */
    create<T extends UserSettingsCreateArgs>(args: SelectSubset<T, UserSettingsCreateArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSettings.
     * @param {UserSettingsCreateManyArgs} args - Arguments to create many UserSettings.
     * @example
     * // Create many UserSettings
     * const userSettings = await prisma.userSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSettingsCreateManyArgs>(args?: SelectSubset<T, UserSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSettings and returns the data saved in the database.
     * @param {UserSettingsCreateManyAndReturnArgs} args - Arguments to create many UserSettings.
     * @example
     * // Create many UserSettings
     * const userSettings = await prisma.userSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSettings and only return the `id`
     * const userSettingsWithIdOnly = await prisma.userSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSettings.
     * @param {UserSettingsDeleteArgs} args - Arguments to delete one UserSettings.
     * @example
     * // Delete one UserSettings
     * const UserSettings = await prisma.userSettings.delete({
     *   where: {
     *     // ... filter to delete one UserSettings
     *   }
     * })
     * 
     */
    delete<T extends UserSettingsDeleteArgs>(args: SelectSubset<T, UserSettingsDeleteArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSettings.
     * @param {UserSettingsUpdateArgs} args - Arguments to update one UserSettings.
     * @example
     * // Update one UserSettings
     * const userSettings = await prisma.userSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSettingsUpdateArgs>(args: SelectSubset<T, UserSettingsUpdateArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSettings.
     * @param {UserSettingsDeleteManyArgs} args - Arguments to filter UserSettings to delete.
     * @example
     * // Delete a few UserSettings
     * const { count } = await prisma.userSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSettingsDeleteManyArgs>(args?: SelectSubset<T, UserSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSettings
     * const userSettings = await prisma.userSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSettingsUpdateManyArgs>(args: SelectSubset<T, UserSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSettings and returns the data updated in the database.
     * @param {UserSettingsUpdateManyAndReturnArgs} args - Arguments to update many UserSettings.
     * @example
     * // Update many UserSettings
     * const userSettings = await prisma.userSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSettings and only return the `id`
     * const userSettingsWithIdOnly = await prisma.userSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSettings.
     * @param {UserSettingsUpsertArgs} args - Arguments to update or create a UserSettings.
     * @example
     * // Update or create a UserSettings
     * const userSettings = await prisma.userSettings.upsert({
     *   create: {
     *     // ... data to create a UserSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSettings we want to update
     *   }
     * })
     */
    upsert<T extends UserSettingsUpsertArgs>(args: SelectSubset<T, UserSettingsUpsertArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsCountArgs} args - Arguments to filter UserSettings to count.
     * @example
     * // Count the number of UserSettings
     * const count = await prisma.userSettings.count({
     *   where: {
     *     // ... the filter for the UserSettings we want to count
     *   }
     * })
    **/
    count<T extends UserSettingsCountArgs>(
      args?: Subset<T, UserSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSettingsAggregateArgs>(args: Subset<T, UserSettingsAggregateArgs>): Prisma.PrismaPromise<GetUserSettingsAggregateType<T>>

    /**
     * Group by UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSettingsGroupByArgs['orderBy'] }
        : { orderBy?: UserSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSettings model
   */
  readonly fields: UserSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSettings model
   */
  interface UserSettingsFieldRefs {
    readonly id: FieldRef<"UserSettings", 'String'>
    readonly userId: FieldRef<"UserSettings", 'String'>
    readonly twitterApiKey: FieldRef<"UserSettings", 'String'>
    readonly twitterApiSecret: FieldRef<"UserSettings", 'String'>
    readonly accessToken: FieldRef<"UserSettings", 'String'>
    readonly accessTokenSecret: FieldRef<"UserSettings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserSettings findUnique
   */
  export type UserSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings findUniqueOrThrow
   */
  export type UserSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings findFirst
   */
  export type UserSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSettings.
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSettings.
     */
    distinct?: UserSettingsScalarFieldEnum | UserSettingsScalarFieldEnum[]
  }

  /**
   * UserSettings findFirstOrThrow
   */
  export type UserSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSettings.
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSettings.
     */
    distinct?: UserSettingsScalarFieldEnum | UserSettingsScalarFieldEnum[]
  }

  /**
   * UserSettings findMany
   */
  export type UserSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSettings.
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    distinct?: UserSettingsScalarFieldEnum | UserSettingsScalarFieldEnum[]
  }

  /**
   * UserSettings create
   */
  export type UserSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSettings.
     */
    data: XOR<UserSettingsCreateInput, UserSettingsUncheckedCreateInput>
  }

  /**
   * UserSettings createMany
   */
  export type UserSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSettings.
     */
    data: UserSettingsCreateManyInput | UserSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSettings createManyAndReturn
   */
  export type UserSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many UserSettings.
     */
    data: UserSettingsCreateManyInput | UserSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSettings update
   */
  export type UserSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSettings.
     */
    data: XOR<UserSettingsUpdateInput, UserSettingsUncheckedUpdateInput>
    /**
     * Choose, which UserSettings to update.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings updateMany
   */
  export type UserSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSettings.
     */
    data: XOR<UserSettingsUpdateManyMutationInput, UserSettingsUncheckedUpdateManyInput>
    /**
     * Filter which UserSettings to update
     */
    where?: UserSettingsWhereInput
    /**
     * Limit how many UserSettings to update.
     */
    limit?: number
  }

  /**
   * UserSettings updateManyAndReturn
   */
  export type UserSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * The data used to update UserSettings.
     */
    data: XOR<UserSettingsUpdateManyMutationInput, UserSettingsUncheckedUpdateManyInput>
    /**
     * Filter which UserSettings to update
     */
    where?: UserSettingsWhereInput
    /**
     * Limit how many UserSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSettings upsert
   */
  export type UserSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSettings to update in case it exists.
     */
    where: UserSettingsWhereUniqueInput
    /**
     * In case the UserSettings found by the `where` argument doesn't exist, create a new UserSettings with this data.
     */
    create: XOR<UserSettingsCreateInput, UserSettingsUncheckedCreateInput>
    /**
     * In case the UserSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSettingsUpdateInput, UserSettingsUncheckedUpdateInput>
  }

  /**
   * UserSettings delete
   */
  export type UserSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter which UserSettings to delete.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings deleteMany
   */
  export type UserSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSettings to delete
     */
    where?: UserSettingsWhereInput
    /**
     * Limit how many UserSettings to delete.
     */
    limit?: number
  }

  /**
   * UserSettings without action
   */
  export type UserSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
  }


  /**
   * Model Tweet
   */

  export type AggregateTweet = {
    _count: TweetCountAggregateOutputType | null
    _avg: TweetAvgAggregateOutputType | null
    _sum: TweetSumAggregateOutputType | null
    _min: TweetMinAggregateOutputType | null
    _max: TweetMaxAggregateOutputType | null
  }

  export type TweetAvgAggregateOutputType = {
    retryCount: number | null
  }

  export type TweetSumAggregateOutputType = {
    retryCount: number | null
  }

  export type TweetMinAggregateOutputType = {
    id: string | null
    userId: string | null
    content: string | null
    scheduledFor: Date | null
    status: $Enums.TweetStatus | null
    twitterAccountId: string | null
    agentId: string | null
    retryCount: number | null
    lastAttemptAt: Date | null
    failureReason: string | null
    twitterPostId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TweetMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    content: string | null
    scheduledFor: Date | null
    status: $Enums.TweetStatus | null
    twitterAccountId: string | null
    agentId: string | null
    retryCount: number | null
    lastAttemptAt: Date | null
    failureReason: string | null
    twitterPostId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TweetCountAggregateOutputType = {
    id: number
    userId: number
    content: number
    mediaUrls: number
    scheduledFor: number
    status: number
    twitterAccountId: number
    agentId: number
    retryCount: number
    lastAttemptAt: number
    failureReason: number
    twitterPostId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TweetAvgAggregateInputType = {
    retryCount?: true
  }

  export type TweetSumAggregateInputType = {
    retryCount?: true
  }

  export type TweetMinAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    scheduledFor?: true
    status?: true
    twitterAccountId?: true
    agentId?: true
    retryCount?: true
    lastAttemptAt?: true
    failureReason?: true
    twitterPostId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TweetMaxAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    scheduledFor?: true
    status?: true
    twitterAccountId?: true
    agentId?: true
    retryCount?: true
    lastAttemptAt?: true
    failureReason?: true
    twitterPostId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TweetCountAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    mediaUrls?: true
    scheduledFor?: true
    status?: true
    twitterAccountId?: true
    agentId?: true
    retryCount?: true
    lastAttemptAt?: true
    failureReason?: true
    twitterPostId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TweetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tweet to aggregate.
     */
    where?: TweetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tweets to fetch.
     */
    orderBy?: TweetOrderByWithRelationInput | TweetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TweetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tweets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tweets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tweets
    **/
    _count?: true | TweetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TweetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TweetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TweetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TweetMaxAggregateInputType
  }

  export type GetTweetAggregateType<T extends TweetAggregateArgs> = {
        [P in keyof T & keyof AggregateTweet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTweet[P]>
      : GetScalarType<T[P], AggregateTweet[P]>
  }




  export type TweetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TweetWhereInput
    orderBy?: TweetOrderByWithAggregationInput | TweetOrderByWithAggregationInput[]
    by: TweetScalarFieldEnum[] | TweetScalarFieldEnum
    having?: TweetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TweetCountAggregateInputType | true
    _avg?: TweetAvgAggregateInputType
    _sum?: TweetSumAggregateInputType
    _min?: TweetMinAggregateInputType
    _max?: TweetMaxAggregateInputType
  }

  export type TweetGroupByOutputType = {
    id: string
    userId: string
    content: string
    mediaUrls: string[]
    scheduledFor: Date | null
    status: $Enums.TweetStatus
    twitterAccountId: string | null
    agentId: string | null
    retryCount: number
    lastAttemptAt: Date | null
    failureReason: string | null
    twitterPostId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TweetCountAggregateOutputType | null
    _avg: TweetAvgAggregateOutputType | null
    _sum: TweetSumAggregateOutputType | null
    _min: TweetMinAggregateOutputType | null
    _max: TweetMaxAggregateOutputType | null
  }

  type GetTweetGroupByPayload<T extends TweetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TweetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TweetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TweetGroupByOutputType[P]>
            : GetScalarType<T[P], TweetGroupByOutputType[P]>
        }
      >
    >


  export type TweetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    mediaUrls?: boolean
    scheduledFor?: boolean
    status?: boolean
    twitterAccountId?: boolean
    agentId?: boolean
    retryCount?: boolean
    lastAttemptAt?: boolean
    failureReason?: boolean
    twitterPostId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tweet"]>

  export type TweetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    mediaUrls?: boolean
    scheduledFor?: boolean
    status?: boolean
    twitterAccountId?: boolean
    agentId?: boolean
    retryCount?: boolean
    lastAttemptAt?: boolean
    failureReason?: boolean
    twitterPostId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tweet"]>

  export type TweetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    mediaUrls?: boolean
    scheduledFor?: boolean
    status?: boolean
    twitterAccountId?: boolean
    agentId?: boolean
    retryCount?: boolean
    lastAttemptAt?: boolean
    failureReason?: boolean
    twitterPostId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tweet"]>

  export type TweetSelectScalar = {
    id?: boolean
    userId?: boolean
    content?: boolean
    mediaUrls?: boolean
    scheduledFor?: boolean
    status?: boolean
    twitterAccountId?: boolean
    agentId?: boolean
    retryCount?: boolean
    lastAttemptAt?: boolean
    failureReason?: boolean
    twitterPostId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TweetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "content" | "mediaUrls" | "scheduledFor" | "status" | "twitterAccountId" | "agentId" | "retryCount" | "lastAttemptAt" | "failureReason" | "twitterPostId" | "createdAt" | "updatedAt", ExtArgs["result"]["tweet"]>
  export type TweetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TweetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TweetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TweetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tweet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      content: string
      mediaUrls: string[]
      scheduledFor: Date | null
      status: $Enums.TweetStatus
      twitterAccountId: string | null
      agentId: string | null
      retryCount: number
      lastAttemptAt: Date | null
      failureReason: string | null
      twitterPostId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tweet"]>
    composites: {}
  }

  type TweetGetPayload<S extends boolean | null | undefined | TweetDefaultArgs> = $Result.GetResult<Prisma.$TweetPayload, S>

  type TweetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TweetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TweetCountAggregateInputType | true
    }

  export interface TweetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tweet'], meta: { name: 'Tweet' } }
    /**
     * Find zero or one Tweet that matches the filter.
     * @param {TweetFindUniqueArgs} args - Arguments to find a Tweet
     * @example
     * // Get one Tweet
     * const tweet = await prisma.tweet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TweetFindUniqueArgs>(args: SelectSubset<T, TweetFindUniqueArgs<ExtArgs>>): Prisma__TweetClient<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tweet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TweetFindUniqueOrThrowArgs} args - Arguments to find a Tweet
     * @example
     * // Get one Tweet
     * const tweet = await prisma.tweet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TweetFindUniqueOrThrowArgs>(args: SelectSubset<T, TweetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TweetClient<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tweet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TweetFindFirstArgs} args - Arguments to find a Tweet
     * @example
     * // Get one Tweet
     * const tweet = await prisma.tweet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TweetFindFirstArgs>(args?: SelectSubset<T, TweetFindFirstArgs<ExtArgs>>): Prisma__TweetClient<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tweet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TweetFindFirstOrThrowArgs} args - Arguments to find a Tweet
     * @example
     * // Get one Tweet
     * const tweet = await prisma.tweet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TweetFindFirstOrThrowArgs>(args?: SelectSubset<T, TweetFindFirstOrThrowArgs<ExtArgs>>): Prisma__TweetClient<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tweets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TweetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tweets
     * const tweets = await prisma.tweet.findMany()
     * 
     * // Get first 10 Tweets
     * const tweets = await prisma.tweet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tweetWithIdOnly = await prisma.tweet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TweetFindManyArgs>(args?: SelectSubset<T, TweetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tweet.
     * @param {TweetCreateArgs} args - Arguments to create a Tweet.
     * @example
     * // Create one Tweet
     * const Tweet = await prisma.tweet.create({
     *   data: {
     *     // ... data to create a Tweet
     *   }
     * })
     * 
     */
    create<T extends TweetCreateArgs>(args: SelectSubset<T, TweetCreateArgs<ExtArgs>>): Prisma__TweetClient<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tweets.
     * @param {TweetCreateManyArgs} args - Arguments to create many Tweets.
     * @example
     * // Create many Tweets
     * const tweet = await prisma.tweet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TweetCreateManyArgs>(args?: SelectSubset<T, TweetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tweets and returns the data saved in the database.
     * @param {TweetCreateManyAndReturnArgs} args - Arguments to create many Tweets.
     * @example
     * // Create many Tweets
     * const tweet = await prisma.tweet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tweets and only return the `id`
     * const tweetWithIdOnly = await prisma.tweet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TweetCreateManyAndReturnArgs>(args?: SelectSubset<T, TweetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tweet.
     * @param {TweetDeleteArgs} args - Arguments to delete one Tweet.
     * @example
     * // Delete one Tweet
     * const Tweet = await prisma.tweet.delete({
     *   where: {
     *     // ... filter to delete one Tweet
     *   }
     * })
     * 
     */
    delete<T extends TweetDeleteArgs>(args: SelectSubset<T, TweetDeleteArgs<ExtArgs>>): Prisma__TweetClient<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tweet.
     * @param {TweetUpdateArgs} args - Arguments to update one Tweet.
     * @example
     * // Update one Tweet
     * const tweet = await prisma.tweet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TweetUpdateArgs>(args: SelectSubset<T, TweetUpdateArgs<ExtArgs>>): Prisma__TweetClient<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tweets.
     * @param {TweetDeleteManyArgs} args - Arguments to filter Tweets to delete.
     * @example
     * // Delete a few Tweets
     * const { count } = await prisma.tweet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TweetDeleteManyArgs>(args?: SelectSubset<T, TweetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tweets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TweetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tweets
     * const tweet = await prisma.tweet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TweetUpdateManyArgs>(args: SelectSubset<T, TweetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tweets and returns the data updated in the database.
     * @param {TweetUpdateManyAndReturnArgs} args - Arguments to update many Tweets.
     * @example
     * // Update many Tweets
     * const tweet = await prisma.tweet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tweets and only return the `id`
     * const tweetWithIdOnly = await prisma.tweet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TweetUpdateManyAndReturnArgs>(args: SelectSubset<T, TweetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tweet.
     * @param {TweetUpsertArgs} args - Arguments to update or create a Tweet.
     * @example
     * // Update or create a Tweet
     * const tweet = await prisma.tweet.upsert({
     *   create: {
     *     // ... data to create a Tweet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tweet we want to update
     *   }
     * })
     */
    upsert<T extends TweetUpsertArgs>(args: SelectSubset<T, TweetUpsertArgs<ExtArgs>>): Prisma__TweetClient<$Result.GetResult<Prisma.$TweetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tweets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TweetCountArgs} args - Arguments to filter Tweets to count.
     * @example
     * // Count the number of Tweets
     * const count = await prisma.tweet.count({
     *   where: {
     *     // ... the filter for the Tweets we want to count
     *   }
     * })
    **/
    count<T extends TweetCountArgs>(
      args?: Subset<T, TweetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TweetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tweet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TweetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TweetAggregateArgs>(args: Subset<T, TweetAggregateArgs>): Prisma.PrismaPromise<GetTweetAggregateType<T>>

    /**
     * Group by Tweet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TweetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TweetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TweetGroupByArgs['orderBy'] }
        : { orderBy?: TweetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TweetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTweetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tweet model
   */
  readonly fields: TweetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tweet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TweetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tweet model
   */
  interface TweetFieldRefs {
    readonly id: FieldRef<"Tweet", 'String'>
    readonly userId: FieldRef<"Tweet", 'String'>
    readonly content: FieldRef<"Tweet", 'String'>
    readonly mediaUrls: FieldRef<"Tweet", 'String[]'>
    readonly scheduledFor: FieldRef<"Tweet", 'DateTime'>
    readonly status: FieldRef<"Tweet", 'TweetStatus'>
    readonly twitterAccountId: FieldRef<"Tweet", 'String'>
    readonly agentId: FieldRef<"Tweet", 'String'>
    readonly retryCount: FieldRef<"Tweet", 'Int'>
    readonly lastAttemptAt: FieldRef<"Tweet", 'DateTime'>
    readonly failureReason: FieldRef<"Tweet", 'String'>
    readonly twitterPostId: FieldRef<"Tweet", 'String'>
    readonly createdAt: FieldRef<"Tweet", 'DateTime'>
    readonly updatedAt: FieldRef<"Tweet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tweet findUnique
   */
  export type TweetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
    /**
     * Filter, which Tweet to fetch.
     */
    where: TweetWhereUniqueInput
  }

  /**
   * Tweet findUniqueOrThrow
   */
  export type TweetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
    /**
     * Filter, which Tweet to fetch.
     */
    where: TweetWhereUniqueInput
  }

  /**
   * Tweet findFirst
   */
  export type TweetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
    /**
     * Filter, which Tweet to fetch.
     */
    where?: TweetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tweets to fetch.
     */
    orderBy?: TweetOrderByWithRelationInput | TweetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tweets.
     */
    cursor?: TweetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tweets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tweets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tweets.
     */
    distinct?: TweetScalarFieldEnum | TweetScalarFieldEnum[]
  }

  /**
   * Tweet findFirstOrThrow
   */
  export type TweetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
    /**
     * Filter, which Tweet to fetch.
     */
    where?: TweetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tweets to fetch.
     */
    orderBy?: TweetOrderByWithRelationInput | TweetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tweets.
     */
    cursor?: TweetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tweets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tweets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tweets.
     */
    distinct?: TweetScalarFieldEnum | TweetScalarFieldEnum[]
  }

  /**
   * Tweet findMany
   */
  export type TweetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
    /**
     * Filter, which Tweets to fetch.
     */
    where?: TweetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tweets to fetch.
     */
    orderBy?: TweetOrderByWithRelationInput | TweetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tweets.
     */
    cursor?: TweetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tweets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tweets.
     */
    skip?: number
    distinct?: TweetScalarFieldEnum | TweetScalarFieldEnum[]
  }

  /**
   * Tweet create
   */
  export type TweetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
    /**
     * The data needed to create a Tweet.
     */
    data: XOR<TweetCreateInput, TweetUncheckedCreateInput>
  }

  /**
   * Tweet createMany
   */
  export type TweetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tweets.
     */
    data: TweetCreateManyInput | TweetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tweet createManyAndReturn
   */
  export type TweetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * The data used to create many Tweets.
     */
    data: TweetCreateManyInput | TweetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tweet update
   */
  export type TweetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
    /**
     * The data needed to update a Tweet.
     */
    data: XOR<TweetUpdateInput, TweetUncheckedUpdateInput>
    /**
     * Choose, which Tweet to update.
     */
    where: TweetWhereUniqueInput
  }

  /**
   * Tweet updateMany
   */
  export type TweetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tweets.
     */
    data: XOR<TweetUpdateManyMutationInput, TweetUncheckedUpdateManyInput>
    /**
     * Filter which Tweets to update
     */
    where?: TweetWhereInput
    /**
     * Limit how many Tweets to update.
     */
    limit?: number
  }

  /**
   * Tweet updateManyAndReturn
   */
  export type TweetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * The data used to update Tweets.
     */
    data: XOR<TweetUpdateManyMutationInput, TweetUncheckedUpdateManyInput>
    /**
     * Filter which Tweets to update
     */
    where?: TweetWhereInput
    /**
     * Limit how many Tweets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tweet upsert
   */
  export type TweetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
    /**
     * The filter to search for the Tweet to update in case it exists.
     */
    where: TweetWhereUniqueInput
    /**
     * In case the Tweet found by the `where` argument doesn't exist, create a new Tweet with this data.
     */
    create: XOR<TweetCreateInput, TweetUncheckedCreateInput>
    /**
     * In case the Tweet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TweetUpdateInput, TweetUncheckedUpdateInput>
  }

  /**
   * Tweet delete
   */
  export type TweetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
    /**
     * Filter which Tweet to delete.
     */
    where: TweetWhereUniqueInput
  }

  /**
   * Tweet deleteMany
   */
  export type TweetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tweets to delete
     */
    where?: TweetWhereInput
    /**
     * Limit how many Tweets to delete.
     */
    limit?: number
  }

  /**
   * Tweet without action
   */
  export type TweetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tweet
     */
    select?: TweetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tweet
     */
    omit?: TweetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TweetInclude<ExtArgs> | null
  }


  /**
   * Model MediaLibrary
   */

  export type AggregateMediaLibrary = {
    _count: MediaLibraryCountAggregateOutputType | null
    _avg: MediaLibraryAvgAggregateOutputType | null
    _sum: MediaLibrarySumAggregateOutputType | null
    _min: MediaLibraryMinAggregateOutputType | null
    _max: MediaLibraryMaxAggregateOutputType | null
  }

  export type MediaLibraryAvgAggregateOutputType = {
    fileSize: number | null
    optimizedSize: number | null
    compressionRatio: number | null
  }

  export type MediaLibrarySumAggregateOutputType = {
    fileSize: number | null
    optimizedSize: number | null
    compressionRatio: number | null
  }

  export type MediaLibraryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    filename: string | null
    originalFilename: string | null
    fileType: string | null
    fileSize: number | null
    optimizedSize: number | null
    compressionRatio: number | null
    url: string | null
    folder: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MediaLibraryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    filename: string | null
    originalFilename: string | null
    fileType: string | null
    fileSize: number | null
    optimizedSize: number | null
    compressionRatio: number | null
    url: string | null
    folder: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MediaLibraryCountAggregateOutputType = {
    id: number
    userId: number
    filename: number
    originalFilename: number
    fileType: number
    fileSize: number
    optimizedSize: number
    compressionRatio: number
    dimensions: number
    url: number
    folder: number
    tags: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MediaLibraryAvgAggregateInputType = {
    fileSize?: true
    optimizedSize?: true
    compressionRatio?: true
  }

  export type MediaLibrarySumAggregateInputType = {
    fileSize?: true
    optimizedSize?: true
    compressionRatio?: true
  }

  export type MediaLibraryMinAggregateInputType = {
    id?: true
    userId?: true
    filename?: true
    originalFilename?: true
    fileType?: true
    fileSize?: true
    optimizedSize?: true
    compressionRatio?: true
    url?: true
    folder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MediaLibraryMaxAggregateInputType = {
    id?: true
    userId?: true
    filename?: true
    originalFilename?: true
    fileType?: true
    fileSize?: true
    optimizedSize?: true
    compressionRatio?: true
    url?: true
    folder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MediaLibraryCountAggregateInputType = {
    id?: true
    userId?: true
    filename?: true
    originalFilename?: true
    fileType?: true
    fileSize?: true
    optimizedSize?: true
    compressionRatio?: true
    dimensions?: true
    url?: true
    folder?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MediaLibraryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaLibrary to aggregate.
     */
    where?: MediaLibraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaLibraries to fetch.
     */
    orderBy?: MediaLibraryOrderByWithRelationInput | MediaLibraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaLibraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaLibraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaLibraries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaLibraries
    **/
    _count?: true | MediaLibraryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaLibraryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaLibrarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaLibraryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaLibraryMaxAggregateInputType
  }

  export type GetMediaLibraryAggregateType<T extends MediaLibraryAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaLibrary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaLibrary[P]>
      : GetScalarType<T[P], AggregateMediaLibrary[P]>
  }




  export type MediaLibraryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaLibraryWhereInput
    orderBy?: MediaLibraryOrderByWithAggregationInput | MediaLibraryOrderByWithAggregationInput[]
    by: MediaLibraryScalarFieldEnum[] | MediaLibraryScalarFieldEnum
    having?: MediaLibraryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaLibraryCountAggregateInputType | true
    _avg?: MediaLibraryAvgAggregateInputType
    _sum?: MediaLibrarySumAggregateInputType
    _min?: MediaLibraryMinAggregateInputType
    _max?: MediaLibraryMaxAggregateInputType
  }

  export type MediaLibraryGroupByOutputType = {
    id: string
    userId: string
    filename: string
    originalFilename: string
    fileType: string
    fileSize: number
    optimizedSize: number
    compressionRatio: number
    dimensions: JsonValue
    url: string
    folder: string
    tags: string[]
    createdAt: Date
    updatedAt: Date
    _count: MediaLibraryCountAggregateOutputType | null
    _avg: MediaLibraryAvgAggregateOutputType | null
    _sum: MediaLibrarySumAggregateOutputType | null
    _min: MediaLibraryMinAggregateOutputType | null
    _max: MediaLibraryMaxAggregateOutputType | null
  }

  type GetMediaLibraryGroupByPayload<T extends MediaLibraryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaLibraryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaLibraryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaLibraryGroupByOutputType[P]>
            : GetScalarType<T[P], MediaLibraryGroupByOutputType[P]>
        }
      >
    >


  export type MediaLibrarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filename?: boolean
    originalFilename?: boolean
    fileType?: boolean
    fileSize?: boolean
    optimizedSize?: boolean
    compressionRatio?: boolean
    dimensions?: boolean
    url?: boolean
    folder?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaLibrary"]>

  export type MediaLibrarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filename?: boolean
    originalFilename?: boolean
    fileType?: boolean
    fileSize?: boolean
    optimizedSize?: boolean
    compressionRatio?: boolean
    dimensions?: boolean
    url?: boolean
    folder?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaLibrary"]>

  export type MediaLibrarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filename?: boolean
    originalFilename?: boolean
    fileType?: boolean
    fileSize?: boolean
    optimizedSize?: boolean
    compressionRatio?: boolean
    dimensions?: boolean
    url?: boolean
    folder?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaLibrary"]>

  export type MediaLibrarySelectScalar = {
    id?: boolean
    userId?: boolean
    filename?: boolean
    originalFilename?: boolean
    fileType?: boolean
    fileSize?: boolean
    optimizedSize?: boolean
    compressionRatio?: boolean
    dimensions?: boolean
    url?: boolean
    folder?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MediaLibraryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "filename" | "originalFilename" | "fileType" | "fileSize" | "optimizedSize" | "compressionRatio" | "dimensions" | "url" | "folder" | "tags" | "createdAt" | "updatedAt", ExtArgs["result"]["mediaLibrary"]>
  export type MediaLibraryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MediaLibraryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MediaLibraryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MediaLibraryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaLibrary"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      filename: string
      originalFilename: string
      fileType: string
      fileSize: number
      optimizedSize: number
      compressionRatio: number
      dimensions: Prisma.JsonValue
      url: string
      folder: string
      tags: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mediaLibrary"]>
    composites: {}
  }

  type MediaLibraryGetPayload<S extends boolean | null | undefined | MediaLibraryDefaultArgs> = $Result.GetResult<Prisma.$MediaLibraryPayload, S>

  type MediaLibraryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaLibraryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaLibraryCountAggregateInputType | true
    }

  export interface MediaLibraryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaLibrary'], meta: { name: 'MediaLibrary' } }
    /**
     * Find zero or one MediaLibrary that matches the filter.
     * @param {MediaLibraryFindUniqueArgs} args - Arguments to find a MediaLibrary
     * @example
     * // Get one MediaLibrary
     * const mediaLibrary = await prisma.mediaLibrary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaLibraryFindUniqueArgs>(args: SelectSubset<T, MediaLibraryFindUniqueArgs<ExtArgs>>): Prisma__MediaLibraryClient<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaLibrary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaLibraryFindUniqueOrThrowArgs} args - Arguments to find a MediaLibrary
     * @example
     * // Get one MediaLibrary
     * const mediaLibrary = await prisma.mediaLibrary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaLibraryFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaLibraryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaLibraryClient<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaLibrary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaLibraryFindFirstArgs} args - Arguments to find a MediaLibrary
     * @example
     * // Get one MediaLibrary
     * const mediaLibrary = await prisma.mediaLibrary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaLibraryFindFirstArgs>(args?: SelectSubset<T, MediaLibraryFindFirstArgs<ExtArgs>>): Prisma__MediaLibraryClient<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaLibrary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaLibraryFindFirstOrThrowArgs} args - Arguments to find a MediaLibrary
     * @example
     * // Get one MediaLibrary
     * const mediaLibrary = await prisma.mediaLibrary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaLibraryFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaLibraryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaLibraryClient<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaLibraries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaLibraryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaLibraries
     * const mediaLibraries = await prisma.mediaLibrary.findMany()
     * 
     * // Get first 10 MediaLibraries
     * const mediaLibraries = await prisma.mediaLibrary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaLibraryWithIdOnly = await prisma.mediaLibrary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaLibraryFindManyArgs>(args?: SelectSubset<T, MediaLibraryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaLibrary.
     * @param {MediaLibraryCreateArgs} args - Arguments to create a MediaLibrary.
     * @example
     * // Create one MediaLibrary
     * const MediaLibrary = await prisma.mediaLibrary.create({
     *   data: {
     *     // ... data to create a MediaLibrary
     *   }
     * })
     * 
     */
    create<T extends MediaLibraryCreateArgs>(args: SelectSubset<T, MediaLibraryCreateArgs<ExtArgs>>): Prisma__MediaLibraryClient<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaLibraries.
     * @param {MediaLibraryCreateManyArgs} args - Arguments to create many MediaLibraries.
     * @example
     * // Create many MediaLibraries
     * const mediaLibrary = await prisma.mediaLibrary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaLibraryCreateManyArgs>(args?: SelectSubset<T, MediaLibraryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaLibraries and returns the data saved in the database.
     * @param {MediaLibraryCreateManyAndReturnArgs} args - Arguments to create many MediaLibraries.
     * @example
     * // Create many MediaLibraries
     * const mediaLibrary = await prisma.mediaLibrary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaLibraries and only return the `id`
     * const mediaLibraryWithIdOnly = await prisma.mediaLibrary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaLibraryCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaLibraryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MediaLibrary.
     * @param {MediaLibraryDeleteArgs} args - Arguments to delete one MediaLibrary.
     * @example
     * // Delete one MediaLibrary
     * const MediaLibrary = await prisma.mediaLibrary.delete({
     *   where: {
     *     // ... filter to delete one MediaLibrary
     *   }
     * })
     * 
     */
    delete<T extends MediaLibraryDeleteArgs>(args: SelectSubset<T, MediaLibraryDeleteArgs<ExtArgs>>): Prisma__MediaLibraryClient<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaLibrary.
     * @param {MediaLibraryUpdateArgs} args - Arguments to update one MediaLibrary.
     * @example
     * // Update one MediaLibrary
     * const mediaLibrary = await prisma.mediaLibrary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaLibraryUpdateArgs>(args: SelectSubset<T, MediaLibraryUpdateArgs<ExtArgs>>): Prisma__MediaLibraryClient<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaLibraries.
     * @param {MediaLibraryDeleteManyArgs} args - Arguments to filter MediaLibraries to delete.
     * @example
     * // Delete a few MediaLibraries
     * const { count } = await prisma.mediaLibrary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaLibraryDeleteManyArgs>(args?: SelectSubset<T, MediaLibraryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaLibraries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaLibraryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaLibraries
     * const mediaLibrary = await prisma.mediaLibrary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaLibraryUpdateManyArgs>(args: SelectSubset<T, MediaLibraryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaLibraries and returns the data updated in the database.
     * @param {MediaLibraryUpdateManyAndReturnArgs} args - Arguments to update many MediaLibraries.
     * @example
     * // Update many MediaLibraries
     * const mediaLibrary = await prisma.mediaLibrary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MediaLibraries and only return the `id`
     * const mediaLibraryWithIdOnly = await prisma.mediaLibrary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MediaLibraryUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaLibraryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MediaLibrary.
     * @param {MediaLibraryUpsertArgs} args - Arguments to update or create a MediaLibrary.
     * @example
     * // Update or create a MediaLibrary
     * const mediaLibrary = await prisma.mediaLibrary.upsert({
     *   create: {
     *     // ... data to create a MediaLibrary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaLibrary we want to update
     *   }
     * })
     */
    upsert<T extends MediaLibraryUpsertArgs>(args: SelectSubset<T, MediaLibraryUpsertArgs<ExtArgs>>): Prisma__MediaLibraryClient<$Result.GetResult<Prisma.$MediaLibraryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaLibraries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaLibraryCountArgs} args - Arguments to filter MediaLibraries to count.
     * @example
     * // Count the number of MediaLibraries
     * const count = await prisma.mediaLibrary.count({
     *   where: {
     *     // ... the filter for the MediaLibraries we want to count
     *   }
     * })
    **/
    count<T extends MediaLibraryCountArgs>(
      args?: Subset<T, MediaLibraryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaLibraryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaLibrary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaLibraryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaLibraryAggregateArgs>(args: Subset<T, MediaLibraryAggregateArgs>): Prisma.PrismaPromise<GetMediaLibraryAggregateType<T>>

    /**
     * Group by MediaLibrary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaLibraryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaLibraryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaLibraryGroupByArgs['orderBy'] }
        : { orderBy?: MediaLibraryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaLibraryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaLibraryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaLibrary model
   */
  readonly fields: MediaLibraryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaLibrary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaLibraryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MediaLibrary model
   */
  interface MediaLibraryFieldRefs {
    readonly id: FieldRef<"MediaLibrary", 'String'>
    readonly userId: FieldRef<"MediaLibrary", 'String'>
    readonly filename: FieldRef<"MediaLibrary", 'String'>
    readonly originalFilename: FieldRef<"MediaLibrary", 'String'>
    readonly fileType: FieldRef<"MediaLibrary", 'String'>
    readonly fileSize: FieldRef<"MediaLibrary", 'Int'>
    readonly optimizedSize: FieldRef<"MediaLibrary", 'Int'>
    readonly compressionRatio: FieldRef<"MediaLibrary", 'Float'>
    readonly dimensions: FieldRef<"MediaLibrary", 'Json'>
    readonly url: FieldRef<"MediaLibrary", 'String'>
    readonly folder: FieldRef<"MediaLibrary", 'String'>
    readonly tags: FieldRef<"MediaLibrary", 'String[]'>
    readonly createdAt: FieldRef<"MediaLibrary", 'DateTime'>
    readonly updatedAt: FieldRef<"MediaLibrary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaLibrary findUnique
   */
  export type MediaLibraryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
    /**
     * Filter, which MediaLibrary to fetch.
     */
    where: MediaLibraryWhereUniqueInput
  }

  /**
   * MediaLibrary findUniqueOrThrow
   */
  export type MediaLibraryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
    /**
     * Filter, which MediaLibrary to fetch.
     */
    where: MediaLibraryWhereUniqueInput
  }

  /**
   * MediaLibrary findFirst
   */
  export type MediaLibraryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
    /**
     * Filter, which MediaLibrary to fetch.
     */
    where?: MediaLibraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaLibraries to fetch.
     */
    orderBy?: MediaLibraryOrderByWithRelationInput | MediaLibraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaLibraries.
     */
    cursor?: MediaLibraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaLibraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaLibraries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaLibraries.
     */
    distinct?: MediaLibraryScalarFieldEnum | MediaLibraryScalarFieldEnum[]
  }

  /**
   * MediaLibrary findFirstOrThrow
   */
  export type MediaLibraryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
    /**
     * Filter, which MediaLibrary to fetch.
     */
    where?: MediaLibraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaLibraries to fetch.
     */
    orderBy?: MediaLibraryOrderByWithRelationInput | MediaLibraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaLibraries.
     */
    cursor?: MediaLibraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaLibraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaLibraries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaLibraries.
     */
    distinct?: MediaLibraryScalarFieldEnum | MediaLibraryScalarFieldEnum[]
  }

  /**
   * MediaLibrary findMany
   */
  export type MediaLibraryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
    /**
     * Filter, which MediaLibraries to fetch.
     */
    where?: MediaLibraryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaLibraries to fetch.
     */
    orderBy?: MediaLibraryOrderByWithRelationInput | MediaLibraryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaLibraries.
     */
    cursor?: MediaLibraryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaLibraries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaLibraries.
     */
    skip?: number
    distinct?: MediaLibraryScalarFieldEnum | MediaLibraryScalarFieldEnum[]
  }

  /**
   * MediaLibrary create
   */
  export type MediaLibraryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaLibrary.
     */
    data: XOR<MediaLibraryCreateInput, MediaLibraryUncheckedCreateInput>
  }

  /**
   * MediaLibrary createMany
   */
  export type MediaLibraryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaLibraries.
     */
    data: MediaLibraryCreateManyInput | MediaLibraryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaLibrary createManyAndReturn
   */
  export type MediaLibraryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * The data used to create many MediaLibraries.
     */
    data: MediaLibraryCreateManyInput | MediaLibraryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MediaLibrary update
   */
  export type MediaLibraryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaLibrary.
     */
    data: XOR<MediaLibraryUpdateInput, MediaLibraryUncheckedUpdateInput>
    /**
     * Choose, which MediaLibrary to update.
     */
    where: MediaLibraryWhereUniqueInput
  }

  /**
   * MediaLibrary updateMany
   */
  export type MediaLibraryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaLibraries.
     */
    data: XOR<MediaLibraryUpdateManyMutationInput, MediaLibraryUncheckedUpdateManyInput>
    /**
     * Filter which MediaLibraries to update
     */
    where?: MediaLibraryWhereInput
    /**
     * Limit how many MediaLibraries to update.
     */
    limit?: number
  }

  /**
   * MediaLibrary updateManyAndReturn
   */
  export type MediaLibraryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * The data used to update MediaLibraries.
     */
    data: XOR<MediaLibraryUpdateManyMutationInput, MediaLibraryUncheckedUpdateManyInput>
    /**
     * Filter which MediaLibraries to update
     */
    where?: MediaLibraryWhereInput
    /**
     * Limit how many MediaLibraries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MediaLibrary upsert
   */
  export type MediaLibraryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaLibrary to update in case it exists.
     */
    where: MediaLibraryWhereUniqueInput
    /**
     * In case the MediaLibrary found by the `where` argument doesn't exist, create a new MediaLibrary with this data.
     */
    create: XOR<MediaLibraryCreateInput, MediaLibraryUncheckedCreateInput>
    /**
     * In case the MediaLibrary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaLibraryUpdateInput, MediaLibraryUncheckedUpdateInput>
  }

  /**
   * MediaLibrary delete
   */
  export type MediaLibraryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
    /**
     * Filter which MediaLibrary to delete.
     */
    where: MediaLibraryWhereUniqueInput
  }

  /**
   * MediaLibrary deleteMany
   */
  export type MediaLibraryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaLibraries to delete
     */
    where?: MediaLibraryWhereInput
    /**
     * Limit how many MediaLibraries to delete.
     */
    limit?: number
  }

  /**
   * MediaLibrary without action
   */
  export type MediaLibraryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaLibrary
     */
    select?: MediaLibrarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaLibrary
     */
    omit?: MediaLibraryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaLibraryInclude<ExtArgs> | null
  }


  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    username: string | null
    systemPrompt: string | null
    enabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    username: string | null
    systemPrompt: string | null
    enabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    username: number
    systemPrompt: number
    bio: number
    lore: number
    messageExamples: number
    postExamples: number
    adjectives: number
    topics: number
    styleConfig: number
    enabled: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgentMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    username?: true
    systemPrompt?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    username?: true
    systemPrompt?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    username?: true
    systemPrompt?: true
    bio?: true
    lore?: true
    messageExamples?: true
    postExamples?: true
    adjectives?: true
    topics?: true
    styleConfig?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type AgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithAggregationInput | AgentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: AgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: string
    userId: string
    name: string
    username: string | null
    systemPrompt: string | null
    bio: string[]
    lore: string[]
    messageExamples: JsonValue
    postExamples: string[]
    adjectives: string[]
    topics: string[]
    styleConfig: JsonValue
    enabled: boolean
    createdAt: Date
    updatedAt: Date
    _count: AgentCountAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type AgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    username?: boolean
    systemPrompt?: boolean
    bio?: boolean
    lore?: boolean
    messageExamples?: boolean
    postExamples?: boolean
    adjectives?: boolean
    topics?: boolean
    styleConfig?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    username?: boolean
    systemPrompt?: boolean
    bio?: boolean
    lore?: boolean
    messageExamples?: boolean
    postExamples?: boolean
    adjectives?: boolean
    topics?: boolean
    styleConfig?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    username?: boolean
    systemPrompt?: boolean
    bio?: boolean
    lore?: boolean
    messageExamples?: boolean
    postExamples?: boolean
    adjectives?: boolean
    topics?: boolean
    styleConfig?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    username?: boolean
    systemPrompt?: boolean
    bio?: boolean
    lore?: boolean
    messageExamples?: boolean
    postExamples?: boolean
    adjectives?: boolean
    topics?: boolean
    styleConfig?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "username" | "systemPrompt" | "bio" | "lore" | "messageExamples" | "postExamples" | "adjectives" | "topics" | "styleConfig" | "enabled" | "createdAt" | "updatedAt", ExtArgs["result"]["agent"]>
  export type AgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AgentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      username: string | null
      systemPrompt: string | null
      bio: string[]
      lore: string[]
      messageExamples: Prisma.JsonValue
      postExamples: string[]
      adjectives: string[]
      topics: string[]
      styleConfig: Prisma.JsonValue
      enabled: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPayload, S>

  type AgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface AgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agent'], meta: { name: 'Agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentFindManyArgs>(args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends AgentCreateArgs>(args: SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCreateManyArgs>(args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends AgentDeleteArgs>(args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUpdateArgs>(args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUpdateManyArgs>(args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {AgentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agent model
   */
  readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agent model
   */
  interface AgentFieldRefs {
    readonly id: FieldRef<"Agent", 'String'>
    readonly userId: FieldRef<"Agent", 'String'>
    readonly name: FieldRef<"Agent", 'String'>
    readonly username: FieldRef<"Agent", 'String'>
    readonly systemPrompt: FieldRef<"Agent", 'String'>
    readonly bio: FieldRef<"Agent", 'String[]'>
    readonly lore: FieldRef<"Agent", 'String[]'>
    readonly messageExamples: FieldRef<"Agent", 'Json'>
    readonly postExamples: FieldRef<"Agent", 'String[]'>
    readonly adjectives: FieldRef<"Agent", 'String[]'>
    readonly topics: FieldRef<"Agent", 'String[]'>
    readonly styleConfig: FieldRef<"Agent", 'Json'>
    readonly enabled: FieldRef<"Agent", 'Boolean'>
    readonly createdAt: FieldRef<"Agent", 'DateTime'>
    readonly updatedAt: FieldRef<"Agent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent create
   */
  export type AgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>
  }

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agent update
   */
  export type AgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent updateManyAndReturn
   */
  export type AgentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
  }

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to delete.
     */
    limit?: number
  }

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
  }


  /**
   * Model SchedulerStatus
   */

  export type AggregateSchedulerStatus = {
    _count: SchedulerStatusCountAggregateOutputType | null
    _min: SchedulerStatusMinAggregateOutputType | null
    _max: SchedulerStatusMaxAggregateOutputType | null
  }

  export type SchedulerStatusMinAggregateOutputType = {
    id: string | null
    lastRunAt: Date | null
    lastSuccessAt: Date | null
    lastFailureAt: Date | null
    lastError: string | null
    updatedAt: Date | null
  }

  export type SchedulerStatusMaxAggregateOutputType = {
    id: string | null
    lastRunAt: Date | null
    lastSuccessAt: Date | null
    lastFailureAt: Date | null
    lastError: string | null
    updatedAt: Date | null
  }

  export type SchedulerStatusCountAggregateOutputType = {
    id: number
    lastRunAt: number
    lastSuccessAt: number
    lastFailureAt: number
    lastError: number
    updatedAt: number
    _all: number
  }


  export type SchedulerStatusMinAggregateInputType = {
    id?: true
    lastRunAt?: true
    lastSuccessAt?: true
    lastFailureAt?: true
    lastError?: true
    updatedAt?: true
  }

  export type SchedulerStatusMaxAggregateInputType = {
    id?: true
    lastRunAt?: true
    lastSuccessAt?: true
    lastFailureAt?: true
    lastError?: true
    updatedAt?: true
  }

  export type SchedulerStatusCountAggregateInputType = {
    id?: true
    lastRunAt?: true
    lastSuccessAt?: true
    lastFailureAt?: true
    lastError?: true
    updatedAt?: true
    _all?: true
  }

  export type SchedulerStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchedulerStatus to aggregate.
     */
    where?: SchedulerStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchedulerStatuses to fetch.
     */
    orderBy?: SchedulerStatusOrderByWithRelationInput | SchedulerStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchedulerStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchedulerStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchedulerStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SchedulerStatuses
    **/
    _count?: true | SchedulerStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchedulerStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchedulerStatusMaxAggregateInputType
  }

  export type GetSchedulerStatusAggregateType<T extends SchedulerStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedulerStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedulerStatus[P]>
      : GetScalarType<T[P], AggregateSchedulerStatus[P]>
  }




  export type SchedulerStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchedulerStatusWhereInput
    orderBy?: SchedulerStatusOrderByWithAggregationInput | SchedulerStatusOrderByWithAggregationInput[]
    by: SchedulerStatusScalarFieldEnum[] | SchedulerStatusScalarFieldEnum
    having?: SchedulerStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchedulerStatusCountAggregateInputType | true
    _min?: SchedulerStatusMinAggregateInputType
    _max?: SchedulerStatusMaxAggregateInputType
  }

  export type SchedulerStatusGroupByOutputType = {
    id: string
    lastRunAt: Date | null
    lastSuccessAt: Date | null
    lastFailureAt: Date | null
    lastError: string | null
    updatedAt: Date
    _count: SchedulerStatusCountAggregateOutputType | null
    _min: SchedulerStatusMinAggregateOutputType | null
    _max: SchedulerStatusMaxAggregateOutputType | null
  }

  type GetSchedulerStatusGroupByPayload<T extends SchedulerStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchedulerStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchedulerStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchedulerStatusGroupByOutputType[P]>
            : GetScalarType<T[P], SchedulerStatusGroupByOutputType[P]>
        }
      >
    >


  export type SchedulerStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lastRunAt?: boolean
    lastSuccessAt?: boolean
    lastFailureAt?: boolean
    lastError?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["schedulerStatus"]>

  export type SchedulerStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lastRunAt?: boolean
    lastSuccessAt?: boolean
    lastFailureAt?: boolean
    lastError?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["schedulerStatus"]>

  export type SchedulerStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lastRunAt?: boolean
    lastSuccessAt?: boolean
    lastFailureAt?: boolean
    lastError?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["schedulerStatus"]>

  export type SchedulerStatusSelectScalar = {
    id?: boolean
    lastRunAt?: boolean
    lastSuccessAt?: boolean
    lastFailureAt?: boolean
    lastError?: boolean
    updatedAt?: boolean
  }

  export type SchedulerStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "lastRunAt" | "lastSuccessAt" | "lastFailureAt" | "lastError" | "updatedAt", ExtArgs["result"]["schedulerStatus"]>

  export type $SchedulerStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SchedulerStatus"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      lastRunAt: Date | null
      lastSuccessAt: Date | null
      lastFailureAt: Date | null
      lastError: string | null
      updatedAt: Date
    }, ExtArgs["result"]["schedulerStatus"]>
    composites: {}
  }

  type SchedulerStatusGetPayload<S extends boolean | null | undefined | SchedulerStatusDefaultArgs> = $Result.GetResult<Prisma.$SchedulerStatusPayload, S>

  type SchedulerStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SchedulerStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SchedulerStatusCountAggregateInputType | true
    }

  export interface SchedulerStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SchedulerStatus'], meta: { name: 'SchedulerStatus' } }
    /**
     * Find zero or one SchedulerStatus that matches the filter.
     * @param {SchedulerStatusFindUniqueArgs} args - Arguments to find a SchedulerStatus
     * @example
     * // Get one SchedulerStatus
     * const schedulerStatus = await prisma.schedulerStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchedulerStatusFindUniqueArgs>(args: SelectSubset<T, SchedulerStatusFindUniqueArgs<ExtArgs>>): Prisma__SchedulerStatusClient<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SchedulerStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SchedulerStatusFindUniqueOrThrowArgs} args - Arguments to find a SchedulerStatus
     * @example
     * // Get one SchedulerStatus
     * const schedulerStatus = await prisma.schedulerStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchedulerStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, SchedulerStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchedulerStatusClient<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SchedulerStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerStatusFindFirstArgs} args - Arguments to find a SchedulerStatus
     * @example
     * // Get one SchedulerStatus
     * const schedulerStatus = await prisma.schedulerStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchedulerStatusFindFirstArgs>(args?: SelectSubset<T, SchedulerStatusFindFirstArgs<ExtArgs>>): Prisma__SchedulerStatusClient<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SchedulerStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerStatusFindFirstOrThrowArgs} args - Arguments to find a SchedulerStatus
     * @example
     * // Get one SchedulerStatus
     * const schedulerStatus = await prisma.schedulerStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchedulerStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, SchedulerStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchedulerStatusClient<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SchedulerStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SchedulerStatuses
     * const schedulerStatuses = await prisma.schedulerStatus.findMany()
     * 
     * // Get first 10 SchedulerStatuses
     * const schedulerStatuses = await prisma.schedulerStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const schedulerStatusWithIdOnly = await prisma.schedulerStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SchedulerStatusFindManyArgs>(args?: SelectSubset<T, SchedulerStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SchedulerStatus.
     * @param {SchedulerStatusCreateArgs} args - Arguments to create a SchedulerStatus.
     * @example
     * // Create one SchedulerStatus
     * const SchedulerStatus = await prisma.schedulerStatus.create({
     *   data: {
     *     // ... data to create a SchedulerStatus
     *   }
     * })
     * 
     */
    create<T extends SchedulerStatusCreateArgs>(args: SelectSubset<T, SchedulerStatusCreateArgs<ExtArgs>>): Prisma__SchedulerStatusClient<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SchedulerStatuses.
     * @param {SchedulerStatusCreateManyArgs} args - Arguments to create many SchedulerStatuses.
     * @example
     * // Create many SchedulerStatuses
     * const schedulerStatus = await prisma.schedulerStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchedulerStatusCreateManyArgs>(args?: SelectSubset<T, SchedulerStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SchedulerStatuses and returns the data saved in the database.
     * @param {SchedulerStatusCreateManyAndReturnArgs} args - Arguments to create many SchedulerStatuses.
     * @example
     * // Create many SchedulerStatuses
     * const schedulerStatus = await prisma.schedulerStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SchedulerStatuses and only return the `id`
     * const schedulerStatusWithIdOnly = await prisma.schedulerStatus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchedulerStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, SchedulerStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SchedulerStatus.
     * @param {SchedulerStatusDeleteArgs} args - Arguments to delete one SchedulerStatus.
     * @example
     * // Delete one SchedulerStatus
     * const SchedulerStatus = await prisma.schedulerStatus.delete({
     *   where: {
     *     // ... filter to delete one SchedulerStatus
     *   }
     * })
     * 
     */
    delete<T extends SchedulerStatusDeleteArgs>(args: SelectSubset<T, SchedulerStatusDeleteArgs<ExtArgs>>): Prisma__SchedulerStatusClient<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SchedulerStatus.
     * @param {SchedulerStatusUpdateArgs} args - Arguments to update one SchedulerStatus.
     * @example
     * // Update one SchedulerStatus
     * const schedulerStatus = await prisma.schedulerStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchedulerStatusUpdateArgs>(args: SelectSubset<T, SchedulerStatusUpdateArgs<ExtArgs>>): Prisma__SchedulerStatusClient<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SchedulerStatuses.
     * @param {SchedulerStatusDeleteManyArgs} args - Arguments to filter SchedulerStatuses to delete.
     * @example
     * // Delete a few SchedulerStatuses
     * const { count } = await prisma.schedulerStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchedulerStatusDeleteManyArgs>(args?: SelectSubset<T, SchedulerStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SchedulerStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SchedulerStatuses
     * const schedulerStatus = await prisma.schedulerStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchedulerStatusUpdateManyArgs>(args: SelectSubset<T, SchedulerStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SchedulerStatuses and returns the data updated in the database.
     * @param {SchedulerStatusUpdateManyAndReturnArgs} args - Arguments to update many SchedulerStatuses.
     * @example
     * // Update many SchedulerStatuses
     * const schedulerStatus = await prisma.schedulerStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SchedulerStatuses and only return the `id`
     * const schedulerStatusWithIdOnly = await prisma.schedulerStatus.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SchedulerStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, SchedulerStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SchedulerStatus.
     * @param {SchedulerStatusUpsertArgs} args - Arguments to update or create a SchedulerStatus.
     * @example
     * // Update or create a SchedulerStatus
     * const schedulerStatus = await prisma.schedulerStatus.upsert({
     *   create: {
     *     // ... data to create a SchedulerStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SchedulerStatus we want to update
     *   }
     * })
     */
    upsert<T extends SchedulerStatusUpsertArgs>(args: SelectSubset<T, SchedulerStatusUpsertArgs<ExtArgs>>): Prisma__SchedulerStatusClient<$Result.GetResult<Prisma.$SchedulerStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SchedulerStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerStatusCountArgs} args - Arguments to filter SchedulerStatuses to count.
     * @example
     * // Count the number of SchedulerStatuses
     * const count = await prisma.schedulerStatus.count({
     *   where: {
     *     // ... the filter for the SchedulerStatuses we want to count
     *   }
     * })
    **/
    count<T extends SchedulerStatusCountArgs>(
      args?: Subset<T, SchedulerStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchedulerStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SchedulerStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SchedulerStatusAggregateArgs>(args: Subset<T, SchedulerStatusAggregateArgs>): Prisma.PrismaPromise<GetSchedulerStatusAggregateType<T>>

    /**
     * Group by SchedulerStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SchedulerStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchedulerStatusGroupByArgs['orderBy'] }
        : { orderBy?: SchedulerStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SchedulerStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchedulerStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SchedulerStatus model
   */
  readonly fields: SchedulerStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SchedulerStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchedulerStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SchedulerStatus model
   */
  interface SchedulerStatusFieldRefs {
    readonly id: FieldRef<"SchedulerStatus", 'String'>
    readonly lastRunAt: FieldRef<"SchedulerStatus", 'DateTime'>
    readonly lastSuccessAt: FieldRef<"SchedulerStatus", 'DateTime'>
    readonly lastFailureAt: FieldRef<"SchedulerStatus", 'DateTime'>
    readonly lastError: FieldRef<"SchedulerStatus", 'String'>
    readonly updatedAt: FieldRef<"SchedulerStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SchedulerStatus findUnique
   */
  export type SchedulerStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * Filter, which SchedulerStatus to fetch.
     */
    where: SchedulerStatusWhereUniqueInput
  }

  /**
   * SchedulerStatus findUniqueOrThrow
   */
  export type SchedulerStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * Filter, which SchedulerStatus to fetch.
     */
    where: SchedulerStatusWhereUniqueInput
  }

  /**
   * SchedulerStatus findFirst
   */
  export type SchedulerStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * Filter, which SchedulerStatus to fetch.
     */
    where?: SchedulerStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchedulerStatuses to fetch.
     */
    orderBy?: SchedulerStatusOrderByWithRelationInput | SchedulerStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchedulerStatuses.
     */
    cursor?: SchedulerStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchedulerStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchedulerStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchedulerStatuses.
     */
    distinct?: SchedulerStatusScalarFieldEnum | SchedulerStatusScalarFieldEnum[]
  }

  /**
   * SchedulerStatus findFirstOrThrow
   */
  export type SchedulerStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * Filter, which SchedulerStatus to fetch.
     */
    where?: SchedulerStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchedulerStatuses to fetch.
     */
    orderBy?: SchedulerStatusOrderByWithRelationInput | SchedulerStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchedulerStatuses.
     */
    cursor?: SchedulerStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchedulerStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchedulerStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchedulerStatuses.
     */
    distinct?: SchedulerStatusScalarFieldEnum | SchedulerStatusScalarFieldEnum[]
  }

  /**
   * SchedulerStatus findMany
   */
  export type SchedulerStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * Filter, which SchedulerStatuses to fetch.
     */
    where?: SchedulerStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchedulerStatuses to fetch.
     */
    orderBy?: SchedulerStatusOrderByWithRelationInput | SchedulerStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SchedulerStatuses.
     */
    cursor?: SchedulerStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchedulerStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchedulerStatuses.
     */
    skip?: number
    distinct?: SchedulerStatusScalarFieldEnum | SchedulerStatusScalarFieldEnum[]
  }

  /**
   * SchedulerStatus create
   */
  export type SchedulerStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * The data needed to create a SchedulerStatus.
     */
    data: XOR<SchedulerStatusCreateInput, SchedulerStatusUncheckedCreateInput>
  }

  /**
   * SchedulerStatus createMany
   */
  export type SchedulerStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SchedulerStatuses.
     */
    data: SchedulerStatusCreateManyInput | SchedulerStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SchedulerStatus createManyAndReturn
   */
  export type SchedulerStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * The data used to create many SchedulerStatuses.
     */
    data: SchedulerStatusCreateManyInput | SchedulerStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SchedulerStatus update
   */
  export type SchedulerStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * The data needed to update a SchedulerStatus.
     */
    data: XOR<SchedulerStatusUpdateInput, SchedulerStatusUncheckedUpdateInput>
    /**
     * Choose, which SchedulerStatus to update.
     */
    where: SchedulerStatusWhereUniqueInput
  }

  /**
   * SchedulerStatus updateMany
   */
  export type SchedulerStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SchedulerStatuses.
     */
    data: XOR<SchedulerStatusUpdateManyMutationInput, SchedulerStatusUncheckedUpdateManyInput>
    /**
     * Filter which SchedulerStatuses to update
     */
    where?: SchedulerStatusWhereInput
    /**
     * Limit how many SchedulerStatuses to update.
     */
    limit?: number
  }

  /**
   * SchedulerStatus updateManyAndReturn
   */
  export type SchedulerStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * The data used to update SchedulerStatuses.
     */
    data: XOR<SchedulerStatusUpdateManyMutationInput, SchedulerStatusUncheckedUpdateManyInput>
    /**
     * Filter which SchedulerStatuses to update
     */
    where?: SchedulerStatusWhereInput
    /**
     * Limit how many SchedulerStatuses to update.
     */
    limit?: number
  }

  /**
   * SchedulerStatus upsert
   */
  export type SchedulerStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * The filter to search for the SchedulerStatus to update in case it exists.
     */
    where: SchedulerStatusWhereUniqueInput
    /**
     * In case the SchedulerStatus found by the `where` argument doesn't exist, create a new SchedulerStatus with this data.
     */
    create: XOR<SchedulerStatusCreateInput, SchedulerStatusUncheckedCreateInput>
    /**
     * In case the SchedulerStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchedulerStatusUpdateInput, SchedulerStatusUncheckedUpdateInput>
  }

  /**
   * SchedulerStatus delete
   */
  export type SchedulerStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
    /**
     * Filter which SchedulerStatus to delete.
     */
    where: SchedulerStatusWhereUniqueInput
  }

  /**
   * SchedulerStatus deleteMany
   */
  export type SchedulerStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchedulerStatuses to delete
     */
    where?: SchedulerStatusWhereInput
    /**
     * Limit how many SchedulerStatuses to delete.
     */
    limit?: number
  }

  /**
   * SchedulerStatus without action
   */
  export type SchedulerStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerStatus
     */
    select?: SchedulerStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchedulerStatus
     */
    omit?: SchedulerStatusOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserSettingsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    twitterApiKey: 'twitterApiKey',
    twitterApiSecret: 'twitterApiSecret',
    accessToken: 'accessToken',
    accessTokenSecret: 'accessTokenSecret'
  };

  export type UserSettingsScalarFieldEnum = (typeof UserSettingsScalarFieldEnum)[keyof typeof UserSettingsScalarFieldEnum]


  export const TweetScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    content: 'content',
    mediaUrls: 'mediaUrls',
    scheduledFor: 'scheduledFor',
    status: 'status',
    twitterAccountId: 'twitterAccountId',
    agentId: 'agentId',
    retryCount: 'retryCount',
    lastAttemptAt: 'lastAttemptAt',
    failureReason: 'failureReason',
    twitterPostId: 'twitterPostId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TweetScalarFieldEnum = (typeof TweetScalarFieldEnum)[keyof typeof TweetScalarFieldEnum]


  export const MediaLibraryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    filename: 'filename',
    originalFilename: 'originalFilename',
    fileType: 'fileType',
    fileSize: 'fileSize',
    optimizedSize: 'optimizedSize',
    compressionRatio: 'compressionRatio',
    dimensions: 'dimensions',
    url: 'url',
    folder: 'folder',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MediaLibraryScalarFieldEnum = (typeof MediaLibraryScalarFieldEnum)[keyof typeof MediaLibraryScalarFieldEnum]


  export const AgentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    username: 'username',
    systemPrompt: 'systemPrompt',
    bio: 'bio',
    lore: 'lore',
    messageExamples: 'messageExamples',
    postExamples: 'postExamples',
    adjectives: 'adjectives',
    topics: 'topics',
    styleConfig: 'styleConfig',
    enabled: 'enabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const SchedulerStatusScalarFieldEnum: {
    id: 'id',
    lastRunAt: 'lastRunAt',
    lastSuccessAt: 'lastSuccessAt',
    lastFailureAt: 'lastFailureAt',
    lastError: 'lastError',
    updatedAt: 'updatedAt'
  };

  export type SchedulerStatusScalarFieldEnum = (typeof SchedulerStatusScalarFieldEnum)[keyof typeof SchedulerStatusScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TweetStatus'
   */
  export type EnumTweetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TweetStatus'>
    


  /**
   * Reference to a field of type 'TweetStatus[]'
   */
  export type ListEnumTweetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TweetStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tweets?: TweetListRelationFilter
    settings?: XOR<UserSettingsNullableScalarRelationFilter, UserSettingsWhereInput> | null
    agents?: AgentListRelationFilter
    media?: MediaLibraryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tweets?: TweetOrderByRelationAggregateInput
    settings?: UserSettingsOrderByWithRelationInput
    agents?: AgentOrderByRelationAggregateInput
    media?: MediaLibraryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tweets?: TweetListRelationFilter
    settings?: XOR<UserSettingsNullableScalarRelationFilter, UserSettingsWhereInput> | null
    agents?: AgentListRelationFilter
    media?: MediaLibraryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserSettingsWhereInput = {
    AND?: UserSettingsWhereInput | UserSettingsWhereInput[]
    OR?: UserSettingsWhereInput[]
    NOT?: UserSettingsWhereInput | UserSettingsWhereInput[]
    id?: StringFilter<"UserSettings"> | string
    userId?: StringFilter<"UserSettings"> | string
    twitterApiKey?: StringNullableFilter<"UserSettings"> | string | null
    twitterApiSecret?: StringNullableFilter<"UserSettings"> | string | null
    accessToken?: StringNullableFilter<"UserSettings"> | string | null
    accessTokenSecret?: StringNullableFilter<"UserSettings"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserSettingsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    twitterApiKey?: SortOrderInput | SortOrder
    twitterApiSecret?: SortOrderInput | SortOrder
    accessToken?: SortOrderInput | SortOrder
    accessTokenSecret?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserSettingsWhereInput | UserSettingsWhereInput[]
    OR?: UserSettingsWhereInput[]
    NOT?: UserSettingsWhereInput | UserSettingsWhereInput[]
    twitterApiKey?: StringNullableFilter<"UserSettings"> | string | null
    twitterApiSecret?: StringNullableFilter<"UserSettings"> | string | null
    accessToken?: StringNullableFilter<"UserSettings"> | string | null
    accessTokenSecret?: StringNullableFilter<"UserSettings"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    twitterApiKey?: SortOrderInput | SortOrder
    twitterApiSecret?: SortOrderInput | SortOrder
    accessToken?: SortOrderInput | SortOrder
    accessTokenSecret?: SortOrderInput | SortOrder
    _count?: UserSettingsCountOrderByAggregateInput
    _max?: UserSettingsMaxOrderByAggregateInput
    _min?: UserSettingsMinOrderByAggregateInput
  }

  export type UserSettingsScalarWhereWithAggregatesInput = {
    AND?: UserSettingsScalarWhereWithAggregatesInput | UserSettingsScalarWhereWithAggregatesInput[]
    OR?: UserSettingsScalarWhereWithAggregatesInput[]
    NOT?: UserSettingsScalarWhereWithAggregatesInput | UserSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSettings"> | string
    userId?: StringWithAggregatesFilter<"UserSettings"> | string
    twitterApiKey?: StringNullableWithAggregatesFilter<"UserSettings"> | string | null
    twitterApiSecret?: StringNullableWithAggregatesFilter<"UserSettings"> | string | null
    accessToken?: StringNullableWithAggregatesFilter<"UserSettings"> | string | null
    accessTokenSecret?: StringNullableWithAggregatesFilter<"UserSettings"> | string | null
  }

  export type TweetWhereInput = {
    AND?: TweetWhereInput | TweetWhereInput[]
    OR?: TweetWhereInput[]
    NOT?: TweetWhereInput | TweetWhereInput[]
    id?: StringFilter<"Tweet"> | string
    userId?: StringFilter<"Tweet"> | string
    content?: StringFilter<"Tweet"> | string
    mediaUrls?: StringNullableListFilter<"Tweet">
    scheduledFor?: DateTimeNullableFilter<"Tweet"> | Date | string | null
    status?: EnumTweetStatusFilter<"Tweet"> | $Enums.TweetStatus
    twitterAccountId?: StringNullableFilter<"Tweet"> | string | null
    agentId?: StringNullableFilter<"Tweet"> | string | null
    retryCount?: IntFilter<"Tweet"> | number
    lastAttemptAt?: DateTimeNullableFilter<"Tweet"> | Date | string | null
    failureReason?: StringNullableFilter<"Tweet"> | string | null
    twitterPostId?: StringNullableFilter<"Tweet"> | string | null
    createdAt?: DateTimeFilter<"Tweet"> | Date | string
    updatedAt?: DateTimeFilter<"Tweet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TweetOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    mediaUrls?: SortOrder
    scheduledFor?: SortOrderInput | SortOrder
    status?: SortOrder
    twitterAccountId?: SortOrderInput | SortOrder
    agentId?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    lastAttemptAt?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    twitterPostId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TweetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TweetWhereInput | TweetWhereInput[]
    OR?: TweetWhereInput[]
    NOT?: TweetWhereInput | TweetWhereInput[]
    userId?: StringFilter<"Tweet"> | string
    content?: StringFilter<"Tweet"> | string
    mediaUrls?: StringNullableListFilter<"Tweet">
    scheduledFor?: DateTimeNullableFilter<"Tweet"> | Date | string | null
    status?: EnumTweetStatusFilter<"Tweet"> | $Enums.TweetStatus
    twitterAccountId?: StringNullableFilter<"Tweet"> | string | null
    agentId?: StringNullableFilter<"Tweet"> | string | null
    retryCount?: IntFilter<"Tweet"> | number
    lastAttemptAt?: DateTimeNullableFilter<"Tweet"> | Date | string | null
    failureReason?: StringNullableFilter<"Tweet"> | string | null
    twitterPostId?: StringNullableFilter<"Tweet"> | string | null
    createdAt?: DateTimeFilter<"Tweet"> | Date | string
    updatedAt?: DateTimeFilter<"Tweet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TweetOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    mediaUrls?: SortOrder
    scheduledFor?: SortOrderInput | SortOrder
    status?: SortOrder
    twitterAccountId?: SortOrderInput | SortOrder
    agentId?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    lastAttemptAt?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    twitterPostId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TweetCountOrderByAggregateInput
    _avg?: TweetAvgOrderByAggregateInput
    _max?: TweetMaxOrderByAggregateInput
    _min?: TweetMinOrderByAggregateInput
    _sum?: TweetSumOrderByAggregateInput
  }

  export type TweetScalarWhereWithAggregatesInput = {
    AND?: TweetScalarWhereWithAggregatesInput | TweetScalarWhereWithAggregatesInput[]
    OR?: TweetScalarWhereWithAggregatesInput[]
    NOT?: TweetScalarWhereWithAggregatesInput | TweetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tweet"> | string
    userId?: StringWithAggregatesFilter<"Tweet"> | string
    content?: StringWithAggregatesFilter<"Tweet"> | string
    mediaUrls?: StringNullableListFilter<"Tweet">
    scheduledFor?: DateTimeNullableWithAggregatesFilter<"Tweet"> | Date | string | null
    status?: EnumTweetStatusWithAggregatesFilter<"Tweet"> | $Enums.TweetStatus
    twitterAccountId?: StringNullableWithAggregatesFilter<"Tweet"> | string | null
    agentId?: StringNullableWithAggregatesFilter<"Tweet"> | string | null
    retryCount?: IntWithAggregatesFilter<"Tweet"> | number
    lastAttemptAt?: DateTimeNullableWithAggregatesFilter<"Tweet"> | Date | string | null
    failureReason?: StringNullableWithAggregatesFilter<"Tweet"> | string | null
    twitterPostId?: StringNullableWithAggregatesFilter<"Tweet"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tweet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tweet"> | Date | string
  }

  export type MediaLibraryWhereInput = {
    AND?: MediaLibraryWhereInput | MediaLibraryWhereInput[]
    OR?: MediaLibraryWhereInput[]
    NOT?: MediaLibraryWhereInput | MediaLibraryWhereInput[]
    id?: StringFilter<"MediaLibrary"> | string
    userId?: StringFilter<"MediaLibrary"> | string
    filename?: StringFilter<"MediaLibrary"> | string
    originalFilename?: StringFilter<"MediaLibrary"> | string
    fileType?: StringFilter<"MediaLibrary"> | string
    fileSize?: IntFilter<"MediaLibrary"> | number
    optimizedSize?: IntFilter<"MediaLibrary"> | number
    compressionRatio?: FloatFilter<"MediaLibrary"> | number
    dimensions?: JsonFilter<"MediaLibrary">
    url?: StringFilter<"MediaLibrary"> | string
    folder?: StringFilter<"MediaLibrary"> | string
    tags?: StringNullableListFilter<"MediaLibrary">
    createdAt?: DateTimeFilter<"MediaLibrary"> | Date | string
    updatedAt?: DateTimeFilter<"MediaLibrary"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MediaLibraryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    originalFilename?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    optimizedSize?: SortOrder
    compressionRatio?: SortOrder
    dimensions?: SortOrder
    url?: SortOrder
    folder?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MediaLibraryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MediaLibraryWhereInput | MediaLibraryWhereInput[]
    OR?: MediaLibraryWhereInput[]
    NOT?: MediaLibraryWhereInput | MediaLibraryWhereInput[]
    userId?: StringFilter<"MediaLibrary"> | string
    filename?: StringFilter<"MediaLibrary"> | string
    originalFilename?: StringFilter<"MediaLibrary"> | string
    fileType?: StringFilter<"MediaLibrary"> | string
    fileSize?: IntFilter<"MediaLibrary"> | number
    optimizedSize?: IntFilter<"MediaLibrary"> | number
    compressionRatio?: FloatFilter<"MediaLibrary"> | number
    dimensions?: JsonFilter<"MediaLibrary">
    url?: StringFilter<"MediaLibrary"> | string
    folder?: StringFilter<"MediaLibrary"> | string
    tags?: StringNullableListFilter<"MediaLibrary">
    createdAt?: DateTimeFilter<"MediaLibrary"> | Date | string
    updatedAt?: DateTimeFilter<"MediaLibrary"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MediaLibraryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    originalFilename?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    optimizedSize?: SortOrder
    compressionRatio?: SortOrder
    dimensions?: SortOrder
    url?: SortOrder
    folder?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MediaLibraryCountOrderByAggregateInput
    _avg?: MediaLibraryAvgOrderByAggregateInput
    _max?: MediaLibraryMaxOrderByAggregateInput
    _min?: MediaLibraryMinOrderByAggregateInput
    _sum?: MediaLibrarySumOrderByAggregateInput
  }

  export type MediaLibraryScalarWhereWithAggregatesInput = {
    AND?: MediaLibraryScalarWhereWithAggregatesInput | MediaLibraryScalarWhereWithAggregatesInput[]
    OR?: MediaLibraryScalarWhereWithAggregatesInput[]
    NOT?: MediaLibraryScalarWhereWithAggregatesInput | MediaLibraryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MediaLibrary"> | string
    userId?: StringWithAggregatesFilter<"MediaLibrary"> | string
    filename?: StringWithAggregatesFilter<"MediaLibrary"> | string
    originalFilename?: StringWithAggregatesFilter<"MediaLibrary"> | string
    fileType?: StringWithAggregatesFilter<"MediaLibrary"> | string
    fileSize?: IntWithAggregatesFilter<"MediaLibrary"> | number
    optimizedSize?: IntWithAggregatesFilter<"MediaLibrary"> | number
    compressionRatio?: FloatWithAggregatesFilter<"MediaLibrary"> | number
    dimensions?: JsonWithAggregatesFilter<"MediaLibrary">
    url?: StringWithAggregatesFilter<"MediaLibrary"> | string
    folder?: StringWithAggregatesFilter<"MediaLibrary"> | string
    tags?: StringNullableListFilter<"MediaLibrary">
    createdAt?: DateTimeWithAggregatesFilter<"MediaLibrary"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MediaLibrary"> | Date | string
  }

  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    id?: StringFilter<"Agent"> | string
    userId?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    username?: StringNullableFilter<"Agent"> | string | null
    systemPrompt?: StringNullableFilter<"Agent"> | string | null
    bio?: StringNullableListFilter<"Agent">
    lore?: StringNullableListFilter<"Agent">
    messageExamples?: JsonFilter<"Agent">
    postExamples?: StringNullableListFilter<"Agent">
    adjectives?: StringNullableListFilter<"Agent">
    topics?: StringNullableListFilter<"Agent">
    styleConfig?: JsonFilter<"Agent">
    enabled?: BoolFilter<"Agent"> | boolean
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    username?: SortOrderInput | SortOrder
    systemPrompt?: SortOrderInput | SortOrder
    bio?: SortOrder
    lore?: SortOrder
    messageExamples?: SortOrder
    postExamples?: SortOrder
    adjectives?: SortOrder
    topics?: SortOrder
    styleConfig?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    userId?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    username?: StringNullableFilter<"Agent"> | string | null
    systemPrompt?: StringNullableFilter<"Agent"> | string | null
    bio?: StringNullableListFilter<"Agent">
    lore?: StringNullableListFilter<"Agent">
    messageExamples?: JsonFilter<"Agent">
    postExamples?: StringNullableListFilter<"Agent">
    adjectives?: StringNullableListFilter<"Agent">
    topics?: StringNullableListFilter<"Agent">
    styleConfig?: JsonFilter<"Agent">
    enabled?: BoolFilter<"Agent"> | boolean
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    username?: SortOrderInput | SortOrder
    systemPrompt?: SortOrderInput | SortOrder
    bio?: SortOrder
    lore?: SortOrder
    messageExamples?: SortOrder
    postExamples?: SortOrder
    adjectives?: SortOrder
    topics?: SortOrder
    styleConfig?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentCountOrderByAggregateInput
    _max?: AgentMaxOrderByAggregateInput
    _min?: AgentMinOrderByAggregateInput
  }

  export type AgentScalarWhereWithAggregatesInput = {
    AND?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    OR?: AgentScalarWhereWithAggregatesInput[]
    NOT?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agent"> | string
    userId?: StringWithAggregatesFilter<"Agent"> | string
    name?: StringWithAggregatesFilter<"Agent"> | string
    username?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    systemPrompt?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    bio?: StringNullableListFilter<"Agent">
    lore?: StringNullableListFilter<"Agent">
    messageExamples?: JsonWithAggregatesFilter<"Agent">
    postExamples?: StringNullableListFilter<"Agent">
    adjectives?: StringNullableListFilter<"Agent">
    topics?: StringNullableListFilter<"Agent">
    styleConfig?: JsonWithAggregatesFilter<"Agent">
    enabled?: BoolWithAggregatesFilter<"Agent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
  }

  export type SchedulerStatusWhereInput = {
    AND?: SchedulerStatusWhereInput | SchedulerStatusWhereInput[]
    OR?: SchedulerStatusWhereInput[]
    NOT?: SchedulerStatusWhereInput | SchedulerStatusWhereInput[]
    id?: StringFilter<"SchedulerStatus"> | string
    lastRunAt?: DateTimeNullableFilter<"SchedulerStatus"> | Date | string | null
    lastSuccessAt?: DateTimeNullableFilter<"SchedulerStatus"> | Date | string | null
    lastFailureAt?: DateTimeNullableFilter<"SchedulerStatus"> | Date | string | null
    lastError?: StringNullableFilter<"SchedulerStatus"> | string | null
    updatedAt?: DateTimeFilter<"SchedulerStatus"> | Date | string
  }

  export type SchedulerStatusOrderByWithRelationInput = {
    id?: SortOrder
    lastRunAt?: SortOrderInput | SortOrder
    lastSuccessAt?: SortOrderInput | SortOrder
    lastFailureAt?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type SchedulerStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SchedulerStatusWhereInput | SchedulerStatusWhereInput[]
    OR?: SchedulerStatusWhereInput[]
    NOT?: SchedulerStatusWhereInput | SchedulerStatusWhereInput[]
    lastRunAt?: DateTimeNullableFilter<"SchedulerStatus"> | Date | string | null
    lastSuccessAt?: DateTimeNullableFilter<"SchedulerStatus"> | Date | string | null
    lastFailureAt?: DateTimeNullableFilter<"SchedulerStatus"> | Date | string | null
    lastError?: StringNullableFilter<"SchedulerStatus"> | string | null
    updatedAt?: DateTimeFilter<"SchedulerStatus"> | Date | string
  }, "id">

  export type SchedulerStatusOrderByWithAggregationInput = {
    id?: SortOrder
    lastRunAt?: SortOrderInput | SortOrder
    lastSuccessAt?: SortOrderInput | SortOrder
    lastFailureAt?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: SchedulerStatusCountOrderByAggregateInput
    _max?: SchedulerStatusMaxOrderByAggregateInput
    _min?: SchedulerStatusMinOrderByAggregateInput
  }

  export type SchedulerStatusScalarWhereWithAggregatesInput = {
    AND?: SchedulerStatusScalarWhereWithAggregatesInput | SchedulerStatusScalarWhereWithAggregatesInput[]
    OR?: SchedulerStatusScalarWhereWithAggregatesInput[]
    NOT?: SchedulerStatusScalarWhereWithAggregatesInput | SchedulerStatusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SchedulerStatus"> | string
    lastRunAt?: DateTimeNullableWithAggregatesFilter<"SchedulerStatus"> | Date | string | null
    lastSuccessAt?: DateTimeNullableWithAggregatesFilter<"SchedulerStatus"> | Date | string | null
    lastFailureAt?: DateTimeNullableWithAggregatesFilter<"SchedulerStatus"> | Date | string | null
    lastError?: StringNullableWithAggregatesFilter<"SchedulerStatus"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"SchedulerStatus"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tweets?: TweetCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    agents?: AgentCreateNestedManyWithoutUserInput
    media?: MediaLibraryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tweets?: TweetUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput
    media?: MediaLibraryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tweets?: TweetUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    agents?: AgentUpdateManyWithoutUserNestedInput
    media?: MediaLibraryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tweets?: TweetUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput
    media?: MediaLibraryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSettingsCreateInput = {
    id?: string
    twitterApiKey?: string | null
    twitterApiSecret?: string | null
    accessToken?: string | null
    accessTokenSecret?: string | null
    user: UserCreateNestedOneWithoutSettingsInput
  }

  export type UserSettingsUncheckedCreateInput = {
    id?: string
    userId: string
    twitterApiKey?: string | null
    twitterApiSecret?: string | null
    accessToken?: string | null
    accessTokenSecret?: string | null
  }

  export type UserSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    twitterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    twitterApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSettingsNestedInput
  }

  export type UserSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    twitterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    twitterApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSettingsCreateManyInput = {
    id?: string
    userId: string
    twitterApiKey?: string | null
    twitterApiSecret?: string | null
    accessToken?: string | null
    accessTokenSecret?: string | null
  }

  export type UserSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    twitterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    twitterApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    twitterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    twitterApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TweetCreateInput = {
    id?: string
    content: string
    mediaUrls?: TweetCreatemediaUrlsInput | string[]
    scheduledFor?: Date | string | null
    status?: $Enums.TweetStatus
    twitterAccountId?: string | null
    agentId?: string | null
    retryCount?: number
    lastAttemptAt?: Date | string | null
    failureReason?: string | null
    twitterPostId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTweetsInput
  }

  export type TweetUncheckedCreateInput = {
    id?: string
    userId: string
    content: string
    mediaUrls?: TweetCreatemediaUrlsInput | string[]
    scheduledFor?: Date | string | null
    status?: $Enums.TweetStatus
    twitterAccountId?: string | null
    agentId?: string | null
    retryCount?: number
    lastAttemptAt?: Date | string | null
    failureReason?: string | null
    twitterPostId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TweetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: TweetUpdatemediaUrlsInput | string[]
    scheduledFor?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTweetStatusFieldUpdateOperationsInput | $Enums.TweetStatus
    twitterAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    twitterPostId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTweetsNestedInput
  }

  export type TweetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: TweetUpdatemediaUrlsInput | string[]
    scheduledFor?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTweetStatusFieldUpdateOperationsInput | $Enums.TweetStatus
    twitterAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    twitterPostId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TweetCreateManyInput = {
    id?: string
    userId: string
    content: string
    mediaUrls?: TweetCreatemediaUrlsInput | string[]
    scheduledFor?: Date | string | null
    status?: $Enums.TweetStatus
    twitterAccountId?: string | null
    agentId?: string | null
    retryCount?: number
    lastAttemptAt?: Date | string | null
    failureReason?: string | null
    twitterPostId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TweetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: TweetUpdatemediaUrlsInput | string[]
    scheduledFor?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTweetStatusFieldUpdateOperationsInput | $Enums.TweetStatus
    twitterAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    twitterPostId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TweetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: TweetUpdatemediaUrlsInput | string[]
    scheduledFor?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTweetStatusFieldUpdateOperationsInput | $Enums.TweetStatus
    twitterAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    twitterPostId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaLibraryCreateInput = {
    id?: string
    filename: string
    originalFilename: string
    fileType: string
    fileSize: number
    optimizedSize: number
    compressionRatio: number
    dimensions: JsonNullValueInput | InputJsonValue
    url: string
    folder: string
    tags?: MediaLibraryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMediaInput
  }

  export type MediaLibraryUncheckedCreateInput = {
    id?: string
    userId: string
    filename: string
    originalFilename: string
    fileType: string
    fileSize: number
    optimizedSize: number
    compressionRatio: number
    dimensions: JsonNullValueInput | InputJsonValue
    url: string
    folder: string
    tags?: MediaLibraryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaLibraryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    optimizedSize?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    dimensions?: JsonNullValueInput | InputJsonValue
    url?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    tags?: MediaLibraryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMediaNestedInput
  }

  export type MediaLibraryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    optimizedSize?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    dimensions?: JsonNullValueInput | InputJsonValue
    url?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    tags?: MediaLibraryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaLibraryCreateManyInput = {
    id?: string
    userId: string
    filename: string
    originalFilename: string
    fileType: string
    fileSize: number
    optimizedSize: number
    compressionRatio: number
    dimensions: JsonNullValueInput | InputJsonValue
    url: string
    folder: string
    tags?: MediaLibraryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaLibraryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    optimizedSize?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    dimensions?: JsonNullValueInput | InputJsonValue
    url?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    tags?: MediaLibraryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaLibraryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    optimizedSize?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    dimensions?: JsonNullValueInput | InputJsonValue
    url?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    tags?: MediaLibraryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCreateInput = {
    id?: string
    name: string
    username?: string | null
    systemPrompt?: string | null
    bio?: AgentCreatebioInput | string[]
    lore?: AgentCreateloreInput | string[]
    messageExamples: JsonNullValueInput | InputJsonValue
    postExamples?: AgentCreatepostExamplesInput | string[]
    adjectives?: AgentCreateadjectivesInput | string[]
    topics?: AgentCreatetopicsInput | string[]
    styleConfig: JsonNullValueInput | InputJsonValue
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAgentsInput
  }

  export type AgentUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    username?: string | null
    systemPrompt?: string | null
    bio?: AgentCreatebioInput | string[]
    lore?: AgentCreateloreInput | string[]
    messageExamples: JsonNullValueInput | InputJsonValue
    postExamples?: AgentCreatepostExamplesInput | string[]
    adjectives?: AgentCreateadjectivesInput | string[]
    topics?: AgentCreatetopicsInput | string[]
    styleConfig: JsonNullValueInput | InputJsonValue
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: AgentUpdatebioInput | string[]
    lore?: AgentUpdateloreInput | string[]
    messageExamples?: JsonNullValueInput | InputJsonValue
    postExamples?: AgentUpdatepostExamplesInput | string[]
    adjectives?: AgentUpdateadjectivesInput | string[]
    topics?: AgentUpdatetopicsInput | string[]
    styleConfig?: JsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentsNestedInput
  }

  export type AgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: AgentUpdatebioInput | string[]
    lore?: AgentUpdateloreInput | string[]
    messageExamples?: JsonNullValueInput | InputJsonValue
    postExamples?: AgentUpdatepostExamplesInput | string[]
    adjectives?: AgentUpdateadjectivesInput | string[]
    topics?: AgentUpdatetopicsInput | string[]
    styleConfig?: JsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCreateManyInput = {
    id?: string
    userId: string
    name: string
    username?: string | null
    systemPrompt?: string | null
    bio?: AgentCreatebioInput | string[]
    lore?: AgentCreateloreInput | string[]
    messageExamples: JsonNullValueInput | InputJsonValue
    postExamples?: AgentCreatepostExamplesInput | string[]
    adjectives?: AgentCreateadjectivesInput | string[]
    topics?: AgentCreatetopicsInput | string[]
    styleConfig: JsonNullValueInput | InputJsonValue
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: AgentUpdatebioInput | string[]
    lore?: AgentUpdateloreInput | string[]
    messageExamples?: JsonNullValueInput | InputJsonValue
    postExamples?: AgentUpdatepostExamplesInput | string[]
    adjectives?: AgentUpdateadjectivesInput | string[]
    topics?: AgentUpdatetopicsInput | string[]
    styleConfig?: JsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: AgentUpdatebioInput | string[]
    lore?: AgentUpdateloreInput | string[]
    messageExamples?: JsonNullValueInput | InputJsonValue
    postExamples?: AgentUpdatepostExamplesInput | string[]
    adjectives?: AgentUpdateadjectivesInput | string[]
    topics?: AgentUpdatetopicsInput | string[]
    styleConfig?: JsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchedulerStatusCreateInput = {
    id?: string
    lastRunAt?: Date | string | null
    lastSuccessAt?: Date | string | null
    lastFailureAt?: Date | string | null
    lastError?: string | null
    updatedAt?: Date | string
  }

  export type SchedulerStatusUncheckedCreateInput = {
    id?: string
    lastRunAt?: Date | string | null
    lastSuccessAt?: Date | string | null
    lastFailureAt?: Date | string | null
    lastError?: string | null
    updatedAt?: Date | string
  }

  export type SchedulerStatusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFailureAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchedulerStatusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFailureAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchedulerStatusCreateManyInput = {
    id?: string
    lastRunAt?: Date | string | null
    lastSuccessAt?: Date | string | null
    lastFailureAt?: Date | string | null
    lastError?: string | null
    updatedAt?: Date | string
  }

  export type SchedulerStatusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFailureAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchedulerStatusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastFailureAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TweetListRelationFilter = {
    every?: TweetWhereInput
    some?: TweetWhereInput
    none?: TweetWhereInput
  }

  export type UserSettingsNullableScalarRelationFilter = {
    is?: UserSettingsWhereInput | null
    isNot?: UserSettingsWhereInput | null
  }

  export type AgentListRelationFilter = {
    every?: AgentWhereInput
    some?: AgentWhereInput
    none?: AgentWhereInput
  }

  export type MediaLibraryListRelationFilter = {
    every?: MediaLibraryWhereInput
    some?: MediaLibraryWhereInput
    none?: MediaLibraryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TweetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MediaLibraryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    twitterApiKey?: SortOrder
    twitterApiSecret?: SortOrder
    accessToken?: SortOrder
    accessTokenSecret?: SortOrder
  }

  export type UserSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    twitterApiKey?: SortOrder
    twitterApiSecret?: SortOrder
    accessToken?: SortOrder
    accessTokenSecret?: SortOrder
  }

  export type UserSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    twitterApiKey?: SortOrder
    twitterApiSecret?: SortOrder
    accessToken?: SortOrder
    accessTokenSecret?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumTweetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TweetStatus | EnumTweetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TweetStatus[] | ListEnumTweetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TweetStatus[] | ListEnumTweetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTweetStatusFilter<$PrismaModel> | $Enums.TweetStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TweetCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    mediaUrls?: SortOrder
    scheduledFor?: SortOrder
    status?: SortOrder
    twitterAccountId?: SortOrder
    agentId?: SortOrder
    retryCount?: SortOrder
    lastAttemptAt?: SortOrder
    failureReason?: SortOrder
    twitterPostId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TweetAvgOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type TweetMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    scheduledFor?: SortOrder
    status?: SortOrder
    twitterAccountId?: SortOrder
    agentId?: SortOrder
    retryCount?: SortOrder
    lastAttemptAt?: SortOrder
    failureReason?: SortOrder
    twitterPostId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TweetMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    scheduledFor?: SortOrder
    status?: SortOrder
    twitterAccountId?: SortOrder
    agentId?: SortOrder
    retryCount?: SortOrder
    lastAttemptAt?: SortOrder
    failureReason?: SortOrder
    twitterPostId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TweetSumOrderByAggregateInput = {
    retryCount?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTweetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TweetStatus | EnumTweetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TweetStatus[] | ListEnumTweetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TweetStatus[] | ListEnumTweetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTweetStatusWithAggregatesFilter<$PrismaModel> | $Enums.TweetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTweetStatusFilter<$PrismaModel>
    _max?: NestedEnumTweetStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MediaLibraryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    originalFilename?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    optimizedSize?: SortOrder
    compressionRatio?: SortOrder
    dimensions?: SortOrder
    url?: SortOrder
    folder?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaLibraryAvgOrderByAggregateInput = {
    fileSize?: SortOrder
    optimizedSize?: SortOrder
    compressionRatio?: SortOrder
  }

  export type MediaLibraryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    originalFilename?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    optimizedSize?: SortOrder
    compressionRatio?: SortOrder
    url?: SortOrder
    folder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaLibraryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    originalFilename?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    optimizedSize?: SortOrder
    compressionRatio?: SortOrder
    url?: SortOrder
    folder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaLibrarySumOrderByAggregateInput = {
    fileSize?: SortOrder
    optimizedSize?: SortOrder
    compressionRatio?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    username?: SortOrder
    systemPrompt?: SortOrder
    bio?: SortOrder
    lore?: SortOrder
    messageExamples?: SortOrder
    postExamples?: SortOrder
    adjectives?: SortOrder
    topics?: SortOrder
    styleConfig?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    username?: SortOrder
    systemPrompt?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    username?: SortOrder
    systemPrompt?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SchedulerStatusCountOrderByAggregateInput = {
    id?: SortOrder
    lastRunAt?: SortOrder
    lastSuccessAt?: SortOrder
    lastFailureAt?: SortOrder
    lastError?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchedulerStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    lastRunAt?: SortOrder
    lastSuccessAt?: SortOrder
    lastFailureAt?: SortOrder
    lastError?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchedulerStatusMinOrderByAggregateInput = {
    id?: SortOrder
    lastRunAt?: SortOrder
    lastSuccessAt?: SortOrder
    lastFailureAt?: SortOrder
    lastError?: SortOrder
    updatedAt?: SortOrder
  }

  export type TweetCreateNestedManyWithoutUserInput = {
    create?: XOR<TweetCreateWithoutUserInput, TweetUncheckedCreateWithoutUserInput> | TweetCreateWithoutUserInput[] | TweetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TweetCreateOrConnectWithoutUserInput | TweetCreateOrConnectWithoutUserInput[]
    createMany?: TweetCreateManyUserInputEnvelope
    connect?: TweetWhereUniqueInput | TweetWhereUniqueInput[]
  }

  export type UserSettingsCreateNestedOneWithoutUserInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    connect?: UserSettingsWhereUniqueInput
  }

  export type AgentCreateNestedManyWithoutUserInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput> | AgentCreateWithoutUserInput[] | AgentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput | AgentCreateOrConnectWithoutUserInput[]
    createMany?: AgentCreateManyUserInputEnvelope
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
  }

  export type MediaLibraryCreateNestedManyWithoutUserInput = {
    create?: XOR<MediaLibraryCreateWithoutUserInput, MediaLibraryUncheckedCreateWithoutUserInput> | MediaLibraryCreateWithoutUserInput[] | MediaLibraryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaLibraryCreateOrConnectWithoutUserInput | MediaLibraryCreateOrConnectWithoutUserInput[]
    createMany?: MediaLibraryCreateManyUserInputEnvelope
    connect?: MediaLibraryWhereUniqueInput | MediaLibraryWhereUniqueInput[]
  }

  export type TweetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TweetCreateWithoutUserInput, TweetUncheckedCreateWithoutUserInput> | TweetCreateWithoutUserInput[] | TweetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TweetCreateOrConnectWithoutUserInput | TweetCreateOrConnectWithoutUserInput[]
    createMany?: TweetCreateManyUserInputEnvelope
    connect?: TweetWhereUniqueInput | TweetWhereUniqueInput[]
  }

  export type UserSettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    connect?: UserSettingsWhereUniqueInput
  }

  export type AgentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput> | AgentCreateWithoutUserInput[] | AgentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput | AgentCreateOrConnectWithoutUserInput[]
    createMany?: AgentCreateManyUserInputEnvelope
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
  }

  export type MediaLibraryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MediaLibraryCreateWithoutUserInput, MediaLibraryUncheckedCreateWithoutUserInput> | MediaLibraryCreateWithoutUserInput[] | MediaLibraryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaLibraryCreateOrConnectWithoutUserInput | MediaLibraryCreateOrConnectWithoutUserInput[]
    createMany?: MediaLibraryCreateManyUserInputEnvelope
    connect?: MediaLibraryWhereUniqueInput | MediaLibraryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TweetUpdateManyWithoutUserNestedInput = {
    create?: XOR<TweetCreateWithoutUserInput, TweetUncheckedCreateWithoutUserInput> | TweetCreateWithoutUserInput[] | TweetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TweetCreateOrConnectWithoutUserInput | TweetCreateOrConnectWithoutUserInput[]
    upsert?: TweetUpsertWithWhereUniqueWithoutUserInput | TweetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TweetCreateManyUserInputEnvelope
    set?: TweetWhereUniqueInput | TweetWhereUniqueInput[]
    disconnect?: TweetWhereUniqueInput | TweetWhereUniqueInput[]
    delete?: TweetWhereUniqueInput | TweetWhereUniqueInput[]
    connect?: TweetWhereUniqueInput | TweetWhereUniqueInput[]
    update?: TweetUpdateWithWhereUniqueWithoutUserInput | TweetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TweetUpdateManyWithWhereWithoutUserInput | TweetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TweetScalarWhereInput | TweetScalarWhereInput[]
  }

  export type UserSettingsUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    upsert?: UserSettingsUpsertWithoutUserInput
    disconnect?: UserSettingsWhereInput | boolean
    delete?: UserSettingsWhereInput | boolean
    connect?: UserSettingsWhereUniqueInput
    update?: XOR<XOR<UserSettingsUpdateToOneWithWhereWithoutUserInput, UserSettingsUpdateWithoutUserInput>, UserSettingsUncheckedUpdateWithoutUserInput>
  }

  export type AgentUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput> | AgentCreateWithoutUserInput[] | AgentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput | AgentCreateOrConnectWithoutUserInput[]
    upsert?: AgentUpsertWithWhereUniqueWithoutUserInput | AgentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgentCreateManyUserInputEnvelope
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    update?: AgentUpdateWithWhereUniqueWithoutUserInput | AgentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgentUpdateManyWithWhereWithoutUserInput | AgentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[]
  }

  export type MediaLibraryUpdateManyWithoutUserNestedInput = {
    create?: XOR<MediaLibraryCreateWithoutUserInput, MediaLibraryUncheckedCreateWithoutUserInput> | MediaLibraryCreateWithoutUserInput[] | MediaLibraryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaLibraryCreateOrConnectWithoutUserInput | MediaLibraryCreateOrConnectWithoutUserInput[]
    upsert?: MediaLibraryUpsertWithWhereUniqueWithoutUserInput | MediaLibraryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MediaLibraryCreateManyUserInputEnvelope
    set?: MediaLibraryWhereUniqueInput | MediaLibraryWhereUniqueInput[]
    disconnect?: MediaLibraryWhereUniqueInput | MediaLibraryWhereUniqueInput[]
    delete?: MediaLibraryWhereUniqueInput | MediaLibraryWhereUniqueInput[]
    connect?: MediaLibraryWhereUniqueInput | MediaLibraryWhereUniqueInput[]
    update?: MediaLibraryUpdateWithWhereUniqueWithoutUserInput | MediaLibraryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MediaLibraryUpdateManyWithWhereWithoutUserInput | MediaLibraryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MediaLibraryScalarWhereInput | MediaLibraryScalarWhereInput[]
  }

  export type TweetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TweetCreateWithoutUserInput, TweetUncheckedCreateWithoutUserInput> | TweetCreateWithoutUserInput[] | TweetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TweetCreateOrConnectWithoutUserInput | TweetCreateOrConnectWithoutUserInput[]
    upsert?: TweetUpsertWithWhereUniqueWithoutUserInput | TweetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TweetCreateManyUserInputEnvelope
    set?: TweetWhereUniqueInput | TweetWhereUniqueInput[]
    disconnect?: TweetWhereUniqueInput | TweetWhereUniqueInput[]
    delete?: TweetWhereUniqueInput | TweetWhereUniqueInput[]
    connect?: TweetWhereUniqueInput | TweetWhereUniqueInput[]
    update?: TweetUpdateWithWhereUniqueWithoutUserInput | TweetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TweetUpdateManyWithWhereWithoutUserInput | TweetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TweetScalarWhereInput | TweetScalarWhereInput[]
  }

  export type UserSettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    upsert?: UserSettingsUpsertWithoutUserInput
    disconnect?: UserSettingsWhereInput | boolean
    delete?: UserSettingsWhereInput | boolean
    connect?: UserSettingsWhereUniqueInput
    update?: XOR<XOR<UserSettingsUpdateToOneWithWhereWithoutUserInput, UserSettingsUpdateWithoutUserInput>, UserSettingsUncheckedUpdateWithoutUserInput>
  }

  export type AgentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput> | AgentCreateWithoutUserInput[] | AgentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput | AgentCreateOrConnectWithoutUserInput[]
    upsert?: AgentUpsertWithWhereUniqueWithoutUserInput | AgentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgentCreateManyUserInputEnvelope
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    update?: AgentUpdateWithWhereUniqueWithoutUserInput | AgentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgentUpdateManyWithWhereWithoutUserInput | AgentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[]
  }

  export type MediaLibraryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MediaLibraryCreateWithoutUserInput, MediaLibraryUncheckedCreateWithoutUserInput> | MediaLibraryCreateWithoutUserInput[] | MediaLibraryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MediaLibraryCreateOrConnectWithoutUserInput | MediaLibraryCreateOrConnectWithoutUserInput[]
    upsert?: MediaLibraryUpsertWithWhereUniqueWithoutUserInput | MediaLibraryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MediaLibraryCreateManyUserInputEnvelope
    set?: MediaLibraryWhereUniqueInput | MediaLibraryWhereUniqueInput[]
    disconnect?: MediaLibraryWhereUniqueInput | MediaLibraryWhereUniqueInput[]
    delete?: MediaLibraryWhereUniqueInput | MediaLibraryWhereUniqueInput[]
    connect?: MediaLibraryWhereUniqueInput | MediaLibraryWhereUniqueInput[]
    update?: MediaLibraryUpdateWithWhereUniqueWithoutUserInput | MediaLibraryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MediaLibraryUpdateManyWithWhereWithoutUserInput | MediaLibraryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MediaLibraryScalarWhereInput | MediaLibraryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSettingsInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    upsert?: UserUpsertWithoutSettingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSettingsInput, UserUpdateWithoutSettingsInput>, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type TweetCreatemediaUrlsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutTweetsInput = {
    create?: XOR<UserCreateWithoutTweetsInput, UserUncheckedCreateWithoutTweetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTweetsInput
    connect?: UserWhereUniqueInput
  }

  export type TweetUpdatemediaUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumTweetStatusFieldUpdateOperationsInput = {
    set?: $Enums.TweetStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutTweetsNestedInput = {
    create?: XOR<UserCreateWithoutTweetsInput, UserUncheckedCreateWithoutTweetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTweetsInput
    upsert?: UserUpsertWithoutTweetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTweetsInput, UserUpdateWithoutTweetsInput>, UserUncheckedUpdateWithoutTweetsInput>
  }

  export type MediaLibraryCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMediaInput = {
    create?: XOR<UserCreateWithoutMediaInput, UserUncheckedCreateWithoutMediaInput>
    connectOrCreate?: UserCreateOrConnectWithoutMediaInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MediaLibraryUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutMediaNestedInput = {
    create?: XOR<UserCreateWithoutMediaInput, UserUncheckedCreateWithoutMediaInput>
    connectOrCreate?: UserCreateOrConnectWithoutMediaInput
    upsert?: UserUpsertWithoutMediaInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMediaInput, UserUpdateWithoutMediaInput>, UserUncheckedUpdateWithoutMediaInput>
  }

  export type AgentCreatebioInput = {
    set: string[]
  }

  export type AgentCreateloreInput = {
    set: string[]
  }

  export type AgentCreatepostExamplesInput = {
    set: string[]
  }

  export type AgentCreateadjectivesInput = {
    set: string[]
  }

  export type AgentCreatetopicsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutAgentsInput = {
    create?: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentsInput
    connect?: UserWhereUniqueInput
  }

  export type AgentUpdatebioInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AgentUpdateloreInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AgentUpdatepostExamplesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AgentUpdateadjectivesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AgentUpdatetopicsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutAgentsNestedInput = {
    create?: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentsInput
    upsert?: UserUpsertWithoutAgentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAgentsInput, UserUpdateWithoutAgentsInput>, UserUncheckedUpdateWithoutAgentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTweetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TweetStatus | EnumTweetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TweetStatus[] | ListEnumTweetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TweetStatus[] | ListEnumTweetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTweetStatusFilter<$PrismaModel> | $Enums.TweetStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTweetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TweetStatus | EnumTweetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TweetStatus[] | ListEnumTweetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TweetStatus[] | ListEnumTweetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTweetStatusWithAggregatesFilter<$PrismaModel> | $Enums.TweetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTweetStatusFilter<$PrismaModel>
    _max?: NestedEnumTweetStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TweetCreateWithoutUserInput = {
    id?: string
    content: string
    mediaUrls?: TweetCreatemediaUrlsInput | string[]
    scheduledFor?: Date | string | null
    status?: $Enums.TweetStatus
    twitterAccountId?: string | null
    agentId?: string | null
    retryCount?: number
    lastAttemptAt?: Date | string | null
    failureReason?: string | null
    twitterPostId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TweetUncheckedCreateWithoutUserInput = {
    id?: string
    content: string
    mediaUrls?: TweetCreatemediaUrlsInput | string[]
    scheduledFor?: Date | string | null
    status?: $Enums.TweetStatus
    twitterAccountId?: string | null
    agentId?: string | null
    retryCount?: number
    lastAttemptAt?: Date | string | null
    failureReason?: string | null
    twitterPostId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TweetCreateOrConnectWithoutUserInput = {
    where: TweetWhereUniqueInput
    create: XOR<TweetCreateWithoutUserInput, TweetUncheckedCreateWithoutUserInput>
  }

  export type TweetCreateManyUserInputEnvelope = {
    data: TweetCreateManyUserInput | TweetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserSettingsCreateWithoutUserInput = {
    id?: string
    twitterApiKey?: string | null
    twitterApiSecret?: string | null
    accessToken?: string | null
    accessTokenSecret?: string | null
  }

  export type UserSettingsUncheckedCreateWithoutUserInput = {
    id?: string
    twitterApiKey?: string | null
    twitterApiSecret?: string | null
    accessToken?: string | null
    accessTokenSecret?: string | null
  }

  export type UserSettingsCreateOrConnectWithoutUserInput = {
    where: UserSettingsWhereUniqueInput
    create: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
  }

  export type AgentCreateWithoutUserInput = {
    id?: string
    name: string
    username?: string | null
    systemPrompt?: string | null
    bio?: AgentCreatebioInput | string[]
    lore?: AgentCreateloreInput | string[]
    messageExamples: JsonNullValueInput | InputJsonValue
    postExamples?: AgentCreatepostExamplesInput | string[]
    adjectives?: AgentCreateadjectivesInput | string[]
    topics?: AgentCreatetopicsInput | string[]
    styleConfig: JsonNullValueInput | InputJsonValue
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    username?: string | null
    systemPrompt?: string | null
    bio?: AgentCreatebioInput | string[]
    lore?: AgentCreateloreInput | string[]
    messageExamples: JsonNullValueInput | InputJsonValue
    postExamples?: AgentCreatepostExamplesInput | string[]
    adjectives?: AgentCreateadjectivesInput | string[]
    topics?: AgentCreatetopicsInput | string[]
    styleConfig: JsonNullValueInput | InputJsonValue
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentCreateOrConnectWithoutUserInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
  }

  export type AgentCreateManyUserInputEnvelope = {
    data: AgentCreateManyUserInput | AgentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MediaLibraryCreateWithoutUserInput = {
    id?: string
    filename: string
    originalFilename: string
    fileType: string
    fileSize: number
    optimizedSize: number
    compressionRatio: number
    dimensions: JsonNullValueInput | InputJsonValue
    url: string
    folder: string
    tags?: MediaLibraryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaLibraryUncheckedCreateWithoutUserInput = {
    id?: string
    filename: string
    originalFilename: string
    fileType: string
    fileSize: number
    optimizedSize: number
    compressionRatio: number
    dimensions: JsonNullValueInput | InputJsonValue
    url: string
    folder: string
    tags?: MediaLibraryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaLibraryCreateOrConnectWithoutUserInput = {
    where: MediaLibraryWhereUniqueInput
    create: XOR<MediaLibraryCreateWithoutUserInput, MediaLibraryUncheckedCreateWithoutUserInput>
  }

  export type MediaLibraryCreateManyUserInputEnvelope = {
    data: MediaLibraryCreateManyUserInput | MediaLibraryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TweetUpsertWithWhereUniqueWithoutUserInput = {
    where: TweetWhereUniqueInput
    update: XOR<TweetUpdateWithoutUserInput, TweetUncheckedUpdateWithoutUserInput>
    create: XOR<TweetCreateWithoutUserInput, TweetUncheckedCreateWithoutUserInput>
  }

  export type TweetUpdateWithWhereUniqueWithoutUserInput = {
    where: TweetWhereUniqueInput
    data: XOR<TweetUpdateWithoutUserInput, TweetUncheckedUpdateWithoutUserInput>
  }

  export type TweetUpdateManyWithWhereWithoutUserInput = {
    where: TweetScalarWhereInput
    data: XOR<TweetUpdateManyMutationInput, TweetUncheckedUpdateManyWithoutUserInput>
  }

  export type TweetScalarWhereInput = {
    AND?: TweetScalarWhereInput | TweetScalarWhereInput[]
    OR?: TweetScalarWhereInput[]
    NOT?: TweetScalarWhereInput | TweetScalarWhereInput[]
    id?: StringFilter<"Tweet"> | string
    userId?: StringFilter<"Tweet"> | string
    content?: StringFilter<"Tweet"> | string
    mediaUrls?: StringNullableListFilter<"Tweet">
    scheduledFor?: DateTimeNullableFilter<"Tweet"> | Date | string | null
    status?: EnumTweetStatusFilter<"Tweet"> | $Enums.TweetStatus
    twitterAccountId?: StringNullableFilter<"Tweet"> | string | null
    agentId?: StringNullableFilter<"Tweet"> | string | null
    retryCount?: IntFilter<"Tweet"> | number
    lastAttemptAt?: DateTimeNullableFilter<"Tweet"> | Date | string | null
    failureReason?: StringNullableFilter<"Tweet"> | string | null
    twitterPostId?: StringNullableFilter<"Tweet"> | string | null
    createdAt?: DateTimeFilter<"Tweet"> | Date | string
    updatedAt?: DateTimeFilter<"Tweet"> | Date | string
  }

  export type UserSettingsUpsertWithoutUserInput = {
    update: XOR<UserSettingsUpdateWithoutUserInput, UserSettingsUncheckedUpdateWithoutUserInput>
    create: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    where?: UserSettingsWhereInput
  }

  export type UserSettingsUpdateToOneWithWhereWithoutUserInput = {
    where?: UserSettingsWhereInput
    data: XOR<UserSettingsUpdateWithoutUserInput, UserSettingsUncheckedUpdateWithoutUserInput>
  }

  export type UserSettingsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    twitterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    twitterApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserSettingsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    twitterApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    twitterApiSecret?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenSecret?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AgentUpsertWithWhereUniqueWithoutUserInput = {
    where: AgentWhereUniqueInput
    update: XOR<AgentUpdateWithoutUserInput, AgentUncheckedUpdateWithoutUserInput>
    create: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
  }

  export type AgentUpdateWithWhereUniqueWithoutUserInput = {
    where: AgentWhereUniqueInput
    data: XOR<AgentUpdateWithoutUserInput, AgentUncheckedUpdateWithoutUserInput>
  }

  export type AgentUpdateManyWithWhereWithoutUserInput = {
    where: AgentScalarWhereInput
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyWithoutUserInput>
  }

  export type AgentScalarWhereInput = {
    AND?: AgentScalarWhereInput | AgentScalarWhereInput[]
    OR?: AgentScalarWhereInput[]
    NOT?: AgentScalarWhereInput | AgentScalarWhereInput[]
    id?: StringFilter<"Agent"> | string
    userId?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    username?: StringNullableFilter<"Agent"> | string | null
    systemPrompt?: StringNullableFilter<"Agent"> | string | null
    bio?: StringNullableListFilter<"Agent">
    lore?: StringNullableListFilter<"Agent">
    messageExamples?: JsonFilter<"Agent">
    postExamples?: StringNullableListFilter<"Agent">
    adjectives?: StringNullableListFilter<"Agent">
    topics?: StringNullableListFilter<"Agent">
    styleConfig?: JsonFilter<"Agent">
    enabled?: BoolFilter<"Agent"> | boolean
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
  }

  export type MediaLibraryUpsertWithWhereUniqueWithoutUserInput = {
    where: MediaLibraryWhereUniqueInput
    update: XOR<MediaLibraryUpdateWithoutUserInput, MediaLibraryUncheckedUpdateWithoutUserInput>
    create: XOR<MediaLibraryCreateWithoutUserInput, MediaLibraryUncheckedCreateWithoutUserInput>
  }

  export type MediaLibraryUpdateWithWhereUniqueWithoutUserInput = {
    where: MediaLibraryWhereUniqueInput
    data: XOR<MediaLibraryUpdateWithoutUserInput, MediaLibraryUncheckedUpdateWithoutUserInput>
  }

  export type MediaLibraryUpdateManyWithWhereWithoutUserInput = {
    where: MediaLibraryScalarWhereInput
    data: XOR<MediaLibraryUpdateManyMutationInput, MediaLibraryUncheckedUpdateManyWithoutUserInput>
  }

  export type MediaLibraryScalarWhereInput = {
    AND?: MediaLibraryScalarWhereInput | MediaLibraryScalarWhereInput[]
    OR?: MediaLibraryScalarWhereInput[]
    NOT?: MediaLibraryScalarWhereInput | MediaLibraryScalarWhereInput[]
    id?: StringFilter<"MediaLibrary"> | string
    userId?: StringFilter<"MediaLibrary"> | string
    filename?: StringFilter<"MediaLibrary"> | string
    originalFilename?: StringFilter<"MediaLibrary"> | string
    fileType?: StringFilter<"MediaLibrary"> | string
    fileSize?: IntFilter<"MediaLibrary"> | number
    optimizedSize?: IntFilter<"MediaLibrary"> | number
    compressionRatio?: FloatFilter<"MediaLibrary"> | number
    dimensions?: JsonFilter<"MediaLibrary">
    url?: StringFilter<"MediaLibrary"> | string
    folder?: StringFilter<"MediaLibrary"> | string
    tags?: StringNullableListFilter<"MediaLibrary">
    createdAt?: DateTimeFilter<"MediaLibrary"> | Date | string
    updatedAt?: DateTimeFilter<"MediaLibrary"> | Date | string
  }

  export type UserCreateWithoutSettingsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tweets?: TweetCreateNestedManyWithoutUserInput
    agents?: AgentCreateNestedManyWithoutUserInput
    media?: MediaLibraryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSettingsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tweets?: TweetUncheckedCreateNestedManyWithoutUserInput
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput
    media?: MediaLibraryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSettingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
  }

  export type UserUpsertWithoutSettingsInput = {
    update: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSettingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type UserUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tweets?: TweetUpdateManyWithoutUserNestedInput
    agents?: AgentUpdateManyWithoutUserNestedInput
    media?: MediaLibraryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tweets?: TweetUncheckedUpdateManyWithoutUserNestedInput
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput
    media?: MediaLibraryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTweetsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    agents?: AgentCreateNestedManyWithoutUserInput
    media?: MediaLibraryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTweetsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput
    media?: MediaLibraryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTweetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTweetsInput, UserUncheckedCreateWithoutTweetsInput>
  }

  export type UserUpsertWithoutTweetsInput = {
    update: XOR<UserUpdateWithoutTweetsInput, UserUncheckedUpdateWithoutTweetsInput>
    create: XOR<UserCreateWithoutTweetsInput, UserUncheckedCreateWithoutTweetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTweetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTweetsInput, UserUncheckedUpdateWithoutTweetsInput>
  }

  export type UserUpdateWithoutTweetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    agents?: AgentUpdateManyWithoutUserNestedInput
    media?: MediaLibraryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTweetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput
    media?: MediaLibraryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMediaInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tweets?: TweetCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    agents?: AgentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMediaInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tweets?: TweetUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMediaInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMediaInput, UserUncheckedCreateWithoutMediaInput>
  }

  export type UserUpsertWithoutMediaInput = {
    update: XOR<UserUpdateWithoutMediaInput, UserUncheckedUpdateWithoutMediaInput>
    create: XOR<UserCreateWithoutMediaInput, UserUncheckedCreateWithoutMediaInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMediaInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMediaInput, UserUncheckedUpdateWithoutMediaInput>
  }

  export type UserUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tweets?: TweetUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    agents?: AgentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tweets?: TweetUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAgentsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tweets?: TweetCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
    media?: MediaLibraryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAgentsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tweets?: TweetUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
    media?: MediaLibraryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAgentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
  }

  export type UserUpsertWithoutAgentsInput = {
    update: XOR<UserUpdateWithoutAgentsInput, UserUncheckedUpdateWithoutAgentsInput>
    create: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAgentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAgentsInput, UserUncheckedUpdateWithoutAgentsInput>
  }

  export type UserUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tweets?: TweetUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
    media?: MediaLibraryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tweets?: TweetUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
    media?: MediaLibraryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TweetCreateManyUserInput = {
    id?: string
    content: string
    mediaUrls?: TweetCreatemediaUrlsInput | string[]
    scheduledFor?: Date | string | null
    status?: $Enums.TweetStatus
    twitterAccountId?: string | null
    agentId?: string | null
    retryCount?: number
    lastAttemptAt?: Date | string | null
    failureReason?: string | null
    twitterPostId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentCreateManyUserInput = {
    id?: string
    name: string
    username?: string | null
    systemPrompt?: string | null
    bio?: AgentCreatebioInput | string[]
    lore?: AgentCreateloreInput | string[]
    messageExamples: JsonNullValueInput | InputJsonValue
    postExamples?: AgentCreatepostExamplesInput | string[]
    adjectives?: AgentCreateadjectivesInput | string[]
    topics?: AgentCreatetopicsInput | string[]
    styleConfig: JsonNullValueInput | InputJsonValue
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaLibraryCreateManyUserInput = {
    id?: string
    filename: string
    originalFilename: string
    fileType: string
    fileSize: number
    optimizedSize: number
    compressionRatio: number
    dimensions: JsonNullValueInput | InputJsonValue
    url: string
    folder: string
    tags?: MediaLibraryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TweetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: TweetUpdatemediaUrlsInput | string[]
    scheduledFor?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTweetStatusFieldUpdateOperationsInput | $Enums.TweetStatus
    twitterAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    twitterPostId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TweetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: TweetUpdatemediaUrlsInput | string[]
    scheduledFor?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTweetStatusFieldUpdateOperationsInput | $Enums.TweetStatus
    twitterAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    twitterPostId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TweetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: TweetUpdatemediaUrlsInput | string[]
    scheduledFor?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTweetStatusFieldUpdateOperationsInput | $Enums.TweetStatus
    twitterAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    twitterPostId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: AgentUpdatebioInput | string[]
    lore?: AgentUpdateloreInput | string[]
    messageExamples?: JsonNullValueInput | InputJsonValue
    postExamples?: AgentUpdatepostExamplesInput | string[]
    adjectives?: AgentUpdateadjectivesInput | string[]
    topics?: AgentUpdatetopicsInput | string[]
    styleConfig?: JsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: AgentUpdatebioInput | string[]
    lore?: AgentUpdateloreInput | string[]
    messageExamples?: JsonNullValueInput | InputJsonValue
    postExamples?: AgentUpdatepostExamplesInput | string[]
    adjectives?: AgentUpdateadjectivesInput | string[]
    topics?: AgentUpdatetopicsInput | string[]
    styleConfig?: JsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    systemPrompt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: AgentUpdatebioInput | string[]
    lore?: AgentUpdateloreInput | string[]
    messageExamples?: JsonNullValueInput | InputJsonValue
    postExamples?: AgentUpdatepostExamplesInput | string[]
    adjectives?: AgentUpdateadjectivesInput | string[]
    topics?: AgentUpdatetopicsInput | string[]
    styleConfig?: JsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaLibraryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    optimizedSize?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    dimensions?: JsonNullValueInput | InputJsonValue
    url?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    tags?: MediaLibraryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaLibraryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    optimizedSize?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    dimensions?: JsonNullValueInput | InputJsonValue
    url?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    tags?: MediaLibraryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaLibraryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    originalFilename?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    optimizedSize?: IntFieldUpdateOperationsInput | number
    compressionRatio?: FloatFieldUpdateOperationsInput | number
    dimensions?: JsonNullValueInput | InputJsonValue
    url?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    tags?: MediaLibraryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}