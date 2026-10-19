
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
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>
/**
 * Model Delivery
 * 
 */
export type Delivery = $Result.DefaultSelection<Prisma.$DeliveryPayload>
/**
 * Model MessageTemplate
 * 
 */
export type MessageTemplate = $Result.DefaultSelection<Prisma.$MessageTemplatePayload>
/**
 * Model CreditWallet
 * 
 */
export type CreditWallet = $Result.DefaultSelection<Prisma.$CreditWalletPayload>
/**
 * Model CreditTransaction
 * 
 */
export type CreditTransaction = $Result.DefaultSelection<Prisma.$CreditTransactionPayload>
/**
 * Model CreditPackage
 * 
 */
export type CreditPackage = $Result.DefaultSelection<Prisma.$CreditPackagePayload>
/**
 * Model CreditPurchase
 * 
 */
export type CreditPurchase = $Result.DefaultSelection<Prisma.$CreditPurchasePayload>
/**
 * Model Automation
 * 
 */
export type Automation = $Result.DefaultSelection<Prisma.$AutomationPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CreditTransactionType: {
  PURCHASE: 'PURCHASE',
  BONUS: 'BONUS',
  USAGE: 'USAGE',
  REFUND: 'REFUND',
  ADMIN_ADJUSTMENT: 'ADMIN_ADJUSTMENT'
};

export type CreditTransactionType = (typeof CreditTransactionType)[keyof typeof CreditTransactionType]


export const CreditPurchaseStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type CreditPurchaseStatus = (typeof CreditPurchaseStatus)[keyof typeof CreditPurchaseStatus]

}

export type CreditTransactionType = $Enums.CreditTransactionType

export const CreditTransactionType: typeof $Enums.CreditTransactionType

export type CreditPurchaseStatus = $Enums.CreditPurchaseStatus

export const CreditPurchaseStatus: typeof $Enums.CreditPurchaseStatus

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
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.delivery`: Exposes CRUD operations for the **Delivery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deliveries
    * const deliveries = await prisma.delivery.findMany()
    * ```
    */
  get delivery(): Prisma.DeliveryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messageTemplate`: Exposes CRUD operations for the **MessageTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageTemplates
    * const messageTemplates = await prisma.messageTemplate.findMany()
    * ```
    */
  get messageTemplate(): Prisma.MessageTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creditWallet`: Exposes CRUD operations for the **CreditWallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditWallets
    * const creditWallets = await prisma.creditWallet.findMany()
    * ```
    */
  get creditWallet(): Prisma.CreditWalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creditTransaction`: Exposes CRUD operations for the **CreditTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditTransactions
    * const creditTransactions = await prisma.creditTransaction.findMany()
    * ```
    */
  get creditTransaction(): Prisma.CreditTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creditPackage`: Exposes CRUD operations for the **CreditPackage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditPackages
    * const creditPackages = await prisma.creditPackage.findMany()
    * ```
    */
  get creditPackage(): Prisma.CreditPackageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creditPurchase`: Exposes CRUD operations for the **CreditPurchase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditPurchases
    * const creditPurchases = await prisma.creditPurchase.findMany()
    * ```
    */
  get creditPurchase(): Prisma.CreditPurchaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.automation`: Exposes CRUD operations for the **Automation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Automations
    * const automations = await prisma.automation.findMany()
    * ```
    */
  get automation(): Prisma.AutomationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Token: 'Token',
    Delivery: 'Delivery',
    MessageTemplate: 'MessageTemplate',
    CreditWallet: 'CreditWallet',
    CreditTransaction: 'CreditTransaction',
    CreditPackage: 'CreditPackage',
    CreditPurchase: 'CreditPurchase',
    Automation: 'Automation',
    Notification: 'Notification'
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
      modelProps: "user" | "token" | "delivery" | "messageTemplate" | "creditWallet" | "creditTransaction" | "creditPackage" | "creditPurchase" | "automation" | "notification"
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
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
      Delivery: {
        payload: Prisma.$DeliveryPayload<ExtArgs>
        fields: Prisma.DeliveryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeliveryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeliveryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          findFirst: {
            args: Prisma.DeliveryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeliveryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          findMany: {
            args: Prisma.DeliveryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          create: {
            args: Prisma.DeliveryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          createMany: {
            args: Prisma.DeliveryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeliveryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          delete: {
            args: Prisma.DeliveryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          update: {
            args: Prisma.DeliveryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          deleteMany: {
            args: Prisma.DeliveryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeliveryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeliveryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>[]
          }
          upsert: {
            args: Prisma.DeliveryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeliveryPayload>
          }
          aggregate: {
            args: Prisma.DeliveryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDelivery>
          }
          groupBy: {
            args: Prisma.DeliveryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeliveryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeliveryCountArgs<ExtArgs>
            result: $Utils.Optional<DeliveryCountAggregateOutputType> | number
          }
        }
      }
      MessageTemplate: {
        payload: Prisma.$MessageTemplatePayload<ExtArgs>
        fields: Prisma.MessageTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          findFirst: {
            args: Prisma.MessageTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          findMany: {
            args: Prisma.MessageTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>[]
          }
          create: {
            args: Prisma.MessageTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          createMany: {
            args: Prisma.MessageTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>[]
          }
          delete: {
            args: Prisma.MessageTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          update: {
            args: Prisma.MessageTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          deleteMany: {
            args: Prisma.MessageTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>[]
          }
          upsert: {
            args: Prisma.MessageTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageTemplatePayload>
          }
          aggregate: {
            args: Prisma.MessageTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageTemplate>
          }
          groupBy: {
            args: Prisma.MessageTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<MessageTemplateCountAggregateOutputType> | number
          }
        }
      }
      CreditWallet: {
        payload: Prisma.$CreditWalletPayload<ExtArgs>
        fields: Prisma.CreditWalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditWalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditWalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          findFirst: {
            args: Prisma.CreditWalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditWalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          findMany: {
            args: Prisma.CreditWalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>[]
          }
          create: {
            args: Prisma.CreditWalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          createMany: {
            args: Prisma.CreditWalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditWalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>[]
          }
          delete: {
            args: Prisma.CreditWalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          update: {
            args: Prisma.CreditWalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          deleteMany: {
            args: Prisma.CreditWalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditWalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreditWalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>[]
          }
          upsert: {
            args: Prisma.CreditWalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditWalletPayload>
          }
          aggregate: {
            args: Prisma.CreditWalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditWallet>
          }
          groupBy: {
            args: Prisma.CreditWalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditWalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditWalletCountArgs<ExtArgs>
            result: $Utils.Optional<CreditWalletCountAggregateOutputType> | number
          }
        }
      }
      CreditTransaction: {
        payload: Prisma.$CreditTransactionPayload<ExtArgs>
        fields: Prisma.CreditTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          findFirst: {
            args: Prisma.CreditTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          findMany: {
            args: Prisma.CreditTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          create: {
            args: Prisma.CreditTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          createMany: {
            args: Prisma.CreditTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          delete: {
            args: Prisma.CreditTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          update: {
            args: Prisma.CreditTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          deleteMany: {
            args: Prisma.CreditTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreditTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          upsert: {
            args: Prisma.CreditTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          aggregate: {
            args: Prisma.CreditTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditTransaction>
          }
          groupBy: {
            args: Prisma.CreditTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<CreditTransactionCountAggregateOutputType> | number
          }
        }
      }
      CreditPackage: {
        payload: Prisma.$CreditPackagePayload<ExtArgs>
        fields: Prisma.CreditPackageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditPackageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditPackageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload>
          }
          findFirst: {
            args: Prisma.CreditPackageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditPackageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload>
          }
          findMany: {
            args: Prisma.CreditPackageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload>[]
          }
          create: {
            args: Prisma.CreditPackageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload>
          }
          createMany: {
            args: Prisma.CreditPackageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditPackageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload>[]
          }
          delete: {
            args: Prisma.CreditPackageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload>
          }
          update: {
            args: Prisma.CreditPackageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload>
          }
          deleteMany: {
            args: Prisma.CreditPackageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditPackageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreditPackageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload>[]
          }
          upsert: {
            args: Prisma.CreditPackageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPackagePayload>
          }
          aggregate: {
            args: Prisma.CreditPackageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditPackage>
          }
          groupBy: {
            args: Prisma.CreditPackageGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditPackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditPackageCountArgs<ExtArgs>
            result: $Utils.Optional<CreditPackageCountAggregateOutputType> | number
          }
        }
      }
      CreditPurchase: {
        payload: Prisma.$CreditPurchasePayload<ExtArgs>
        fields: Prisma.CreditPurchaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditPurchaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditPurchaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload>
          }
          findFirst: {
            args: Prisma.CreditPurchaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditPurchaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload>
          }
          findMany: {
            args: Prisma.CreditPurchaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload>[]
          }
          create: {
            args: Prisma.CreditPurchaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload>
          }
          createMany: {
            args: Prisma.CreditPurchaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditPurchaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload>[]
          }
          delete: {
            args: Prisma.CreditPurchaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload>
          }
          update: {
            args: Prisma.CreditPurchaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload>
          }
          deleteMany: {
            args: Prisma.CreditPurchaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditPurchaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreditPurchaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload>[]
          }
          upsert: {
            args: Prisma.CreditPurchaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditPurchasePayload>
          }
          aggregate: {
            args: Prisma.CreditPurchaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditPurchase>
          }
          groupBy: {
            args: Prisma.CreditPurchaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditPurchaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditPurchaseCountArgs<ExtArgs>
            result: $Utils.Optional<CreditPurchaseCountAggregateOutputType> | number
          }
        }
      }
      Automation: {
        payload: Prisma.$AutomationPayload<ExtArgs>
        fields: Prisma.AutomationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AutomationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AutomationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload>
          }
          findFirst: {
            args: Prisma.AutomationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AutomationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload>
          }
          findMany: {
            args: Prisma.AutomationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload>[]
          }
          create: {
            args: Prisma.AutomationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload>
          }
          createMany: {
            args: Prisma.AutomationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AutomationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload>[]
          }
          delete: {
            args: Prisma.AutomationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload>
          }
          update: {
            args: Prisma.AutomationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload>
          }
          deleteMany: {
            args: Prisma.AutomationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AutomationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AutomationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload>[]
          }
          upsert: {
            args: Prisma.AutomationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationPayload>
          }
          aggregate: {
            args: Prisma.AutomationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAutomation>
          }
          groupBy: {
            args: Prisma.AutomationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AutomationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AutomationCountArgs<ExtArgs>
            result: $Utils.Optional<AutomationCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    token?: TokenOmit
    delivery?: DeliveryOmit
    messageTemplate?: MessageTemplateOmit
    creditWallet?: CreditWalletOmit
    creditTransaction?: CreditTransactionOmit
    creditPackage?: CreditPackageOmit
    creditPurchase?: CreditPurchaseOmit
    automation?: AutomationOmit
    notification?: NotificationOmit
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
    messageTemplates: number
    automations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messageTemplates?: boolean | UserCountOutputTypeCountMessageTemplatesArgs
    automations?: boolean | UserCountOutputTypeCountAutomationsArgs
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
  export type UserCountOutputTypeCountMessageTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageTemplateWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAutomationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AutomationWhereInput
  }


  /**
   * Count Type CreditWalletCountOutputType
   */

  export type CreditWalletCountOutputType = {
    transactions: number
    purchases: number
  }

  export type CreditWalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | CreditWalletCountOutputTypeCountTransactionsArgs
    purchases?: boolean | CreditWalletCountOutputTypeCountPurchasesArgs
  }

  // Custom InputTypes
  /**
   * CreditWalletCountOutputType without action
   */
  export type CreditWalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWalletCountOutputType
     */
    select?: CreditWalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CreditWalletCountOutputType without action
   */
  export type CreditWalletCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditTransactionWhereInput
  }

  /**
   * CreditWalletCountOutputType without action
   */
  export type CreditWalletCountOutputTypeCountPurchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditPurchaseWhereInput
  }


  /**
   * Count Type CreditPackageCountOutputType
   */

  export type CreditPackageCountOutputType = {
    purchases: number
  }

  export type CreditPackageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchases?: boolean | CreditPackageCountOutputTypeCountPurchasesArgs
  }

  // Custom InputTypes
  /**
   * CreditPackageCountOutputType without action
   */
  export type CreditPackageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackageCountOutputType
     */
    select?: CreditPackageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CreditPackageCountOutputType without action
   */
  export type CreditPackageCountOutputTypeCountPurchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditPurchaseWhereInput
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
    password: string | null
    emailConfirmed: boolean | null
    emailConfirmToken: string | null
    businessName: string | null
    fullName: string | null
    metaUserId: string | null
    appId: string | null
    appSecret: string | null
    facebookAcceessToken: string | null
    grantedScopes: string | null
    accessTokenExpiresIn: string | null
    selectedWabaId: string | null
    displayPhoneNumber: string | null
    selectedFacebookBusinessId: string | null
    selectedFacebookBusinessName: string | null
    selectedPhoneNumberQualityRating: string | null
    selectedPhoneNumberVerifiedName: string | null
    webhookStatus: boolean | null
    facebookConnectStatus: boolean | null
    createdAt: Date | null
    hashedRefresh: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    emailConfirmed: boolean | null
    emailConfirmToken: string | null
    businessName: string | null
    fullName: string | null
    metaUserId: string | null
    appId: string | null
    appSecret: string | null
    facebookAcceessToken: string | null
    grantedScopes: string | null
    accessTokenExpiresIn: string | null
    selectedWabaId: string | null
    displayPhoneNumber: string | null
    selectedFacebookBusinessId: string | null
    selectedFacebookBusinessName: string | null
    selectedPhoneNumberQualityRating: string | null
    selectedPhoneNumberVerifiedName: string | null
    webhookStatus: boolean | null
    facebookConnectStatus: boolean | null
    createdAt: Date | null
    hashedRefresh: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    emailConfirmed: number
    emailConfirmToken: number
    businessName: number
    fullName: number
    metaUserId: number
    appId: number
    appSecret: number
    facebookAcceessToken: number
    grantedScopes: number
    accessTokenExpiresIn: number
    selectedWabaId: number
    displayPhoneNumber: number
    selectedFacebookBusinessId: number
    selectedFacebookBusinessName: number
    selectedPhoneNumberQualityRating: number
    selectedPhoneNumberVerifiedName: number
    webhookStatus: number
    selectedPhoneNumberId: number
    facebookConnectStatus: number
    createdAt: number
    hashedRefresh: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    emailConfirmed?: true
    emailConfirmToken?: true
    businessName?: true
    fullName?: true
    metaUserId?: true
    appId?: true
    appSecret?: true
    facebookAcceessToken?: true
    grantedScopes?: true
    accessTokenExpiresIn?: true
    selectedWabaId?: true
    displayPhoneNumber?: true
    selectedFacebookBusinessId?: true
    selectedFacebookBusinessName?: true
    selectedPhoneNumberQualityRating?: true
    selectedPhoneNumberVerifiedName?: true
    webhookStatus?: true
    facebookConnectStatus?: true
    createdAt?: true
    hashedRefresh?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    emailConfirmed?: true
    emailConfirmToken?: true
    businessName?: true
    fullName?: true
    metaUserId?: true
    appId?: true
    appSecret?: true
    facebookAcceessToken?: true
    grantedScopes?: true
    accessTokenExpiresIn?: true
    selectedWabaId?: true
    displayPhoneNumber?: true
    selectedFacebookBusinessId?: true
    selectedFacebookBusinessName?: true
    selectedPhoneNumberQualityRating?: true
    selectedPhoneNumberVerifiedName?: true
    webhookStatus?: true
    facebookConnectStatus?: true
    createdAt?: true
    hashedRefresh?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    emailConfirmed?: true
    emailConfirmToken?: true
    businessName?: true
    fullName?: true
    metaUserId?: true
    appId?: true
    appSecret?: true
    facebookAcceessToken?: true
    grantedScopes?: true
    accessTokenExpiresIn?: true
    selectedWabaId?: true
    displayPhoneNumber?: true
    selectedFacebookBusinessId?: true
    selectedFacebookBusinessName?: true
    selectedPhoneNumberQualityRating?: true
    selectedPhoneNumberVerifiedName?: true
    webhookStatus?: true
    selectedPhoneNumberId?: true
    facebookConnectStatus?: true
    createdAt?: true
    hashedRefresh?: true
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
    password: string
    emailConfirmed: boolean
    emailConfirmToken: string | null
    businessName: string
    fullName: string
    metaUserId: string | null
    appId: string | null
    appSecret: string | null
    facebookAcceessToken: string | null
    grantedScopes: string | null
    accessTokenExpiresIn: string | null
    selectedWabaId: string | null
    displayPhoneNumber: string | null
    selectedFacebookBusinessId: string | null
    selectedFacebookBusinessName: string | null
    selectedPhoneNumberQualityRating: string | null
    selectedPhoneNumberVerifiedName: string | null
    webhookStatus: boolean
    selectedPhoneNumberId: string[]
    facebookConnectStatus: boolean
    createdAt: Date
    hashedRefresh: string | null
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
    password?: boolean
    emailConfirmed?: boolean
    emailConfirmToken?: boolean
    businessName?: boolean
    fullName?: boolean
    metaUserId?: boolean
    appId?: boolean
    appSecret?: boolean
    facebookAcceessToken?: boolean
    grantedScopes?: boolean
    accessTokenExpiresIn?: boolean
    selectedWabaId?: boolean
    displayPhoneNumber?: boolean
    selectedFacebookBusinessId?: boolean
    selectedFacebookBusinessName?: boolean
    selectedPhoneNumberQualityRating?: boolean
    selectedPhoneNumberVerifiedName?: boolean
    webhookStatus?: boolean
    selectedPhoneNumberId?: boolean
    facebookConnectStatus?: boolean
    createdAt?: boolean
    hashedRefresh?: boolean
    messageTemplates?: boolean | User$messageTemplatesArgs<ExtArgs>
    automations?: boolean | User$automationsArgs<ExtArgs>
    creditWallet?: boolean | User$creditWalletArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    emailConfirmed?: boolean
    emailConfirmToken?: boolean
    businessName?: boolean
    fullName?: boolean
    metaUserId?: boolean
    appId?: boolean
    appSecret?: boolean
    facebookAcceessToken?: boolean
    grantedScopes?: boolean
    accessTokenExpiresIn?: boolean
    selectedWabaId?: boolean
    displayPhoneNumber?: boolean
    selectedFacebookBusinessId?: boolean
    selectedFacebookBusinessName?: boolean
    selectedPhoneNumberQualityRating?: boolean
    selectedPhoneNumberVerifiedName?: boolean
    webhookStatus?: boolean
    selectedPhoneNumberId?: boolean
    facebookConnectStatus?: boolean
    createdAt?: boolean
    hashedRefresh?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    emailConfirmed?: boolean
    emailConfirmToken?: boolean
    businessName?: boolean
    fullName?: boolean
    metaUserId?: boolean
    appId?: boolean
    appSecret?: boolean
    facebookAcceessToken?: boolean
    grantedScopes?: boolean
    accessTokenExpiresIn?: boolean
    selectedWabaId?: boolean
    displayPhoneNumber?: boolean
    selectedFacebookBusinessId?: boolean
    selectedFacebookBusinessName?: boolean
    selectedPhoneNumberQualityRating?: boolean
    selectedPhoneNumberVerifiedName?: boolean
    webhookStatus?: boolean
    selectedPhoneNumberId?: boolean
    facebookConnectStatus?: boolean
    createdAt?: boolean
    hashedRefresh?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    emailConfirmed?: boolean
    emailConfirmToken?: boolean
    businessName?: boolean
    fullName?: boolean
    metaUserId?: boolean
    appId?: boolean
    appSecret?: boolean
    facebookAcceessToken?: boolean
    grantedScopes?: boolean
    accessTokenExpiresIn?: boolean
    selectedWabaId?: boolean
    displayPhoneNumber?: boolean
    selectedFacebookBusinessId?: boolean
    selectedFacebookBusinessName?: boolean
    selectedPhoneNumberQualityRating?: boolean
    selectedPhoneNumberVerifiedName?: boolean
    webhookStatus?: boolean
    selectedPhoneNumberId?: boolean
    facebookConnectStatus?: boolean
    createdAt?: boolean
    hashedRefresh?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "emailConfirmed" | "emailConfirmToken" | "businessName" | "fullName" | "metaUserId" | "appId" | "appSecret" | "facebookAcceessToken" | "grantedScopes" | "accessTokenExpiresIn" | "selectedWabaId" | "displayPhoneNumber" | "selectedFacebookBusinessId" | "selectedFacebookBusinessName" | "selectedPhoneNumberQualityRating" | "selectedPhoneNumberVerifiedName" | "webhookStatus" | "selectedPhoneNumberId" | "facebookConnectStatus" | "createdAt" | "hashedRefresh", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messageTemplates?: boolean | User$messageTemplatesArgs<ExtArgs>
    automations?: boolean | User$automationsArgs<ExtArgs>
    creditWallet?: boolean | User$creditWalletArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      messageTemplates: Prisma.$MessageTemplatePayload<ExtArgs>[]
      automations: Prisma.$AutomationPayload<ExtArgs>[]
      creditWallet: Prisma.$CreditWalletPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      emailConfirmed: boolean
      emailConfirmToken: string | null
      businessName: string
      fullName: string
      metaUserId: string | null
      appId: string | null
      appSecret: string | null
      facebookAcceessToken: string | null
      grantedScopes: string | null
      accessTokenExpiresIn: string | null
      selectedWabaId: string | null
      displayPhoneNumber: string | null
      selectedFacebookBusinessId: string | null
      selectedFacebookBusinessName: string | null
      selectedPhoneNumberQualityRating: string | null
      selectedPhoneNumberVerifiedName: string | null
      webhookStatus: boolean
      selectedPhoneNumberId: string[]
      facebookConnectStatus: boolean
      createdAt: Date
      hashedRefresh: string | null
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
    messageTemplates<T extends User$messageTemplatesArgs<ExtArgs> = {}>(args?: Subset<T, User$messageTemplatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    automations<T extends User$automationsArgs<ExtArgs> = {}>(args?: Subset<T, User$automationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    creditWallet<T extends User$creditWalletArgs<ExtArgs> = {}>(args?: Subset<T, User$creditWalletArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
    readonly password: FieldRef<"User", 'String'>
    readonly emailConfirmed: FieldRef<"User", 'Boolean'>
    readonly emailConfirmToken: FieldRef<"User", 'String'>
    readonly businessName: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly metaUserId: FieldRef<"User", 'String'>
    readonly appId: FieldRef<"User", 'String'>
    readonly appSecret: FieldRef<"User", 'String'>
    readonly facebookAcceessToken: FieldRef<"User", 'String'>
    readonly grantedScopes: FieldRef<"User", 'String'>
    readonly accessTokenExpiresIn: FieldRef<"User", 'String'>
    readonly selectedWabaId: FieldRef<"User", 'String'>
    readonly displayPhoneNumber: FieldRef<"User", 'String'>
    readonly selectedFacebookBusinessId: FieldRef<"User", 'String'>
    readonly selectedFacebookBusinessName: FieldRef<"User", 'String'>
    readonly selectedPhoneNumberQualityRating: FieldRef<"User", 'String'>
    readonly selectedPhoneNumberVerifiedName: FieldRef<"User", 'String'>
    readonly webhookStatus: FieldRef<"User", 'Boolean'>
    readonly selectedPhoneNumberId: FieldRef<"User", 'String[]'>
    readonly facebookConnectStatus: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly hashedRefresh: FieldRef<"User", 'String'>
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
   * User.messageTemplates
   */
  export type User$messageTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    where?: MessageTemplateWhereInput
    orderBy?: MessageTemplateOrderByWithRelationInput | MessageTemplateOrderByWithRelationInput[]
    cursor?: MessageTemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageTemplateScalarFieldEnum | MessageTemplateScalarFieldEnum[]
  }

  /**
   * User.automations
   */
  export type User$automationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
    where?: AutomationWhereInput
    orderBy?: AutomationOrderByWithRelationInput | AutomationOrderByWithRelationInput[]
    cursor?: AutomationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AutomationScalarFieldEnum | AutomationScalarFieldEnum[]
  }

  /**
   * User.creditWallet
   */
  export type User$creditWalletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    where?: CreditWalletWhereInput
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
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    facebookAccessToken: string | null
    facebookLongLivedAccessToken: string | null
    expiresIn: string | null
    dataAccessExpirationTime: string | null
    createdAt: Date | null
  }

  export type TokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    facebookAccessToken: string | null
    facebookLongLivedAccessToken: string | null
    expiresIn: string | null
    dataAccessExpirationTime: string | null
    createdAt: Date | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    userId: number
    facebookAccessToken: number
    facebookLongLivedAccessToken: number
    expiresIn: number
    dataAccessExpirationTime: number
    createdAt: number
    _all: number
  }


  export type TokenMinAggregateInputType = {
    id?: true
    userId?: true
    facebookAccessToken?: true
    facebookLongLivedAccessToken?: true
    expiresIn?: true
    dataAccessExpirationTime?: true
    createdAt?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    userId?: true
    facebookAccessToken?: true
    facebookLongLivedAccessToken?: true
    expiresIn?: true
    dataAccessExpirationTime?: true
    createdAt?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    userId?: true
    facebookAccessToken?: true
    facebookLongLivedAccessToken?: true
    expiresIn?: true
    dataAccessExpirationTime?: true
    createdAt?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    id: string
    userId: string
    facebookAccessToken: string | null
    facebookLongLivedAccessToken: string | null
    expiresIn: string | null
    dataAccessExpirationTime: string | null
    createdAt: Date
    _count: TokenCountAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    facebookAccessToken?: boolean
    facebookLongLivedAccessToken?: boolean
    expiresIn?: boolean
    dataAccessExpirationTime?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    facebookAccessToken?: boolean
    facebookLongLivedAccessToken?: boolean
    expiresIn?: boolean
    dataAccessExpirationTime?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    facebookAccessToken?: boolean
    facebookLongLivedAccessToken?: boolean
    expiresIn?: boolean
    dataAccessExpirationTime?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    id?: boolean
    userId?: boolean
    facebookAccessToken?: boolean
    facebookLongLivedAccessToken?: boolean
    expiresIn?: boolean
    dataAccessExpirationTime?: boolean
    createdAt?: boolean
  }

  export type TokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "facebookAccessToken" | "facebookLongLivedAccessToken" | "expiresIn" | "dataAccessExpirationTime" | "createdAt", ExtArgs["result"]["token"]>

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      facebookAccessToken: string | null
      facebookLongLivedAccessToken: string | null
      expiresIn: string | null
      dataAccessExpirationTime: string | null
      createdAt: Date
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens and returns the data updated in the database.
     * @param {TokenUpdateManyAndReturnArgs} args - Arguments to update many Tokens.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.updateManyAndReturn({
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
    updateManyAndReturn<T extends TokenUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
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
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Token model
   */
  interface TokenFieldRefs {
    readonly id: FieldRef<"Token", 'String'>
    readonly userId: FieldRef<"Token", 'String'>
    readonly facebookAccessToken: FieldRef<"Token", 'String'>
    readonly facebookLongLivedAccessToken: FieldRef<"Token", 'String'>
    readonly expiresIn: FieldRef<"Token", 'String'>
    readonly dataAccessExpirationTime: FieldRef<"Token", 'String'>
    readonly createdAt: FieldRef<"Token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token updateManyAndReturn
   */
  export type TokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to delete.
     */
    limit?: number
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
  }


  /**
   * Model Delivery
   */

  export type AggregateDelivery = {
    _count: DeliveryCountAggregateOutputType | null
    _avg: DeliveryAvgAggregateOutputType | null
    _sum: DeliverySumAggregateOutputType | null
    _min: DeliveryMinAggregateOutputType | null
    _max: DeliveryMaxAggregateOutputType | null
  }

  export type DeliveryAvgAggregateOutputType = {
    insuranceAmount: number | null
    insure_percentage: number | null
    insurance_cost: number | null
  }

  export type DeliverySumAggregateOutputType = {
    insuranceAmount: number | null
    insure_percentage: number | null
    insurance_cost: number | null
  }

  export type DeliveryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    trackingId: string | null
    senderName: string | null
    senderPhone: string | null
    senderAddress: string | null
    senderLatitude: string | null
    senderLongitude: string | null
    receiverName: string | null
    receiverPhone: string | null
    receiverAddress: string | null
    receiverLatitude: string | null
    receiverLongitude: string | null
    packageName: string | null
    packageCategory: string | null
    packageWeight: string | null
    packageDimensions: string | null
    packageValue: string | null
    pickupDate: string | null
    courier_name: string | null
    courier_email: string | null
    courier_phone: string | null
    shipbubbleOrderId: string | null
    tracking_url: string | null
    package_amount: string | null
    package_weight: string | null
    shipping_fee: string | null
    shipping_payment_type: string | null
    shipping_payment_status: string | null
    checkoutSessionId: string | null
    checkoutUrl: string | null
    paymentAmount: string | null
    paymentCurrency: string | null
    paymentStatus: string | null
    bookingStatus: string | null
    deliveryInsurer: string | null
    deliveryCurrency: string | null
    insuranceAmount: number | null
    insurance_policy_condition: string | null
    insure_percentage: number | null
    insurance_cost: number | null
    insuranceCode: string | null
    insurerName: string | null
    bookingError: string | null
    deliveryStatus: string | null
    deliveryType: string | null
    deliveryInstructions: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    trackingId: string | null
    senderName: string | null
    senderPhone: string | null
    senderAddress: string | null
    senderLatitude: string | null
    senderLongitude: string | null
    receiverName: string | null
    receiverPhone: string | null
    receiverAddress: string | null
    receiverLatitude: string | null
    receiverLongitude: string | null
    packageName: string | null
    packageCategory: string | null
    packageWeight: string | null
    packageDimensions: string | null
    packageValue: string | null
    pickupDate: string | null
    courier_name: string | null
    courier_email: string | null
    courier_phone: string | null
    shipbubbleOrderId: string | null
    tracking_url: string | null
    package_amount: string | null
    package_weight: string | null
    shipping_fee: string | null
    shipping_payment_type: string | null
    shipping_payment_status: string | null
    checkoutSessionId: string | null
    checkoutUrl: string | null
    paymentAmount: string | null
    paymentCurrency: string | null
    paymentStatus: string | null
    bookingStatus: string | null
    deliveryInsurer: string | null
    deliveryCurrency: string | null
    insuranceAmount: number | null
    insurance_policy_condition: string | null
    insure_percentage: number | null
    insurance_cost: number | null
    insuranceCode: string | null
    insurerName: string | null
    bookingError: string | null
    deliveryStatus: string | null
    deliveryType: string | null
    deliveryInstructions: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeliveryCountAggregateOutputType = {
    id: number
    userId: number
    trackingId: number
    senderName: number
    senderPhone: number
    senderAddress: number
    senderLatitude: number
    senderLongitude: number
    receiverName: number
    receiverPhone: number
    receiverAddress: number
    receiverLatitude: number
    receiverLongitude: number
    packageName: number
    packageCategory: number
    packageWeight: number
    packageDimensions: number
    packageValue: number
    pickupDate: number
    courier_name: number
    courier_email: number
    courier_phone: number
    shipbubbleOrderId: number
    tracking_url: number
    package_amount: number
    package_weight: number
    shipping_fee: number
    shipping_payment_type: number
    shipping_payment_status: number
    package_status: number
    checkoutSessionId: number
    checkoutUrl: number
    paymentAmount: number
    paymentCurrency: number
    paymentStatus: number
    bookingStatus: number
    bookingDetails: number
    deliveryInsurer: number
    deliveryCurrency: number
    insuranceAmount: number
    insurance_policy_condition: number
    insure_percentage: number
    insurance_cost: number
    insuranceCode: number
    insurerName: number
    bookingError: number
    deliveryStatus: number
    deliveryType: number
    deliveryInstructions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeliveryAvgAggregateInputType = {
    insuranceAmount?: true
    insure_percentage?: true
    insurance_cost?: true
  }

  export type DeliverySumAggregateInputType = {
    insuranceAmount?: true
    insure_percentage?: true
    insurance_cost?: true
  }

  export type DeliveryMinAggregateInputType = {
    id?: true
    userId?: true
    trackingId?: true
    senderName?: true
    senderPhone?: true
    senderAddress?: true
    senderLatitude?: true
    senderLongitude?: true
    receiverName?: true
    receiverPhone?: true
    receiverAddress?: true
    receiverLatitude?: true
    receiverLongitude?: true
    packageName?: true
    packageCategory?: true
    packageWeight?: true
    packageDimensions?: true
    packageValue?: true
    pickupDate?: true
    courier_name?: true
    courier_email?: true
    courier_phone?: true
    shipbubbleOrderId?: true
    tracking_url?: true
    package_amount?: true
    package_weight?: true
    shipping_fee?: true
    shipping_payment_type?: true
    shipping_payment_status?: true
    checkoutSessionId?: true
    checkoutUrl?: true
    paymentAmount?: true
    paymentCurrency?: true
    paymentStatus?: true
    bookingStatus?: true
    deliveryInsurer?: true
    deliveryCurrency?: true
    insuranceAmount?: true
    insurance_policy_condition?: true
    insure_percentage?: true
    insurance_cost?: true
    insuranceCode?: true
    insurerName?: true
    bookingError?: true
    deliveryStatus?: true
    deliveryType?: true
    deliveryInstructions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryMaxAggregateInputType = {
    id?: true
    userId?: true
    trackingId?: true
    senderName?: true
    senderPhone?: true
    senderAddress?: true
    senderLatitude?: true
    senderLongitude?: true
    receiverName?: true
    receiverPhone?: true
    receiverAddress?: true
    receiverLatitude?: true
    receiverLongitude?: true
    packageName?: true
    packageCategory?: true
    packageWeight?: true
    packageDimensions?: true
    packageValue?: true
    pickupDate?: true
    courier_name?: true
    courier_email?: true
    courier_phone?: true
    shipbubbleOrderId?: true
    tracking_url?: true
    package_amount?: true
    package_weight?: true
    shipping_fee?: true
    shipping_payment_type?: true
    shipping_payment_status?: true
    checkoutSessionId?: true
    checkoutUrl?: true
    paymentAmount?: true
    paymentCurrency?: true
    paymentStatus?: true
    bookingStatus?: true
    deliveryInsurer?: true
    deliveryCurrency?: true
    insuranceAmount?: true
    insurance_policy_condition?: true
    insure_percentage?: true
    insurance_cost?: true
    insuranceCode?: true
    insurerName?: true
    bookingError?: true
    deliveryStatus?: true
    deliveryType?: true
    deliveryInstructions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeliveryCountAggregateInputType = {
    id?: true
    userId?: true
    trackingId?: true
    senderName?: true
    senderPhone?: true
    senderAddress?: true
    senderLatitude?: true
    senderLongitude?: true
    receiverName?: true
    receiverPhone?: true
    receiverAddress?: true
    receiverLatitude?: true
    receiverLongitude?: true
    packageName?: true
    packageCategory?: true
    packageWeight?: true
    packageDimensions?: true
    packageValue?: true
    pickupDate?: true
    courier_name?: true
    courier_email?: true
    courier_phone?: true
    shipbubbleOrderId?: true
    tracking_url?: true
    package_amount?: true
    package_weight?: true
    shipping_fee?: true
    shipping_payment_type?: true
    shipping_payment_status?: true
    package_status?: true
    checkoutSessionId?: true
    checkoutUrl?: true
    paymentAmount?: true
    paymentCurrency?: true
    paymentStatus?: true
    bookingStatus?: true
    bookingDetails?: true
    deliveryInsurer?: true
    deliveryCurrency?: true
    insuranceAmount?: true
    insurance_policy_condition?: true
    insure_percentage?: true
    insurance_cost?: true
    insuranceCode?: true
    insurerName?: true
    bookingError?: true
    deliveryStatus?: true
    deliveryType?: true
    deliveryInstructions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeliveryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Delivery to aggregate.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deliveries
    **/
    _count?: true | DeliveryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeliveryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeliverySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeliveryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeliveryMaxAggregateInputType
  }

  export type GetDeliveryAggregateType<T extends DeliveryAggregateArgs> = {
        [P in keyof T & keyof AggregateDelivery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelivery[P]>
      : GetScalarType<T[P], AggregateDelivery[P]>
  }




  export type DeliveryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeliveryWhereInput
    orderBy?: DeliveryOrderByWithAggregationInput | DeliveryOrderByWithAggregationInput[]
    by: DeliveryScalarFieldEnum[] | DeliveryScalarFieldEnum
    having?: DeliveryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeliveryCountAggregateInputType | true
    _avg?: DeliveryAvgAggregateInputType
    _sum?: DeliverySumAggregateInputType
    _min?: DeliveryMinAggregateInputType
    _max?: DeliveryMaxAggregateInputType
  }

  export type DeliveryGroupByOutputType = {
    id: string
    userId: string | null
    trackingId: string
    senderName: string
    senderPhone: string
    senderAddress: string
    senderLatitude: string | null
    senderLongitude: string | null
    receiverName: string
    receiverPhone: string
    receiverAddress: string
    receiverLatitude: string | null
    receiverLongitude: string | null
    packageName: string
    packageCategory: string
    packageWeight: string
    packageDimensions: string
    packageValue: string
    pickupDate: string
    courier_name: string | null
    courier_email: string | null
    courier_phone: string | null
    shipbubbleOrderId: string | null
    tracking_url: string | null
    package_amount: string | null
    package_weight: string | null
    shipping_fee: string | null
    shipping_payment_type: string | null
    shipping_payment_status: string | null
    package_status: JsonValue | null
    checkoutSessionId: string | null
    checkoutUrl: string | null
    paymentAmount: string | null
    paymentCurrency: string | null
    paymentStatus: string
    bookingStatus: string
    bookingDetails: JsonValue | null
    deliveryInsurer: string | null
    deliveryCurrency: string | null
    insuranceAmount: number | null
    insurance_policy_condition: string | null
    insure_percentage: number | null
    insurance_cost: number | null
    insuranceCode: string | null
    insurerName: string | null
    bookingError: string | null
    deliveryStatus: string | null
    deliveryType: string
    deliveryInstructions: string | null
    createdAt: Date
    updatedAt: Date
    _count: DeliveryCountAggregateOutputType | null
    _avg: DeliveryAvgAggregateOutputType | null
    _sum: DeliverySumAggregateOutputType | null
    _min: DeliveryMinAggregateOutputType | null
    _max: DeliveryMaxAggregateOutputType | null
  }

  type GetDeliveryGroupByPayload<T extends DeliveryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeliveryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeliveryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeliveryGroupByOutputType[P]>
            : GetScalarType<T[P], DeliveryGroupByOutputType[P]>
        }
      >
    >


  export type DeliverySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    trackingId?: boolean
    senderName?: boolean
    senderPhone?: boolean
    senderAddress?: boolean
    senderLatitude?: boolean
    senderLongitude?: boolean
    receiverName?: boolean
    receiverPhone?: boolean
    receiverAddress?: boolean
    receiverLatitude?: boolean
    receiverLongitude?: boolean
    packageName?: boolean
    packageCategory?: boolean
    packageWeight?: boolean
    packageDimensions?: boolean
    packageValue?: boolean
    pickupDate?: boolean
    courier_name?: boolean
    courier_email?: boolean
    courier_phone?: boolean
    shipbubbleOrderId?: boolean
    tracking_url?: boolean
    package_amount?: boolean
    package_weight?: boolean
    shipping_fee?: boolean
    shipping_payment_type?: boolean
    shipping_payment_status?: boolean
    package_status?: boolean
    checkoutSessionId?: boolean
    checkoutUrl?: boolean
    paymentAmount?: boolean
    paymentCurrency?: boolean
    paymentStatus?: boolean
    bookingStatus?: boolean
    bookingDetails?: boolean
    deliveryInsurer?: boolean
    deliveryCurrency?: boolean
    insuranceAmount?: boolean
    insurance_policy_condition?: boolean
    insure_percentage?: boolean
    insurance_cost?: boolean
    insuranceCode?: boolean
    insurerName?: boolean
    bookingError?: boolean
    deliveryStatus?: boolean
    deliveryType?: boolean
    deliveryInstructions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    trackingId?: boolean
    senderName?: boolean
    senderPhone?: boolean
    senderAddress?: boolean
    senderLatitude?: boolean
    senderLongitude?: boolean
    receiverName?: boolean
    receiverPhone?: boolean
    receiverAddress?: boolean
    receiverLatitude?: boolean
    receiverLongitude?: boolean
    packageName?: boolean
    packageCategory?: boolean
    packageWeight?: boolean
    packageDimensions?: boolean
    packageValue?: boolean
    pickupDate?: boolean
    courier_name?: boolean
    courier_email?: boolean
    courier_phone?: boolean
    shipbubbleOrderId?: boolean
    tracking_url?: boolean
    package_amount?: boolean
    package_weight?: boolean
    shipping_fee?: boolean
    shipping_payment_type?: boolean
    shipping_payment_status?: boolean
    package_status?: boolean
    checkoutSessionId?: boolean
    checkoutUrl?: boolean
    paymentAmount?: boolean
    paymentCurrency?: boolean
    paymentStatus?: boolean
    bookingStatus?: boolean
    bookingDetails?: boolean
    deliveryInsurer?: boolean
    deliveryCurrency?: boolean
    insuranceAmount?: boolean
    insurance_policy_condition?: boolean
    insure_percentage?: boolean
    insurance_cost?: boolean
    insuranceCode?: boolean
    insurerName?: boolean
    bookingError?: boolean
    deliveryStatus?: boolean
    deliveryType?: boolean
    deliveryInstructions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    trackingId?: boolean
    senderName?: boolean
    senderPhone?: boolean
    senderAddress?: boolean
    senderLatitude?: boolean
    senderLongitude?: boolean
    receiverName?: boolean
    receiverPhone?: boolean
    receiverAddress?: boolean
    receiverLatitude?: boolean
    receiverLongitude?: boolean
    packageName?: boolean
    packageCategory?: boolean
    packageWeight?: boolean
    packageDimensions?: boolean
    packageValue?: boolean
    pickupDate?: boolean
    courier_name?: boolean
    courier_email?: boolean
    courier_phone?: boolean
    shipbubbleOrderId?: boolean
    tracking_url?: boolean
    package_amount?: boolean
    package_weight?: boolean
    shipping_fee?: boolean
    shipping_payment_type?: boolean
    shipping_payment_status?: boolean
    package_status?: boolean
    checkoutSessionId?: boolean
    checkoutUrl?: boolean
    paymentAmount?: boolean
    paymentCurrency?: boolean
    paymentStatus?: boolean
    bookingStatus?: boolean
    bookingDetails?: boolean
    deliveryInsurer?: boolean
    deliveryCurrency?: boolean
    insuranceAmount?: boolean
    insurance_policy_condition?: boolean
    insure_percentage?: boolean
    insurance_cost?: boolean
    insuranceCode?: boolean
    insurerName?: boolean
    bookingError?: boolean
    deliveryStatus?: boolean
    deliveryType?: boolean
    deliveryInstructions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["delivery"]>

  export type DeliverySelectScalar = {
    id?: boolean
    userId?: boolean
    trackingId?: boolean
    senderName?: boolean
    senderPhone?: boolean
    senderAddress?: boolean
    senderLatitude?: boolean
    senderLongitude?: boolean
    receiverName?: boolean
    receiverPhone?: boolean
    receiverAddress?: boolean
    receiverLatitude?: boolean
    receiverLongitude?: boolean
    packageName?: boolean
    packageCategory?: boolean
    packageWeight?: boolean
    packageDimensions?: boolean
    packageValue?: boolean
    pickupDate?: boolean
    courier_name?: boolean
    courier_email?: boolean
    courier_phone?: boolean
    shipbubbleOrderId?: boolean
    tracking_url?: boolean
    package_amount?: boolean
    package_weight?: boolean
    shipping_fee?: boolean
    shipping_payment_type?: boolean
    shipping_payment_status?: boolean
    package_status?: boolean
    checkoutSessionId?: boolean
    checkoutUrl?: boolean
    paymentAmount?: boolean
    paymentCurrency?: boolean
    paymentStatus?: boolean
    bookingStatus?: boolean
    bookingDetails?: boolean
    deliveryInsurer?: boolean
    deliveryCurrency?: boolean
    insuranceAmount?: boolean
    insurance_policy_condition?: boolean
    insure_percentage?: boolean
    insurance_cost?: boolean
    insuranceCode?: boolean
    insurerName?: boolean
    bookingError?: boolean
    deliveryStatus?: boolean
    deliveryType?: boolean
    deliveryInstructions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeliveryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "trackingId" | "senderName" | "senderPhone" | "senderAddress" | "senderLatitude" | "senderLongitude" | "receiverName" | "receiverPhone" | "receiverAddress" | "receiverLatitude" | "receiverLongitude" | "packageName" | "packageCategory" | "packageWeight" | "packageDimensions" | "packageValue" | "pickupDate" | "courier_name" | "courier_email" | "courier_phone" | "shipbubbleOrderId" | "tracking_url" | "package_amount" | "package_weight" | "shipping_fee" | "shipping_payment_type" | "shipping_payment_status" | "package_status" | "checkoutSessionId" | "checkoutUrl" | "paymentAmount" | "paymentCurrency" | "paymentStatus" | "bookingStatus" | "bookingDetails" | "deliveryInsurer" | "deliveryCurrency" | "insuranceAmount" | "insurance_policy_condition" | "insure_percentage" | "insurance_cost" | "insuranceCode" | "insurerName" | "bookingError" | "deliveryStatus" | "deliveryType" | "deliveryInstructions" | "createdAt" | "updatedAt", ExtArgs["result"]["delivery"]>

  export type $DeliveryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Delivery"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      trackingId: string
      senderName: string
      senderPhone: string
      senderAddress: string
      senderLatitude: string | null
      senderLongitude: string | null
      receiverName: string
      receiverPhone: string
      receiverAddress: string
      receiverLatitude: string | null
      receiverLongitude: string | null
      packageName: string
      packageCategory: string
      packageWeight: string
      packageDimensions: string
      packageValue: string
      pickupDate: string
      courier_name: string | null
      courier_email: string | null
      courier_phone: string | null
      shipbubbleOrderId: string | null
      tracking_url: string | null
      package_amount: string | null
      package_weight: string | null
      shipping_fee: string | null
      shipping_payment_type: string | null
      shipping_payment_status: string | null
      package_status: Prisma.JsonValue | null
      checkoutSessionId: string | null
      checkoutUrl: string | null
      paymentAmount: string | null
      paymentCurrency: string | null
      paymentStatus: string
      bookingStatus: string
      bookingDetails: Prisma.JsonValue | null
      deliveryInsurer: string | null
      deliveryCurrency: string | null
      insuranceAmount: number | null
      insurance_policy_condition: string | null
      insure_percentage: number | null
      insurance_cost: number | null
      insuranceCode: string | null
      insurerName: string | null
      bookingError: string | null
      deliveryStatus: string | null
      deliveryType: string
      deliveryInstructions: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["delivery"]>
    composites: {}
  }

  type DeliveryGetPayload<S extends boolean | null | undefined | DeliveryDefaultArgs> = $Result.GetResult<Prisma.$DeliveryPayload, S>

  type DeliveryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeliveryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeliveryCountAggregateInputType | true
    }

  export interface DeliveryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Delivery'], meta: { name: 'Delivery' } }
    /**
     * Find zero or one Delivery that matches the filter.
     * @param {DeliveryFindUniqueArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeliveryFindUniqueArgs>(args: SelectSubset<T, DeliveryFindUniqueArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Delivery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeliveryFindUniqueOrThrowArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeliveryFindUniqueOrThrowArgs>(args: SelectSubset<T, DeliveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Delivery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindFirstArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeliveryFindFirstArgs>(args?: SelectSubset<T, DeliveryFindFirstArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Delivery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindFirstOrThrowArgs} args - Arguments to find a Delivery
     * @example
     * // Get one Delivery
     * const delivery = await prisma.delivery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeliveryFindFirstOrThrowArgs>(args?: SelectSubset<T, DeliveryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Deliveries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deliveries
     * const deliveries = await prisma.delivery.findMany()
     * 
     * // Get first 10 Deliveries
     * const deliveries = await prisma.delivery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deliveryWithIdOnly = await prisma.delivery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeliveryFindManyArgs>(args?: SelectSubset<T, DeliveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Delivery.
     * @param {DeliveryCreateArgs} args - Arguments to create a Delivery.
     * @example
     * // Create one Delivery
     * const Delivery = await prisma.delivery.create({
     *   data: {
     *     // ... data to create a Delivery
     *   }
     * })
     * 
     */
    create<T extends DeliveryCreateArgs>(args: SelectSubset<T, DeliveryCreateArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Deliveries.
     * @param {DeliveryCreateManyArgs} args - Arguments to create many Deliveries.
     * @example
     * // Create many Deliveries
     * const delivery = await prisma.delivery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeliveryCreateManyArgs>(args?: SelectSubset<T, DeliveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Deliveries and returns the data saved in the database.
     * @param {DeliveryCreateManyAndReturnArgs} args - Arguments to create many Deliveries.
     * @example
     * // Create many Deliveries
     * const delivery = await prisma.delivery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Deliveries and only return the `id`
     * const deliveryWithIdOnly = await prisma.delivery.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeliveryCreateManyAndReturnArgs>(args?: SelectSubset<T, DeliveryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Delivery.
     * @param {DeliveryDeleteArgs} args - Arguments to delete one Delivery.
     * @example
     * // Delete one Delivery
     * const Delivery = await prisma.delivery.delete({
     *   where: {
     *     // ... filter to delete one Delivery
     *   }
     * })
     * 
     */
    delete<T extends DeliveryDeleteArgs>(args: SelectSubset<T, DeliveryDeleteArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Delivery.
     * @param {DeliveryUpdateArgs} args - Arguments to update one Delivery.
     * @example
     * // Update one Delivery
     * const delivery = await prisma.delivery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeliveryUpdateArgs>(args: SelectSubset<T, DeliveryUpdateArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Deliveries.
     * @param {DeliveryDeleteManyArgs} args - Arguments to filter Deliveries to delete.
     * @example
     * // Delete a few Deliveries
     * const { count } = await prisma.delivery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeliveryDeleteManyArgs>(args?: SelectSubset<T, DeliveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deliveries
     * const delivery = await prisma.delivery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeliveryUpdateManyArgs>(args: SelectSubset<T, DeliveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deliveries and returns the data updated in the database.
     * @param {DeliveryUpdateManyAndReturnArgs} args - Arguments to update many Deliveries.
     * @example
     * // Update many Deliveries
     * const delivery = await prisma.delivery.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Deliveries and only return the `id`
     * const deliveryWithIdOnly = await prisma.delivery.updateManyAndReturn({
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
    updateManyAndReturn<T extends DeliveryUpdateManyAndReturnArgs>(args: SelectSubset<T, DeliveryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Delivery.
     * @param {DeliveryUpsertArgs} args - Arguments to update or create a Delivery.
     * @example
     * // Update or create a Delivery
     * const delivery = await prisma.delivery.upsert({
     *   create: {
     *     // ... data to create a Delivery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Delivery we want to update
     *   }
     * })
     */
    upsert<T extends DeliveryUpsertArgs>(args: SelectSubset<T, DeliveryUpsertArgs<ExtArgs>>): Prisma__DeliveryClient<$Result.GetResult<Prisma.$DeliveryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Deliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryCountArgs} args - Arguments to filter Deliveries to count.
     * @example
     * // Count the number of Deliveries
     * const count = await prisma.delivery.count({
     *   where: {
     *     // ... the filter for the Deliveries we want to count
     *   }
     * })
    **/
    count<T extends DeliveryCountArgs>(
      args?: Subset<T, DeliveryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeliveryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Delivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeliveryAggregateArgs>(args: Subset<T, DeliveryAggregateArgs>): Prisma.PrismaPromise<GetDeliveryAggregateType<T>>

    /**
     * Group by Delivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeliveryGroupByArgs} args - Group by arguments.
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
      T extends DeliveryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeliveryGroupByArgs['orderBy'] }
        : { orderBy?: DeliveryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DeliveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeliveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Delivery model
   */
  readonly fields: DeliveryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Delivery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeliveryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Delivery model
   */
  interface DeliveryFieldRefs {
    readonly id: FieldRef<"Delivery", 'String'>
    readonly userId: FieldRef<"Delivery", 'String'>
    readonly trackingId: FieldRef<"Delivery", 'String'>
    readonly senderName: FieldRef<"Delivery", 'String'>
    readonly senderPhone: FieldRef<"Delivery", 'String'>
    readonly senderAddress: FieldRef<"Delivery", 'String'>
    readonly senderLatitude: FieldRef<"Delivery", 'String'>
    readonly senderLongitude: FieldRef<"Delivery", 'String'>
    readonly receiverName: FieldRef<"Delivery", 'String'>
    readonly receiverPhone: FieldRef<"Delivery", 'String'>
    readonly receiverAddress: FieldRef<"Delivery", 'String'>
    readonly receiverLatitude: FieldRef<"Delivery", 'String'>
    readonly receiverLongitude: FieldRef<"Delivery", 'String'>
    readonly packageName: FieldRef<"Delivery", 'String'>
    readonly packageCategory: FieldRef<"Delivery", 'String'>
    readonly packageWeight: FieldRef<"Delivery", 'String'>
    readonly packageDimensions: FieldRef<"Delivery", 'String'>
    readonly packageValue: FieldRef<"Delivery", 'String'>
    readonly pickupDate: FieldRef<"Delivery", 'String'>
    readonly courier_name: FieldRef<"Delivery", 'String'>
    readonly courier_email: FieldRef<"Delivery", 'String'>
    readonly courier_phone: FieldRef<"Delivery", 'String'>
    readonly shipbubbleOrderId: FieldRef<"Delivery", 'String'>
    readonly tracking_url: FieldRef<"Delivery", 'String'>
    readonly package_amount: FieldRef<"Delivery", 'String'>
    readonly package_weight: FieldRef<"Delivery", 'String'>
    readonly shipping_fee: FieldRef<"Delivery", 'String'>
    readonly shipping_payment_type: FieldRef<"Delivery", 'String'>
    readonly shipping_payment_status: FieldRef<"Delivery", 'String'>
    readonly package_status: FieldRef<"Delivery", 'Json'>
    readonly checkoutSessionId: FieldRef<"Delivery", 'String'>
    readonly checkoutUrl: FieldRef<"Delivery", 'String'>
    readonly paymentAmount: FieldRef<"Delivery", 'String'>
    readonly paymentCurrency: FieldRef<"Delivery", 'String'>
    readonly paymentStatus: FieldRef<"Delivery", 'String'>
    readonly bookingStatus: FieldRef<"Delivery", 'String'>
    readonly bookingDetails: FieldRef<"Delivery", 'Json'>
    readonly deliveryInsurer: FieldRef<"Delivery", 'String'>
    readonly deliveryCurrency: FieldRef<"Delivery", 'String'>
    readonly insuranceAmount: FieldRef<"Delivery", 'Float'>
    readonly insurance_policy_condition: FieldRef<"Delivery", 'String'>
    readonly insure_percentage: FieldRef<"Delivery", 'Float'>
    readonly insurance_cost: FieldRef<"Delivery", 'Float'>
    readonly insuranceCode: FieldRef<"Delivery", 'String'>
    readonly insurerName: FieldRef<"Delivery", 'String'>
    readonly bookingError: FieldRef<"Delivery", 'String'>
    readonly deliveryStatus: FieldRef<"Delivery", 'String'>
    readonly deliveryType: FieldRef<"Delivery", 'String'>
    readonly deliveryInstructions: FieldRef<"Delivery", 'String'>
    readonly createdAt: FieldRef<"Delivery", 'DateTime'>
    readonly updatedAt: FieldRef<"Delivery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Delivery findUnique
   */
  export type DeliveryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery findUniqueOrThrow
   */
  export type DeliveryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery findFirst
   */
  export type DeliveryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deliveries.
     */
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery findFirstOrThrow
   */
  export type DeliveryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Filter, which Delivery to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deliveries.
     */
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery findMany
   */
  export type DeliveryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Filter, which Deliveries to fetch.
     */
    where?: DeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deliveries to fetch.
     */
    orderBy?: DeliveryOrderByWithRelationInput | DeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deliveries.
     */
    cursor?: DeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deliveries.
     */
    skip?: number
    distinct?: DeliveryScalarFieldEnum | DeliveryScalarFieldEnum[]
  }

  /**
   * Delivery create
   */
  export type DeliveryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * The data needed to create a Delivery.
     */
    data: XOR<DeliveryCreateInput, DeliveryUncheckedCreateInput>
  }

  /**
   * Delivery createMany
   */
  export type DeliveryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Deliveries.
     */
    data: DeliveryCreateManyInput | DeliveryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Delivery createManyAndReturn
   */
  export type DeliveryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * The data used to create many Deliveries.
     */
    data: DeliveryCreateManyInput | DeliveryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Delivery update
   */
  export type DeliveryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * The data needed to update a Delivery.
     */
    data: XOR<DeliveryUpdateInput, DeliveryUncheckedUpdateInput>
    /**
     * Choose, which Delivery to update.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery updateMany
   */
  export type DeliveryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Deliveries.
     */
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyInput>
    /**
     * Filter which Deliveries to update
     */
    where?: DeliveryWhereInput
    /**
     * Limit how many Deliveries to update.
     */
    limit?: number
  }

  /**
   * Delivery updateManyAndReturn
   */
  export type DeliveryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * The data used to update Deliveries.
     */
    data: XOR<DeliveryUpdateManyMutationInput, DeliveryUncheckedUpdateManyInput>
    /**
     * Filter which Deliveries to update
     */
    where?: DeliveryWhereInput
    /**
     * Limit how many Deliveries to update.
     */
    limit?: number
  }

  /**
   * Delivery upsert
   */
  export type DeliveryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * The filter to search for the Delivery to update in case it exists.
     */
    where: DeliveryWhereUniqueInput
    /**
     * In case the Delivery found by the `where` argument doesn't exist, create a new Delivery with this data.
     */
    create: XOR<DeliveryCreateInput, DeliveryUncheckedCreateInput>
    /**
     * In case the Delivery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeliveryUpdateInput, DeliveryUncheckedUpdateInput>
  }

  /**
   * Delivery delete
   */
  export type DeliveryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
    /**
     * Filter which Delivery to delete.
     */
    where: DeliveryWhereUniqueInput
  }

  /**
   * Delivery deleteMany
   */
  export type DeliveryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deliveries to delete
     */
    where?: DeliveryWhereInput
    /**
     * Limit how many Deliveries to delete.
     */
    limit?: number
  }

  /**
   * Delivery without action
   */
  export type DeliveryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delivery
     */
    select?: DeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Delivery
     */
    omit?: DeliveryOmit<ExtArgs> | null
  }


  /**
   * Model MessageTemplate
   */

  export type AggregateMessageTemplate = {
    _count: MessageTemplateCountAggregateOutputType | null
    _min: MessageTemplateMinAggregateOutputType | null
    _max: MessageTemplateMaxAggregateOutputType | null
  }

  export type MessageTemplateMinAggregateOutputType = {
    id: string | null
    metaTemplateId: string | null
    userId: string | null
    name: string | null
    language: string | null
    status: string | null
    category: string | null
    previousCategory: string | null
    parameterFormat: string | null
    disableIosAutofill: boolean | null
    isPrimaryDeviceDeliveryOnly: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageTemplateMaxAggregateOutputType = {
    id: string | null
    metaTemplateId: string | null
    userId: string | null
    name: string | null
    language: string | null
    status: string | null
    category: string | null
    previousCategory: string | null
    parameterFormat: string | null
    disableIosAutofill: boolean | null
    isPrimaryDeviceDeliveryOnly: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageTemplateCountAggregateOutputType = {
    id: number
    metaTemplateId: number
    userId: number
    name: number
    language: number
    status: number
    category: number
    previousCategory: number
    parameterFormat: number
    components: number
    disableIosAutofill: number
    isPrimaryDeviceDeliveryOnly: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MessageTemplateMinAggregateInputType = {
    id?: true
    metaTemplateId?: true
    userId?: true
    name?: true
    language?: true
    status?: true
    category?: true
    previousCategory?: true
    parameterFormat?: true
    disableIosAutofill?: true
    isPrimaryDeviceDeliveryOnly?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageTemplateMaxAggregateInputType = {
    id?: true
    metaTemplateId?: true
    userId?: true
    name?: true
    language?: true
    status?: true
    category?: true
    previousCategory?: true
    parameterFormat?: true
    disableIosAutofill?: true
    isPrimaryDeviceDeliveryOnly?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageTemplateCountAggregateInputType = {
    id?: true
    metaTemplateId?: true
    userId?: true
    name?: true
    language?: true
    status?: true
    category?: true
    previousCategory?: true
    parameterFormat?: true
    components?: true
    disableIosAutofill?: true
    isPrimaryDeviceDeliveryOnly?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageTemplate to aggregate.
     */
    where?: MessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageTemplates to fetch.
     */
    orderBy?: MessageTemplateOrderByWithRelationInput | MessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageTemplates
    **/
    _count?: true | MessageTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageTemplateMaxAggregateInputType
  }

  export type GetMessageTemplateAggregateType<T extends MessageTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageTemplate[P]>
      : GetScalarType<T[P], AggregateMessageTemplate[P]>
  }




  export type MessageTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageTemplateWhereInput
    orderBy?: MessageTemplateOrderByWithAggregationInput | MessageTemplateOrderByWithAggregationInput[]
    by: MessageTemplateScalarFieldEnum[] | MessageTemplateScalarFieldEnum
    having?: MessageTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageTemplateCountAggregateInputType | true
    _min?: MessageTemplateMinAggregateInputType
    _max?: MessageTemplateMaxAggregateInputType
  }

  export type MessageTemplateGroupByOutputType = {
    id: string
    metaTemplateId: string
    userId: string
    name: string
    language: string
    status: string
    category: string
    previousCategory: string | null
    parameterFormat: string | null
    components: JsonValue
    disableIosAutofill: boolean
    isPrimaryDeviceDeliveryOnly: boolean
    createdAt: Date
    updatedAt: Date
    _count: MessageTemplateCountAggregateOutputType | null
    _min: MessageTemplateMinAggregateOutputType | null
    _max: MessageTemplateMaxAggregateOutputType | null
  }

  type GetMessageTemplateGroupByPayload<T extends MessageTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], MessageTemplateGroupByOutputType[P]>
        }
      >
    >


  export type MessageTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metaTemplateId?: boolean
    userId?: boolean
    name?: boolean
    language?: boolean
    status?: boolean
    category?: boolean
    previousCategory?: boolean
    parameterFormat?: boolean
    components?: boolean
    disableIosAutofill?: boolean
    isPrimaryDeviceDeliveryOnly?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageTemplate"]>

  export type MessageTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metaTemplateId?: boolean
    userId?: boolean
    name?: boolean
    language?: boolean
    status?: boolean
    category?: boolean
    previousCategory?: boolean
    parameterFormat?: boolean
    components?: boolean
    disableIosAutofill?: boolean
    isPrimaryDeviceDeliveryOnly?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageTemplate"]>

  export type MessageTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    metaTemplateId?: boolean
    userId?: boolean
    name?: boolean
    language?: boolean
    status?: boolean
    category?: boolean
    previousCategory?: boolean
    parameterFormat?: boolean
    components?: boolean
    disableIosAutofill?: boolean
    isPrimaryDeviceDeliveryOnly?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageTemplate"]>

  export type MessageTemplateSelectScalar = {
    id?: boolean
    metaTemplateId?: boolean
    userId?: boolean
    name?: boolean
    language?: boolean
    status?: boolean
    category?: boolean
    previousCategory?: boolean
    parameterFormat?: boolean
    components?: boolean
    disableIosAutofill?: boolean
    isPrimaryDeviceDeliveryOnly?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MessageTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "metaTemplateId" | "userId" | "name" | "language" | "status" | "category" | "previousCategory" | "parameterFormat" | "components" | "disableIosAutofill" | "isPrimaryDeviceDeliveryOnly" | "createdAt" | "updatedAt", ExtArgs["result"]["messageTemplate"]>
  export type MessageTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageTemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageTemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessageTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageTemplate"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      metaTemplateId: string
      userId: string
      name: string
      language: string
      status: string
      category: string
      previousCategory: string | null
      parameterFormat: string | null
      components: Prisma.JsonValue
      disableIosAutofill: boolean
      isPrimaryDeviceDeliveryOnly: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["messageTemplate"]>
    composites: {}
  }

  type MessageTemplateGetPayload<S extends boolean | null | undefined | MessageTemplateDefaultArgs> = $Result.GetResult<Prisma.$MessageTemplatePayload, S>

  type MessageTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageTemplateCountAggregateInputType | true
    }

  export interface MessageTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageTemplate'], meta: { name: 'MessageTemplate' } }
    /**
     * Find zero or one MessageTemplate that matches the filter.
     * @param {MessageTemplateFindUniqueArgs} args - Arguments to find a MessageTemplate
     * @example
     * // Get one MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageTemplateFindUniqueArgs>(args: SelectSubset<T, MessageTemplateFindUniqueArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MessageTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageTemplateFindUniqueOrThrowArgs} args - Arguments to find a MessageTemplate
     * @example
     * // Get one MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateFindFirstArgs} args - Arguments to find a MessageTemplate
     * @example
     * // Get one MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageTemplateFindFirstArgs>(args?: SelectSubset<T, MessageTemplateFindFirstArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MessageTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateFindFirstOrThrowArgs} args - Arguments to find a MessageTemplate
     * @example
     * // Get one MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MessageTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageTemplates
     * const messageTemplates = await prisma.messageTemplate.findMany()
     * 
     * // Get first 10 MessageTemplates
     * const messageTemplates = await prisma.messageTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageTemplateWithIdOnly = await prisma.messageTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageTemplateFindManyArgs>(args?: SelectSubset<T, MessageTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MessageTemplate.
     * @param {MessageTemplateCreateArgs} args - Arguments to create a MessageTemplate.
     * @example
     * // Create one MessageTemplate
     * const MessageTemplate = await prisma.messageTemplate.create({
     *   data: {
     *     // ... data to create a MessageTemplate
     *   }
     * })
     * 
     */
    create<T extends MessageTemplateCreateArgs>(args: SelectSubset<T, MessageTemplateCreateArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MessageTemplates.
     * @param {MessageTemplateCreateManyArgs} args - Arguments to create many MessageTemplates.
     * @example
     * // Create many MessageTemplates
     * const messageTemplate = await prisma.messageTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageTemplateCreateManyArgs>(args?: SelectSubset<T, MessageTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MessageTemplates and returns the data saved in the database.
     * @param {MessageTemplateCreateManyAndReturnArgs} args - Arguments to create many MessageTemplates.
     * @example
     * // Create many MessageTemplates
     * const messageTemplate = await prisma.messageTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MessageTemplates and only return the `id`
     * const messageTemplateWithIdOnly = await prisma.messageTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MessageTemplate.
     * @param {MessageTemplateDeleteArgs} args - Arguments to delete one MessageTemplate.
     * @example
     * // Delete one MessageTemplate
     * const MessageTemplate = await prisma.messageTemplate.delete({
     *   where: {
     *     // ... filter to delete one MessageTemplate
     *   }
     * })
     * 
     */
    delete<T extends MessageTemplateDeleteArgs>(args: SelectSubset<T, MessageTemplateDeleteArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MessageTemplate.
     * @param {MessageTemplateUpdateArgs} args - Arguments to update one MessageTemplate.
     * @example
     * // Update one MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageTemplateUpdateArgs>(args: SelectSubset<T, MessageTemplateUpdateArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MessageTemplates.
     * @param {MessageTemplateDeleteManyArgs} args - Arguments to filter MessageTemplates to delete.
     * @example
     * // Delete a few MessageTemplates
     * const { count } = await prisma.messageTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageTemplateDeleteManyArgs>(args?: SelectSubset<T, MessageTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageTemplates
     * const messageTemplate = await prisma.messageTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageTemplateUpdateManyArgs>(args: SelectSubset<T, MessageTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageTemplates and returns the data updated in the database.
     * @param {MessageTemplateUpdateManyAndReturnArgs} args - Arguments to update many MessageTemplates.
     * @example
     * // Update many MessageTemplates
     * const messageTemplate = await prisma.messageTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MessageTemplates and only return the `id`
     * const messageTemplateWithIdOnly = await prisma.messageTemplate.updateManyAndReturn({
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
    updateManyAndReturn<T extends MessageTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MessageTemplate.
     * @param {MessageTemplateUpsertArgs} args - Arguments to update or create a MessageTemplate.
     * @example
     * // Update or create a MessageTemplate
     * const messageTemplate = await prisma.messageTemplate.upsert({
     *   create: {
     *     // ... data to create a MessageTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageTemplate we want to update
     *   }
     * })
     */
    upsert<T extends MessageTemplateUpsertArgs>(args: SelectSubset<T, MessageTemplateUpsertArgs<ExtArgs>>): Prisma__MessageTemplateClient<$Result.GetResult<Prisma.$MessageTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MessageTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateCountArgs} args - Arguments to filter MessageTemplates to count.
     * @example
     * // Count the number of MessageTemplates
     * const count = await prisma.messageTemplate.count({
     *   where: {
     *     // ... the filter for the MessageTemplates we want to count
     *   }
     * })
    **/
    count<T extends MessageTemplateCountArgs>(
      args?: Subset<T, MessageTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MessageTemplateAggregateArgs>(args: Subset<T, MessageTemplateAggregateArgs>): Prisma.PrismaPromise<GetMessageTemplateAggregateType<T>>

    /**
     * Group by MessageTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageTemplateGroupByArgs} args - Group by arguments.
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
      T extends MessageTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageTemplateGroupByArgs['orderBy'] }
        : { orderBy?: MessageTemplateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MessageTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageTemplate model
   */
  readonly fields: MessageTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the MessageTemplate model
   */
  interface MessageTemplateFieldRefs {
    readonly id: FieldRef<"MessageTemplate", 'String'>
    readonly metaTemplateId: FieldRef<"MessageTemplate", 'String'>
    readonly userId: FieldRef<"MessageTemplate", 'String'>
    readonly name: FieldRef<"MessageTemplate", 'String'>
    readonly language: FieldRef<"MessageTemplate", 'String'>
    readonly status: FieldRef<"MessageTemplate", 'String'>
    readonly category: FieldRef<"MessageTemplate", 'String'>
    readonly previousCategory: FieldRef<"MessageTemplate", 'String'>
    readonly parameterFormat: FieldRef<"MessageTemplate", 'String'>
    readonly components: FieldRef<"MessageTemplate", 'Json'>
    readonly disableIosAutofill: FieldRef<"MessageTemplate", 'Boolean'>
    readonly isPrimaryDeviceDeliveryOnly: FieldRef<"MessageTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"MessageTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"MessageTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageTemplate findUnique
   */
  export type MessageTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter, which MessageTemplate to fetch.
     */
    where: MessageTemplateWhereUniqueInput
  }

  /**
   * MessageTemplate findUniqueOrThrow
   */
  export type MessageTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter, which MessageTemplate to fetch.
     */
    where: MessageTemplateWhereUniqueInput
  }

  /**
   * MessageTemplate findFirst
   */
  export type MessageTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter, which MessageTemplate to fetch.
     */
    where?: MessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageTemplates to fetch.
     */
    orderBy?: MessageTemplateOrderByWithRelationInput | MessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageTemplates.
     */
    cursor?: MessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageTemplates.
     */
    distinct?: MessageTemplateScalarFieldEnum | MessageTemplateScalarFieldEnum[]
  }

  /**
   * MessageTemplate findFirstOrThrow
   */
  export type MessageTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter, which MessageTemplate to fetch.
     */
    where?: MessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageTemplates to fetch.
     */
    orderBy?: MessageTemplateOrderByWithRelationInput | MessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageTemplates.
     */
    cursor?: MessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageTemplates.
     */
    distinct?: MessageTemplateScalarFieldEnum | MessageTemplateScalarFieldEnum[]
  }

  /**
   * MessageTemplate findMany
   */
  export type MessageTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter, which MessageTemplates to fetch.
     */
    where?: MessageTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageTemplates to fetch.
     */
    orderBy?: MessageTemplateOrderByWithRelationInput | MessageTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageTemplates.
     */
    cursor?: MessageTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageTemplates.
     */
    skip?: number
    distinct?: MessageTemplateScalarFieldEnum | MessageTemplateScalarFieldEnum[]
  }

  /**
   * MessageTemplate create
   */
  export type MessageTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageTemplate.
     */
    data: XOR<MessageTemplateCreateInput, MessageTemplateUncheckedCreateInput>
  }

  /**
   * MessageTemplate createMany
   */
  export type MessageTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageTemplates.
     */
    data: MessageTemplateCreateManyInput | MessageTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MessageTemplate createManyAndReturn
   */
  export type MessageTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many MessageTemplates.
     */
    data: MessageTemplateCreateManyInput | MessageTemplateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageTemplate update
   */
  export type MessageTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageTemplate.
     */
    data: XOR<MessageTemplateUpdateInput, MessageTemplateUncheckedUpdateInput>
    /**
     * Choose, which MessageTemplate to update.
     */
    where: MessageTemplateWhereUniqueInput
  }

  /**
   * MessageTemplate updateMany
   */
  export type MessageTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageTemplates.
     */
    data: XOR<MessageTemplateUpdateManyMutationInput, MessageTemplateUncheckedUpdateManyInput>
    /**
     * Filter which MessageTemplates to update
     */
    where?: MessageTemplateWhereInput
    /**
     * Limit how many MessageTemplates to update.
     */
    limit?: number
  }

  /**
   * MessageTemplate updateManyAndReturn
   */
  export type MessageTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * The data used to update MessageTemplates.
     */
    data: XOR<MessageTemplateUpdateManyMutationInput, MessageTemplateUncheckedUpdateManyInput>
    /**
     * Filter which MessageTemplates to update
     */
    where?: MessageTemplateWhereInput
    /**
     * Limit how many MessageTemplates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageTemplate upsert
   */
  export type MessageTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageTemplate to update in case it exists.
     */
    where: MessageTemplateWhereUniqueInput
    /**
     * In case the MessageTemplate found by the `where` argument doesn't exist, create a new MessageTemplate with this data.
     */
    create: XOR<MessageTemplateCreateInput, MessageTemplateUncheckedCreateInput>
    /**
     * In case the MessageTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageTemplateUpdateInput, MessageTemplateUncheckedUpdateInput>
  }

  /**
   * MessageTemplate delete
   */
  export type MessageTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
    /**
     * Filter which MessageTemplate to delete.
     */
    where: MessageTemplateWhereUniqueInput
  }

  /**
   * MessageTemplate deleteMany
   */
  export type MessageTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageTemplates to delete
     */
    where?: MessageTemplateWhereInput
    /**
     * Limit how many MessageTemplates to delete.
     */
    limit?: number
  }

  /**
   * MessageTemplate without action
   */
  export type MessageTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageTemplate
     */
    select?: MessageTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MessageTemplate
     */
    omit?: MessageTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageTemplateInclude<ExtArgs> | null
  }


  /**
   * Model CreditWallet
   */

  export type AggregateCreditWallet = {
    _count: CreditWalletCountAggregateOutputType | null
    _avg: CreditWalletAvgAggregateOutputType | null
    _sum: CreditWalletSumAggregateOutputType | null
    _min: CreditWalletMinAggregateOutputType | null
    _max: CreditWalletMaxAggregateOutputType | null
  }

  export type CreditWalletAvgAggregateOutputType = {
    balance: number | null
    points: number | null
  }

  export type CreditWalletSumAggregateOutputType = {
    balance: number | null
    points: number | null
  }

  export type CreditWalletMinAggregateOutputType = {
    id: string | null
    userId: string | null
    balance: number | null
    points: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreditWalletMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    balance: number | null
    points: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreditWalletCountAggregateOutputType = {
    id: number
    userId: number
    balance: number
    points: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CreditWalletAvgAggregateInputType = {
    balance?: true
    points?: true
  }

  export type CreditWalletSumAggregateInputType = {
    balance?: true
    points?: true
  }

  export type CreditWalletMinAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    points?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreditWalletMaxAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    points?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreditWalletCountAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    points?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CreditWalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditWallet to aggregate.
     */
    where?: CreditWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditWallets to fetch.
     */
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditWallets
    **/
    _count?: true | CreditWalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditWalletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditWalletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditWalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditWalletMaxAggregateInputType
  }

  export type GetCreditWalletAggregateType<T extends CreditWalletAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditWallet[P]>
      : GetScalarType<T[P], AggregateCreditWallet[P]>
  }




  export type CreditWalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditWalletWhereInput
    orderBy?: CreditWalletOrderByWithAggregationInput | CreditWalletOrderByWithAggregationInput[]
    by: CreditWalletScalarFieldEnum[] | CreditWalletScalarFieldEnum
    having?: CreditWalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditWalletCountAggregateInputType | true
    _avg?: CreditWalletAvgAggregateInputType
    _sum?: CreditWalletSumAggregateInputType
    _min?: CreditWalletMinAggregateInputType
    _max?: CreditWalletMaxAggregateInputType
  }

  export type CreditWalletGroupByOutputType = {
    id: string
    userId: string
    balance: number
    points: number
    createdAt: Date
    updatedAt: Date
    _count: CreditWalletCountAggregateOutputType | null
    _avg: CreditWalletAvgAggregateOutputType | null
    _sum: CreditWalletSumAggregateOutputType | null
    _min: CreditWalletMinAggregateOutputType | null
    _max: CreditWalletMaxAggregateOutputType | null
  }

  type GetCreditWalletGroupByPayload<T extends CreditWalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditWalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditWalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditWalletGroupByOutputType[P]>
            : GetScalarType<T[P], CreditWalletGroupByOutputType[P]>
        }
      >
    >


  export type CreditWalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    points?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | CreditWallet$transactionsArgs<ExtArgs>
    purchases?: boolean | CreditWallet$purchasesArgs<ExtArgs>
    _count?: boolean | CreditWalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditWallet"]>

  export type CreditWalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    points?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditWallet"]>

  export type CreditWalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    points?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditWallet"]>

  export type CreditWalletSelectScalar = {
    id?: boolean
    userId?: boolean
    balance?: boolean
    points?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CreditWalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "balance" | "points" | "createdAt" | "updatedAt", ExtArgs["result"]["creditWallet"]>
  export type CreditWalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | CreditWallet$transactionsArgs<ExtArgs>
    purchases?: boolean | CreditWallet$purchasesArgs<ExtArgs>
    _count?: boolean | CreditWalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CreditWalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CreditWalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CreditWalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditWallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      transactions: Prisma.$CreditTransactionPayload<ExtArgs>[]
      purchases: Prisma.$CreditPurchasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      balance: number
      points: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["creditWallet"]>
    composites: {}
  }

  type CreditWalletGetPayload<S extends boolean | null | undefined | CreditWalletDefaultArgs> = $Result.GetResult<Prisma.$CreditWalletPayload, S>

  type CreditWalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreditWalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditWalletCountAggregateInputType | true
    }

  export interface CreditWalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditWallet'], meta: { name: 'CreditWallet' } }
    /**
     * Find zero or one CreditWallet that matches the filter.
     * @param {CreditWalletFindUniqueArgs} args - Arguments to find a CreditWallet
     * @example
     * // Get one CreditWallet
     * const creditWallet = await prisma.creditWallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditWalletFindUniqueArgs>(args: SelectSubset<T, CreditWalletFindUniqueArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreditWallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreditWalletFindUniqueOrThrowArgs} args - Arguments to find a CreditWallet
     * @example
     * // Get one CreditWallet
     * const creditWallet = await prisma.creditWallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditWalletFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditWalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditWallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletFindFirstArgs} args - Arguments to find a CreditWallet
     * @example
     * // Get one CreditWallet
     * const creditWallet = await prisma.creditWallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditWalletFindFirstArgs>(args?: SelectSubset<T, CreditWalletFindFirstArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditWallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletFindFirstOrThrowArgs} args - Arguments to find a CreditWallet
     * @example
     * // Get one CreditWallet
     * const creditWallet = await prisma.creditWallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditWalletFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditWalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreditWallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditWallets
     * const creditWallets = await prisma.creditWallet.findMany()
     * 
     * // Get first 10 CreditWallets
     * const creditWallets = await prisma.creditWallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditWalletWithIdOnly = await prisma.creditWallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditWalletFindManyArgs>(args?: SelectSubset<T, CreditWalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreditWallet.
     * @param {CreditWalletCreateArgs} args - Arguments to create a CreditWallet.
     * @example
     * // Create one CreditWallet
     * const CreditWallet = await prisma.creditWallet.create({
     *   data: {
     *     // ... data to create a CreditWallet
     *   }
     * })
     * 
     */
    create<T extends CreditWalletCreateArgs>(args: SelectSubset<T, CreditWalletCreateArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreditWallets.
     * @param {CreditWalletCreateManyArgs} args - Arguments to create many CreditWallets.
     * @example
     * // Create many CreditWallets
     * const creditWallet = await prisma.creditWallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditWalletCreateManyArgs>(args?: SelectSubset<T, CreditWalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditWallets and returns the data saved in the database.
     * @param {CreditWalletCreateManyAndReturnArgs} args - Arguments to create many CreditWallets.
     * @example
     * // Create many CreditWallets
     * const creditWallet = await prisma.creditWallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditWallets and only return the `id`
     * const creditWalletWithIdOnly = await prisma.creditWallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditWalletCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditWalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreditWallet.
     * @param {CreditWalletDeleteArgs} args - Arguments to delete one CreditWallet.
     * @example
     * // Delete one CreditWallet
     * const CreditWallet = await prisma.creditWallet.delete({
     *   where: {
     *     // ... filter to delete one CreditWallet
     *   }
     * })
     * 
     */
    delete<T extends CreditWalletDeleteArgs>(args: SelectSubset<T, CreditWalletDeleteArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreditWallet.
     * @param {CreditWalletUpdateArgs} args - Arguments to update one CreditWallet.
     * @example
     * // Update one CreditWallet
     * const creditWallet = await prisma.creditWallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditWalletUpdateArgs>(args: SelectSubset<T, CreditWalletUpdateArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreditWallets.
     * @param {CreditWalletDeleteManyArgs} args - Arguments to filter CreditWallets to delete.
     * @example
     * // Delete a few CreditWallets
     * const { count } = await prisma.creditWallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditWalletDeleteManyArgs>(args?: SelectSubset<T, CreditWalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditWallets
     * const creditWallet = await prisma.creditWallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditWalletUpdateManyArgs>(args: SelectSubset<T, CreditWalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditWallets and returns the data updated in the database.
     * @param {CreditWalletUpdateManyAndReturnArgs} args - Arguments to update many CreditWallets.
     * @example
     * // Update many CreditWallets
     * const creditWallet = await prisma.creditWallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreditWallets and only return the `id`
     * const creditWalletWithIdOnly = await prisma.creditWallet.updateManyAndReturn({
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
    updateManyAndReturn<T extends CreditWalletUpdateManyAndReturnArgs>(args: SelectSubset<T, CreditWalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreditWallet.
     * @param {CreditWalletUpsertArgs} args - Arguments to update or create a CreditWallet.
     * @example
     * // Update or create a CreditWallet
     * const creditWallet = await prisma.creditWallet.upsert({
     *   create: {
     *     // ... data to create a CreditWallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditWallet we want to update
     *   }
     * })
     */
    upsert<T extends CreditWalletUpsertArgs>(args: SelectSubset<T, CreditWalletUpsertArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreditWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletCountArgs} args - Arguments to filter CreditWallets to count.
     * @example
     * // Count the number of CreditWallets
     * const count = await prisma.creditWallet.count({
     *   where: {
     *     // ... the filter for the CreditWallets we want to count
     *   }
     * })
    **/
    count<T extends CreditWalletCountArgs>(
      args?: Subset<T, CreditWalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditWalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CreditWalletAggregateArgs>(args: Subset<T, CreditWalletAggregateArgs>): Prisma.PrismaPromise<GetCreditWalletAggregateType<T>>

    /**
     * Group by CreditWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditWalletGroupByArgs} args - Group by arguments.
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
      T extends CreditWalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditWalletGroupByArgs['orderBy'] }
        : { orderBy?: CreditWalletGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CreditWalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditWallet model
   */
  readonly fields: CreditWalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditWallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditWalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends CreditWallet$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, CreditWallet$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    purchases<T extends CreditWallet$purchasesArgs<ExtArgs> = {}>(args?: Subset<T, CreditWallet$purchasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CreditWallet model
   */
  interface CreditWalletFieldRefs {
    readonly id: FieldRef<"CreditWallet", 'String'>
    readonly userId: FieldRef<"CreditWallet", 'String'>
    readonly balance: FieldRef<"CreditWallet", 'Int'>
    readonly points: FieldRef<"CreditWallet", 'Int'>
    readonly createdAt: FieldRef<"CreditWallet", 'DateTime'>
    readonly updatedAt: FieldRef<"CreditWallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditWallet findUnique
   */
  export type CreditWalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter, which CreditWallet to fetch.
     */
    where: CreditWalletWhereUniqueInput
  }

  /**
   * CreditWallet findUniqueOrThrow
   */
  export type CreditWalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter, which CreditWallet to fetch.
     */
    where: CreditWalletWhereUniqueInput
  }

  /**
   * CreditWallet findFirst
   */
  export type CreditWalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter, which CreditWallet to fetch.
     */
    where?: CreditWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditWallets to fetch.
     */
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditWallets.
     */
    cursor?: CreditWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditWallets.
     */
    distinct?: CreditWalletScalarFieldEnum | CreditWalletScalarFieldEnum[]
  }

  /**
   * CreditWallet findFirstOrThrow
   */
  export type CreditWalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter, which CreditWallet to fetch.
     */
    where?: CreditWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditWallets to fetch.
     */
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditWallets.
     */
    cursor?: CreditWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditWallets.
     */
    distinct?: CreditWalletScalarFieldEnum | CreditWalletScalarFieldEnum[]
  }

  /**
   * CreditWallet findMany
   */
  export type CreditWalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter, which CreditWallets to fetch.
     */
    where?: CreditWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditWallets to fetch.
     */
    orderBy?: CreditWalletOrderByWithRelationInput | CreditWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditWallets.
     */
    cursor?: CreditWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditWallets.
     */
    skip?: number
    distinct?: CreditWalletScalarFieldEnum | CreditWalletScalarFieldEnum[]
  }

  /**
   * CreditWallet create
   */
  export type CreditWalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditWallet.
     */
    data: XOR<CreditWalletCreateInput, CreditWalletUncheckedCreateInput>
  }

  /**
   * CreditWallet createMany
   */
  export type CreditWalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditWallets.
     */
    data: CreditWalletCreateManyInput | CreditWalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditWallet createManyAndReturn
   */
  export type CreditWalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * The data used to create many CreditWallets.
     */
    data: CreditWalletCreateManyInput | CreditWalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditWallet update
   */
  export type CreditWalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditWallet.
     */
    data: XOR<CreditWalletUpdateInput, CreditWalletUncheckedUpdateInput>
    /**
     * Choose, which CreditWallet to update.
     */
    where: CreditWalletWhereUniqueInput
  }

  /**
   * CreditWallet updateMany
   */
  export type CreditWalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditWallets.
     */
    data: XOR<CreditWalletUpdateManyMutationInput, CreditWalletUncheckedUpdateManyInput>
    /**
     * Filter which CreditWallets to update
     */
    where?: CreditWalletWhereInput
    /**
     * Limit how many CreditWallets to update.
     */
    limit?: number
  }

  /**
   * CreditWallet updateManyAndReturn
   */
  export type CreditWalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * The data used to update CreditWallets.
     */
    data: XOR<CreditWalletUpdateManyMutationInput, CreditWalletUncheckedUpdateManyInput>
    /**
     * Filter which CreditWallets to update
     */
    where?: CreditWalletWhereInput
    /**
     * Limit how many CreditWallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditWallet upsert
   */
  export type CreditWalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditWallet to update in case it exists.
     */
    where: CreditWalletWhereUniqueInput
    /**
     * In case the CreditWallet found by the `where` argument doesn't exist, create a new CreditWallet with this data.
     */
    create: XOR<CreditWalletCreateInput, CreditWalletUncheckedCreateInput>
    /**
     * In case the CreditWallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditWalletUpdateInput, CreditWalletUncheckedUpdateInput>
  }

  /**
   * CreditWallet delete
   */
  export type CreditWalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
    /**
     * Filter which CreditWallet to delete.
     */
    where: CreditWalletWhereUniqueInput
  }

  /**
   * CreditWallet deleteMany
   */
  export type CreditWalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditWallets to delete
     */
    where?: CreditWalletWhereInput
    /**
     * Limit how many CreditWallets to delete.
     */
    limit?: number
  }

  /**
   * CreditWallet.transactions
   */
  export type CreditWallet$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    where?: CreditTransactionWhereInput
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    cursor?: CreditTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditWallet.purchases
   */
  export type CreditWallet$purchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    where?: CreditPurchaseWhereInput
    orderBy?: CreditPurchaseOrderByWithRelationInput | CreditPurchaseOrderByWithRelationInput[]
    cursor?: CreditPurchaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditPurchaseScalarFieldEnum | CreditPurchaseScalarFieldEnum[]
  }

  /**
   * CreditWallet without action
   */
  export type CreditWalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditWallet
     */
    select?: CreditWalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditWallet
     */
    omit?: CreditWalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditWalletInclude<ExtArgs> | null
  }


  /**
   * Model CreditTransaction
   */

  export type AggregateCreditTransaction = {
    _count: CreditTransactionCountAggregateOutputType | null
    _avg: CreditTransactionAvgAggregateOutputType | null
    _sum: CreditTransactionSumAggregateOutputType | null
    _min: CreditTransactionMinAggregateOutputType | null
    _max: CreditTransactionMaxAggregateOutputType | null
  }

  export type CreditTransactionAvgAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type CreditTransactionSumAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type CreditTransactionMinAggregateOutputType = {
    id: string | null
    walletId: string | null
    type: $Enums.CreditTransactionType | null
    amount: number | null
    balanceAfter: number | null
    description: string | null
    reference: string | null
    idempotencyKey: string | null
    createdAt: Date | null
  }

  export type CreditTransactionMaxAggregateOutputType = {
    id: string | null
    walletId: string | null
    type: $Enums.CreditTransactionType | null
    amount: number | null
    balanceAfter: number | null
    description: string | null
    reference: string | null
    idempotencyKey: string | null
    createdAt: Date | null
  }

  export type CreditTransactionCountAggregateOutputType = {
    id: number
    walletId: number
    type: number
    amount: number
    balanceAfter: number
    description: number
    reference: number
    idempotencyKey: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type CreditTransactionAvgAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type CreditTransactionSumAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type CreditTransactionMinAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    description?: true
    reference?: true
    idempotencyKey?: true
    createdAt?: true
  }

  export type CreditTransactionMaxAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    description?: true
    reference?: true
    idempotencyKey?: true
    createdAt?: true
  }

  export type CreditTransactionCountAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    description?: true
    reference?: true
    idempotencyKey?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type CreditTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditTransaction to aggregate.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditTransactions
    **/
    _count?: true | CreditTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditTransactionMaxAggregateInputType
  }

  export type GetCreditTransactionAggregateType<T extends CreditTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditTransaction[P]>
      : GetScalarType<T[P], AggregateCreditTransaction[P]>
  }




  export type CreditTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditTransactionWhereInput
    orderBy?: CreditTransactionOrderByWithAggregationInput | CreditTransactionOrderByWithAggregationInput[]
    by: CreditTransactionScalarFieldEnum[] | CreditTransactionScalarFieldEnum
    having?: CreditTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditTransactionCountAggregateInputType | true
    _avg?: CreditTransactionAvgAggregateInputType
    _sum?: CreditTransactionSumAggregateInputType
    _min?: CreditTransactionMinAggregateInputType
    _max?: CreditTransactionMaxAggregateInputType
  }

  export type CreditTransactionGroupByOutputType = {
    id: string
    walletId: string
    type: $Enums.CreditTransactionType
    amount: number
    balanceAfter: number
    description: string
    reference: string | null
    idempotencyKey: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: CreditTransactionCountAggregateOutputType | null
    _avg: CreditTransactionAvgAggregateOutputType | null
    _sum: CreditTransactionSumAggregateOutputType | null
    _min: CreditTransactionMinAggregateOutputType | null
    _max: CreditTransactionMaxAggregateOutputType | null
  }

  type GetCreditTransactionGroupByPayload<T extends CreditTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], CreditTransactionGroupByOutputType[P]>
        }
      >
    >


  export type CreditTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    description?: boolean
    reference?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    description?: boolean
    reference?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    description?: boolean
    reference?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectScalar = {
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    description?: boolean
    reference?: boolean
    idempotencyKey?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type CreditTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletId" | "type" | "amount" | "balanceAfter" | "description" | "reference" | "idempotencyKey" | "metadata" | "createdAt", ExtArgs["result"]["creditTransaction"]>
  export type CreditTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
  }
  export type CreditTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
  }
  export type CreditTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
  }

  export type $CreditTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditTransaction"
    objects: {
      wallet: Prisma.$CreditWalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletId: string
      type: $Enums.CreditTransactionType
      amount: number
      balanceAfter: number
      description: string
      reference: string | null
      idempotencyKey: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["creditTransaction"]>
    composites: {}
  }

  type CreditTransactionGetPayload<S extends boolean | null | undefined | CreditTransactionDefaultArgs> = $Result.GetResult<Prisma.$CreditTransactionPayload, S>

  type CreditTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreditTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditTransactionCountAggregateInputType | true
    }

  export interface CreditTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditTransaction'], meta: { name: 'CreditTransaction' } }
    /**
     * Find zero or one CreditTransaction that matches the filter.
     * @param {CreditTransactionFindUniqueArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditTransactionFindUniqueArgs>(args: SelectSubset<T, CreditTransactionFindUniqueArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreditTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreditTransactionFindUniqueOrThrowArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindFirstArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditTransactionFindFirstArgs>(args?: SelectSubset<T, CreditTransactionFindFirstArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindFirstOrThrowArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreditTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditTransactions
     * const creditTransactions = await prisma.creditTransaction.findMany()
     * 
     * // Get first 10 CreditTransactions
     * const creditTransactions = await prisma.creditTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditTransactionFindManyArgs>(args?: SelectSubset<T, CreditTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreditTransaction.
     * @param {CreditTransactionCreateArgs} args - Arguments to create a CreditTransaction.
     * @example
     * // Create one CreditTransaction
     * const CreditTransaction = await prisma.creditTransaction.create({
     *   data: {
     *     // ... data to create a CreditTransaction
     *   }
     * })
     * 
     */
    create<T extends CreditTransactionCreateArgs>(args: SelectSubset<T, CreditTransactionCreateArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreditTransactions.
     * @param {CreditTransactionCreateManyArgs} args - Arguments to create many CreditTransactions.
     * @example
     * // Create many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditTransactionCreateManyArgs>(args?: SelectSubset<T, CreditTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditTransactions and returns the data saved in the database.
     * @param {CreditTransactionCreateManyAndReturnArgs} args - Arguments to create many CreditTransactions.
     * @example
     * // Create many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditTransactions and only return the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreditTransaction.
     * @param {CreditTransactionDeleteArgs} args - Arguments to delete one CreditTransaction.
     * @example
     * // Delete one CreditTransaction
     * const CreditTransaction = await prisma.creditTransaction.delete({
     *   where: {
     *     // ... filter to delete one CreditTransaction
     *   }
     * })
     * 
     */
    delete<T extends CreditTransactionDeleteArgs>(args: SelectSubset<T, CreditTransactionDeleteArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreditTransaction.
     * @param {CreditTransactionUpdateArgs} args - Arguments to update one CreditTransaction.
     * @example
     * // Update one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditTransactionUpdateArgs>(args: SelectSubset<T, CreditTransactionUpdateArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreditTransactions.
     * @param {CreditTransactionDeleteManyArgs} args - Arguments to filter CreditTransactions to delete.
     * @example
     * // Delete a few CreditTransactions
     * const { count } = await prisma.creditTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditTransactionDeleteManyArgs>(args?: SelectSubset<T, CreditTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditTransactionUpdateManyArgs>(args: SelectSubset<T, CreditTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditTransactions and returns the data updated in the database.
     * @param {CreditTransactionUpdateManyAndReturnArgs} args - Arguments to update many CreditTransactions.
     * @example
     * // Update many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreditTransactions and only return the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends CreditTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, CreditTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreditTransaction.
     * @param {CreditTransactionUpsertArgs} args - Arguments to update or create a CreditTransaction.
     * @example
     * // Update or create a CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.upsert({
     *   create: {
     *     // ... data to create a CreditTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditTransaction we want to update
     *   }
     * })
     */
    upsert<T extends CreditTransactionUpsertArgs>(args: SelectSubset<T, CreditTransactionUpsertArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreditTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionCountArgs} args - Arguments to filter CreditTransactions to count.
     * @example
     * // Count the number of CreditTransactions
     * const count = await prisma.creditTransaction.count({
     *   where: {
     *     // ... the filter for the CreditTransactions we want to count
     *   }
     * })
    **/
    count<T extends CreditTransactionCountArgs>(
      args?: Subset<T, CreditTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CreditTransactionAggregateArgs>(args: Subset<T, CreditTransactionAggregateArgs>): Prisma.PrismaPromise<GetCreditTransactionAggregateType<T>>

    /**
     * Group by CreditTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionGroupByArgs} args - Group by arguments.
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
      T extends CreditTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditTransactionGroupByArgs['orderBy'] }
        : { orderBy?: CreditTransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CreditTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditTransaction model
   */
  readonly fields: CreditTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends CreditWalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CreditWalletDefaultArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CreditTransaction model
   */
  interface CreditTransactionFieldRefs {
    readonly id: FieldRef<"CreditTransaction", 'String'>
    readonly walletId: FieldRef<"CreditTransaction", 'String'>
    readonly type: FieldRef<"CreditTransaction", 'CreditTransactionType'>
    readonly amount: FieldRef<"CreditTransaction", 'Int'>
    readonly balanceAfter: FieldRef<"CreditTransaction", 'Int'>
    readonly description: FieldRef<"CreditTransaction", 'String'>
    readonly reference: FieldRef<"CreditTransaction", 'String'>
    readonly idempotencyKey: FieldRef<"CreditTransaction", 'String'>
    readonly metadata: FieldRef<"CreditTransaction", 'Json'>
    readonly createdAt: FieldRef<"CreditTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditTransaction findUnique
   */
  export type CreditTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction findUniqueOrThrow
   */
  export type CreditTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction findFirst
   */
  export type CreditTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditTransactions.
     */
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction findFirstOrThrow
   */
  export type CreditTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditTransactions.
     */
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction findMany
   */
  export type CreditTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransactions to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction create
   */
  export type CreditTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditTransaction.
     */
    data: XOR<CreditTransactionCreateInput, CreditTransactionUncheckedCreateInput>
  }

  /**
   * CreditTransaction createMany
   */
  export type CreditTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditTransactions.
     */
    data: CreditTransactionCreateManyInput | CreditTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditTransaction createManyAndReturn
   */
  export type CreditTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many CreditTransactions.
     */
    data: CreditTransactionCreateManyInput | CreditTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditTransaction update
   */
  export type CreditTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditTransaction.
     */
    data: XOR<CreditTransactionUpdateInput, CreditTransactionUncheckedUpdateInput>
    /**
     * Choose, which CreditTransaction to update.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction updateMany
   */
  export type CreditTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditTransactions.
     */
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyInput>
    /**
     * Filter which CreditTransactions to update
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to update.
     */
    limit?: number
  }

  /**
   * CreditTransaction updateManyAndReturn
   */
  export type CreditTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * The data used to update CreditTransactions.
     */
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyInput>
    /**
     * Filter which CreditTransactions to update
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditTransaction upsert
   */
  export type CreditTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditTransaction to update in case it exists.
     */
    where: CreditTransactionWhereUniqueInput
    /**
     * In case the CreditTransaction found by the `where` argument doesn't exist, create a new CreditTransaction with this data.
     */
    create: XOR<CreditTransactionCreateInput, CreditTransactionUncheckedCreateInput>
    /**
     * In case the CreditTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditTransactionUpdateInput, CreditTransactionUncheckedUpdateInput>
  }

  /**
   * CreditTransaction delete
   */
  export type CreditTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter which CreditTransaction to delete.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction deleteMany
   */
  export type CreditTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditTransactions to delete
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to delete.
     */
    limit?: number
  }

  /**
   * CreditTransaction without action
   */
  export type CreditTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
  }


  /**
   * Model CreditPackage
   */

  export type AggregateCreditPackage = {
    _count: CreditPackageCountAggregateOutputType | null
    _avg: CreditPackageAvgAggregateOutputType | null
    _sum: CreditPackageSumAggregateOutputType | null
    _min: CreditPackageMinAggregateOutputType | null
    _max: CreditPackageMaxAggregateOutputType | null
  }

  export type CreditPackageAvgAggregateOutputType = {
    priceKobo: number | null
    credits: number | null
    bonusCredits: number | null
  }

  export type CreditPackageSumAggregateOutputType = {
    priceKobo: number | null
    credits: number | null
    bonusCredits: number | null
  }

  export type CreditPackageMinAggregateOutputType = {
    id: string | null
    name: string | null
    priceKobo: number | null
    credits: number | null
    bonusCredits: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreditPackageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    priceKobo: number | null
    credits: number | null
    bonusCredits: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreditPackageCountAggregateOutputType = {
    id: number
    name: number
    priceKobo: number
    credits: number
    bonusCredits: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CreditPackageAvgAggregateInputType = {
    priceKobo?: true
    credits?: true
    bonusCredits?: true
  }

  export type CreditPackageSumAggregateInputType = {
    priceKobo?: true
    credits?: true
    bonusCredits?: true
  }

  export type CreditPackageMinAggregateInputType = {
    id?: true
    name?: true
    priceKobo?: true
    credits?: true
    bonusCredits?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreditPackageMaxAggregateInputType = {
    id?: true
    name?: true
    priceKobo?: true
    credits?: true
    bonusCredits?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreditPackageCountAggregateInputType = {
    id?: true
    name?: true
    priceKobo?: true
    credits?: true
    bonusCredits?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CreditPackageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditPackage to aggregate.
     */
    where?: CreditPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditPackages to fetch.
     */
    orderBy?: CreditPackageOrderByWithRelationInput | CreditPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditPackages
    **/
    _count?: true | CreditPackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditPackageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditPackageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditPackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditPackageMaxAggregateInputType
  }

  export type GetCreditPackageAggregateType<T extends CreditPackageAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditPackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditPackage[P]>
      : GetScalarType<T[P], AggregateCreditPackage[P]>
  }




  export type CreditPackageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditPackageWhereInput
    orderBy?: CreditPackageOrderByWithAggregationInput | CreditPackageOrderByWithAggregationInput[]
    by: CreditPackageScalarFieldEnum[] | CreditPackageScalarFieldEnum
    having?: CreditPackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditPackageCountAggregateInputType | true
    _avg?: CreditPackageAvgAggregateInputType
    _sum?: CreditPackageSumAggregateInputType
    _min?: CreditPackageMinAggregateInputType
    _max?: CreditPackageMaxAggregateInputType
  }

  export type CreditPackageGroupByOutputType = {
    id: string
    name: string
    priceKobo: number
    credits: number
    bonusCredits: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CreditPackageCountAggregateOutputType | null
    _avg: CreditPackageAvgAggregateOutputType | null
    _sum: CreditPackageSumAggregateOutputType | null
    _min: CreditPackageMinAggregateOutputType | null
    _max: CreditPackageMaxAggregateOutputType | null
  }

  type GetCreditPackageGroupByPayload<T extends CreditPackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditPackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditPackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditPackageGroupByOutputType[P]>
            : GetScalarType<T[P], CreditPackageGroupByOutputType[P]>
        }
      >
    >


  export type CreditPackageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    priceKobo?: boolean
    credits?: boolean
    bonusCredits?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    purchases?: boolean | CreditPackage$purchasesArgs<ExtArgs>
    _count?: boolean | CreditPackageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditPackage"]>

  export type CreditPackageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    priceKobo?: boolean
    credits?: boolean
    bonusCredits?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["creditPackage"]>

  export type CreditPackageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    priceKobo?: boolean
    credits?: boolean
    bonusCredits?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["creditPackage"]>

  export type CreditPackageSelectScalar = {
    id?: boolean
    name?: boolean
    priceKobo?: boolean
    credits?: boolean
    bonusCredits?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CreditPackageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "priceKobo" | "credits" | "bonusCredits" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["creditPackage"]>
  export type CreditPackageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchases?: boolean | CreditPackage$purchasesArgs<ExtArgs>
    _count?: boolean | CreditPackageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CreditPackageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CreditPackageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CreditPackagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditPackage"
    objects: {
      purchases: Prisma.$CreditPurchasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      priceKobo: number
      credits: number
      bonusCredits: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["creditPackage"]>
    composites: {}
  }

  type CreditPackageGetPayload<S extends boolean | null | undefined | CreditPackageDefaultArgs> = $Result.GetResult<Prisma.$CreditPackagePayload, S>

  type CreditPackageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreditPackageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditPackageCountAggregateInputType | true
    }

  export interface CreditPackageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditPackage'], meta: { name: 'CreditPackage' } }
    /**
     * Find zero or one CreditPackage that matches the filter.
     * @param {CreditPackageFindUniqueArgs} args - Arguments to find a CreditPackage
     * @example
     * // Get one CreditPackage
     * const creditPackage = await prisma.creditPackage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditPackageFindUniqueArgs>(args: SelectSubset<T, CreditPackageFindUniqueArgs<ExtArgs>>): Prisma__CreditPackageClient<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreditPackage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreditPackageFindUniqueOrThrowArgs} args - Arguments to find a CreditPackage
     * @example
     * // Get one CreditPackage
     * const creditPackage = await prisma.creditPackage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditPackageFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditPackageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditPackageClient<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditPackage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPackageFindFirstArgs} args - Arguments to find a CreditPackage
     * @example
     * // Get one CreditPackage
     * const creditPackage = await prisma.creditPackage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditPackageFindFirstArgs>(args?: SelectSubset<T, CreditPackageFindFirstArgs<ExtArgs>>): Prisma__CreditPackageClient<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditPackage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPackageFindFirstOrThrowArgs} args - Arguments to find a CreditPackage
     * @example
     * // Get one CreditPackage
     * const creditPackage = await prisma.creditPackage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditPackageFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditPackageFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditPackageClient<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreditPackages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPackageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditPackages
     * const creditPackages = await prisma.creditPackage.findMany()
     * 
     * // Get first 10 CreditPackages
     * const creditPackages = await prisma.creditPackage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditPackageWithIdOnly = await prisma.creditPackage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditPackageFindManyArgs>(args?: SelectSubset<T, CreditPackageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreditPackage.
     * @param {CreditPackageCreateArgs} args - Arguments to create a CreditPackage.
     * @example
     * // Create one CreditPackage
     * const CreditPackage = await prisma.creditPackage.create({
     *   data: {
     *     // ... data to create a CreditPackage
     *   }
     * })
     * 
     */
    create<T extends CreditPackageCreateArgs>(args: SelectSubset<T, CreditPackageCreateArgs<ExtArgs>>): Prisma__CreditPackageClient<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreditPackages.
     * @param {CreditPackageCreateManyArgs} args - Arguments to create many CreditPackages.
     * @example
     * // Create many CreditPackages
     * const creditPackage = await prisma.creditPackage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditPackageCreateManyArgs>(args?: SelectSubset<T, CreditPackageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditPackages and returns the data saved in the database.
     * @param {CreditPackageCreateManyAndReturnArgs} args - Arguments to create many CreditPackages.
     * @example
     * // Create many CreditPackages
     * const creditPackage = await prisma.creditPackage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditPackages and only return the `id`
     * const creditPackageWithIdOnly = await prisma.creditPackage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditPackageCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditPackageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreditPackage.
     * @param {CreditPackageDeleteArgs} args - Arguments to delete one CreditPackage.
     * @example
     * // Delete one CreditPackage
     * const CreditPackage = await prisma.creditPackage.delete({
     *   where: {
     *     // ... filter to delete one CreditPackage
     *   }
     * })
     * 
     */
    delete<T extends CreditPackageDeleteArgs>(args: SelectSubset<T, CreditPackageDeleteArgs<ExtArgs>>): Prisma__CreditPackageClient<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreditPackage.
     * @param {CreditPackageUpdateArgs} args - Arguments to update one CreditPackage.
     * @example
     * // Update one CreditPackage
     * const creditPackage = await prisma.creditPackage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditPackageUpdateArgs>(args: SelectSubset<T, CreditPackageUpdateArgs<ExtArgs>>): Prisma__CreditPackageClient<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreditPackages.
     * @param {CreditPackageDeleteManyArgs} args - Arguments to filter CreditPackages to delete.
     * @example
     * // Delete a few CreditPackages
     * const { count } = await prisma.creditPackage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditPackageDeleteManyArgs>(args?: SelectSubset<T, CreditPackageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditPackages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditPackages
     * const creditPackage = await prisma.creditPackage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditPackageUpdateManyArgs>(args: SelectSubset<T, CreditPackageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditPackages and returns the data updated in the database.
     * @param {CreditPackageUpdateManyAndReturnArgs} args - Arguments to update many CreditPackages.
     * @example
     * // Update many CreditPackages
     * const creditPackage = await prisma.creditPackage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreditPackages and only return the `id`
     * const creditPackageWithIdOnly = await prisma.creditPackage.updateManyAndReturn({
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
    updateManyAndReturn<T extends CreditPackageUpdateManyAndReturnArgs>(args: SelectSubset<T, CreditPackageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreditPackage.
     * @param {CreditPackageUpsertArgs} args - Arguments to update or create a CreditPackage.
     * @example
     * // Update or create a CreditPackage
     * const creditPackage = await prisma.creditPackage.upsert({
     *   create: {
     *     // ... data to create a CreditPackage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditPackage we want to update
     *   }
     * })
     */
    upsert<T extends CreditPackageUpsertArgs>(args: SelectSubset<T, CreditPackageUpsertArgs<ExtArgs>>): Prisma__CreditPackageClient<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreditPackages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPackageCountArgs} args - Arguments to filter CreditPackages to count.
     * @example
     * // Count the number of CreditPackages
     * const count = await prisma.creditPackage.count({
     *   where: {
     *     // ... the filter for the CreditPackages we want to count
     *   }
     * })
    **/
    count<T extends CreditPackageCountArgs>(
      args?: Subset<T, CreditPackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditPackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditPackage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CreditPackageAggregateArgs>(args: Subset<T, CreditPackageAggregateArgs>): Prisma.PrismaPromise<GetCreditPackageAggregateType<T>>

    /**
     * Group by CreditPackage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPackageGroupByArgs} args - Group by arguments.
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
      T extends CreditPackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditPackageGroupByArgs['orderBy'] }
        : { orderBy?: CreditPackageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CreditPackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditPackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditPackage model
   */
  readonly fields: CreditPackageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditPackage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditPackageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    purchases<T extends CreditPackage$purchasesArgs<ExtArgs> = {}>(args?: Subset<T, CreditPackage$purchasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CreditPackage model
   */
  interface CreditPackageFieldRefs {
    readonly id: FieldRef<"CreditPackage", 'String'>
    readonly name: FieldRef<"CreditPackage", 'String'>
    readonly priceKobo: FieldRef<"CreditPackage", 'Int'>
    readonly credits: FieldRef<"CreditPackage", 'Int'>
    readonly bonusCredits: FieldRef<"CreditPackage", 'Int'>
    readonly isActive: FieldRef<"CreditPackage", 'Boolean'>
    readonly createdAt: FieldRef<"CreditPackage", 'DateTime'>
    readonly updatedAt: FieldRef<"CreditPackage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditPackage findUnique
   */
  export type CreditPackageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPackageInclude<ExtArgs> | null
    /**
     * Filter, which CreditPackage to fetch.
     */
    where: CreditPackageWhereUniqueInput
  }

  /**
   * CreditPackage findUniqueOrThrow
   */
  export type CreditPackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPackageInclude<ExtArgs> | null
    /**
     * Filter, which CreditPackage to fetch.
     */
    where: CreditPackageWhereUniqueInput
  }

  /**
   * CreditPackage findFirst
   */
  export type CreditPackageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPackageInclude<ExtArgs> | null
    /**
     * Filter, which CreditPackage to fetch.
     */
    where?: CreditPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditPackages to fetch.
     */
    orderBy?: CreditPackageOrderByWithRelationInput | CreditPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditPackages.
     */
    cursor?: CreditPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditPackages.
     */
    distinct?: CreditPackageScalarFieldEnum | CreditPackageScalarFieldEnum[]
  }

  /**
   * CreditPackage findFirstOrThrow
   */
  export type CreditPackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPackageInclude<ExtArgs> | null
    /**
     * Filter, which CreditPackage to fetch.
     */
    where?: CreditPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditPackages to fetch.
     */
    orderBy?: CreditPackageOrderByWithRelationInput | CreditPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditPackages.
     */
    cursor?: CreditPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditPackages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditPackages.
     */
    distinct?: CreditPackageScalarFieldEnum | CreditPackageScalarFieldEnum[]
  }

  /**
   * CreditPackage findMany
   */
  export type CreditPackageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPackageInclude<ExtArgs> | null
    /**
     * Filter, which CreditPackages to fetch.
     */
    where?: CreditPackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditPackages to fetch.
     */
    orderBy?: CreditPackageOrderByWithRelationInput | CreditPackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditPackages.
     */
    cursor?: CreditPackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditPackages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditPackages.
     */
    skip?: number
    distinct?: CreditPackageScalarFieldEnum | CreditPackageScalarFieldEnum[]
  }

  /**
   * CreditPackage create
   */
  export type CreditPackageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPackageInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditPackage.
     */
    data: XOR<CreditPackageCreateInput, CreditPackageUncheckedCreateInput>
  }

  /**
   * CreditPackage createMany
   */
  export type CreditPackageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditPackages.
     */
    data: CreditPackageCreateManyInput | CreditPackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditPackage createManyAndReturn
   */
  export type CreditPackageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * The data used to create many CreditPackages.
     */
    data: CreditPackageCreateManyInput | CreditPackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditPackage update
   */
  export type CreditPackageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPackageInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditPackage.
     */
    data: XOR<CreditPackageUpdateInput, CreditPackageUncheckedUpdateInput>
    /**
     * Choose, which CreditPackage to update.
     */
    where: CreditPackageWhereUniqueInput
  }

  /**
   * CreditPackage updateMany
   */
  export type CreditPackageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditPackages.
     */
    data: XOR<CreditPackageUpdateManyMutationInput, CreditPackageUncheckedUpdateManyInput>
    /**
     * Filter which CreditPackages to update
     */
    where?: CreditPackageWhereInput
    /**
     * Limit how many CreditPackages to update.
     */
    limit?: number
  }

  /**
   * CreditPackage updateManyAndReturn
   */
  export type CreditPackageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * The data used to update CreditPackages.
     */
    data: XOR<CreditPackageUpdateManyMutationInput, CreditPackageUncheckedUpdateManyInput>
    /**
     * Filter which CreditPackages to update
     */
    where?: CreditPackageWhereInput
    /**
     * Limit how many CreditPackages to update.
     */
    limit?: number
  }

  /**
   * CreditPackage upsert
   */
  export type CreditPackageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPackageInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditPackage to update in case it exists.
     */
    where: CreditPackageWhereUniqueInput
    /**
     * In case the CreditPackage found by the `where` argument doesn't exist, create a new CreditPackage with this data.
     */
    create: XOR<CreditPackageCreateInput, CreditPackageUncheckedCreateInput>
    /**
     * In case the CreditPackage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditPackageUpdateInput, CreditPackageUncheckedUpdateInput>
  }

  /**
   * CreditPackage delete
   */
  export type CreditPackageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPackageInclude<ExtArgs> | null
    /**
     * Filter which CreditPackage to delete.
     */
    where: CreditPackageWhereUniqueInput
  }

  /**
   * CreditPackage deleteMany
   */
  export type CreditPackageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditPackages to delete
     */
    where?: CreditPackageWhereInput
    /**
     * Limit how many CreditPackages to delete.
     */
    limit?: number
  }

  /**
   * CreditPackage.purchases
   */
  export type CreditPackage$purchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    where?: CreditPurchaseWhereInput
    orderBy?: CreditPurchaseOrderByWithRelationInput | CreditPurchaseOrderByWithRelationInput[]
    cursor?: CreditPurchaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditPurchaseScalarFieldEnum | CreditPurchaseScalarFieldEnum[]
  }

  /**
   * CreditPackage without action
   */
  export type CreditPackageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPackage
     */
    select?: CreditPackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPackage
     */
    omit?: CreditPackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPackageInclude<ExtArgs> | null
  }


  /**
   * Model CreditPurchase
   */

  export type AggregateCreditPurchase = {
    _count: CreditPurchaseCountAggregateOutputType | null
    _avg: CreditPurchaseAvgAggregateOutputType | null
    _sum: CreditPurchaseSumAggregateOutputType | null
    _min: CreditPurchaseMinAggregateOutputType | null
    _max: CreditPurchaseMaxAggregateOutputType | null
  }

  export type CreditPurchaseAvgAggregateOutputType = {
    amountKobo: number | null
    credits: number | null
    bonusCredits: number | null
  }

  export type CreditPurchaseSumAggregateOutputType = {
    amountKobo: number | null
    credits: number | null
    bonusCredits: number | null
  }

  export type CreditPurchaseMinAggregateOutputType = {
    id: string | null
    walletId: string | null
    packageId: string | null
    amountKobo: number | null
    credits: number | null
    bonusCredits: number | null
    paymentReference: string | null
    checkoutSessionId: string | null
    checkoutUrl: string | null
    status: $Enums.CreditPurchaseStatus | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreditPurchaseMaxAggregateOutputType = {
    id: string | null
    walletId: string | null
    packageId: string | null
    amountKobo: number | null
    credits: number | null
    bonusCredits: number | null
    paymentReference: string | null
    checkoutSessionId: string | null
    checkoutUrl: string | null
    status: $Enums.CreditPurchaseStatus | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CreditPurchaseCountAggregateOutputType = {
    id: number
    walletId: number
    packageId: number
    amountKobo: number
    credits: number
    bonusCredits: number
    paymentReference: number
    checkoutSessionId: number
    checkoutUrl: number
    status: number
    paidAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CreditPurchaseAvgAggregateInputType = {
    amountKobo?: true
    credits?: true
    bonusCredits?: true
  }

  export type CreditPurchaseSumAggregateInputType = {
    amountKobo?: true
    credits?: true
    bonusCredits?: true
  }

  export type CreditPurchaseMinAggregateInputType = {
    id?: true
    walletId?: true
    packageId?: true
    amountKobo?: true
    credits?: true
    bonusCredits?: true
    paymentReference?: true
    checkoutSessionId?: true
    checkoutUrl?: true
    status?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreditPurchaseMaxAggregateInputType = {
    id?: true
    walletId?: true
    packageId?: true
    amountKobo?: true
    credits?: true
    bonusCredits?: true
    paymentReference?: true
    checkoutSessionId?: true
    checkoutUrl?: true
    status?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CreditPurchaseCountAggregateInputType = {
    id?: true
    walletId?: true
    packageId?: true
    amountKobo?: true
    credits?: true
    bonusCredits?: true
    paymentReference?: true
    checkoutSessionId?: true
    checkoutUrl?: true
    status?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CreditPurchaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditPurchase to aggregate.
     */
    where?: CreditPurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditPurchases to fetch.
     */
    orderBy?: CreditPurchaseOrderByWithRelationInput | CreditPurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditPurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditPurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditPurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditPurchases
    **/
    _count?: true | CreditPurchaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditPurchaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditPurchaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditPurchaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditPurchaseMaxAggregateInputType
  }

  export type GetCreditPurchaseAggregateType<T extends CreditPurchaseAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditPurchase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditPurchase[P]>
      : GetScalarType<T[P], AggregateCreditPurchase[P]>
  }




  export type CreditPurchaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditPurchaseWhereInput
    orderBy?: CreditPurchaseOrderByWithAggregationInput | CreditPurchaseOrderByWithAggregationInput[]
    by: CreditPurchaseScalarFieldEnum[] | CreditPurchaseScalarFieldEnum
    having?: CreditPurchaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditPurchaseCountAggregateInputType | true
    _avg?: CreditPurchaseAvgAggregateInputType
    _sum?: CreditPurchaseSumAggregateInputType
    _min?: CreditPurchaseMinAggregateInputType
    _max?: CreditPurchaseMaxAggregateInputType
  }

  export type CreditPurchaseGroupByOutputType = {
    id: string
    walletId: string
    packageId: string
    amountKobo: number
    credits: number
    bonusCredits: number
    paymentReference: string
    checkoutSessionId: string | null
    checkoutUrl: string | null
    status: $Enums.CreditPurchaseStatus
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CreditPurchaseCountAggregateOutputType | null
    _avg: CreditPurchaseAvgAggregateOutputType | null
    _sum: CreditPurchaseSumAggregateOutputType | null
    _min: CreditPurchaseMinAggregateOutputType | null
    _max: CreditPurchaseMaxAggregateOutputType | null
  }

  type GetCreditPurchaseGroupByPayload<T extends CreditPurchaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditPurchaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditPurchaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditPurchaseGroupByOutputType[P]>
            : GetScalarType<T[P], CreditPurchaseGroupByOutputType[P]>
        }
      >
    >


  export type CreditPurchaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    packageId?: boolean
    amountKobo?: boolean
    credits?: boolean
    bonusCredits?: boolean
    paymentReference?: boolean
    checkoutSessionId?: boolean
    checkoutUrl?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    package?: boolean | CreditPackageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditPurchase"]>

  export type CreditPurchaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    packageId?: boolean
    amountKobo?: boolean
    credits?: boolean
    bonusCredits?: boolean
    paymentReference?: boolean
    checkoutSessionId?: boolean
    checkoutUrl?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    package?: boolean | CreditPackageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditPurchase"]>

  export type CreditPurchaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    packageId?: boolean
    amountKobo?: boolean
    credits?: boolean
    bonusCredits?: boolean
    paymentReference?: boolean
    checkoutSessionId?: boolean
    checkoutUrl?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    package?: boolean | CreditPackageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditPurchase"]>

  export type CreditPurchaseSelectScalar = {
    id?: boolean
    walletId?: boolean
    packageId?: boolean
    amountKobo?: boolean
    credits?: boolean
    bonusCredits?: boolean
    paymentReference?: boolean
    checkoutSessionId?: boolean
    checkoutUrl?: boolean
    status?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CreditPurchaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletId" | "packageId" | "amountKobo" | "credits" | "bonusCredits" | "paymentReference" | "checkoutSessionId" | "checkoutUrl" | "status" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["creditPurchase"]>
  export type CreditPurchaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    package?: boolean | CreditPackageDefaultArgs<ExtArgs>
  }
  export type CreditPurchaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    package?: boolean | CreditPackageDefaultArgs<ExtArgs>
  }
  export type CreditPurchaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | CreditWalletDefaultArgs<ExtArgs>
    package?: boolean | CreditPackageDefaultArgs<ExtArgs>
  }

  export type $CreditPurchasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditPurchase"
    objects: {
      wallet: Prisma.$CreditWalletPayload<ExtArgs>
      package: Prisma.$CreditPackagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletId: string
      packageId: string
      amountKobo: number
      credits: number
      bonusCredits: number
      paymentReference: string
      checkoutSessionId: string | null
      checkoutUrl: string | null
      status: $Enums.CreditPurchaseStatus
      paidAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["creditPurchase"]>
    composites: {}
  }

  type CreditPurchaseGetPayload<S extends boolean | null | undefined | CreditPurchaseDefaultArgs> = $Result.GetResult<Prisma.$CreditPurchasePayload, S>

  type CreditPurchaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreditPurchaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditPurchaseCountAggregateInputType | true
    }

  export interface CreditPurchaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditPurchase'], meta: { name: 'CreditPurchase' } }
    /**
     * Find zero or one CreditPurchase that matches the filter.
     * @param {CreditPurchaseFindUniqueArgs} args - Arguments to find a CreditPurchase
     * @example
     * // Get one CreditPurchase
     * const creditPurchase = await prisma.creditPurchase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditPurchaseFindUniqueArgs>(args: SelectSubset<T, CreditPurchaseFindUniqueArgs<ExtArgs>>): Prisma__CreditPurchaseClient<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreditPurchase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreditPurchaseFindUniqueOrThrowArgs} args - Arguments to find a CreditPurchase
     * @example
     * // Get one CreditPurchase
     * const creditPurchase = await prisma.creditPurchase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditPurchaseFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditPurchaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditPurchaseClient<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditPurchase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPurchaseFindFirstArgs} args - Arguments to find a CreditPurchase
     * @example
     * // Get one CreditPurchase
     * const creditPurchase = await prisma.creditPurchase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditPurchaseFindFirstArgs>(args?: SelectSubset<T, CreditPurchaseFindFirstArgs<ExtArgs>>): Prisma__CreditPurchaseClient<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditPurchase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPurchaseFindFirstOrThrowArgs} args - Arguments to find a CreditPurchase
     * @example
     * // Get one CreditPurchase
     * const creditPurchase = await prisma.creditPurchase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditPurchaseFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditPurchaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditPurchaseClient<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreditPurchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPurchaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditPurchases
     * const creditPurchases = await prisma.creditPurchase.findMany()
     * 
     * // Get first 10 CreditPurchases
     * const creditPurchases = await prisma.creditPurchase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditPurchaseWithIdOnly = await prisma.creditPurchase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditPurchaseFindManyArgs>(args?: SelectSubset<T, CreditPurchaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreditPurchase.
     * @param {CreditPurchaseCreateArgs} args - Arguments to create a CreditPurchase.
     * @example
     * // Create one CreditPurchase
     * const CreditPurchase = await prisma.creditPurchase.create({
     *   data: {
     *     // ... data to create a CreditPurchase
     *   }
     * })
     * 
     */
    create<T extends CreditPurchaseCreateArgs>(args: SelectSubset<T, CreditPurchaseCreateArgs<ExtArgs>>): Prisma__CreditPurchaseClient<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreditPurchases.
     * @param {CreditPurchaseCreateManyArgs} args - Arguments to create many CreditPurchases.
     * @example
     * // Create many CreditPurchases
     * const creditPurchase = await prisma.creditPurchase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditPurchaseCreateManyArgs>(args?: SelectSubset<T, CreditPurchaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditPurchases and returns the data saved in the database.
     * @param {CreditPurchaseCreateManyAndReturnArgs} args - Arguments to create many CreditPurchases.
     * @example
     * // Create many CreditPurchases
     * const creditPurchase = await prisma.creditPurchase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditPurchases and only return the `id`
     * const creditPurchaseWithIdOnly = await prisma.creditPurchase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditPurchaseCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditPurchaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreditPurchase.
     * @param {CreditPurchaseDeleteArgs} args - Arguments to delete one CreditPurchase.
     * @example
     * // Delete one CreditPurchase
     * const CreditPurchase = await prisma.creditPurchase.delete({
     *   where: {
     *     // ... filter to delete one CreditPurchase
     *   }
     * })
     * 
     */
    delete<T extends CreditPurchaseDeleteArgs>(args: SelectSubset<T, CreditPurchaseDeleteArgs<ExtArgs>>): Prisma__CreditPurchaseClient<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreditPurchase.
     * @param {CreditPurchaseUpdateArgs} args - Arguments to update one CreditPurchase.
     * @example
     * // Update one CreditPurchase
     * const creditPurchase = await prisma.creditPurchase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditPurchaseUpdateArgs>(args: SelectSubset<T, CreditPurchaseUpdateArgs<ExtArgs>>): Prisma__CreditPurchaseClient<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreditPurchases.
     * @param {CreditPurchaseDeleteManyArgs} args - Arguments to filter CreditPurchases to delete.
     * @example
     * // Delete a few CreditPurchases
     * const { count } = await prisma.creditPurchase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditPurchaseDeleteManyArgs>(args?: SelectSubset<T, CreditPurchaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditPurchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPurchaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditPurchases
     * const creditPurchase = await prisma.creditPurchase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditPurchaseUpdateManyArgs>(args: SelectSubset<T, CreditPurchaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditPurchases and returns the data updated in the database.
     * @param {CreditPurchaseUpdateManyAndReturnArgs} args - Arguments to update many CreditPurchases.
     * @example
     * // Update many CreditPurchases
     * const creditPurchase = await prisma.creditPurchase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreditPurchases and only return the `id`
     * const creditPurchaseWithIdOnly = await prisma.creditPurchase.updateManyAndReturn({
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
    updateManyAndReturn<T extends CreditPurchaseUpdateManyAndReturnArgs>(args: SelectSubset<T, CreditPurchaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreditPurchase.
     * @param {CreditPurchaseUpsertArgs} args - Arguments to update or create a CreditPurchase.
     * @example
     * // Update or create a CreditPurchase
     * const creditPurchase = await prisma.creditPurchase.upsert({
     *   create: {
     *     // ... data to create a CreditPurchase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditPurchase we want to update
     *   }
     * })
     */
    upsert<T extends CreditPurchaseUpsertArgs>(args: SelectSubset<T, CreditPurchaseUpsertArgs<ExtArgs>>): Prisma__CreditPurchaseClient<$Result.GetResult<Prisma.$CreditPurchasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreditPurchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPurchaseCountArgs} args - Arguments to filter CreditPurchases to count.
     * @example
     * // Count the number of CreditPurchases
     * const count = await prisma.creditPurchase.count({
     *   where: {
     *     // ... the filter for the CreditPurchases we want to count
     *   }
     * })
    **/
    count<T extends CreditPurchaseCountArgs>(
      args?: Subset<T, CreditPurchaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditPurchaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditPurchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPurchaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CreditPurchaseAggregateArgs>(args: Subset<T, CreditPurchaseAggregateArgs>): Prisma.PrismaPromise<GetCreditPurchaseAggregateType<T>>

    /**
     * Group by CreditPurchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditPurchaseGroupByArgs} args - Group by arguments.
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
      T extends CreditPurchaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditPurchaseGroupByArgs['orderBy'] }
        : { orderBy?: CreditPurchaseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CreditPurchaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditPurchaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditPurchase model
   */
  readonly fields: CreditPurchaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditPurchase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditPurchaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends CreditWalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CreditWalletDefaultArgs<ExtArgs>>): Prisma__CreditWalletClient<$Result.GetResult<Prisma.$CreditWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    package<T extends CreditPackageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CreditPackageDefaultArgs<ExtArgs>>): Prisma__CreditPackageClient<$Result.GetResult<Prisma.$CreditPackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CreditPurchase model
   */
  interface CreditPurchaseFieldRefs {
    readonly id: FieldRef<"CreditPurchase", 'String'>
    readonly walletId: FieldRef<"CreditPurchase", 'String'>
    readonly packageId: FieldRef<"CreditPurchase", 'String'>
    readonly amountKobo: FieldRef<"CreditPurchase", 'Int'>
    readonly credits: FieldRef<"CreditPurchase", 'Int'>
    readonly bonusCredits: FieldRef<"CreditPurchase", 'Int'>
    readonly paymentReference: FieldRef<"CreditPurchase", 'String'>
    readonly checkoutSessionId: FieldRef<"CreditPurchase", 'String'>
    readonly checkoutUrl: FieldRef<"CreditPurchase", 'String'>
    readonly status: FieldRef<"CreditPurchase", 'CreditPurchaseStatus'>
    readonly paidAt: FieldRef<"CreditPurchase", 'DateTime'>
    readonly createdAt: FieldRef<"CreditPurchase", 'DateTime'>
    readonly updatedAt: FieldRef<"CreditPurchase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditPurchase findUnique
   */
  export type CreditPurchaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    /**
     * Filter, which CreditPurchase to fetch.
     */
    where: CreditPurchaseWhereUniqueInput
  }

  /**
   * CreditPurchase findUniqueOrThrow
   */
  export type CreditPurchaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    /**
     * Filter, which CreditPurchase to fetch.
     */
    where: CreditPurchaseWhereUniqueInput
  }

  /**
   * CreditPurchase findFirst
   */
  export type CreditPurchaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    /**
     * Filter, which CreditPurchase to fetch.
     */
    where?: CreditPurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditPurchases to fetch.
     */
    orderBy?: CreditPurchaseOrderByWithRelationInput | CreditPurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditPurchases.
     */
    cursor?: CreditPurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditPurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditPurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditPurchases.
     */
    distinct?: CreditPurchaseScalarFieldEnum | CreditPurchaseScalarFieldEnum[]
  }

  /**
   * CreditPurchase findFirstOrThrow
   */
  export type CreditPurchaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    /**
     * Filter, which CreditPurchase to fetch.
     */
    where?: CreditPurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditPurchases to fetch.
     */
    orderBy?: CreditPurchaseOrderByWithRelationInput | CreditPurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditPurchases.
     */
    cursor?: CreditPurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditPurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditPurchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditPurchases.
     */
    distinct?: CreditPurchaseScalarFieldEnum | CreditPurchaseScalarFieldEnum[]
  }

  /**
   * CreditPurchase findMany
   */
  export type CreditPurchaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    /**
     * Filter, which CreditPurchases to fetch.
     */
    where?: CreditPurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditPurchases to fetch.
     */
    orderBy?: CreditPurchaseOrderByWithRelationInput | CreditPurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditPurchases.
     */
    cursor?: CreditPurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditPurchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditPurchases.
     */
    skip?: number
    distinct?: CreditPurchaseScalarFieldEnum | CreditPurchaseScalarFieldEnum[]
  }

  /**
   * CreditPurchase create
   */
  export type CreditPurchaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditPurchase.
     */
    data: XOR<CreditPurchaseCreateInput, CreditPurchaseUncheckedCreateInput>
  }

  /**
   * CreditPurchase createMany
   */
  export type CreditPurchaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditPurchases.
     */
    data: CreditPurchaseCreateManyInput | CreditPurchaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditPurchase createManyAndReturn
   */
  export type CreditPurchaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * The data used to create many CreditPurchases.
     */
    data: CreditPurchaseCreateManyInput | CreditPurchaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditPurchase update
   */
  export type CreditPurchaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditPurchase.
     */
    data: XOR<CreditPurchaseUpdateInput, CreditPurchaseUncheckedUpdateInput>
    /**
     * Choose, which CreditPurchase to update.
     */
    where: CreditPurchaseWhereUniqueInput
  }

  /**
   * CreditPurchase updateMany
   */
  export type CreditPurchaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditPurchases.
     */
    data: XOR<CreditPurchaseUpdateManyMutationInput, CreditPurchaseUncheckedUpdateManyInput>
    /**
     * Filter which CreditPurchases to update
     */
    where?: CreditPurchaseWhereInput
    /**
     * Limit how many CreditPurchases to update.
     */
    limit?: number
  }

  /**
   * CreditPurchase updateManyAndReturn
   */
  export type CreditPurchaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * The data used to update CreditPurchases.
     */
    data: XOR<CreditPurchaseUpdateManyMutationInput, CreditPurchaseUncheckedUpdateManyInput>
    /**
     * Filter which CreditPurchases to update
     */
    where?: CreditPurchaseWhereInput
    /**
     * Limit how many CreditPurchases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditPurchase upsert
   */
  export type CreditPurchaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditPurchase to update in case it exists.
     */
    where: CreditPurchaseWhereUniqueInput
    /**
     * In case the CreditPurchase found by the `where` argument doesn't exist, create a new CreditPurchase with this data.
     */
    create: XOR<CreditPurchaseCreateInput, CreditPurchaseUncheckedCreateInput>
    /**
     * In case the CreditPurchase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditPurchaseUpdateInput, CreditPurchaseUncheckedUpdateInput>
  }

  /**
   * CreditPurchase delete
   */
  export type CreditPurchaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
    /**
     * Filter which CreditPurchase to delete.
     */
    where: CreditPurchaseWhereUniqueInput
  }

  /**
   * CreditPurchase deleteMany
   */
  export type CreditPurchaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditPurchases to delete
     */
    where?: CreditPurchaseWhereInput
    /**
     * Limit how many CreditPurchases to delete.
     */
    limit?: number
  }

  /**
   * CreditPurchase without action
   */
  export type CreditPurchaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditPurchase
     */
    select?: CreditPurchaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditPurchase
     */
    omit?: CreditPurchaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditPurchaseInclude<ExtArgs> | null
  }


  /**
   * Model Automation
   */

  export type AggregateAutomation = {
    _count: AutomationCountAggregateOutputType | null
    _avg: AutomationAvgAggregateOutputType | null
    _sum: AutomationSumAggregateOutputType | null
    _min: AutomationMinAggregateOutputType | null
    _max: AutomationMaxAggregateOutputType | null
  }

  export type AutomationAvgAggregateOutputType = {
    totalRuns: number | null
  }

  export type AutomationSumAggregateOutputType = {
    totalRuns: number | null
  }

  export type AutomationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    trigger: string | null
    triggerValue: string | null
    action: string | null
    actionTemplate: string | null
    enabled: boolean | null
    totalRuns: number | null
    lastTriggered: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AutomationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    trigger: string | null
    triggerValue: string | null
    action: string | null
    actionTemplate: string | null
    enabled: boolean | null
    totalRuns: number | null
    lastTriggered: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AutomationCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    trigger: number
    triggerValue: number
    action: number
    actionTemplate: number
    enabled: number
    totalRuns: number
    lastTriggered: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AutomationAvgAggregateInputType = {
    totalRuns?: true
  }

  export type AutomationSumAggregateInputType = {
    totalRuns?: true
  }

  export type AutomationMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    trigger?: true
    triggerValue?: true
    action?: true
    actionTemplate?: true
    enabled?: true
    totalRuns?: true
    lastTriggered?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AutomationMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    trigger?: true
    triggerValue?: true
    action?: true
    actionTemplate?: true
    enabled?: true
    totalRuns?: true
    lastTriggered?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AutomationCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    trigger?: true
    triggerValue?: true
    action?: true
    actionTemplate?: true
    enabled?: true
    totalRuns?: true
    lastTriggered?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AutomationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Automation to aggregate.
     */
    where?: AutomationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Automations to fetch.
     */
    orderBy?: AutomationOrderByWithRelationInput | AutomationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AutomationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Automations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Automations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Automations
    **/
    _count?: true | AutomationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AutomationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AutomationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AutomationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AutomationMaxAggregateInputType
  }

  export type GetAutomationAggregateType<T extends AutomationAggregateArgs> = {
        [P in keyof T & keyof AggregateAutomation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAutomation[P]>
      : GetScalarType<T[P], AggregateAutomation[P]>
  }




  export type AutomationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AutomationWhereInput
    orderBy?: AutomationOrderByWithAggregationInput | AutomationOrderByWithAggregationInput[]
    by: AutomationScalarFieldEnum[] | AutomationScalarFieldEnum
    having?: AutomationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AutomationCountAggregateInputType | true
    _avg?: AutomationAvgAggregateInputType
    _sum?: AutomationSumAggregateInputType
    _min?: AutomationMinAggregateInputType
    _max?: AutomationMaxAggregateInputType
  }

  export type AutomationGroupByOutputType = {
    id: string
    userId: string
    name: string
    trigger: string
    triggerValue: string | null
    action: string
    actionTemplate: string
    enabled: boolean
    totalRuns: number
    lastTriggered: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AutomationCountAggregateOutputType | null
    _avg: AutomationAvgAggregateOutputType | null
    _sum: AutomationSumAggregateOutputType | null
    _min: AutomationMinAggregateOutputType | null
    _max: AutomationMaxAggregateOutputType | null
  }

  type GetAutomationGroupByPayload<T extends AutomationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AutomationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AutomationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AutomationGroupByOutputType[P]>
            : GetScalarType<T[P], AutomationGroupByOutputType[P]>
        }
      >
    >


  export type AutomationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    trigger?: boolean
    triggerValue?: boolean
    action?: boolean
    actionTemplate?: boolean
    enabled?: boolean
    totalRuns?: boolean
    lastTriggered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["automation"]>

  export type AutomationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    trigger?: boolean
    triggerValue?: boolean
    action?: boolean
    actionTemplate?: boolean
    enabled?: boolean
    totalRuns?: boolean
    lastTriggered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["automation"]>

  export type AutomationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    trigger?: boolean
    triggerValue?: boolean
    action?: boolean
    actionTemplate?: boolean
    enabled?: boolean
    totalRuns?: boolean
    lastTriggered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["automation"]>

  export type AutomationSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    trigger?: boolean
    triggerValue?: boolean
    action?: boolean
    actionTemplate?: boolean
    enabled?: boolean
    totalRuns?: boolean
    lastTriggered?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AutomationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "trigger" | "triggerValue" | "action" | "actionTemplate" | "enabled" | "totalRuns" | "lastTriggered" | "createdAt" | "updatedAt", ExtArgs["result"]["automation"]>
  export type AutomationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AutomationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AutomationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AutomationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Automation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      trigger: string
      triggerValue: string | null
      action: string
      actionTemplate: string
      enabled: boolean
      totalRuns: number
      lastTriggered: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["automation"]>
    composites: {}
  }

  type AutomationGetPayload<S extends boolean | null | undefined | AutomationDefaultArgs> = $Result.GetResult<Prisma.$AutomationPayload, S>

  type AutomationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AutomationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AutomationCountAggregateInputType | true
    }

  export interface AutomationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Automation'], meta: { name: 'Automation' } }
    /**
     * Find zero or one Automation that matches the filter.
     * @param {AutomationFindUniqueArgs} args - Arguments to find a Automation
     * @example
     * // Get one Automation
     * const automation = await prisma.automation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AutomationFindUniqueArgs>(args: SelectSubset<T, AutomationFindUniqueArgs<ExtArgs>>): Prisma__AutomationClient<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Automation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AutomationFindUniqueOrThrowArgs} args - Arguments to find a Automation
     * @example
     * // Get one Automation
     * const automation = await prisma.automation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AutomationFindUniqueOrThrowArgs>(args: SelectSubset<T, AutomationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AutomationClient<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Automation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationFindFirstArgs} args - Arguments to find a Automation
     * @example
     * // Get one Automation
     * const automation = await prisma.automation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AutomationFindFirstArgs>(args?: SelectSubset<T, AutomationFindFirstArgs<ExtArgs>>): Prisma__AutomationClient<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Automation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationFindFirstOrThrowArgs} args - Arguments to find a Automation
     * @example
     * // Get one Automation
     * const automation = await prisma.automation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AutomationFindFirstOrThrowArgs>(args?: SelectSubset<T, AutomationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AutomationClient<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Automations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Automations
     * const automations = await prisma.automation.findMany()
     * 
     * // Get first 10 Automations
     * const automations = await prisma.automation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const automationWithIdOnly = await prisma.automation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AutomationFindManyArgs>(args?: SelectSubset<T, AutomationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Automation.
     * @param {AutomationCreateArgs} args - Arguments to create a Automation.
     * @example
     * // Create one Automation
     * const Automation = await prisma.automation.create({
     *   data: {
     *     // ... data to create a Automation
     *   }
     * })
     * 
     */
    create<T extends AutomationCreateArgs>(args: SelectSubset<T, AutomationCreateArgs<ExtArgs>>): Prisma__AutomationClient<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Automations.
     * @param {AutomationCreateManyArgs} args - Arguments to create many Automations.
     * @example
     * // Create many Automations
     * const automation = await prisma.automation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AutomationCreateManyArgs>(args?: SelectSubset<T, AutomationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Automations and returns the data saved in the database.
     * @param {AutomationCreateManyAndReturnArgs} args - Arguments to create many Automations.
     * @example
     * // Create many Automations
     * const automation = await prisma.automation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Automations and only return the `id`
     * const automationWithIdOnly = await prisma.automation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AutomationCreateManyAndReturnArgs>(args?: SelectSubset<T, AutomationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Automation.
     * @param {AutomationDeleteArgs} args - Arguments to delete one Automation.
     * @example
     * // Delete one Automation
     * const Automation = await prisma.automation.delete({
     *   where: {
     *     // ... filter to delete one Automation
     *   }
     * })
     * 
     */
    delete<T extends AutomationDeleteArgs>(args: SelectSubset<T, AutomationDeleteArgs<ExtArgs>>): Prisma__AutomationClient<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Automation.
     * @param {AutomationUpdateArgs} args - Arguments to update one Automation.
     * @example
     * // Update one Automation
     * const automation = await prisma.automation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AutomationUpdateArgs>(args: SelectSubset<T, AutomationUpdateArgs<ExtArgs>>): Prisma__AutomationClient<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Automations.
     * @param {AutomationDeleteManyArgs} args - Arguments to filter Automations to delete.
     * @example
     * // Delete a few Automations
     * const { count } = await prisma.automation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AutomationDeleteManyArgs>(args?: SelectSubset<T, AutomationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Automations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Automations
     * const automation = await prisma.automation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AutomationUpdateManyArgs>(args: SelectSubset<T, AutomationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Automations and returns the data updated in the database.
     * @param {AutomationUpdateManyAndReturnArgs} args - Arguments to update many Automations.
     * @example
     * // Update many Automations
     * const automation = await prisma.automation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Automations and only return the `id`
     * const automationWithIdOnly = await prisma.automation.updateManyAndReturn({
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
    updateManyAndReturn<T extends AutomationUpdateManyAndReturnArgs>(args: SelectSubset<T, AutomationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Automation.
     * @param {AutomationUpsertArgs} args - Arguments to update or create a Automation.
     * @example
     * // Update or create a Automation
     * const automation = await prisma.automation.upsert({
     *   create: {
     *     // ... data to create a Automation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Automation we want to update
     *   }
     * })
     */
    upsert<T extends AutomationUpsertArgs>(args: SelectSubset<T, AutomationUpsertArgs<ExtArgs>>): Prisma__AutomationClient<$Result.GetResult<Prisma.$AutomationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Automations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationCountArgs} args - Arguments to filter Automations to count.
     * @example
     * // Count the number of Automations
     * const count = await prisma.automation.count({
     *   where: {
     *     // ... the filter for the Automations we want to count
     *   }
     * })
    **/
    count<T extends AutomationCountArgs>(
      args?: Subset<T, AutomationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AutomationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Automation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AutomationAggregateArgs>(args: Subset<T, AutomationAggregateArgs>): Prisma.PrismaPromise<GetAutomationAggregateType<T>>

    /**
     * Group by Automation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationGroupByArgs} args - Group by arguments.
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
      T extends AutomationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AutomationGroupByArgs['orderBy'] }
        : { orderBy?: AutomationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AutomationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAutomationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Automation model
   */
  readonly fields: AutomationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Automation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AutomationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Automation model
   */
  interface AutomationFieldRefs {
    readonly id: FieldRef<"Automation", 'String'>
    readonly userId: FieldRef<"Automation", 'String'>
    readonly name: FieldRef<"Automation", 'String'>
    readonly trigger: FieldRef<"Automation", 'String'>
    readonly triggerValue: FieldRef<"Automation", 'String'>
    readonly action: FieldRef<"Automation", 'String'>
    readonly actionTemplate: FieldRef<"Automation", 'String'>
    readonly enabled: FieldRef<"Automation", 'Boolean'>
    readonly totalRuns: FieldRef<"Automation", 'Int'>
    readonly lastTriggered: FieldRef<"Automation", 'DateTime'>
    readonly createdAt: FieldRef<"Automation", 'DateTime'>
    readonly updatedAt: FieldRef<"Automation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Automation findUnique
   */
  export type AutomationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
    /**
     * Filter, which Automation to fetch.
     */
    where: AutomationWhereUniqueInput
  }

  /**
   * Automation findUniqueOrThrow
   */
  export type AutomationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
    /**
     * Filter, which Automation to fetch.
     */
    where: AutomationWhereUniqueInput
  }

  /**
   * Automation findFirst
   */
  export type AutomationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
    /**
     * Filter, which Automation to fetch.
     */
    where?: AutomationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Automations to fetch.
     */
    orderBy?: AutomationOrderByWithRelationInput | AutomationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Automations.
     */
    cursor?: AutomationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Automations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Automations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Automations.
     */
    distinct?: AutomationScalarFieldEnum | AutomationScalarFieldEnum[]
  }

  /**
   * Automation findFirstOrThrow
   */
  export type AutomationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
    /**
     * Filter, which Automation to fetch.
     */
    where?: AutomationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Automations to fetch.
     */
    orderBy?: AutomationOrderByWithRelationInput | AutomationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Automations.
     */
    cursor?: AutomationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Automations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Automations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Automations.
     */
    distinct?: AutomationScalarFieldEnum | AutomationScalarFieldEnum[]
  }

  /**
   * Automation findMany
   */
  export type AutomationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
    /**
     * Filter, which Automations to fetch.
     */
    where?: AutomationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Automations to fetch.
     */
    orderBy?: AutomationOrderByWithRelationInput | AutomationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Automations.
     */
    cursor?: AutomationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Automations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Automations.
     */
    skip?: number
    distinct?: AutomationScalarFieldEnum | AutomationScalarFieldEnum[]
  }

  /**
   * Automation create
   */
  export type AutomationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
    /**
     * The data needed to create a Automation.
     */
    data: XOR<AutomationCreateInput, AutomationUncheckedCreateInput>
  }

  /**
   * Automation createMany
   */
  export type AutomationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Automations.
     */
    data: AutomationCreateManyInput | AutomationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Automation createManyAndReturn
   */
  export type AutomationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * The data used to create many Automations.
     */
    data: AutomationCreateManyInput | AutomationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Automation update
   */
  export type AutomationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
    /**
     * The data needed to update a Automation.
     */
    data: XOR<AutomationUpdateInput, AutomationUncheckedUpdateInput>
    /**
     * Choose, which Automation to update.
     */
    where: AutomationWhereUniqueInput
  }

  /**
   * Automation updateMany
   */
  export type AutomationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Automations.
     */
    data: XOR<AutomationUpdateManyMutationInput, AutomationUncheckedUpdateManyInput>
    /**
     * Filter which Automations to update
     */
    where?: AutomationWhereInput
    /**
     * Limit how many Automations to update.
     */
    limit?: number
  }

  /**
   * Automation updateManyAndReturn
   */
  export type AutomationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * The data used to update Automations.
     */
    data: XOR<AutomationUpdateManyMutationInput, AutomationUncheckedUpdateManyInput>
    /**
     * Filter which Automations to update
     */
    where?: AutomationWhereInput
    /**
     * Limit how many Automations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Automation upsert
   */
  export type AutomationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
    /**
     * The filter to search for the Automation to update in case it exists.
     */
    where: AutomationWhereUniqueInput
    /**
     * In case the Automation found by the `where` argument doesn't exist, create a new Automation with this data.
     */
    create: XOR<AutomationCreateInput, AutomationUncheckedCreateInput>
    /**
     * In case the Automation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AutomationUpdateInput, AutomationUncheckedUpdateInput>
  }

  /**
   * Automation delete
   */
  export type AutomationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
    /**
     * Filter which Automation to delete.
     */
    where: AutomationWhereUniqueInput
  }

  /**
   * Automation deleteMany
   */
  export type AutomationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Automations to delete
     */
    where?: AutomationWhereInput
    /**
     * Limit how many Automations to delete.
     */
    limit?: number
  }

  /**
   * Automation without action
   */
  export type AutomationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Automation
     */
    select?: AutomationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Automation
     */
    omit?: AutomationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    recipientPhone: string | null
    templateName: string | null
    templateLanguage: string | null
    templateMessage: string | null
    whatsappMessageId: string | null
    deliveryTrackingId: string | null
    sendAt: string | null
    ReadAt: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    recipientPhone: string | null
    templateName: string | null
    templateLanguage: string | null
    templateMessage: string | null
    whatsappMessageId: string | null
    deliveryTrackingId: string | null
    sendAt: string | null
    ReadAt: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    recipientPhone: number
    templateName: number
    templateLanguage: number
    templateMessage: number
    whatsappMessageId: number
    deliveryTrackingId: number
    sendAt: number
    ReadAt: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    recipientPhone?: true
    templateName?: true
    templateLanguage?: true
    templateMessage?: true
    whatsappMessageId?: true
    deliveryTrackingId?: true
    sendAt?: true
    ReadAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    recipientPhone?: true
    templateName?: true
    templateLanguage?: true
    templateMessage?: true
    whatsappMessageId?: true
    deliveryTrackingId?: true
    sendAt?: true
    ReadAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    recipientPhone?: true
    templateName?: true
    templateLanguage?: true
    templateMessage?: true
    whatsappMessageId?: true
    deliveryTrackingId?: true
    sendAt?: true
    ReadAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    recipientPhone: string
    templateName: string
    templateLanguage: string
    templateMessage: string | null
    whatsappMessageId: string | null
    deliveryTrackingId: string | null
    sendAt: string | null
    ReadAt: string | null
    status: string | null
    createdAt: Date
    updatedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    recipientPhone?: boolean
    templateName?: boolean
    templateLanguage?: boolean
    templateMessage?: boolean
    whatsappMessageId?: boolean
    deliveryTrackingId?: boolean
    sendAt?: boolean
    ReadAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    recipientPhone?: boolean
    templateName?: boolean
    templateLanguage?: boolean
    templateMessage?: boolean
    whatsappMessageId?: boolean
    deliveryTrackingId?: boolean
    sendAt?: boolean
    ReadAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    recipientPhone?: boolean
    templateName?: boolean
    templateLanguage?: boolean
    templateMessage?: boolean
    whatsappMessageId?: boolean
    deliveryTrackingId?: boolean
    sendAt?: boolean
    ReadAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    recipientPhone?: boolean
    templateName?: boolean
    templateLanguage?: boolean
    templateMessage?: boolean
    whatsappMessageId?: boolean
    deliveryTrackingId?: boolean
    sendAt?: boolean
    ReadAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "recipientPhone" | "templateName" | "templateLanguage" | "templateMessage" | "whatsappMessageId" | "deliveryTrackingId" | "sendAt" | "ReadAt" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["notification"]>

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      recipientPhone: string
      templateName: string
      templateLanguage: string
      templateMessage: string | null
      whatsappMessageId: string | null
      deliveryTrackingId: string | null
      sendAt: string | null
      ReadAt: string | null
      status: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly recipientPhone: FieldRef<"Notification", 'String'>
    readonly templateName: FieldRef<"Notification", 'String'>
    readonly templateLanguage: FieldRef<"Notification", 'String'>
    readonly templateMessage: FieldRef<"Notification", 'String'>
    readonly whatsappMessageId: FieldRef<"Notification", 'String'>
    readonly deliveryTrackingId: FieldRef<"Notification", 'String'>
    readonly sendAt: FieldRef<"Notification", 'String'>
    readonly ReadAt: FieldRef<"Notification", 'String'>
    readonly status: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly updatedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
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
    password: 'password',
    emailConfirmed: 'emailConfirmed',
    emailConfirmToken: 'emailConfirmToken',
    businessName: 'businessName',
    fullName: 'fullName',
    metaUserId: 'metaUserId',
    appId: 'appId',
    appSecret: 'appSecret',
    facebookAcceessToken: 'facebookAcceessToken',
    grantedScopes: 'grantedScopes',
    accessTokenExpiresIn: 'accessTokenExpiresIn',
    selectedWabaId: 'selectedWabaId',
    displayPhoneNumber: 'displayPhoneNumber',
    selectedFacebookBusinessId: 'selectedFacebookBusinessId',
    selectedFacebookBusinessName: 'selectedFacebookBusinessName',
    selectedPhoneNumberQualityRating: 'selectedPhoneNumberQualityRating',
    selectedPhoneNumberVerifiedName: 'selectedPhoneNumberVerifiedName',
    webhookStatus: 'webhookStatus',
    selectedPhoneNumberId: 'selectedPhoneNumberId',
    facebookConnectStatus: 'facebookConnectStatus',
    createdAt: 'createdAt',
    hashedRefresh: 'hashedRefresh'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    facebookAccessToken: 'facebookAccessToken',
    facebookLongLivedAccessToken: 'facebookLongLivedAccessToken',
    expiresIn: 'expiresIn',
    dataAccessExpirationTime: 'dataAccessExpirationTime',
    createdAt: 'createdAt'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const DeliveryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    trackingId: 'trackingId',
    senderName: 'senderName',
    senderPhone: 'senderPhone',
    senderAddress: 'senderAddress',
    senderLatitude: 'senderLatitude',
    senderLongitude: 'senderLongitude',
    receiverName: 'receiverName',
    receiverPhone: 'receiverPhone',
    receiverAddress: 'receiverAddress',
    receiverLatitude: 'receiverLatitude',
    receiverLongitude: 'receiverLongitude',
    packageName: 'packageName',
    packageCategory: 'packageCategory',
    packageWeight: 'packageWeight',
    packageDimensions: 'packageDimensions',
    packageValue: 'packageValue',
    pickupDate: 'pickupDate',
    courier_name: 'courier_name',
    courier_email: 'courier_email',
    courier_phone: 'courier_phone',
    shipbubbleOrderId: 'shipbubbleOrderId',
    tracking_url: 'tracking_url',
    package_amount: 'package_amount',
    package_weight: 'package_weight',
    shipping_fee: 'shipping_fee',
    shipping_payment_type: 'shipping_payment_type',
    shipping_payment_status: 'shipping_payment_status',
    package_status: 'package_status',
    checkoutSessionId: 'checkoutSessionId',
    checkoutUrl: 'checkoutUrl',
    paymentAmount: 'paymentAmount',
    paymentCurrency: 'paymentCurrency',
    paymentStatus: 'paymentStatus',
    bookingStatus: 'bookingStatus',
    bookingDetails: 'bookingDetails',
    deliveryInsurer: 'deliveryInsurer',
    deliveryCurrency: 'deliveryCurrency',
    insuranceAmount: 'insuranceAmount',
    insurance_policy_condition: 'insurance_policy_condition',
    insure_percentage: 'insure_percentage',
    insurance_cost: 'insurance_cost',
    insuranceCode: 'insuranceCode',
    insurerName: 'insurerName',
    bookingError: 'bookingError',
    deliveryStatus: 'deliveryStatus',
    deliveryType: 'deliveryType',
    deliveryInstructions: 'deliveryInstructions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeliveryScalarFieldEnum = (typeof DeliveryScalarFieldEnum)[keyof typeof DeliveryScalarFieldEnum]


  export const MessageTemplateScalarFieldEnum: {
    id: 'id',
    metaTemplateId: 'metaTemplateId',
    userId: 'userId',
    name: 'name',
    language: 'language',
    status: 'status',
    category: 'category',
    previousCategory: 'previousCategory',
    parameterFormat: 'parameterFormat',
    components: 'components',
    disableIosAutofill: 'disableIosAutofill',
    isPrimaryDeviceDeliveryOnly: 'isPrimaryDeviceDeliveryOnly',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MessageTemplateScalarFieldEnum = (typeof MessageTemplateScalarFieldEnum)[keyof typeof MessageTemplateScalarFieldEnum]


  export const CreditWalletScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    balance: 'balance',
    points: 'points',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CreditWalletScalarFieldEnum = (typeof CreditWalletScalarFieldEnum)[keyof typeof CreditWalletScalarFieldEnum]


  export const CreditTransactionScalarFieldEnum: {
    id: 'id',
    walletId: 'walletId',
    type: 'type',
    amount: 'amount',
    balanceAfter: 'balanceAfter',
    description: 'description',
    reference: 'reference',
    idempotencyKey: 'idempotencyKey',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type CreditTransactionScalarFieldEnum = (typeof CreditTransactionScalarFieldEnum)[keyof typeof CreditTransactionScalarFieldEnum]


  export const CreditPackageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    priceKobo: 'priceKobo',
    credits: 'credits',
    bonusCredits: 'bonusCredits',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CreditPackageScalarFieldEnum = (typeof CreditPackageScalarFieldEnum)[keyof typeof CreditPackageScalarFieldEnum]


  export const CreditPurchaseScalarFieldEnum: {
    id: 'id',
    walletId: 'walletId',
    packageId: 'packageId',
    amountKobo: 'amountKobo',
    credits: 'credits',
    bonusCredits: 'bonusCredits',
    paymentReference: 'paymentReference',
    checkoutSessionId: 'checkoutSessionId',
    checkoutUrl: 'checkoutUrl',
    status: 'status',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CreditPurchaseScalarFieldEnum = (typeof CreditPurchaseScalarFieldEnum)[keyof typeof CreditPurchaseScalarFieldEnum]


  export const AutomationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    trigger: 'trigger',
    triggerValue: 'triggerValue',
    action: 'action',
    actionTemplate: 'actionTemplate',
    enabled: 'enabled',
    totalRuns: 'totalRuns',
    lastTriggered: 'lastTriggered',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AutomationScalarFieldEnum = (typeof AutomationScalarFieldEnum)[keyof typeof AutomationScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    recipientPhone: 'recipientPhone',
    templateName: 'templateName',
    templateLanguage: 'templateLanguage',
    templateMessage: 'templateMessage',
    whatsappMessageId: 'whatsappMessageId',
    deliveryTrackingId: 'deliveryTrackingId',
    sendAt: 'sendAt',
    ReadAt: 'ReadAt',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'CreditTransactionType'
   */
  export type EnumCreditTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreditTransactionType'>
    


  /**
   * Reference to a field of type 'CreditTransactionType[]'
   */
  export type ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreditTransactionType[]'>
    


  /**
   * Reference to a field of type 'CreditPurchaseStatus'
   */
  export type EnumCreditPurchaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreditPurchaseStatus'>
    


  /**
   * Reference to a field of type 'CreditPurchaseStatus[]'
   */
  export type ListEnumCreditPurchaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreditPurchaseStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    emailConfirmed?: BoolFilter<"User"> | boolean
    emailConfirmToken?: StringNullableFilter<"User"> | string | null
    businessName?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    metaUserId?: StringNullableFilter<"User"> | string | null
    appId?: StringNullableFilter<"User"> | string | null
    appSecret?: StringNullableFilter<"User"> | string | null
    facebookAcceessToken?: StringNullableFilter<"User"> | string | null
    grantedScopes?: StringNullableFilter<"User"> | string | null
    accessTokenExpiresIn?: StringNullableFilter<"User"> | string | null
    selectedWabaId?: StringNullableFilter<"User"> | string | null
    displayPhoneNumber?: StringNullableFilter<"User"> | string | null
    selectedFacebookBusinessId?: StringNullableFilter<"User"> | string | null
    selectedFacebookBusinessName?: StringNullableFilter<"User"> | string | null
    selectedPhoneNumberQualityRating?: StringNullableFilter<"User"> | string | null
    selectedPhoneNumberVerifiedName?: StringNullableFilter<"User"> | string | null
    webhookStatus?: BoolFilter<"User"> | boolean
    selectedPhoneNumberId?: StringNullableListFilter<"User">
    facebookConnectStatus?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    hashedRefresh?: StringNullableFilter<"User"> | string | null
    messageTemplates?: MessageTemplateListRelationFilter
    automations?: AutomationListRelationFilter
    creditWallet?: XOR<CreditWalletNullableScalarRelationFilter, CreditWalletWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailConfirmed?: SortOrder
    emailConfirmToken?: SortOrderInput | SortOrder
    businessName?: SortOrder
    fullName?: SortOrder
    metaUserId?: SortOrderInput | SortOrder
    appId?: SortOrderInput | SortOrder
    appSecret?: SortOrderInput | SortOrder
    facebookAcceessToken?: SortOrderInput | SortOrder
    grantedScopes?: SortOrderInput | SortOrder
    accessTokenExpiresIn?: SortOrderInput | SortOrder
    selectedWabaId?: SortOrderInput | SortOrder
    displayPhoneNumber?: SortOrderInput | SortOrder
    selectedFacebookBusinessId?: SortOrderInput | SortOrder
    selectedFacebookBusinessName?: SortOrderInput | SortOrder
    selectedPhoneNumberQualityRating?: SortOrderInput | SortOrder
    selectedPhoneNumberVerifiedName?: SortOrderInput | SortOrder
    webhookStatus?: SortOrder
    selectedPhoneNumberId?: SortOrder
    facebookConnectStatus?: SortOrder
    createdAt?: SortOrder
    hashedRefresh?: SortOrderInput | SortOrder
    messageTemplates?: MessageTemplateOrderByRelationAggregateInput
    automations?: AutomationOrderByRelationAggregateInput
    creditWallet?: CreditWalletOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    emailConfirmed?: BoolFilter<"User"> | boolean
    emailConfirmToken?: StringNullableFilter<"User"> | string | null
    businessName?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    metaUserId?: StringNullableFilter<"User"> | string | null
    appId?: StringNullableFilter<"User"> | string | null
    appSecret?: StringNullableFilter<"User"> | string | null
    facebookAcceessToken?: StringNullableFilter<"User"> | string | null
    grantedScopes?: StringNullableFilter<"User"> | string | null
    accessTokenExpiresIn?: StringNullableFilter<"User"> | string | null
    selectedWabaId?: StringNullableFilter<"User"> | string | null
    displayPhoneNumber?: StringNullableFilter<"User"> | string | null
    selectedFacebookBusinessId?: StringNullableFilter<"User"> | string | null
    selectedFacebookBusinessName?: StringNullableFilter<"User"> | string | null
    selectedPhoneNumberQualityRating?: StringNullableFilter<"User"> | string | null
    selectedPhoneNumberVerifiedName?: StringNullableFilter<"User"> | string | null
    webhookStatus?: BoolFilter<"User"> | boolean
    selectedPhoneNumberId?: StringNullableListFilter<"User">
    facebookConnectStatus?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    hashedRefresh?: StringNullableFilter<"User"> | string | null
    messageTemplates?: MessageTemplateListRelationFilter
    automations?: AutomationListRelationFilter
    creditWallet?: XOR<CreditWalletNullableScalarRelationFilter, CreditWalletWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailConfirmed?: SortOrder
    emailConfirmToken?: SortOrderInput | SortOrder
    businessName?: SortOrder
    fullName?: SortOrder
    metaUserId?: SortOrderInput | SortOrder
    appId?: SortOrderInput | SortOrder
    appSecret?: SortOrderInput | SortOrder
    facebookAcceessToken?: SortOrderInput | SortOrder
    grantedScopes?: SortOrderInput | SortOrder
    accessTokenExpiresIn?: SortOrderInput | SortOrder
    selectedWabaId?: SortOrderInput | SortOrder
    displayPhoneNumber?: SortOrderInput | SortOrder
    selectedFacebookBusinessId?: SortOrderInput | SortOrder
    selectedFacebookBusinessName?: SortOrderInput | SortOrder
    selectedPhoneNumberQualityRating?: SortOrderInput | SortOrder
    selectedPhoneNumberVerifiedName?: SortOrderInput | SortOrder
    webhookStatus?: SortOrder
    selectedPhoneNumberId?: SortOrder
    facebookConnectStatus?: SortOrder
    createdAt?: SortOrder
    hashedRefresh?: SortOrderInput | SortOrder
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
    password?: StringWithAggregatesFilter<"User"> | string
    emailConfirmed?: BoolWithAggregatesFilter<"User"> | boolean
    emailConfirmToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    businessName?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    metaUserId?: StringNullableWithAggregatesFilter<"User"> | string | null
    appId?: StringNullableWithAggregatesFilter<"User"> | string | null
    appSecret?: StringNullableWithAggregatesFilter<"User"> | string | null
    facebookAcceessToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    grantedScopes?: StringNullableWithAggregatesFilter<"User"> | string | null
    accessTokenExpiresIn?: StringNullableWithAggregatesFilter<"User"> | string | null
    selectedWabaId?: StringNullableWithAggregatesFilter<"User"> | string | null
    displayPhoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    selectedFacebookBusinessId?: StringNullableWithAggregatesFilter<"User"> | string | null
    selectedFacebookBusinessName?: StringNullableWithAggregatesFilter<"User"> | string | null
    selectedPhoneNumberQualityRating?: StringNullableWithAggregatesFilter<"User"> | string | null
    selectedPhoneNumberVerifiedName?: StringNullableWithAggregatesFilter<"User"> | string | null
    webhookStatus?: BoolWithAggregatesFilter<"User"> | boolean
    selectedPhoneNumberId?: StringNullableListFilter<"User">
    facebookConnectStatus?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    hashedRefresh?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    id?: StringFilter<"Token"> | string
    userId?: StringFilter<"Token"> | string
    facebookAccessToken?: StringNullableFilter<"Token"> | string | null
    facebookLongLivedAccessToken?: StringNullableFilter<"Token"> | string | null
    expiresIn?: StringNullableFilter<"Token"> | string | null
    dataAccessExpirationTime?: StringNullableFilter<"Token"> | string | null
    createdAt?: DateTimeFilter<"Token"> | Date | string
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    facebookAccessToken?: SortOrderInput | SortOrder
    facebookLongLivedAccessToken?: SortOrderInput | SortOrder
    expiresIn?: SortOrderInput | SortOrder
    dataAccessExpirationTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    facebookAccessToken?: StringNullableFilter<"Token"> | string | null
    facebookLongLivedAccessToken?: StringNullableFilter<"Token"> | string | null
    expiresIn?: StringNullableFilter<"Token"> | string | null
    dataAccessExpirationTime?: StringNullableFilter<"Token"> | string | null
    createdAt?: DateTimeFilter<"Token"> | Date | string
  }, "id" | "userId">

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    facebookAccessToken?: SortOrderInput | SortOrder
    facebookLongLivedAccessToken?: SortOrderInput | SortOrder
    expiresIn?: SortOrderInput | SortOrder
    dataAccessExpirationTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Token"> | string
    userId?: StringWithAggregatesFilter<"Token"> | string
    facebookAccessToken?: StringNullableWithAggregatesFilter<"Token"> | string | null
    facebookLongLivedAccessToken?: StringNullableWithAggregatesFilter<"Token"> | string | null
    expiresIn?: StringNullableWithAggregatesFilter<"Token"> | string | null
    dataAccessExpirationTime?: StringNullableWithAggregatesFilter<"Token"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
  }

  export type DeliveryWhereInput = {
    AND?: DeliveryWhereInput | DeliveryWhereInput[]
    OR?: DeliveryWhereInput[]
    NOT?: DeliveryWhereInput | DeliveryWhereInput[]
    id?: StringFilter<"Delivery"> | string
    userId?: StringNullableFilter<"Delivery"> | string | null
    trackingId?: StringFilter<"Delivery"> | string
    senderName?: StringFilter<"Delivery"> | string
    senderPhone?: StringFilter<"Delivery"> | string
    senderAddress?: StringFilter<"Delivery"> | string
    senderLatitude?: StringNullableFilter<"Delivery"> | string | null
    senderLongitude?: StringNullableFilter<"Delivery"> | string | null
    receiverName?: StringFilter<"Delivery"> | string
    receiverPhone?: StringFilter<"Delivery"> | string
    receiverAddress?: StringFilter<"Delivery"> | string
    receiverLatitude?: StringNullableFilter<"Delivery"> | string | null
    receiverLongitude?: StringNullableFilter<"Delivery"> | string | null
    packageName?: StringFilter<"Delivery"> | string
    packageCategory?: StringFilter<"Delivery"> | string
    packageWeight?: StringFilter<"Delivery"> | string
    packageDimensions?: StringFilter<"Delivery"> | string
    packageValue?: StringFilter<"Delivery"> | string
    pickupDate?: StringFilter<"Delivery"> | string
    courier_name?: StringNullableFilter<"Delivery"> | string | null
    courier_email?: StringNullableFilter<"Delivery"> | string | null
    courier_phone?: StringNullableFilter<"Delivery"> | string | null
    shipbubbleOrderId?: StringNullableFilter<"Delivery"> | string | null
    tracking_url?: StringNullableFilter<"Delivery"> | string | null
    package_amount?: StringNullableFilter<"Delivery"> | string | null
    package_weight?: StringNullableFilter<"Delivery"> | string | null
    shipping_fee?: StringNullableFilter<"Delivery"> | string | null
    shipping_payment_type?: StringNullableFilter<"Delivery"> | string | null
    shipping_payment_status?: StringNullableFilter<"Delivery"> | string | null
    package_status?: JsonNullableFilter<"Delivery">
    checkoutSessionId?: StringNullableFilter<"Delivery"> | string | null
    checkoutUrl?: StringNullableFilter<"Delivery"> | string | null
    paymentAmount?: StringNullableFilter<"Delivery"> | string | null
    paymentCurrency?: StringNullableFilter<"Delivery"> | string | null
    paymentStatus?: StringFilter<"Delivery"> | string
    bookingStatus?: StringFilter<"Delivery"> | string
    bookingDetails?: JsonNullableFilter<"Delivery">
    deliveryInsurer?: StringNullableFilter<"Delivery"> | string | null
    deliveryCurrency?: StringNullableFilter<"Delivery"> | string | null
    insuranceAmount?: FloatNullableFilter<"Delivery"> | number | null
    insurance_policy_condition?: StringNullableFilter<"Delivery"> | string | null
    insure_percentage?: FloatNullableFilter<"Delivery"> | number | null
    insurance_cost?: FloatNullableFilter<"Delivery"> | number | null
    insuranceCode?: StringNullableFilter<"Delivery"> | string | null
    insurerName?: StringNullableFilter<"Delivery"> | string | null
    bookingError?: StringNullableFilter<"Delivery"> | string | null
    deliveryStatus?: StringNullableFilter<"Delivery"> | string | null
    deliveryType?: StringFilter<"Delivery"> | string
    deliveryInstructions?: StringNullableFilter<"Delivery"> | string | null
    createdAt?: DateTimeFilter<"Delivery"> | Date | string
    updatedAt?: DateTimeFilter<"Delivery"> | Date | string
  }

  export type DeliveryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    trackingId?: SortOrder
    senderName?: SortOrder
    senderPhone?: SortOrder
    senderAddress?: SortOrder
    senderLatitude?: SortOrderInput | SortOrder
    senderLongitude?: SortOrderInput | SortOrder
    receiverName?: SortOrder
    receiverPhone?: SortOrder
    receiverAddress?: SortOrder
    receiverLatitude?: SortOrderInput | SortOrder
    receiverLongitude?: SortOrderInput | SortOrder
    packageName?: SortOrder
    packageCategory?: SortOrder
    packageWeight?: SortOrder
    packageDimensions?: SortOrder
    packageValue?: SortOrder
    pickupDate?: SortOrder
    courier_name?: SortOrderInput | SortOrder
    courier_email?: SortOrderInput | SortOrder
    courier_phone?: SortOrderInput | SortOrder
    shipbubbleOrderId?: SortOrderInput | SortOrder
    tracking_url?: SortOrderInput | SortOrder
    package_amount?: SortOrderInput | SortOrder
    package_weight?: SortOrderInput | SortOrder
    shipping_fee?: SortOrderInput | SortOrder
    shipping_payment_type?: SortOrderInput | SortOrder
    shipping_payment_status?: SortOrderInput | SortOrder
    package_status?: SortOrderInput | SortOrder
    checkoutSessionId?: SortOrderInput | SortOrder
    checkoutUrl?: SortOrderInput | SortOrder
    paymentAmount?: SortOrderInput | SortOrder
    paymentCurrency?: SortOrderInput | SortOrder
    paymentStatus?: SortOrder
    bookingStatus?: SortOrder
    bookingDetails?: SortOrderInput | SortOrder
    deliveryInsurer?: SortOrderInput | SortOrder
    deliveryCurrency?: SortOrderInput | SortOrder
    insuranceAmount?: SortOrderInput | SortOrder
    insurance_policy_condition?: SortOrderInput | SortOrder
    insure_percentage?: SortOrderInput | SortOrder
    insurance_cost?: SortOrderInput | SortOrder
    insuranceCode?: SortOrderInput | SortOrder
    insurerName?: SortOrderInput | SortOrder
    bookingError?: SortOrderInput | SortOrder
    deliveryStatus?: SortOrderInput | SortOrder
    deliveryType?: SortOrder
    deliveryInstructions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    checkoutSessionId?: string
    AND?: DeliveryWhereInput | DeliveryWhereInput[]
    OR?: DeliveryWhereInput[]
    NOT?: DeliveryWhereInput | DeliveryWhereInput[]
    userId?: StringNullableFilter<"Delivery"> | string | null
    trackingId?: StringFilter<"Delivery"> | string
    senderName?: StringFilter<"Delivery"> | string
    senderPhone?: StringFilter<"Delivery"> | string
    senderAddress?: StringFilter<"Delivery"> | string
    senderLatitude?: StringNullableFilter<"Delivery"> | string | null
    senderLongitude?: StringNullableFilter<"Delivery"> | string | null
    receiverName?: StringFilter<"Delivery"> | string
    receiverPhone?: StringFilter<"Delivery"> | string
    receiverAddress?: StringFilter<"Delivery"> | string
    receiverLatitude?: StringNullableFilter<"Delivery"> | string | null
    receiverLongitude?: StringNullableFilter<"Delivery"> | string | null
    packageName?: StringFilter<"Delivery"> | string
    packageCategory?: StringFilter<"Delivery"> | string
    packageWeight?: StringFilter<"Delivery"> | string
    packageDimensions?: StringFilter<"Delivery"> | string
    packageValue?: StringFilter<"Delivery"> | string
    pickupDate?: StringFilter<"Delivery"> | string
    courier_name?: StringNullableFilter<"Delivery"> | string | null
    courier_email?: StringNullableFilter<"Delivery"> | string | null
    courier_phone?: StringNullableFilter<"Delivery"> | string | null
    shipbubbleOrderId?: StringNullableFilter<"Delivery"> | string | null
    tracking_url?: StringNullableFilter<"Delivery"> | string | null
    package_amount?: StringNullableFilter<"Delivery"> | string | null
    package_weight?: StringNullableFilter<"Delivery"> | string | null
    shipping_fee?: StringNullableFilter<"Delivery"> | string | null
    shipping_payment_type?: StringNullableFilter<"Delivery"> | string | null
    shipping_payment_status?: StringNullableFilter<"Delivery"> | string | null
    package_status?: JsonNullableFilter<"Delivery">
    checkoutUrl?: StringNullableFilter<"Delivery"> | string | null
    paymentAmount?: StringNullableFilter<"Delivery"> | string | null
    paymentCurrency?: StringNullableFilter<"Delivery"> | string | null
    paymentStatus?: StringFilter<"Delivery"> | string
    bookingStatus?: StringFilter<"Delivery"> | string
    bookingDetails?: JsonNullableFilter<"Delivery">
    deliveryInsurer?: StringNullableFilter<"Delivery"> | string | null
    deliveryCurrency?: StringNullableFilter<"Delivery"> | string | null
    insuranceAmount?: FloatNullableFilter<"Delivery"> | number | null
    insurance_policy_condition?: StringNullableFilter<"Delivery"> | string | null
    insure_percentage?: FloatNullableFilter<"Delivery"> | number | null
    insurance_cost?: FloatNullableFilter<"Delivery"> | number | null
    insuranceCode?: StringNullableFilter<"Delivery"> | string | null
    insurerName?: StringNullableFilter<"Delivery"> | string | null
    bookingError?: StringNullableFilter<"Delivery"> | string | null
    deliveryStatus?: StringNullableFilter<"Delivery"> | string | null
    deliveryType?: StringFilter<"Delivery"> | string
    deliveryInstructions?: StringNullableFilter<"Delivery"> | string | null
    createdAt?: DateTimeFilter<"Delivery"> | Date | string
    updatedAt?: DateTimeFilter<"Delivery"> | Date | string
  }, "id" | "checkoutSessionId">

  export type DeliveryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    trackingId?: SortOrder
    senderName?: SortOrder
    senderPhone?: SortOrder
    senderAddress?: SortOrder
    senderLatitude?: SortOrderInput | SortOrder
    senderLongitude?: SortOrderInput | SortOrder
    receiverName?: SortOrder
    receiverPhone?: SortOrder
    receiverAddress?: SortOrder
    receiverLatitude?: SortOrderInput | SortOrder
    receiverLongitude?: SortOrderInput | SortOrder
    packageName?: SortOrder
    packageCategory?: SortOrder
    packageWeight?: SortOrder
    packageDimensions?: SortOrder
    packageValue?: SortOrder
    pickupDate?: SortOrder
    courier_name?: SortOrderInput | SortOrder
    courier_email?: SortOrderInput | SortOrder
    courier_phone?: SortOrderInput | SortOrder
    shipbubbleOrderId?: SortOrderInput | SortOrder
    tracking_url?: SortOrderInput | SortOrder
    package_amount?: SortOrderInput | SortOrder
    package_weight?: SortOrderInput | SortOrder
    shipping_fee?: SortOrderInput | SortOrder
    shipping_payment_type?: SortOrderInput | SortOrder
    shipping_payment_status?: SortOrderInput | SortOrder
    package_status?: SortOrderInput | SortOrder
    checkoutSessionId?: SortOrderInput | SortOrder
    checkoutUrl?: SortOrderInput | SortOrder
    paymentAmount?: SortOrderInput | SortOrder
    paymentCurrency?: SortOrderInput | SortOrder
    paymentStatus?: SortOrder
    bookingStatus?: SortOrder
    bookingDetails?: SortOrderInput | SortOrder
    deliveryInsurer?: SortOrderInput | SortOrder
    deliveryCurrency?: SortOrderInput | SortOrder
    insuranceAmount?: SortOrderInput | SortOrder
    insurance_policy_condition?: SortOrderInput | SortOrder
    insure_percentage?: SortOrderInput | SortOrder
    insurance_cost?: SortOrderInput | SortOrder
    insuranceCode?: SortOrderInput | SortOrder
    insurerName?: SortOrderInput | SortOrder
    bookingError?: SortOrderInput | SortOrder
    deliveryStatus?: SortOrderInput | SortOrder
    deliveryType?: SortOrder
    deliveryInstructions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeliveryCountOrderByAggregateInput
    _avg?: DeliveryAvgOrderByAggregateInput
    _max?: DeliveryMaxOrderByAggregateInput
    _min?: DeliveryMinOrderByAggregateInput
    _sum?: DeliverySumOrderByAggregateInput
  }

  export type DeliveryScalarWhereWithAggregatesInput = {
    AND?: DeliveryScalarWhereWithAggregatesInput | DeliveryScalarWhereWithAggregatesInput[]
    OR?: DeliveryScalarWhereWithAggregatesInput[]
    NOT?: DeliveryScalarWhereWithAggregatesInput | DeliveryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Delivery"> | string
    userId?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    trackingId?: StringWithAggregatesFilter<"Delivery"> | string
    senderName?: StringWithAggregatesFilter<"Delivery"> | string
    senderPhone?: StringWithAggregatesFilter<"Delivery"> | string
    senderAddress?: StringWithAggregatesFilter<"Delivery"> | string
    senderLatitude?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    senderLongitude?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    receiverName?: StringWithAggregatesFilter<"Delivery"> | string
    receiverPhone?: StringWithAggregatesFilter<"Delivery"> | string
    receiverAddress?: StringWithAggregatesFilter<"Delivery"> | string
    receiverLatitude?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    receiverLongitude?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    packageName?: StringWithAggregatesFilter<"Delivery"> | string
    packageCategory?: StringWithAggregatesFilter<"Delivery"> | string
    packageWeight?: StringWithAggregatesFilter<"Delivery"> | string
    packageDimensions?: StringWithAggregatesFilter<"Delivery"> | string
    packageValue?: StringWithAggregatesFilter<"Delivery"> | string
    pickupDate?: StringWithAggregatesFilter<"Delivery"> | string
    courier_name?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    courier_email?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    courier_phone?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    shipbubbleOrderId?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    tracking_url?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    package_amount?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    package_weight?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    shipping_fee?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    shipping_payment_type?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    shipping_payment_status?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    package_status?: JsonNullableWithAggregatesFilter<"Delivery">
    checkoutSessionId?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    checkoutUrl?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    paymentAmount?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    paymentCurrency?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    paymentStatus?: StringWithAggregatesFilter<"Delivery"> | string
    bookingStatus?: StringWithAggregatesFilter<"Delivery"> | string
    bookingDetails?: JsonNullableWithAggregatesFilter<"Delivery">
    deliveryInsurer?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    deliveryCurrency?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    insuranceAmount?: FloatNullableWithAggregatesFilter<"Delivery"> | number | null
    insurance_policy_condition?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    insure_percentage?: FloatNullableWithAggregatesFilter<"Delivery"> | number | null
    insurance_cost?: FloatNullableWithAggregatesFilter<"Delivery"> | number | null
    insuranceCode?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    insurerName?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    bookingError?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    deliveryStatus?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    deliveryType?: StringWithAggregatesFilter<"Delivery"> | string
    deliveryInstructions?: StringNullableWithAggregatesFilter<"Delivery"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Delivery"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Delivery"> | Date | string
  }

  export type MessageTemplateWhereInput = {
    AND?: MessageTemplateWhereInput | MessageTemplateWhereInput[]
    OR?: MessageTemplateWhereInput[]
    NOT?: MessageTemplateWhereInput | MessageTemplateWhereInput[]
    id?: StringFilter<"MessageTemplate"> | string
    metaTemplateId?: StringFilter<"MessageTemplate"> | string
    userId?: StringFilter<"MessageTemplate"> | string
    name?: StringFilter<"MessageTemplate"> | string
    language?: StringFilter<"MessageTemplate"> | string
    status?: StringFilter<"MessageTemplate"> | string
    category?: StringFilter<"MessageTemplate"> | string
    previousCategory?: StringNullableFilter<"MessageTemplate"> | string | null
    parameterFormat?: StringNullableFilter<"MessageTemplate"> | string | null
    components?: JsonFilter<"MessageTemplate">
    disableIosAutofill?: BoolFilter<"MessageTemplate"> | boolean
    isPrimaryDeviceDeliveryOnly?: BoolFilter<"MessageTemplate"> | boolean
    createdAt?: DateTimeFilter<"MessageTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"MessageTemplate"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageTemplateOrderByWithRelationInput = {
    id?: SortOrder
    metaTemplateId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    language?: SortOrder
    status?: SortOrder
    category?: SortOrder
    previousCategory?: SortOrderInput | SortOrder
    parameterFormat?: SortOrderInput | SortOrder
    components?: SortOrder
    disableIosAutofill?: SortOrder
    isPrimaryDeviceDeliveryOnly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MessageTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_metaTemplateId?: MessageTemplateUserIdMetaTemplateIdCompoundUniqueInput
    AND?: MessageTemplateWhereInput | MessageTemplateWhereInput[]
    OR?: MessageTemplateWhereInput[]
    NOT?: MessageTemplateWhereInput | MessageTemplateWhereInput[]
    metaTemplateId?: StringFilter<"MessageTemplate"> | string
    userId?: StringFilter<"MessageTemplate"> | string
    name?: StringFilter<"MessageTemplate"> | string
    language?: StringFilter<"MessageTemplate"> | string
    status?: StringFilter<"MessageTemplate"> | string
    category?: StringFilter<"MessageTemplate"> | string
    previousCategory?: StringNullableFilter<"MessageTemplate"> | string | null
    parameterFormat?: StringNullableFilter<"MessageTemplate"> | string | null
    components?: JsonFilter<"MessageTemplate">
    disableIosAutofill?: BoolFilter<"MessageTemplate"> | boolean
    isPrimaryDeviceDeliveryOnly?: BoolFilter<"MessageTemplate"> | boolean
    createdAt?: DateTimeFilter<"MessageTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"MessageTemplate"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_metaTemplateId">

  export type MessageTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    metaTemplateId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    language?: SortOrder
    status?: SortOrder
    category?: SortOrder
    previousCategory?: SortOrderInput | SortOrder
    parameterFormat?: SortOrderInput | SortOrder
    components?: SortOrder
    disableIosAutofill?: SortOrder
    isPrimaryDeviceDeliveryOnly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageTemplateCountOrderByAggregateInput
    _max?: MessageTemplateMaxOrderByAggregateInput
    _min?: MessageTemplateMinOrderByAggregateInput
  }

  export type MessageTemplateScalarWhereWithAggregatesInput = {
    AND?: MessageTemplateScalarWhereWithAggregatesInput | MessageTemplateScalarWhereWithAggregatesInput[]
    OR?: MessageTemplateScalarWhereWithAggregatesInput[]
    NOT?: MessageTemplateScalarWhereWithAggregatesInput | MessageTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageTemplate"> | string
    metaTemplateId?: StringWithAggregatesFilter<"MessageTemplate"> | string
    userId?: StringWithAggregatesFilter<"MessageTemplate"> | string
    name?: StringWithAggregatesFilter<"MessageTemplate"> | string
    language?: StringWithAggregatesFilter<"MessageTemplate"> | string
    status?: StringWithAggregatesFilter<"MessageTemplate"> | string
    category?: StringWithAggregatesFilter<"MessageTemplate"> | string
    previousCategory?: StringNullableWithAggregatesFilter<"MessageTemplate"> | string | null
    parameterFormat?: StringNullableWithAggregatesFilter<"MessageTemplate"> | string | null
    components?: JsonWithAggregatesFilter<"MessageTemplate">
    disableIosAutofill?: BoolWithAggregatesFilter<"MessageTemplate"> | boolean
    isPrimaryDeviceDeliveryOnly?: BoolWithAggregatesFilter<"MessageTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MessageTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MessageTemplate"> | Date | string
  }

  export type CreditWalletWhereInput = {
    AND?: CreditWalletWhereInput | CreditWalletWhereInput[]
    OR?: CreditWalletWhereInput[]
    NOT?: CreditWalletWhereInput | CreditWalletWhereInput[]
    id?: StringFilter<"CreditWallet"> | string
    userId?: StringFilter<"CreditWallet"> | string
    balance?: IntFilter<"CreditWallet"> | number
    points?: IntFilter<"CreditWallet"> | number
    createdAt?: DateTimeFilter<"CreditWallet"> | Date | string
    updatedAt?: DateTimeFilter<"CreditWallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: CreditTransactionListRelationFilter
    purchases?: CreditPurchaseListRelationFilter
  }

  export type CreditWalletOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    transactions?: CreditTransactionOrderByRelationAggregateInput
    purchases?: CreditPurchaseOrderByRelationAggregateInput
  }

  export type CreditWalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: CreditWalletWhereInput | CreditWalletWhereInput[]
    OR?: CreditWalletWhereInput[]
    NOT?: CreditWalletWhereInput | CreditWalletWhereInput[]
    balance?: IntFilter<"CreditWallet"> | number
    points?: IntFilter<"CreditWallet"> | number
    createdAt?: DateTimeFilter<"CreditWallet"> | Date | string
    updatedAt?: DateTimeFilter<"CreditWallet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: CreditTransactionListRelationFilter
    purchases?: CreditPurchaseListRelationFilter
  }, "id" | "userId">

  export type CreditWalletOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CreditWalletCountOrderByAggregateInput
    _avg?: CreditWalletAvgOrderByAggregateInput
    _max?: CreditWalletMaxOrderByAggregateInput
    _min?: CreditWalletMinOrderByAggregateInput
    _sum?: CreditWalletSumOrderByAggregateInput
  }

  export type CreditWalletScalarWhereWithAggregatesInput = {
    AND?: CreditWalletScalarWhereWithAggregatesInput | CreditWalletScalarWhereWithAggregatesInput[]
    OR?: CreditWalletScalarWhereWithAggregatesInput[]
    NOT?: CreditWalletScalarWhereWithAggregatesInput | CreditWalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditWallet"> | string
    userId?: StringWithAggregatesFilter<"CreditWallet"> | string
    balance?: IntWithAggregatesFilter<"CreditWallet"> | number
    points?: IntWithAggregatesFilter<"CreditWallet"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CreditWallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CreditWallet"> | Date | string
  }

  export type CreditTransactionWhereInput = {
    AND?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    OR?: CreditTransactionWhereInput[]
    NOT?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    id?: StringFilter<"CreditTransaction"> | string
    walletId?: StringFilter<"CreditTransaction"> | string
    type?: EnumCreditTransactionTypeFilter<"CreditTransaction"> | $Enums.CreditTransactionType
    amount?: IntFilter<"CreditTransaction"> | number
    balanceAfter?: IntFilter<"CreditTransaction"> | number
    description?: StringFilter<"CreditTransaction"> | string
    reference?: StringNullableFilter<"CreditTransaction"> | string | null
    idempotencyKey?: StringNullableFilter<"CreditTransaction"> | string | null
    metadata?: JsonNullableFilter<"CreditTransaction">
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
    wallet?: XOR<CreditWalletScalarRelationFilter, CreditWalletWhereInput>
  }

  export type CreditTransactionOrderByWithRelationInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    reference?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    wallet?: CreditWalletOrderByWithRelationInput
  }

  export type CreditTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reference?: string
    idempotencyKey?: string
    AND?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    OR?: CreditTransactionWhereInput[]
    NOT?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    walletId?: StringFilter<"CreditTransaction"> | string
    type?: EnumCreditTransactionTypeFilter<"CreditTransaction"> | $Enums.CreditTransactionType
    amount?: IntFilter<"CreditTransaction"> | number
    balanceAfter?: IntFilter<"CreditTransaction"> | number
    description?: StringFilter<"CreditTransaction"> | string
    metadata?: JsonNullableFilter<"CreditTransaction">
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
    wallet?: XOR<CreditWalletScalarRelationFilter, CreditWalletWhereInput>
  }, "id" | "reference" | "idempotencyKey">

  export type CreditTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    reference?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CreditTransactionCountOrderByAggregateInput
    _avg?: CreditTransactionAvgOrderByAggregateInput
    _max?: CreditTransactionMaxOrderByAggregateInput
    _min?: CreditTransactionMinOrderByAggregateInput
    _sum?: CreditTransactionSumOrderByAggregateInput
  }

  export type CreditTransactionScalarWhereWithAggregatesInput = {
    AND?: CreditTransactionScalarWhereWithAggregatesInput | CreditTransactionScalarWhereWithAggregatesInput[]
    OR?: CreditTransactionScalarWhereWithAggregatesInput[]
    NOT?: CreditTransactionScalarWhereWithAggregatesInput | CreditTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditTransaction"> | string
    walletId?: StringWithAggregatesFilter<"CreditTransaction"> | string
    type?: EnumCreditTransactionTypeWithAggregatesFilter<"CreditTransaction"> | $Enums.CreditTransactionType
    amount?: IntWithAggregatesFilter<"CreditTransaction"> | number
    balanceAfter?: IntWithAggregatesFilter<"CreditTransaction"> | number
    description?: StringWithAggregatesFilter<"CreditTransaction"> | string
    reference?: StringNullableWithAggregatesFilter<"CreditTransaction"> | string | null
    idempotencyKey?: StringNullableWithAggregatesFilter<"CreditTransaction"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"CreditTransaction">
    createdAt?: DateTimeWithAggregatesFilter<"CreditTransaction"> | Date | string
  }

  export type CreditPackageWhereInput = {
    AND?: CreditPackageWhereInput | CreditPackageWhereInput[]
    OR?: CreditPackageWhereInput[]
    NOT?: CreditPackageWhereInput | CreditPackageWhereInput[]
    id?: StringFilter<"CreditPackage"> | string
    name?: StringFilter<"CreditPackage"> | string
    priceKobo?: IntFilter<"CreditPackage"> | number
    credits?: IntFilter<"CreditPackage"> | number
    bonusCredits?: IntFilter<"CreditPackage"> | number
    isActive?: BoolFilter<"CreditPackage"> | boolean
    createdAt?: DateTimeFilter<"CreditPackage"> | Date | string
    updatedAt?: DateTimeFilter<"CreditPackage"> | Date | string
    purchases?: CreditPurchaseListRelationFilter
  }

  export type CreditPackageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    priceKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    purchases?: CreditPurchaseOrderByRelationAggregateInput
  }

  export type CreditPackageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CreditPackageWhereInput | CreditPackageWhereInput[]
    OR?: CreditPackageWhereInput[]
    NOT?: CreditPackageWhereInput | CreditPackageWhereInput[]
    priceKobo?: IntFilter<"CreditPackage"> | number
    credits?: IntFilter<"CreditPackage"> | number
    bonusCredits?: IntFilter<"CreditPackage"> | number
    isActive?: BoolFilter<"CreditPackage"> | boolean
    createdAt?: DateTimeFilter<"CreditPackage"> | Date | string
    updatedAt?: DateTimeFilter<"CreditPackage"> | Date | string
    purchases?: CreditPurchaseListRelationFilter
  }, "id" | "name">

  export type CreditPackageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    priceKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CreditPackageCountOrderByAggregateInput
    _avg?: CreditPackageAvgOrderByAggregateInput
    _max?: CreditPackageMaxOrderByAggregateInput
    _min?: CreditPackageMinOrderByAggregateInput
    _sum?: CreditPackageSumOrderByAggregateInput
  }

  export type CreditPackageScalarWhereWithAggregatesInput = {
    AND?: CreditPackageScalarWhereWithAggregatesInput | CreditPackageScalarWhereWithAggregatesInput[]
    OR?: CreditPackageScalarWhereWithAggregatesInput[]
    NOT?: CreditPackageScalarWhereWithAggregatesInput | CreditPackageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditPackage"> | string
    name?: StringWithAggregatesFilter<"CreditPackage"> | string
    priceKobo?: IntWithAggregatesFilter<"CreditPackage"> | number
    credits?: IntWithAggregatesFilter<"CreditPackage"> | number
    bonusCredits?: IntWithAggregatesFilter<"CreditPackage"> | number
    isActive?: BoolWithAggregatesFilter<"CreditPackage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CreditPackage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CreditPackage"> | Date | string
  }

  export type CreditPurchaseWhereInput = {
    AND?: CreditPurchaseWhereInput | CreditPurchaseWhereInput[]
    OR?: CreditPurchaseWhereInput[]
    NOT?: CreditPurchaseWhereInput | CreditPurchaseWhereInput[]
    id?: StringFilter<"CreditPurchase"> | string
    walletId?: StringFilter<"CreditPurchase"> | string
    packageId?: StringFilter<"CreditPurchase"> | string
    amountKobo?: IntFilter<"CreditPurchase"> | number
    credits?: IntFilter<"CreditPurchase"> | number
    bonusCredits?: IntFilter<"CreditPurchase"> | number
    paymentReference?: StringFilter<"CreditPurchase"> | string
    checkoutSessionId?: StringNullableFilter<"CreditPurchase"> | string | null
    checkoutUrl?: StringNullableFilter<"CreditPurchase"> | string | null
    status?: EnumCreditPurchaseStatusFilter<"CreditPurchase"> | $Enums.CreditPurchaseStatus
    paidAt?: DateTimeNullableFilter<"CreditPurchase"> | Date | string | null
    createdAt?: DateTimeFilter<"CreditPurchase"> | Date | string
    updatedAt?: DateTimeFilter<"CreditPurchase"> | Date | string
    wallet?: XOR<CreditWalletScalarRelationFilter, CreditWalletWhereInput>
    package?: XOR<CreditPackageScalarRelationFilter, CreditPackageWhereInput>
  }

  export type CreditPurchaseOrderByWithRelationInput = {
    id?: SortOrder
    walletId?: SortOrder
    packageId?: SortOrder
    amountKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
    paymentReference?: SortOrder
    checkoutSessionId?: SortOrderInput | SortOrder
    checkoutUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    wallet?: CreditWalletOrderByWithRelationInput
    package?: CreditPackageOrderByWithRelationInput
  }

  export type CreditPurchaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    paymentReference?: string
    checkoutSessionId?: string
    AND?: CreditPurchaseWhereInput | CreditPurchaseWhereInput[]
    OR?: CreditPurchaseWhereInput[]
    NOT?: CreditPurchaseWhereInput | CreditPurchaseWhereInput[]
    walletId?: StringFilter<"CreditPurchase"> | string
    packageId?: StringFilter<"CreditPurchase"> | string
    amountKobo?: IntFilter<"CreditPurchase"> | number
    credits?: IntFilter<"CreditPurchase"> | number
    bonusCredits?: IntFilter<"CreditPurchase"> | number
    checkoutUrl?: StringNullableFilter<"CreditPurchase"> | string | null
    status?: EnumCreditPurchaseStatusFilter<"CreditPurchase"> | $Enums.CreditPurchaseStatus
    paidAt?: DateTimeNullableFilter<"CreditPurchase"> | Date | string | null
    createdAt?: DateTimeFilter<"CreditPurchase"> | Date | string
    updatedAt?: DateTimeFilter<"CreditPurchase"> | Date | string
    wallet?: XOR<CreditWalletScalarRelationFilter, CreditWalletWhereInput>
    package?: XOR<CreditPackageScalarRelationFilter, CreditPackageWhereInput>
  }, "id" | "paymentReference" | "checkoutSessionId">

  export type CreditPurchaseOrderByWithAggregationInput = {
    id?: SortOrder
    walletId?: SortOrder
    packageId?: SortOrder
    amountKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
    paymentReference?: SortOrder
    checkoutSessionId?: SortOrderInput | SortOrder
    checkoutUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CreditPurchaseCountOrderByAggregateInput
    _avg?: CreditPurchaseAvgOrderByAggregateInput
    _max?: CreditPurchaseMaxOrderByAggregateInput
    _min?: CreditPurchaseMinOrderByAggregateInput
    _sum?: CreditPurchaseSumOrderByAggregateInput
  }

  export type CreditPurchaseScalarWhereWithAggregatesInput = {
    AND?: CreditPurchaseScalarWhereWithAggregatesInput | CreditPurchaseScalarWhereWithAggregatesInput[]
    OR?: CreditPurchaseScalarWhereWithAggregatesInput[]
    NOT?: CreditPurchaseScalarWhereWithAggregatesInput | CreditPurchaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditPurchase"> | string
    walletId?: StringWithAggregatesFilter<"CreditPurchase"> | string
    packageId?: StringWithAggregatesFilter<"CreditPurchase"> | string
    amountKobo?: IntWithAggregatesFilter<"CreditPurchase"> | number
    credits?: IntWithAggregatesFilter<"CreditPurchase"> | number
    bonusCredits?: IntWithAggregatesFilter<"CreditPurchase"> | number
    paymentReference?: StringWithAggregatesFilter<"CreditPurchase"> | string
    checkoutSessionId?: StringNullableWithAggregatesFilter<"CreditPurchase"> | string | null
    checkoutUrl?: StringNullableWithAggregatesFilter<"CreditPurchase"> | string | null
    status?: EnumCreditPurchaseStatusWithAggregatesFilter<"CreditPurchase"> | $Enums.CreditPurchaseStatus
    paidAt?: DateTimeNullableWithAggregatesFilter<"CreditPurchase"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CreditPurchase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CreditPurchase"> | Date | string
  }

  export type AutomationWhereInput = {
    AND?: AutomationWhereInput | AutomationWhereInput[]
    OR?: AutomationWhereInput[]
    NOT?: AutomationWhereInput | AutomationWhereInput[]
    id?: StringFilter<"Automation"> | string
    userId?: StringFilter<"Automation"> | string
    name?: StringFilter<"Automation"> | string
    trigger?: StringFilter<"Automation"> | string
    triggerValue?: StringNullableFilter<"Automation"> | string | null
    action?: StringFilter<"Automation"> | string
    actionTemplate?: StringFilter<"Automation"> | string
    enabled?: BoolFilter<"Automation"> | boolean
    totalRuns?: IntFilter<"Automation"> | number
    lastTriggered?: DateTimeNullableFilter<"Automation"> | Date | string | null
    createdAt?: DateTimeFilter<"Automation"> | Date | string
    updatedAt?: DateTimeFilter<"Automation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AutomationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    trigger?: SortOrder
    triggerValue?: SortOrderInput | SortOrder
    action?: SortOrder
    actionTemplate?: SortOrder
    enabled?: SortOrder
    totalRuns?: SortOrder
    lastTriggered?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AutomationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AutomationWhereInput | AutomationWhereInput[]
    OR?: AutomationWhereInput[]
    NOT?: AutomationWhereInput | AutomationWhereInput[]
    userId?: StringFilter<"Automation"> | string
    name?: StringFilter<"Automation"> | string
    trigger?: StringFilter<"Automation"> | string
    triggerValue?: StringNullableFilter<"Automation"> | string | null
    action?: StringFilter<"Automation"> | string
    actionTemplate?: StringFilter<"Automation"> | string
    enabled?: BoolFilter<"Automation"> | boolean
    totalRuns?: IntFilter<"Automation"> | number
    lastTriggered?: DateTimeNullableFilter<"Automation"> | Date | string | null
    createdAt?: DateTimeFilter<"Automation"> | Date | string
    updatedAt?: DateTimeFilter<"Automation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AutomationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    trigger?: SortOrder
    triggerValue?: SortOrderInput | SortOrder
    action?: SortOrder
    actionTemplate?: SortOrder
    enabled?: SortOrder
    totalRuns?: SortOrder
    lastTriggered?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AutomationCountOrderByAggregateInput
    _avg?: AutomationAvgOrderByAggregateInput
    _max?: AutomationMaxOrderByAggregateInput
    _min?: AutomationMinOrderByAggregateInput
    _sum?: AutomationSumOrderByAggregateInput
  }

  export type AutomationScalarWhereWithAggregatesInput = {
    AND?: AutomationScalarWhereWithAggregatesInput | AutomationScalarWhereWithAggregatesInput[]
    OR?: AutomationScalarWhereWithAggregatesInput[]
    NOT?: AutomationScalarWhereWithAggregatesInput | AutomationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Automation"> | string
    userId?: StringWithAggregatesFilter<"Automation"> | string
    name?: StringWithAggregatesFilter<"Automation"> | string
    trigger?: StringWithAggregatesFilter<"Automation"> | string
    triggerValue?: StringNullableWithAggregatesFilter<"Automation"> | string | null
    action?: StringWithAggregatesFilter<"Automation"> | string
    actionTemplate?: StringWithAggregatesFilter<"Automation"> | string
    enabled?: BoolWithAggregatesFilter<"Automation"> | boolean
    totalRuns?: IntWithAggregatesFilter<"Automation"> | number
    lastTriggered?: DateTimeNullableWithAggregatesFilter<"Automation"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Automation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Automation"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    recipientPhone?: StringFilter<"Notification"> | string
    templateName?: StringFilter<"Notification"> | string
    templateLanguage?: StringFilter<"Notification"> | string
    templateMessage?: StringNullableFilter<"Notification"> | string | null
    whatsappMessageId?: StringNullableFilter<"Notification"> | string | null
    deliveryTrackingId?: StringNullableFilter<"Notification"> | string | null
    sendAt?: StringNullableFilter<"Notification"> | string | null
    ReadAt?: StringNullableFilter<"Notification"> | string | null
    status?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    recipientPhone?: SortOrder
    templateName?: SortOrder
    templateLanguage?: SortOrder
    templateMessage?: SortOrderInput | SortOrder
    whatsappMessageId?: SortOrderInput | SortOrder
    deliveryTrackingId?: SortOrderInput | SortOrder
    sendAt?: SortOrderInput | SortOrder
    ReadAt?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    recipientPhone?: StringFilter<"Notification"> | string
    templateName?: StringFilter<"Notification"> | string
    templateLanguage?: StringFilter<"Notification"> | string
    templateMessage?: StringNullableFilter<"Notification"> | string | null
    whatsappMessageId?: StringNullableFilter<"Notification"> | string | null
    deliveryTrackingId?: StringNullableFilter<"Notification"> | string | null
    sendAt?: StringNullableFilter<"Notification"> | string | null
    ReadAt?: StringNullableFilter<"Notification"> | string | null
    status?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    recipientPhone?: SortOrder
    templateName?: SortOrder
    templateLanguage?: SortOrder
    templateMessage?: SortOrderInput | SortOrder
    whatsappMessageId?: SortOrderInput | SortOrder
    deliveryTrackingId?: SortOrderInput | SortOrder
    sendAt?: SortOrderInput | SortOrder
    ReadAt?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    recipientPhone?: StringWithAggregatesFilter<"Notification"> | string
    templateName?: StringWithAggregatesFilter<"Notification"> | string
    templateLanguage?: StringWithAggregatesFilter<"Notification"> | string
    templateMessage?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    whatsappMessageId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    deliveryTrackingId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    sendAt?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    ReadAt?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    status?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    emailConfirmed?: boolean
    emailConfirmToken?: string | null
    businessName: string
    fullName: string
    metaUserId?: string | null
    appId?: string | null
    appSecret?: string | null
    facebookAcceessToken?: string | null
    grantedScopes?: string | null
    accessTokenExpiresIn?: string | null
    selectedWabaId?: string | null
    displayPhoneNumber?: string | null
    selectedFacebookBusinessId?: string | null
    selectedFacebookBusinessName?: string | null
    selectedPhoneNumberQualityRating?: string | null
    selectedPhoneNumberVerifiedName?: string | null
    webhookStatus?: boolean
    selectedPhoneNumberId?: UserCreateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: boolean
    createdAt?: Date | string
    hashedRefresh?: string | null
    messageTemplates?: MessageTemplateCreateNestedManyWithoutUserInput
    automations?: AutomationCreateNestedManyWithoutUserInput
    creditWallet?: CreditWalletCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    emailConfirmed?: boolean
    emailConfirmToken?: string | null
    businessName: string
    fullName: string
    metaUserId?: string | null
    appId?: string | null
    appSecret?: string | null
    facebookAcceessToken?: string | null
    grantedScopes?: string | null
    accessTokenExpiresIn?: string | null
    selectedWabaId?: string | null
    displayPhoneNumber?: string | null
    selectedFacebookBusinessId?: string | null
    selectedFacebookBusinessName?: string | null
    selectedPhoneNumberQualityRating?: string | null
    selectedPhoneNumberVerifiedName?: string | null
    webhookStatus?: boolean
    selectedPhoneNumberId?: UserCreateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: boolean
    createdAt?: Date | string
    hashedRefresh?: string | null
    messageTemplates?: MessageTemplateUncheckedCreateNestedManyWithoutUserInput
    automations?: AutomationUncheckedCreateNestedManyWithoutUserInput
    creditWallet?: CreditWalletUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    emailConfirmed?: BoolFieldUpdateOperationsInput | boolean
    emailConfirmToken?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    metaUserId?: NullableStringFieldUpdateOperationsInput | string | null
    appId?: NullableStringFieldUpdateOperationsInput | string | null
    appSecret?: NullableStringFieldUpdateOperationsInput | string | null
    facebookAcceessToken?: NullableStringFieldUpdateOperationsInput | string | null
    grantedScopes?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    selectedWabaId?: NullableStringFieldUpdateOperationsInput | string | null
    displayPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessName?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberQualityRating?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberVerifiedName?: NullableStringFieldUpdateOperationsInput | string | null
    webhookStatus?: BoolFieldUpdateOperationsInput | boolean
    selectedPhoneNumberId?: UserUpdateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hashedRefresh?: NullableStringFieldUpdateOperationsInput | string | null
    messageTemplates?: MessageTemplateUpdateManyWithoutUserNestedInput
    automations?: AutomationUpdateManyWithoutUserNestedInput
    creditWallet?: CreditWalletUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    emailConfirmed?: BoolFieldUpdateOperationsInput | boolean
    emailConfirmToken?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    metaUserId?: NullableStringFieldUpdateOperationsInput | string | null
    appId?: NullableStringFieldUpdateOperationsInput | string | null
    appSecret?: NullableStringFieldUpdateOperationsInput | string | null
    facebookAcceessToken?: NullableStringFieldUpdateOperationsInput | string | null
    grantedScopes?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    selectedWabaId?: NullableStringFieldUpdateOperationsInput | string | null
    displayPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessName?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberQualityRating?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberVerifiedName?: NullableStringFieldUpdateOperationsInput | string | null
    webhookStatus?: BoolFieldUpdateOperationsInput | boolean
    selectedPhoneNumberId?: UserUpdateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hashedRefresh?: NullableStringFieldUpdateOperationsInput | string | null
    messageTemplates?: MessageTemplateUncheckedUpdateManyWithoutUserNestedInput
    automations?: AutomationUncheckedUpdateManyWithoutUserNestedInput
    creditWallet?: CreditWalletUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    emailConfirmed?: boolean
    emailConfirmToken?: string | null
    businessName: string
    fullName: string
    metaUserId?: string | null
    appId?: string | null
    appSecret?: string | null
    facebookAcceessToken?: string | null
    grantedScopes?: string | null
    accessTokenExpiresIn?: string | null
    selectedWabaId?: string | null
    displayPhoneNumber?: string | null
    selectedFacebookBusinessId?: string | null
    selectedFacebookBusinessName?: string | null
    selectedPhoneNumberQualityRating?: string | null
    selectedPhoneNumberVerifiedName?: string | null
    webhookStatus?: boolean
    selectedPhoneNumberId?: UserCreateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: boolean
    createdAt?: Date | string
    hashedRefresh?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    emailConfirmed?: BoolFieldUpdateOperationsInput | boolean
    emailConfirmToken?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    metaUserId?: NullableStringFieldUpdateOperationsInput | string | null
    appId?: NullableStringFieldUpdateOperationsInput | string | null
    appSecret?: NullableStringFieldUpdateOperationsInput | string | null
    facebookAcceessToken?: NullableStringFieldUpdateOperationsInput | string | null
    grantedScopes?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    selectedWabaId?: NullableStringFieldUpdateOperationsInput | string | null
    displayPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessName?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberQualityRating?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberVerifiedName?: NullableStringFieldUpdateOperationsInput | string | null
    webhookStatus?: BoolFieldUpdateOperationsInput | boolean
    selectedPhoneNumberId?: UserUpdateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hashedRefresh?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    emailConfirmed?: BoolFieldUpdateOperationsInput | boolean
    emailConfirmToken?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    metaUserId?: NullableStringFieldUpdateOperationsInput | string | null
    appId?: NullableStringFieldUpdateOperationsInput | string | null
    appSecret?: NullableStringFieldUpdateOperationsInput | string | null
    facebookAcceessToken?: NullableStringFieldUpdateOperationsInput | string | null
    grantedScopes?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    selectedWabaId?: NullableStringFieldUpdateOperationsInput | string | null
    displayPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessName?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberQualityRating?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberVerifiedName?: NullableStringFieldUpdateOperationsInput | string | null
    webhookStatus?: BoolFieldUpdateOperationsInput | boolean
    selectedPhoneNumberId?: UserUpdateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hashedRefresh?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TokenCreateInput = {
    id?: string
    userId: string
    facebookAccessToken?: string | null
    facebookLongLivedAccessToken?: string | null
    expiresIn?: string | null
    dataAccessExpirationTime?: string | null
    createdAt?: Date | string
  }

  export type TokenUncheckedCreateInput = {
    id?: string
    userId: string
    facebookAccessToken?: string | null
    facebookLongLivedAccessToken?: string | null
    expiresIn?: string | null
    dataAccessExpirationTime?: string | null
    createdAt?: Date | string
  }

  export type TokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    facebookAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLongLivedAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessExpirationTime?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    facebookAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLongLivedAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessExpirationTime?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateManyInput = {
    id?: string
    userId: string
    facebookAccessToken?: string | null
    facebookLongLivedAccessToken?: string | null
    expiresIn?: string | null
    dataAccessExpirationTime?: string | null
    createdAt?: Date | string
  }

  export type TokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    facebookAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLongLivedAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessExpirationTime?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    facebookAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLongLivedAccessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    dataAccessExpirationTime?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryCreateInput = {
    id?: string
    userId?: string | null
    trackingId: string
    senderName: string
    senderPhone: string
    senderAddress: string
    senderLatitude?: string | null
    senderLongitude?: string | null
    receiverName: string
    receiverPhone: string
    receiverAddress: string
    receiverLatitude?: string | null
    receiverLongitude?: string | null
    packageName: string
    packageCategory: string
    packageWeight: string
    packageDimensions: string
    packageValue: string
    pickupDate: string
    courier_name?: string | null
    courier_email?: string | null
    courier_phone?: string | null
    shipbubbleOrderId?: string | null
    tracking_url?: string | null
    package_amount?: string | null
    package_weight?: string | null
    shipping_fee?: string | null
    shipping_payment_type?: string | null
    shipping_payment_status?: string | null
    package_status?: NullableJsonNullValueInput | InputJsonValue
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    paymentAmount?: string | null
    paymentCurrency?: string | null
    paymentStatus: string
    bookingStatus: string
    bookingDetails?: NullableJsonNullValueInput | InputJsonValue
    deliveryInsurer?: string | null
    deliveryCurrency?: string | null
    insuranceAmount?: number | null
    insurance_policy_condition?: string | null
    insure_percentage?: number | null
    insurance_cost?: number | null
    insuranceCode?: string | null
    insurerName?: string | null
    bookingError?: string | null
    deliveryStatus?: string | null
    deliveryType: string
    deliveryInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryUncheckedCreateInput = {
    id?: string
    userId?: string | null
    trackingId: string
    senderName: string
    senderPhone: string
    senderAddress: string
    senderLatitude?: string | null
    senderLongitude?: string | null
    receiverName: string
    receiverPhone: string
    receiverAddress: string
    receiverLatitude?: string | null
    receiverLongitude?: string | null
    packageName: string
    packageCategory: string
    packageWeight: string
    packageDimensions: string
    packageValue: string
    pickupDate: string
    courier_name?: string | null
    courier_email?: string | null
    courier_phone?: string | null
    shipbubbleOrderId?: string | null
    tracking_url?: string | null
    package_amount?: string | null
    package_weight?: string | null
    shipping_fee?: string | null
    shipping_payment_type?: string | null
    shipping_payment_status?: string | null
    package_status?: NullableJsonNullValueInput | InputJsonValue
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    paymentAmount?: string | null
    paymentCurrency?: string | null
    paymentStatus: string
    bookingStatus: string
    bookingDetails?: NullableJsonNullValueInput | InputJsonValue
    deliveryInsurer?: string | null
    deliveryCurrency?: string | null
    insuranceAmount?: number | null
    insurance_policy_condition?: string | null
    insure_percentage?: number | null
    insurance_cost?: number | null
    insuranceCode?: string | null
    insurerName?: string | null
    bookingError?: string | null
    deliveryStatus?: string | null
    deliveryType: string
    deliveryInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderPhone?: StringFieldUpdateOperationsInput | string
    senderAddress?: StringFieldUpdateOperationsInput | string
    senderLatitude?: NullableStringFieldUpdateOperationsInput | string | null
    senderLongitude?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: StringFieldUpdateOperationsInput | string
    receiverPhone?: StringFieldUpdateOperationsInput | string
    receiverAddress?: StringFieldUpdateOperationsInput | string
    receiverLatitude?: NullableStringFieldUpdateOperationsInput | string | null
    receiverLongitude?: NullableStringFieldUpdateOperationsInput | string | null
    packageName?: StringFieldUpdateOperationsInput | string
    packageCategory?: StringFieldUpdateOperationsInput | string
    packageWeight?: StringFieldUpdateOperationsInput | string
    packageDimensions?: StringFieldUpdateOperationsInput | string
    packageValue?: StringFieldUpdateOperationsInput | string
    pickupDate?: StringFieldUpdateOperationsInput | string
    courier_name?: NullableStringFieldUpdateOperationsInput | string | null
    courier_email?: NullableStringFieldUpdateOperationsInput | string | null
    courier_phone?: NullableStringFieldUpdateOperationsInput | string | null
    shipbubbleOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    tracking_url?: NullableStringFieldUpdateOperationsInput | string | null
    package_amount?: NullableStringFieldUpdateOperationsInput | string | null
    package_weight?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_fee?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_payment_type?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_payment_status?: NullableStringFieldUpdateOperationsInput | string | null
    package_status?: NullableJsonNullValueInput | InputJsonValue
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    bookingStatus?: StringFieldUpdateOperationsInput | string
    bookingDetails?: NullableJsonNullValueInput | InputJsonValue
    deliveryInsurer?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    insurance_policy_condition?: NullableStringFieldUpdateOperationsInput | string | null
    insure_percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    insurance_cost?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceCode?: NullableStringFieldUpdateOperationsInput | string | null
    insurerName?: NullableStringFieldUpdateOperationsInput | string | null
    bookingError?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryStatus?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryType?: StringFieldUpdateOperationsInput | string
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderPhone?: StringFieldUpdateOperationsInput | string
    senderAddress?: StringFieldUpdateOperationsInput | string
    senderLatitude?: NullableStringFieldUpdateOperationsInput | string | null
    senderLongitude?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: StringFieldUpdateOperationsInput | string
    receiverPhone?: StringFieldUpdateOperationsInput | string
    receiverAddress?: StringFieldUpdateOperationsInput | string
    receiverLatitude?: NullableStringFieldUpdateOperationsInput | string | null
    receiverLongitude?: NullableStringFieldUpdateOperationsInput | string | null
    packageName?: StringFieldUpdateOperationsInput | string
    packageCategory?: StringFieldUpdateOperationsInput | string
    packageWeight?: StringFieldUpdateOperationsInput | string
    packageDimensions?: StringFieldUpdateOperationsInput | string
    packageValue?: StringFieldUpdateOperationsInput | string
    pickupDate?: StringFieldUpdateOperationsInput | string
    courier_name?: NullableStringFieldUpdateOperationsInput | string | null
    courier_email?: NullableStringFieldUpdateOperationsInput | string | null
    courier_phone?: NullableStringFieldUpdateOperationsInput | string | null
    shipbubbleOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    tracking_url?: NullableStringFieldUpdateOperationsInput | string | null
    package_amount?: NullableStringFieldUpdateOperationsInput | string | null
    package_weight?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_fee?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_payment_type?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_payment_status?: NullableStringFieldUpdateOperationsInput | string | null
    package_status?: NullableJsonNullValueInput | InputJsonValue
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    bookingStatus?: StringFieldUpdateOperationsInput | string
    bookingDetails?: NullableJsonNullValueInput | InputJsonValue
    deliveryInsurer?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    insurance_policy_condition?: NullableStringFieldUpdateOperationsInput | string | null
    insure_percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    insurance_cost?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceCode?: NullableStringFieldUpdateOperationsInput | string | null
    insurerName?: NullableStringFieldUpdateOperationsInput | string | null
    bookingError?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryStatus?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryType?: StringFieldUpdateOperationsInput | string
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryCreateManyInput = {
    id?: string
    userId?: string | null
    trackingId: string
    senderName: string
    senderPhone: string
    senderAddress: string
    senderLatitude?: string | null
    senderLongitude?: string | null
    receiverName: string
    receiverPhone: string
    receiverAddress: string
    receiverLatitude?: string | null
    receiverLongitude?: string | null
    packageName: string
    packageCategory: string
    packageWeight: string
    packageDimensions: string
    packageValue: string
    pickupDate: string
    courier_name?: string | null
    courier_email?: string | null
    courier_phone?: string | null
    shipbubbleOrderId?: string | null
    tracking_url?: string | null
    package_amount?: string | null
    package_weight?: string | null
    shipping_fee?: string | null
    shipping_payment_type?: string | null
    shipping_payment_status?: string | null
    package_status?: NullableJsonNullValueInput | InputJsonValue
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    paymentAmount?: string | null
    paymentCurrency?: string | null
    paymentStatus: string
    bookingStatus: string
    bookingDetails?: NullableJsonNullValueInput | InputJsonValue
    deliveryInsurer?: string | null
    deliveryCurrency?: string | null
    insuranceAmount?: number | null
    insurance_policy_condition?: string | null
    insure_percentage?: number | null
    insurance_cost?: number | null
    insuranceCode?: string | null
    insurerName?: string | null
    bookingError?: string | null
    deliveryStatus?: string | null
    deliveryType: string
    deliveryInstructions?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeliveryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderPhone?: StringFieldUpdateOperationsInput | string
    senderAddress?: StringFieldUpdateOperationsInput | string
    senderLatitude?: NullableStringFieldUpdateOperationsInput | string | null
    senderLongitude?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: StringFieldUpdateOperationsInput | string
    receiverPhone?: StringFieldUpdateOperationsInput | string
    receiverAddress?: StringFieldUpdateOperationsInput | string
    receiverLatitude?: NullableStringFieldUpdateOperationsInput | string | null
    receiverLongitude?: NullableStringFieldUpdateOperationsInput | string | null
    packageName?: StringFieldUpdateOperationsInput | string
    packageCategory?: StringFieldUpdateOperationsInput | string
    packageWeight?: StringFieldUpdateOperationsInput | string
    packageDimensions?: StringFieldUpdateOperationsInput | string
    packageValue?: StringFieldUpdateOperationsInput | string
    pickupDate?: StringFieldUpdateOperationsInput | string
    courier_name?: NullableStringFieldUpdateOperationsInput | string | null
    courier_email?: NullableStringFieldUpdateOperationsInput | string | null
    courier_phone?: NullableStringFieldUpdateOperationsInput | string | null
    shipbubbleOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    tracking_url?: NullableStringFieldUpdateOperationsInput | string | null
    package_amount?: NullableStringFieldUpdateOperationsInput | string | null
    package_weight?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_fee?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_payment_type?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_payment_status?: NullableStringFieldUpdateOperationsInput | string | null
    package_status?: NullableJsonNullValueInput | InputJsonValue
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    bookingStatus?: StringFieldUpdateOperationsInput | string
    bookingDetails?: NullableJsonNullValueInput | InputJsonValue
    deliveryInsurer?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    insurance_policy_condition?: NullableStringFieldUpdateOperationsInput | string | null
    insure_percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    insurance_cost?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceCode?: NullableStringFieldUpdateOperationsInput | string | null
    insurerName?: NullableStringFieldUpdateOperationsInput | string | null
    bookingError?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryStatus?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryType?: StringFieldUpdateOperationsInput | string
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeliveryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    trackingId?: StringFieldUpdateOperationsInput | string
    senderName?: StringFieldUpdateOperationsInput | string
    senderPhone?: StringFieldUpdateOperationsInput | string
    senderAddress?: StringFieldUpdateOperationsInput | string
    senderLatitude?: NullableStringFieldUpdateOperationsInput | string | null
    senderLongitude?: NullableStringFieldUpdateOperationsInput | string | null
    receiverName?: StringFieldUpdateOperationsInput | string
    receiverPhone?: StringFieldUpdateOperationsInput | string
    receiverAddress?: StringFieldUpdateOperationsInput | string
    receiverLatitude?: NullableStringFieldUpdateOperationsInput | string | null
    receiverLongitude?: NullableStringFieldUpdateOperationsInput | string | null
    packageName?: StringFieldUpdateOperationsInput | string
    packageCategory?: StringFieldUpdateOperationsInput | string
    packageWeight?: StringFieldUpdateOperationsInput | string
    packageDimensions?: StringFieldUpdateOperationsInput | string
    packageValue?: StringFieldUpdateOperationsInput | string
    pickupDate?: StringFieldUpdateOperationsInput | string
    courier_name?: NullableStringFieldUpdateOperationsInput | string | null
    courier_email?: NullableStringFieldUpdateOperationsInput | string | null
    courier_phone?: NullableStringFieldUpdateOperationsInput | string | null
    shipbubbleOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    tracking_url?: NullableStringFieldUpdateOperationsInput | string | null
    package_amount?: NullableStringFieldUpdateOperationsInput | string | null
    package_weight?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_fee?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_payment_type?: NullableStringFieldUpdateOperationsInput | string | null
    shipping_payment_status?: NullableStringFieldUpdateOperationsInput | string | null
    package_status?: NullableJsonNullValueInput | InputJsonValue
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    bookingStatus?: StringFieldUpdateOperationsInput | string
    bookingDetails?: NullableJsonNullValueInput | InputJsonValue
    deliveryInsurer?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    insuranceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    insurance_policy_condition?: NullableStringFieldUpdateOperationsInput | string | null
    insure_percentage?: NullableFloatFieldUpdateOperationsInput | number | null
    insurance_cost?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceCode?: NullableStringFieldUpdateOperationsInput | string | null
    insurerName?: NullableStringFieldUpdateOperationsInput | string | null
    bookingError?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryStatus?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryType?: StringFieldUpdateOperationsInput | string
    deliveryInstructions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageTemplateCreateInput = {
    id?: string
    metaTemplateId: string
    name: string
    language: string
    status: string
    category: string
    previousCategory?: string | null
    parameterFormat?: string | null
    components: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: boolean
    isPrimaryDeviceDeliveryOnly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMessageTemplatesInput
  }

  export type MessageTemplateUncheckedCreateInput = {
    id?: string
    metaTemplateId: string
    userId: string
    name: string
    language: string
    status: string
    category: string
    previousCategory?: string | null
    parameterFormat?: string | null
    components: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: boolean
    isPrimaryDeviceDeliveryOnly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTemplateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    previousCategory?: NullableStringFieldUpdateOperationsInput | string | null
    parameterFormat?: NullableStringFieldUpdateOperationsInput | string | null
    components?: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: BoolFieldUpdateOperationsInput | boolean
    isPrimaryDeviceDeliveryOnly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMessageTemplatesNestedInput
  }

  export type MessageTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTemplateId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    previousCategory?: NullableStringFieldUpdateOperationsInput | string | null
    parameterFormat?: NullableStringFieldUpdateOperationsInput | string | null
    components?: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: BoolFieldUpdateOperationsInput | boolean
    isPrimaryDeviceDeliveryOnly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageTemplateCreateManyInput = {
    id?: string
    metaTemplateId: string
    userId: string
    name: string
    language: string
    status: string
    category: string
    previousCategory?: string | null
    parameterFormat?: string | null
    components: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: boolean
    isPrimaryDeviceDeliveryOnly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTemplateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    previousCategory?: NullableStringFieldUpdateOperationsInput | string | null
    parameterFormat?: NullableStringFieldUpdateOperationsInput | string | null
    components?: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: BoolFieldUpdateOperationsInput | boolean
    isPrimaryDeviceDeliveryOnly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTemplateId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    previousCategory?: NullableStringFieldUpdateOperationsInput | string | null
    parameterFormat?: NullableStringFieldUpdateOperationsInput | string | null
    components?: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: BoolFieldUpdateOperationsInput | boolean
    isPrimaryDeviceDeliveryOnly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditWalletCreateInput = {
    id?: string
    balance?: number
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCreditWalletInput
    transactions?: CreditTransactionCreateNestedManyWithoutWalletInput
    purchases?: CreditPurchaseCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletUncheckedCreateInput = {
    id?: string
    userId: string
    balance?: number
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: CreditTransactionUncheckedCreateNestedManyWithoutWalletInput
    purchases?: CreditPurchaseUncheckedCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCreditWalletNestedInput
    transactions?: CreditTransactionUpdateManyWithoutWalletNestedInput
    purchases?: CreditPurchaseUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: CreditTransactionUncheckedUpdateManyWithoutWalletNestedInput
    purchases?: CreditPurchaseUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletCreateManyInput = {
    id?: string
    userId: string
    balance?: number
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditWalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditWalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionCreateInput = {
    id?: string
    type: $Enums.CreditTransactionType
    amount: number
    balanceAfter: number
    description: string
    reference?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    wallet: CreditWalletCreateNestedOneWithoutTransactionsInput
  }

  export type CreditTransactionUncheckedCreateInput = {
    id?: string
    walletId: string
    type: $Enums.CreditTransactionType
    amount: number
    balanceAfter: number
    description: string
    reference?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CreditTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: CreditWalletUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type CreditTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionCreateManyInput = {
    id?: string
    walletId: string
    type: $Enums.CreditTransactionType
    amount: number
    balanceAfter: number
    description: string
    reference?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CreditTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditPackageCreateInput = {
    id?: string
    name: string
    priceKobo: number
    credits: number
    bonusCredits?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    purchases?: CreditPurchaseCreateNestedManyWithoutPackageInput
  }

  export type CreditPackageUncheckedCreateInput = {
    id?: string
    name: string
    priceKobo: number
    credits: number
    bonusCredits?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    purchases?: CreditPurchaseUncheckedCreateNestedManyWithoutPackageInput
  }

  export type CreditPackageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    priceKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchases?: CreditPurchaseUpdateManyWithoutPackageNestedInput
  }

  export type CreditPackageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    priceKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchases?: CreditPurchaseUncheckedUpdateManyWithoutPackageNestedInput
  }

  export type CreditPackageCreateManyInput = {
    id?: string
    name: string
    priceKobo: number
    credits: number
    bonusCredits?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditPackageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    priceKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditPackageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    priceKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditPurchaseCreateInput = {
    id?: string
    amountKobo: number
    credits: number
    bonusCredits?: number
    paymentReference: string
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    status?: $Enums.CreditPurchaseStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallet: CreditWalletCreateNestedOneWithoutPurchasesInput
    package: CreditPackageCreateNestedOneWithoutPurchasesInput
  }

  export type CreditPurchaseUncheckedCreateInput = {
    id?: string
    walletId: string
    packageId: string
    amountKobo: number
    credits: number
    bonusCredits?: number
    paymentReference: string
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    status?: $Enums.CreditPurchaseStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditPurchaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    paymentReference?: StringFieldUpdateOperationsInput | string
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCreditPurchaseStatusFieldUpdateOperationsInput | $Enums.CreditPurchaseStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: CreditWalletUpdateOneRequiredWithoutPurchasesNestedInput
    package?: CreditPackageUpdateOneRequiredWithoutPurchasesNestedInput
  }

  export type CreditPurchaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    amountKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    paymentReference?: StringFieldUpdateOperationsInput | string
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCreditPurchaseStatusFieldUpdateOperationsInput | $Enums.CreditPurchaseStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditPurchaseCreateManyInput = {
    id?: string
    walletId: string
    packageId: string
    amountKobo: number
    credits: number
    bonusCredits?: number
    paymentReference: string
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    status?: $Enums.CreditPurchaseStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditPurchaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    paymentReference?: StringFieldUpdateOperationsInput | string
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCreditPurchaseStatusFieldUpdateOperationsInput | $Enums.CreditPurchaseStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditPurchaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    amountKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    paymentReference?: StringFieldUpdateOperationsInput | string
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCreditPurchaseStatusFieldUpdateOperationsInput | $Enums.CreditPurchaseStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationCreateInput = {
    id?: string
    name: string
    trigger: string
    triggerValue?: string | null
    action: string
    actionTemplate: string
    enabled?: boolean
    totalRuns?: number
    lastTriggered?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAutomationsInput
  }

  export type AutomationUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    trigger: string
    triggerValue?: string | null
    action: string
    actionTemplate: string
    enabled?: boolean
    totalRuns?: number
    lastTriggered?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AutomationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    trigger?: StringFieldUpdateOperationsInput | string
    triggerValue?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    actionTemplate?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    totalRuns?: IntFieldUpdateOperationsInput | number
    lastTriggered?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAutomationsNestedInput
  }

  export type AutomationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    trigger?: StringFieldUpdateOperationsInput | string
    triggerValue?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    actionTemplate?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    totalRuns?: IntFieldUpdateOperationsInput | number
    lastTriggered?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationCreateManyInput = {
    id?: string
    userId: string
    name: string
    trigger: string
    triggerValue?: string | null
    action: string
    actionTemplate: string
    enabled?: boolean
    totalRuns?: number
    lastTriggered?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AutomationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    trigger?: StringFieldUpdateOperationsInput | string
    triggerValue?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    actionTemplate?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    totalRuns?: IntFieldUpdateOperationsInput | number
    lastTriggered?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    trigger?: StringFieldUpdateOperationsInput | string
    triggerValue?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    actionTemplate?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    totalRuns?: IntFieldUpdateOperationsInput | number
    lastTriggered?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    userId: string
    recipientPhone: string
    templateName: string
    templateLanguage: string
    templateMessage?: string | null
    whatsappMessageId?: string | null
    deliveryTrackingId?: string | null
    sendAt?: string | null
    ReadAt?: string | null
    status?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    recipientPhone: string
    templateName: string
    templateLanguage: string
    templateMessage?: string | null
    whatsappMessageId?: string | null
    deliveryTrackingId?: string | null
    sendAt?: string | null
    ReadAt?: string | null
    status?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    recipientPhone?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    templateLanguage?: StringFieldUpdateOperationsInput | string
    templateMessage?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTrackingId?: NullableStringFieldUpdateOperationsInput | string | null
    sendAt?: NullableStringFieldUpdateOperationsInput | string | null
    ReadAt?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    recipientPhone?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    templateLanguage?: StringFieldUpdateOperationsInput | string
    templateMessage?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTrackingId?: NullableStringFieldUpdateOperationsInput | string | null
    sendAt?: NullableStringFieldUpdateOperationsInput | string | null
    ReadAt?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    recipientPhone: string
    templateName: string
    templateLanguage: string
    templateMessage?: string | null
    whatsappMessageId?: string | null
    deliveryTrackingId?: string | null
    sendAt?: string | null
    ReadAt?: string | null
    status?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    recipientPhone?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    templateLanguage?: StringFieldUpdateOperationsInput | string
    templateMessage?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTrackingId?: NullableStringFieldUpdateOperationsInput | string | null
    sendAt?: NullableStringFieldUpdateOperationsInput | string | null
    ReadAt?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    recipientPhone?: StringFieldUpdateOperationsInput | string
    templateName?: StringFieldUpdateOperationsInput | string
    templateLanguage?: StringFieldUpdateOperationsInput | string
    templateMessage?: NullableStringFieldUpdateOperationsInput | string | null
    whatsappMessageId?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryTrackingId?: NullableStringFieldUpdateOperationsInput | string | null
    sendAt?: NullableStringFieldUpdateOperationsInput | string | null
    ReadAt?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type MessageTemplateListRelationFilter = {
    every?: MessageTemplateWhereInput
    some?: MessageTemplateWhereInput
    none?: MessageTemplateWhereInput
  }

  export type AutomationListRelationFilter = {
    every?: AutomationWhereInput
    some?: AutomationWhereInput
    none?: AutomationWhereInput
  }

  export type CreditWalletNullableScalarRelationFilter = {
    is?: CreditWalletWhereInput | null
    isNot?: CreditWalletWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MessageTemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AutomationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailConfirmed?: SortOrder
    emailConfirmToken?: SortOrder
    businessName?: SortOrder
    fullName?: SortOrder
    metaUserId?: SortOrder
    appId?: SortOrder
    appSecret?: SortOrder
    facebookAcceessToken?: SortOrder
    grantedScopes?: SortOrder
    accessTokenExpiresIn?: SortOrder
    selectedWabaId?: SortOrder
    displayPhoneNumber?: SortOrder
    selectedFacebookBusinessId?: SortOrder
    selectedFacebookBusinessName?: SortOrder
    selectedPhoneNumberQualityRating?: SortOrder
    selectedPhoneNumberVerifiedName?: SortOrder
    webhookStatus?: SortOrder
    selectedPhoneNumberId?: SortOrder
    facebookConnectStatus?: SortOrder
    createdAt?: SortOrder
    hashedRefresh?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailConfirmed?: SortOrder
    emailConfirmToken?: SortOrder
    businessName?: SortOrder
    fullName?: SortOrder
    metaUserId?: SortOrder
    appId?: SortOrder
    appSecret?: SortOrder
    facebookAcceessToken?: SortOrder
    grantedScopes?: SortOrder
    accessTokenExpiresIn?: SortOrder
    selectedWabaId?: SortOrder
    displayPhoneNumber?: SortOrder
    selectedFacebookBusinessId?: SortOrder
    selectedFacebookBusinessName?: SortOrder
    selectedPhoneNumberQualityRating?: SortOrder
    selectedPhoneNumberVerifiedName?: SortOrder
    webhookStatus?: SortOrder
    facebookConnectStatus?: SortOrder
    createdAt?: SortOrder
    hashedRefresh?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailConfirmed?: SortOrder
    emailConfirmToken?: SortOrder
    businessName?: SortOrder
    fullName?: SortOrder
    metaUserId?: SortOrder
    appId?: SortOrder
    appSecret?: SortOrder
    facebookAcceessToken?: SortOrder
    grantedScopes?: SortOrder
    accessTokenExpiresIn?: SortOrder
    selectedWabaId?: SortOrder
    displayPhoneNumber?: SortOrder
    selectedFacebookBusinessId?: SortOrder
    selectedFacebookBusinessName?: SortOrder
    selectedPhoneNumberQualityRating?: SortOrder
    selectedPhoneNumberVerifiedName?: SortOrder
    webhookStatus?: SortOrder
    facebookConnectStatus?: SortOrder
    createdAt?: SortOrder
    hashedRefresh?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    facebookAccessToken?: SortOrder
    facebookLongLivedAccessToken?: SortOrder
    expiresIn?: SortOrder
    dataAccessExpirationTime?: SortOrder
    createdAt?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    facebookAccessToken?: SortOrder
    facebookLongLivedAccessToken?: SortOrder
    expiresIn?: SortOrder
    dataAccessExpirationTime?: SortOrder
    createdAt?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    facebookAccessToken?: SortOrder
    facebookLongLivedAccessToken?: SortOrder
    expiresIn?: SortOrder
    dataAccessExpirationTime?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DeliveryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    trackingId?: SortOrder
    senderName?: SortOrder
    senderPhone?: SortOrder
    senderAddress?: SortOrder
    senderLatitude?: SortOrder
    senderLongitude?: SortOrder
    receiverName?: SortOrder
    receiverPhone?: SortOrder
    receiverAddress?: SortOrder
    receiverLatitude?: SortOrder
    receiverLongitude?: SortOrder
    packageName?: SortOrder
    packageCategory?: SortOrder
    packageWeight?: SortOrder
    packageDimensions?: SortOrder
    packageValue?: SortOrder
    pickupDate?: SortOrder
    courier_name?: SortOrder
    courier_email?: SortOrder
    courier_phone?: SortOrder
    shipbubbleOrderId?: SortOrder
    tracking_url?: SortOrder
    package_amount?: SortOrder
    package_weight?: SortOrder
    shipping_fee?: SortOrder
    shipping_payment_type?: SortOrder
    shipping_payment_status?: SortOrder
    package_status?: SortOrder
    checkoutSessionId?: SortOrder
    checkoutUrl?: SortOrder
    paymentAmount?: SortOrder
    paymentCurrency?: SortOrder
    paymentStatus?: SortOrder
    bookingStatus?: SortOrder
    bookingDetails?: SortOrder
    deliveryInsurer?: SortOrder
    deliveryCurrency?: SortOrder
    insuranceAmount?: SortOrder
    insurance_policy_condition?: SortOrder
    insure_percentage?: SortOrder
    insurance_cost?: SortOrder
    insuranceCode?: SortOrder
    insurerName?: SortOrder
    bookingError?: SortOrder
    deliveryStatus?: SortOrder
    deliveryType?: SortOrder
    deliveryInstructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryAvgOrderByAggregateInput = {
    insuranceAmount?: SortOrder
    insure_percentage?: SortOrder
    insurance_cost?: SortOrder
  }

  export type DeliveryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    trackingId?: SortOrder
    senderName?: SortOrder
    senderPhone?: SortOrder
    senderAddress?: SortOrder
    senderLatitude?: SortOrder
    senderLongitude?: SortOrder
    receiverName?: SortOrder
    receiverPhone?: SortOrder
    receiverAddress?: SortOrder
    receiverLatitude?: SortOrder
    receiverLongitude?: SortOrder
    packageName?: SortOrder
    packageCategory?: SortOrder
    packageWeight?: SortOrder
    packageDimensions?: SortOrder
    packageValue?: SortOrder
    pickupDate?: SortOrder
    courier_name?: SortOrder
    courier_email?: SortOrder
    courier_phone?: SortOrder
    shipbubbleOrderId?: SortOrder
    tracking_url?: SortOrder
    package_amount?: SortOrder
    package_weight?: SortOrder
    shipping_fee?: SortOrder
    shipping_payment_type?: SortOrder
    shipping_payment_status?: SortOrder
    checkoutSessionId?: SortOrder
    checkoutUrl?: SortOrder
    paymentAmount?: SortOrder
    paymentCurrency?: SortOrder
    paymentStatus?: SortOrder
    bookingStatus?: SortOrder
    deliveryInsurer?: SortOrder
    deliveryCurrency?: SortOrder
    insuranceAmount?: SortOrder
    insurance_policy_condition?: SortOrder
    insure_percentage?: SortOrder
    insurance_cost?: SortOrder
    insuranceCode?: SortOrder
    insurerName?: SortOrder
    bookingError?: SortOrder
    deliveryStatus?: SortOrder
    deliveryType?: SortOrder
    deliveryInstructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliveryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    trackingId?: SortOrder
    senderName?: SortOrder
    senderPhone?: SortOrder
    senderAddress?: SortOrder
    senderLatitude?: SortOrder
    senderLongitude?: SortOrder
    receiverName?: SortOrder
    receiverPhone?: SortOrder
    receiverAddress?: SortOrder
    receiverLatitude?: SortOrder
    receiverLongitude?: SortOrder
    packageName?: SortOrder
    packageCategory?: SortOrder
    packageWeight?: SortOrder
    packageDimensions?: SortOrder
    packageValue?: SortOrder
    pickupDate?: SortOrder
    courier_name?: SortOrder
    courier_email?: SortOrder
    courier_phone?: SortOrder
    shipbubbleOrderId?: SortOrder
    tracking_url?: SortOrder
    package_amount?: SortOrder
    package_weight?: SortOrder
    shipping_fee?: SortOrder
    shipping_payment_type?: SortOrder
    shipping_payment_status?: SortOrder
    checkoutSessionId?: SortOrder
    checkoutUrl?: SortOrder
    paymentAmount?: SortOrder
    paymentCurrency?: SortOrder
    paymentStatus?: SortOrder
    bookingStatus?: SortOrder
    deliveryInsurer?: SortOrder
    deliveryCurrency?: SortOrder
    insuranceAmount?: SortOrder
    insurance_policy_condition?: SortOrder
    insure_percentage?: SortOrder
    insurance_cost?: SortOrder
    insuranceCode?: SortOrder
    insurerName?: SortOrder
    bookingError?: SortOrder
    deliveryStatus?: SortOrder
    deliveryType?: SortOrder
    deliveryInstructions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeliverySumOrderByAggregateInput = {
    insuranceAmount?: SortOrder
    insure_percentage?: SortOrder
    insurance_cost?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MessageTemplateUserIdMetaTemplateIdCompoundUniqueInput = {
    userId: string
    metaTemplateId: string
  }

  export type MessageTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    metaTemplateId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    language?: SortOrder
    status?: SortOrder
    category?: SortOrder
    previousCategory?: SortOrder
    parameterFormat?: SortOrder
    components?: SortOrder
    disableIosAutofill?: SortOrder
    isPrimaryDeviceDeliveryOnly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    metaTemplateId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    language?: SortOrder
    status?: SortOrder
    category?: SortOrder
    previousCategory?: SortOrder
    parameterFormat?: SortOrder
    disableIosAutofill?: SortOrder
    isPrimaryDeviceDeliveryOnly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    metaTemplateId?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    language?: SortOrder
    status?: SortOrder
    category?: SortOrder
    previousCategory?: SortOrder
    parameterFormat?: SortOrder
    disableIosAutofill?: SortOrder
    isPrimaryDeviceDeliveryOnly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type CreditTransactionListRelationFilter = {
    every?: CreditTransactionWhereInput
    some?: CreditTransactionWhereInput
    none?: CreditTransactionWhereInput
  }

  export type CreditPurchaseListRelationFilter = {
    every?: CreditPurchaseWhereInput
    some?: CreditPurchaseWhereInput
    none?: CreditPurchaseWhereInput
  }

  export type CreditTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreditPurchaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreditWalletCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditWalletAvgOrderByAggregateInput = {
    balance?: SortOrder
    points?: SortOrder
  }

  export type CreditWalletMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditWalletMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditWalletSumOrderByAggregateInput = {
    balance?: SortOrder
    points?: SortOrder
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

  export type EnumCreditTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditTransactionType | EnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditTransactionTypeFilter<$PrismaModel> | $Enums.CreditTransactionType
  }

  export type CreditWalletScalarRelationFilter = {
    is?: CreditWalletWhereInput
    isNot?: CreditWalletWhereInput
  }

  export type CreditTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    reference?: SortOrder
    idempotencyKey?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type CreditTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    reference?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    description?: SortOrder
    reference?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type EnumCreditTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditTransactionType | EnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.CreditTransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreditTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumCreditTransactionTypeFilter<$PrismaModel>
  }

  export type CreditPackageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    priceKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditPackageAvgOrderByAggregateInput = {
    priceKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
  }

  export type CreditPackageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    priceKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditPackageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    priceKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditPackageSumOrderByAggregateInput = {
    priceKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
  }

  export type EnumCreditPurchaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditPurchaseStatus | EnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CreditPurchaseStatus[] | ListEnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditPurchaseStatus[] | ListEnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditPurchaseStatusFilter<$PrismaModel> | $Enums.CreditPurchaseStatus
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

  export type CreditPackageScalarRelationFilter = {
    is?: CreditPackageWhereInput
    isNot?: CreditPackageWhereInput
  }

  export type CreditPurchaseCountOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    packageId?: SortOrder
    amountKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
    paymentReference?: SortOrder
    checkoutSessionId?: SortOrder
    checkoutUrl?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditPurchaseAvgOrderByAggregateInput = {
    amountKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
  }

  export type CreditPurchaseMaxOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    packageId?: SortOrder
    amountKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
    paymentReference?: SortOrder
    checkoutSessionId?: SortOrder
    checkoutUrl?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditPurchaseMinOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    packageId?: SortOrder
    amountKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
    paymentReference?: SortOrder
    checkoutSessionId?: SortOrder
    checkoutUrl?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CreditPurchaseSumOrderByAggregateInput = {
    amountKobo?: SortOrder
    credits?: SortOrder
    bonusCredits?: SortOrder
  }

  export type EnumCreditPurchaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditPurchaseStatus | EnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CreditPurchaseStatus[] | ListEnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditPurchaseStatus[] | ListEnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditPurchaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.CreditPurchaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreditPurchaseStatusFilter<$PrismaModel>
    _max?: NestedEnumCreditPurchaseStatusFilter<$PrismaModel>
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

  export type AutomationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    trigger?: SortOrder
    triggerValue?: SortOrder
    action?: SortOrder
    actionTemplate?: SortOrder
    enabled?: SortOrder
    totalRuns?: SortOrder
    lastTriggered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AutomationAvgOrderByAggregateInput = {
    totalRuns?: SortOrder
  }

  export type AutomationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    trigger?: SortOrder
    triggerValue?: SortOrder
    action?: SortOrder
    actionTemplate?: SortOrder
    enabled?: SortOrder
    totalRuns?: SortOrder
    lastTriggered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AutomationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    trigger?: SortOrder
    triggerValue?: SortOrder
    action?: SortOrder
    actionTemplate?: SortOrder
    enabled?: SortOrder
    totalRuns?: SortOrder
    lastTriggered?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AutomationSumOrderByAggregateInput = {
    totalRuns?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    recipientPhone?: SortOrder
    templateName?: SortOrder
    templateLanguage?: SortOrder
    templateMessage?: SortOrder
    whatsappMessageId?: SortOrder
    deliveryTrackingId?: SortOrder
    sendAt?: SortOrder
    ReadAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    recipientPhone?: SortOrder
    templateName?: SortOrder
    templateLanguage?: SortOrder
    templateMessage?: SortOrder
    whatsappMessageId?: SortOrder
    deliveryTrackingId?: SortOrder
    sendAt?: SortOrder
    ReadAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    recipientPhone?: SortOrder
    templateName?: SortOrder
    templateLanguage?: SortOrder
    templateMessage?: SortOrder
    whatsappMessageId?: SortOrder
    deliveryTrackingId?: SortOrder
    sendAt?: SortOrder
    ReadAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCreateselectedPhoneNumberIdInput = {
    set: string[]
  }

  export type MessageTemplateCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput> | MessageTemplateCreateWithoutUserInput[] | MessageTemplateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutUserInput | MessageTemplateCreateOrConnectWithoutUserInput[]
    createMany?: MessageTemplateCreateManyUserInputEnvelope
    connect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
  }

  export type AutomationCreateNestedManyWithoutUserInput = {
    create?: XOR<AutomationCreateWithoutUserInput, AutomationUncheckedCreateWithoutUserInput> | AutomationCreateWithoutUserInput[] | AutomationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AutomationCreateOrConnectWithoutUserInput | AutomationCreateOrConnectWithoutUserInput[]
    createMany?: AutomationCreateManyUserInputEnvelope
    connect?: AutomationWhereUniqueInput | AutomationWhereUniqueInput[]
  }

  export type CreditWalletCreateNestedOneWithoutUserInput = {
    create?: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreditWalletCreateOrConnectWithoutUserInput
    connect?: CreditWalletWhereUniqueInput
  }

  export type MessageTemplateUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput> | MessageTemplateCreateWithoutUserInput[] | MessageTemplateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutUserInput | MessageTemplateCreateOrConnectWithoutUserInput[]
    createMany?: MessageTemplateCreateManyUserInputEnvelope
    connect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
  }

  export type AutomationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AutomationCreateWithoutUserInput, AutomationUncheckedCreateWithoutUserInput> | AutomationCreateWithoutUserInput[] | AutomationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AutomationCreateOrConnectWithoutUserInput | AutomationCreateOrConnectWithoutUserInput[]
    createMany?: AutomationCreateManyUserInputEnvelope
    connect?: AutomationWhereUniqueInput | AutomationWhereUniqueInput[]
  }

  export type CreditWalletUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreditWalletCreateOrConnectWithoutUserInput
    connect?: CreditWalletWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateselectedPhoneNumberIdInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MessageTemplateUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput> | MessageTemplateCreateWithoutUserInput[] | MessageTemplateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutUserInput | MessageTemplateCreateOrConnectWithoutUserInput[]
    upsert?: MessageTemplateUpsertWithWhereUniqueWithoutUserInput | MessageTemplateUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageTemplateCreateManyUserInputEnvelope
    set?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    disconnect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    delete?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    connect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    update?: MessageTemplateUpdateWithWhereUniqueWithoutUserInput | MessageTemplateUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageTemplateUpdateManyWithWhereWithoutUserInput | MessageTemplateUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageTemplateScalarWhereInput | MessageTemplateScalarWhereInput[]
  }

  export type AutomationUpdateManyWithoutUserNestedInput = {
    create?: XOR<AutomationCreateWithoutUserInput, AutomationUncheckedCreateWithoutUserInput> | AutomationCreateWithoutUserInput[] | AutomationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AutomationCreateOrConnectWithoutUserInput | AutomationCreateOrConnectWithoutUserInput[]
    upsert?: AutomationUpsertWithWhereUniqueWithoutUserInput | AutomationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AutomationCreateManyUserInputEnvelope
    set?: AutomationWhereUniqueInput | AutomationWhereUniqueInput[]
    disconnect?: AutomationWhereUniqueInput | AutomationWhereUniqueInput[]
    delete?: AutomationWhereUniqueInput | AutomationWhereUniqueInput[]
    connect?: AutomationWhereUniqueInput | AutomationWhereUniqueInput[]
    update?: AutomationUpdateWithWhereUniqueWithoutUserInput | AutomationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AutomationUpdateManyWithWhereWithoutUserInput | AutomationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AutomationScalarWhereInput | AutomationScalarWhereInput[]
  }

  export type CreditWalletUpdateOneWithoutUserNestedInput = {
    create?: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreditWalletCreateOrConnectWithoutUserInput
    upsert?: CreditWalletUpsertWithoutUserInput
    disconnect?: CreditWalletWhereInput | boolean
    delete?: CreditWalletWhereInput | boolean
    connect?: CreditWalletWhereUniqueInput
    update?: XOR<XOR<CreditWalletUpdateToOneWithWhereWithoutUserInput, CreditWalletUpdateWithoutUserInput>, CreditWalletUncheckedUpdateWithoutUserInput>
  }

  export type MessageTemplateUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput> | MessageTemplateCreateWithoutUserInput[] | MessageTemplateUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MessageTemplateCreateOrConnectWithoutUserInput | MessageTemplateCreateOrConnectWithoutUserInput[]
    upsert?: MessageTemplateUpsertWithWhereUniqueWithoutUserInput | MessageTemplateUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MessageTemplateCreateManyUserInputEnvelope
    set?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    disconnect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    delete?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    connect?: MessageTemplateWhereUniqueInput | MessageTemplateWhereUniqueInput[]
    update?: MessageTemplateUpdateWithWhereUniqueWithoutUserInput | MessageTemplateUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MessageTemplateUpdateManyWithWhereWithoutUserInput | MessageTemplateUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MessageTemplateScalarWhereInput | MessageTemplateScalarWhereInput[]
  }

  export type AutomationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AutomationCreateWithoutUserInput, AutomationUncheckedCreateWithoutUserInput> | AutomationCreateWithoutUserInput[] | AutomationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AutomationCreateOrConnectWithoutUserInput | AutomationCreateOrConnectWithoutUserInput[]
    upsert?: AutomationUpsertWithWhereUniqueWithoutUserInput | AutomationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AutomationCreateManyUserInputEnvelope
    set?: AutomationWhereUniqueInput | AutomationWhereUniqueInput[]
    disconnect?: AutomationWhereUniqueInput | AutomationWhereUniqueInput[]
    delete?: AutomationWhereUniqueInput | AutomationWhereUniqueInput[]
    connect?: AutomationWhereUniqueInput | AutomationWhereUniqueInput[]
    update?: AutomationUpdateWithWhereUniqueWithoutUserInput | AutomationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AutomationUpdateManyWithWhereWithoutUserInput | AutomationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AutomationScalarWhereInput | AutomationScalarWhereInput[]
  }

  export type CreditWalletUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: CreditWalletCreateOrConnectWithoutUserInput
    upsert?: CreditWalletUpsertWithoutUserInput
    disconnect?: CreditWalletWhereInput | boolean
    delete?: CreditWalletWhereInput | boolean
    connect?: CreditWalletWhereUniqueInput
    update?: XOR<XOR<CreditWalletUpdateToOneWithWhereWithoutUserInput, CreditWalletUpdateWithoutUserInput>, CreditWalletUncheckedUpdateWithoutUserInput>
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutMessageTemplatesInput = {
    create?: XOR<UserCreateWithoutMessageTemplatesInput, UserUncheckedCreateWithoutMessageTemplatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessageTemplatesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMessageTemplatesNestedInput = {
    create?: XOR<UserCreateWithoutMessageTemplatesInput, UserUncheckedCreateWithoutMessageTemplatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMessageTemplatesInput
    upsert?: UserUpsertWithoutMessageTemplatesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMessageTemplatesInput, UserUpdateWithoutMessageTemplatesInput>, UserUncheckedUpdateWithoutMessageTemplatesInput>
  }

  export type UserCreateNestedOneWithoutCreditWalletInput = {
    create?: XOR<UserCreateWithoutCreditWalletInput, UserUncheckedCreateWithoutCreditWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditWalletInput
    connect?: UserWhereUniqueInput
  }

  export type CreditTransactionCreateNestedManyWithoutWalletInput = {
    create?: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput> | CreditTransactionCreateWithoutWalletInput[] | CreditTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutWalletInput | CreditTransactionCreateOrConnectWithoutWalletInput[]
    createMany?: CreditTransactionCreateManyWalletInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type CreditPurchaseCreateNestedManyWithoutWalletInput = {
    create?: XOR<CreditPurchaseCreateWithoutWalletInput, CreditPurchaseUncheckedCreateWithoutWalletInput> | CreditPurchaseCreateWithoutWalletInput[] | CreditPurchaseUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditPurchaseCreateOrConnectWithoutWalletInput | CreditPurchaseCreateOrConnectWithoutWalletInput[]
    createMany?: CreditPurchaseCreateManyWalletInputEnvelope
    connect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
  }

  export type CreditTransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput> | CreditTransactionCreateWithoutWalletInput[] | CreditTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutWalletInput | CreditTransactionCreateOrConnectWithoutWalletInput[]
    createMany?: CreditTransactionCreateManyWalletInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type CreditPurchaseUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<CreditPurchaseCreateWithoutWalletInput, CreditPurchaseUncheckedCreateWithoutWalletInput> | CreditPurchaseCreateWithoutWalletInput[] | CreditPurchaseUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditPurchaseCreateOrConnectWithoutWalletInput | CreditPurchaseCreateOrConnectWithoutWalletInput[]
    createMany?: CreditPurchaseCreateManyWalletInputEnvelope
    connect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutCreditWalletNestedInput = {
    create?: XOR<UserCreateWithoutCreditWalletInput, UserUncheckedCreateWithoutCreditWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditWalletInput
    upsert?: UserUpsertWithoutCreditWalletInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreditWalletInput, UserUpdateWithoutCreditWalletInput>, UserUncheckedUpdateWithoutCreditWalletInput>
  }

  export type CreditTransactionUpdateManyWithoutWalletNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput> | CreditTransactionCreateWithoutWalletInput[] | CreditTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutWalletInput | CreditTransactionCreateOrConnectWithoutWalletInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutWalletInput | CreditTransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: CreditTransactionCreateManyWalletInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutWalletInput | CreditTransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutWalletInput | CreditTransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type CreditPurchaseUpdateManyWithoutWalletNestedInput = {
    create?: XOR<CreditPurchaseCreateWithoutWalletInput, CreditPurchaseUncheckedCreateWithoutWalletInput> | CreditPurchaseCreateWithoutWalletInput[] | CreditPurchaseUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditPurchaseCreateOrConnectWithoutWalletInput | CreditPurchaseCreateOrConnectWithoutWalletInput[]
    upsert?: CreditPurchaseUpsertWithWhereUniqueWithoutWalletInput | CreditPurchaseUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: CreditPurchaseCreateManyWalletInputEnvelope
    set?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    disconnect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    delete?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    connect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    update?: CreditPurchaseUpdateWithWhereUniqueWithoutWalletInput | CreditPurchaseUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: CreditPurchaseUpdateManyWithWhereWithoutWalletInput | CreditPurchaseUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: CreditPurchaseScalarWhereInput | CreditPurchaseScalarWhereInput[]
  }

  export type CreditTransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput> | CreditTransactionCreateWithoutWalletInput[] | CreditTransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutWalletInput | CreditTransactionCreateOrConnectWithoutWalletInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutWalletInput | CreditTransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: CreditTransactionCreateManyWalletInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutWalletInput | CreditTransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutWalletInput | CreditTransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type CreditPurchaseUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<CreditPurchaseCreateWithoutWalletInput, CreditPurchaseUncheckedCreateWithoutWalletInput> | CreditPurchaseCreateWithoutWalletInput[] | CreditPurchaseUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: CreditPurchaseCreateOrConnectWithoutWalletInput | CreditPurchaseCreateOrConnectWithoutWalletInput[]
    upsert?: CreditPurchaseUpsertWithWhereUniqueWithoutWalletInput | CreditPurchaseUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: CreditPurchaseCreateManyWalletInputEnvelope
    set?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    disconnect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    delete?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    connect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    update?: CreditPurchaseUpdateWithWhereUniqueWithoutWalletInput | CreditPurchaseUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: CreditPurchaseUpdateManyWithWhereWithoutWalletInput | CreditPurchaseUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: CreditPurchaseScalarWhereInput | CreditPurchaseScalarWhereInput[]
  }

  export type CreditWalletCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<CreditWalletCreateWithoutTransactionsInput, CreditWalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CreditWalletCreateOrConnectWithoutTransactionsInput
    connect?: CreditWalletWhereUniqueInput
  }

  export type EnumCreditTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.CreditTransactionType
  }

  export type CreditWalletUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<CreditWalletCreateWithoutTransactionsInput, CreditWalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CreditWalletCreateOrConnectWithoutTransactionsInput
    upsert?: CreditWalletUpsertWithoutTransactionsInput
    connect?: CreditWalletWhereUniqueInput
    update?: XOR<XOR<CreditWalletUpdateToOneWithWhereWithoutTransactionsInput, CreditWalletUpdateWithoutTransactionsInput>, CreditWalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type CreditPurchaseCreateNestedManyWithoutPackageInput = {
    create?: XOR<CreditPurchaseCreateWithoutPackageInput, CreditPurchaseUncheckedCreateWithoutPackageInput> | CreditPurchaseCreateWithoutPackageInput[] | CreditPurchaseUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: CreditPurchaseCreateOrConnectWithoutPackageInput | CreditPurchaseCreateOrConnectWithoutPackageInput[]
    createMany?: CreditPurchaseCreateManyPackageInputEnvelope
    connect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
  }

  export type CreditPurchaseUncheckedCreateNestedManyWithoutPackageInput = {
    create?: XOR<CreditPurchaseCreateWithoutPackageInput, CreditPurchaseUncheckedCreateWithoutPackageInput> | CreditPurchaseCreateWithoutPackageInput[] | CreditPurchaseUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: CreditPurchaseCreateOrConnectWithoutPackageInput | CreditPurchaseCreateOrConnectWithoutPackageInput[]
    createMany?: CreditPurchaseCreateManyPackageInputEnvelope
    connect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
  }

  export type CreditPurchaseUpdateManyWithoutPackageNestedInput = {
    create?: XOR<CreditPurchaseCreateWithoutPackageInput, CreditPurchaseUncheckedCreateWithoutPackageInput> | CreditPurchaseCreateWithoutPackageInput[] | CreditPurchaseUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: CreditPurchaseCreateOrConnectWithoutPackageInput | CreditPurchaseCreateOrConnectWithoutPackageInput[]
    upsert?: CreditPurchaseUpsertWithWhereUniqueWithoutPackageInput | CreditPurchaseUpsertWithWhereUniqueWithoutPackageInput[]
    createMany?: CreditPurchaseCreateManyPackageInputEnvelope
    set?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    disconnect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    delete?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    connect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    update?: CreditPurchaseUpdateWithWhereUniqueWithoutPackageInput | CreditPurchaseUpdateWithWhereUniqueWithoutPackageInput[]
    updateMany?: CreditPurchaseUpdateManyWithWhereWithoutPackageInput | CreditPurchaseUpdateManyWithWhereWithoutPackageInput[]
    deleteMany?: CreditPurchaseScalarWhereInput | CreditPurchaseScalarWhereInput[]
  }

  export type CreditPurchaseUncheckedUpdateManyWithoutPackageNestedInput = {
    create?: XOR<CreditPurchaseCreateWithoutPackageInput, CreditPurchaseUncheckedCreateWithoutPackageInput> | CreditPurchaseCreateWithoutPackageInput[] | CreditPurchaseUncheckedCreateWithoutPackageInput[]
    connectOrCreate?: CreditPurchaseCreateOrConnectWithoutPackageInput | CreditPurchaseCreateOrConnectWithoutPackageInput[]
    upsert?: CreditPurchaseUpsertWithWhereUniqueWithoutPackageInput | CreditPurchaseUpsertWithWhereUniqueWithoutPackageInput[]
    createMany?: CreditPurchaseCreateManyPackageInputEnvelope
    set?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    disconnect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    delete?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    connect?: CreditPurchaseWhereUniqueInput | CreditPurchaseWhereUniqueInput[]
    update?: CreditPurchaseUpdateWithWhereUniqueWithoutPackageInput | CreditPurchaseUpdateWithWhereUniqueWithoutPackageInput[]
    updateMany?: CreditPurchaseUpdateManyWithWhereWithoutPackageInput | CreditPurchaseUpdateManyWithWhereWithoutPackageInput[]
    deleteMany?: CreditPurchaseScalarWhereInput | CreditPurchaseScalarWhereInput[]
  }

  export type CreditWalletCreateNestedOneWithoutPurchasesInput = {
    create?: XOR<CreditWalletCreateWithoutPurchasesInput, CreditWalletUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: CreditWalletCreateOrConnectWithoutPurchasesInput
    connect?: CreditWalletWhereUniqueInput
  }

  export type CreditPackageCreateNestedOneWithoutPurchasesInput = {
    create?: XOR<CreditPackageCreateWithoutPurchasesInput, CreditPackageUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: CreditPackageCreateOrConnectWithoutPurchasesInput
    connect?: CreditPackageWhereUniqueInput
  }

  export type EnumCreditPurchaseStatusFieldUpdateOperationsInput = {
    set?: $Enums.CreditPurchaseStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CreditWalletUpdateOneRequiredWithoutPurchasesNestedInput = {
    create?: XOR<CreditWalletCreateWithoutPurchasesInput, CreditWalletUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: CreditWalletCreateOrConnectWithoutPurchasesInput
    upsert?: CreditWalletUpsertWithoutPurchasesInput
    connect?: CreditWalletWhereUniqueInput
    update?: XOR<XOR<CreditWalletUpdateToOneWithWhereWithoutPurchasesInput, CreditWalletUpdateWithoutPurchasesInput>, CreditWalletUncheckedUpdateWithoutPurchasesInput>
  }

  export type CreditPackageUpdateOneRequiredWithoutPurchasesNestedInput = {
    create?: XOR<CreditPackageCreateWithoutPurchasesInput, CreditPackageUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: CreditPackageCreateOrConnectWithoutPurchasesInput
    upsert?: CreditPackageUpsertWithoutPurchasesInput
    connect?: CreditPackageWhereUniqueInput
    update?: XOR<XOR<CreditPackageUpdateToOneWithWhereWithoutPurchasesInput, CreditPackageUpdateWithoutPurchasesInput>, CreditPackageUncheckedUpdateWithoutPurchasesInput>
  }

  export type UserCreateNestedOneWithoutAutomationsInput = {
    create?: XOR<UserCreateWithoutAutomationsInput, UserUncheckedCreateWithoutAutomationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAutomationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAutomationsNestedInput = {
    create?: XOR<UserCreateWithoutAutomationsInput, UserUncheckedCreateWithoutAutomationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAutomationsInput
    upsert?: UserUpsertWithoutAutomationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAutomationsInput, UserUpdateWithoutAutomationsInput>, UserUncheckedUpdateWithoutAutomationsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type NestedEnumCreditTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditTransactionType | EnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditTransactionTypeFilter<$PrismaModel> | $Enums.CreditTransactionType
  }

  export type NestedEnumCreditTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditTransactionType | EnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.CreditTransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreditTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumCreditTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumCreditPurchaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditPurchaseStatus | EnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CreditPurchaseStatus[] | ListEnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditPurchaseStatus[] | ListEnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditPurchaseStatusFilter<$PrismaModel> | $Enums.CreditPurchaseStatus
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

  export type NestedEnumCreditPurchaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditPurchaseStatus | EnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CreditPurchaseStatus[] | ListEnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditPurchaseStatus[] | ListEnumCreditPurchaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditPurchaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.CreditPurchaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreditPurchaseStatusFilter<$PrismaModel>
    _max?: NestedEnumCreditPurchaseStatusFilter<$PrismaModel>
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

  export type MessageTemplateCreateWithoutUserInput = {
    id?: string
    metaTemplateId: string
    name: string
    language: string
    status: string
    category: string
    previousCategory?: string | null
    parameterFormat?: string | null
    components: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: boolean
    isPrimaryDeviceDeliveryOnly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageTemplateUncheckedCreateWithoutUserInput = {
    id?: string
    metaTemplateId: string
    name: string
    language: string
    status: string
    category: string
    previousCategory?: string | null
    parameterFormat?: string | null
    components: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: boolean
    isPrimaryDeviceDeliveryOnly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageTemplateCreateOrConnectWithoutUserInput = {
    where: MessageTemplateWhereUniqueInput
    create: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput>
  }

  export type MessageTemplateCreateManyUserInputEnvelope = {
    data: MessageTemplateCreateManyUserInput | MessageTemplateCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AutomationCreateWithoutUserInput = {
    id?: string
    name: string
    trigger: string
    triggerValue?: string | null
    action: string
    actionTemplate: string
    enabled?: boolean
    totalRuns?: number
    lastTriggered?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AutomationUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    trigger: string
    triggerValue?: string | null
    action: string
    actionTemplate: string
    enabled?: boolean
    totalRuns?: number
    lastTriggered?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AutomationCreateOrConnectWithoutUserInput = {
    where: AutomationWhereUniqueInput
    create: XOR<AutomationCreateWithoutUserInput, AutomationUncheckedCreateWithoutUserInput>
  }

  export type AutomationCreateManyUserInputEnvelope = {
    data: AutomationCreateManyUserInput | AutomationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CreditWalletCreateWithoutUserInput = {
    id?: string
    balance?: number
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: CreditTransactionCreateNestedManyWithoutWalletInput
    purchases?: CreditPurchaseCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletUncheckedCreateWithoutUserInput = {
    id?: string
    balance?: number
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: CreditTransactionUncheckedCreateNestedManyWithoutWalletInput
    purchases?: CreditPurchaseUncheckedCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletCreateOrConnectWithoutUserInput = {
    where: CreditWalletWhereUniqueInput
    create: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput>
  }

  export type MessageTemplateUpsertWithWhereUniqueWithoutUserInput = {
    where: MessageTemplateWhereUniqueInput
    update: XOR<MessageTemplateUpdateWithoutUserInput, MessageTemplateUncheckedUpdateWithoutUserInput>
    create: XOR<MessageTemplateCreateWithoutUserInput, MessageTemplateUncheckedCreateWithoutUserInput>
  }

  export type MessageTemplateUpdateWithWhereUniqueWithoutUserInput = {
    where: MessageTemplateWhereUniqueInput
    data: XOR<MessageTemplateUpdateWithoutUserInput, MessageTemplateUncheckedUpdateWithoutUserInput>
  }

  export type MessageTemplateUpdateManyWithWhereWithoutUserInput = {
    where: MessageTemplateScalarWhereInput
    data: XOR<MessageTemplateUpdateManyMutationInput, MessageTemplateUncheckedUpdateManyWithoutUserInput>
  }

  export type MessageTemplateScalarWhereInput = {
    AND?: MessageTemplateScalarWhereInput | MessageTemplateScalarWhereInput[]
    OR?: MessageTemplateScalarWhereInput[]
    NOT?: MessageTemplateScalarWhereInput | MessageTemplateScalarWhereInput[]
    id?: StringFilter<"MessageTemplate"> | string
    metaTemplateId?: StringFilter<"MessageTemplate"> | string
    userId?: StringFilter<"MessageTemplate"> | string
    name?: StringFilter<"MessageTemplate"> | string
    language?: StringFilter<"MessageTemplate"> | string
    status?: StringFilter<"MessageTemplate"> | string
    category?: StringFilter<"MessageTemplate"> | string
    previousCategory?: StringNullableFilter<"MessageTemplate"> | string | null
    parameterFormat?: StringNullableFilter<"MessageTemplate"> | string | null
    components?: JsonFilter<"MessageTemplate">
    disableIosAutofill?: BoolFilter<"MessageTemplate"> | boolean
    isPrimaryDeviceDeliveryOnly?: BoolFilter<"MessageTemplate"> | boolean
    createdAt?: DateTimeFilter<"MessageTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"MessageTemplate"> | Date | string
  }

  export type AutomationUpsertWithWhereUniqueWithoutUserInput = {
    where: AutomationWhereUniqueInput
    update: XOR<AutomationUpdateWithoutUserInput, AutomationUncheckedUpdateWithoutUserInput>
    create: XOR<AutomationCreateWithoutUserInput, AutomationUncheckedCreateWithoutUserInput>
  }

  export type AutomationUpdateWithWhereUniqueWithoutUserInput = {
    where: AutomationWhereUniqueInput
    data: XOR<AutomationUpdateWithoutUserInput, AutomationUncheckedUpdateWithoutUserInput>
  }

  export type AutomationUpdateManyWithWhereWithoutUserInput = {
    where: AutomationScalarWhereInput
    data: XOR<AutomationUpdateManyMutationInput, AutomationUncheckedUpdateManyWithoutUserInput>
  }

  export type AutomationScalarWhereInput = {
    AND?: AutomationScalarWhereInput | AutomationScalarWhereInput[]
    OR?: AutomationScalarWhereInput[]
    NOT?: AutomationScalarWhereInput | AutomationScalarWhereInput[]
    id?: StringFilter<"Automation"> | string
    userId?: StringFilter<"Automation"> | string
    name?: StringFilter<"Automation"> | string
    trigger?: StringFilter<"Automation"> | string
    triggerValue?: StringNullableFilter<"Automation"> | string | null
    action?: StringFilter<"Automation"> | string
    actionTemplate?: StringFilter<"Automation"> | string
    enabled?: BoolFilter<"Automation"> | boolean
    totalRuns?: IntFilter<"Automation"> | number
    lastTriggered?: DateTimeNullableFilter<"Automation"> | Date | string | null
    createdAt?: DateTimeFilter<"Automation"> | Date | string
    updatedAt?: DateTimeFilter<"Automation"> | Date | string
  }

  export type CreditWalletUpsertWithoutUserInput = {
    update: XOR<CreditWalletUpdateWithoutUserInput, CreditWalletUncheckedUpdateWithoutUserInput>
    create: XOR<CreditWalletCreateWithoutUserInput, CreditWalletUncheckedCreateWithoutUserInput>
    where?: CreditWalletWhereInput
  }

  export type CreditWalletUpdateToOneWithWhereWithoutUserInput = {
    where?: CreditWalletWhereInput
    data: XOR<CreditWalletUpdateWithoutUserInput, CreditWalletUncheckedUpdateWithoutUserInput>
  }

  export type CreditWalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: CreditTransactionUpdateManyWithoutWalletNestedInput
    purchases?: CreditPurchaseUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: CreditTransactionUncheckedUpdateManyWithoutWalletNestedInput
    purchases?: CreditPurchaseUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type UserCreateWithoutMessageTemplatesInput = {
    id?: string
    email: string
    password: string
    emailConfirmed?: boolean
    emailConfirmToken?: string | null
    businessName: string
    fullName: string
    metaUserId?: string | null
    appId?: string | null
    appSecret?: string | null
    facebookAcceessToken?: string | null
    grantedScopes?: string | null
    accessTokenExpiresIn?: string | null
    selectedWabaId?: string | null
    displayPhoneNumber?: string | null
    selectedFacebookBusinessId?: string | null
    selectedFacebookBusinessName?: string | null
    selectedPhoneNumberQualityRating?: string | null
    selectedPhoneNumberVerifiedName?: string | null
    webhookStatus?: boolean
    selectedPhoneNumberId?: UserCreateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: boolean
    createdAt?: Date | string
    hashedRefresh?: string | null
    automations?: AutomationCreateNestedManyWithoutUserInput
    creditWallet?: CreditWalletCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMessageTemplatesInput = {
    id?: string
    email: string
    password: string
    emailConfirmed?: boolean
    emailConfirmToken?: string | null
    businessName: string
    fullName: string
    metaUserId?: string | null
    appId?: string | null
    appSecret?: string | null
    facebookAcceessToken?: string | null
    grantedScopes?: string | null
    accessTokenExpiresIn?: string | null
    selectedWabaId?: string | null
    displayPhoneNumber?: string | null
    selectedFacebookBusinessId?: string | null
    selectedFacebookBusinessName?: string | null
    selectedPhoneNumberQualityRating?: string | null
    selectedPhoneNumberVerifiedName?: string | null
    webhookStatus?: boolean
    selectedPhoneNumberId?: UserCreateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: boolean
    createdAt?: Date | string
    hashedRefresh?: string | null
    automations?: AutomationUncheckedCreateNestedManyWithoutUserInput
    creditWallet?: CreditWalletUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMessageTemplatesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMessageTemplatesInput, UserUncheckedCreateWithoutMessageTemplatesInput>
  }

  export type UserUpsertWithoutMessageTemplatesInput = {
    update: XOR<UserUpdateWithoutMessageTemplatesInput, UserUncheckedUpdateWithoutMessageTemplatesInput>
    create: XOR<UserCreateWithoutMessageTemplatesInput, UserUncheckedCreateWithoutMessageTemplatesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMessageTemplatesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMessageTemplatesInput, UserUncheckedUpdateWithoutMessageTemplatesInput>
  }

  export type UserUpdateWithoutMessageTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    emailConfirmed?: BoolFieldUpdateOperationsInput | boolean
    emailConfirmToken?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    metaUserId?: NullableStringFieldUpdateOperationsInput | string | null
    appId?: NullableStringFieldUpdateOperationsInput | string | null
    appSecret?: NullableStringFieldUpdateOperationsInput | string | null
    facebookAcceessToken?: NullableStringFieldUpdateOperationsInput | string | null
    grantedScopes?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    selectedWabaId?: NullableStringFieldUpdateOperationsInput | string | null
    displayPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessName?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberQualityRating?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberVerifiedName?: NullableStringFieldUpdateOperationsInput | string | null
    webhookStatus?: BoolFieldUpdateOperationsInput | boolean
    selectedPhoneNumberId?: UserUpdateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hashedRefresh?: NullableStringFieldUpdateOperationsInput | string | null
    automations?: AutomationUpdateManyWithoutUserNestedInput
    creditWallet?: CreditWalletUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMessageTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    emailConfirmed?: BoolFieldUpdateOperationsInput | boolean
    emailConfirmToken?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    metaUserId?: NullableStringFieldUpdateOperationsInput | string | null
    appId?: NullableStringFieldUpdateOperationsInput | string | null
    appSecret?: NullableStringFieldUpdateOperationsInput | string | null
    facebookAcceessToken?: NullableStringFieldUpdateOperationsInput | string | null
    grantedScopes?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    selectedWabaId?: NullableStringFieldUpdateOperationsInput | string | null
    displayPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessName?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberQualityRating?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberVerifiedName?: NullableStringFieldUpdateOperationsInput | string | null
    webhookStatus?: BoolFieldUpdateOperationsInput | boolean
    selectedPhoneNumberId?: UserUpdateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hashedRefresh?: NullableStringFieldUpdateOperationsInput | string | null
    automations?: AutomationUncheckedUpdateManyWithoutUserNestedInput
    creditWallet?: CreditWalletUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutCreditWalletInput = {
    id?: string
    email: string
    password: string
    emailConfirmed?: boolean
    emailConfirmToken?: string | null
    businessName: string
    fullName: string
    metaUserId?: string | null
    appId?: string | null
    appSecret?: string | null
    facebookAcceessToken?: string | null
    grantedScopes?: string | null
    accessTokenExpiresIn?: string | null
    selectedWabaId?: string | null
    displayPhoneNumber?: string | null
    selectedFacebookBusinessId?: string | null
    selectedFacebookBusinessName?: string | null
    selectedPhoneNumberQualityRating?: string | null
    selectedPhoneNumberVerifiedName?: string | null
    webhookStatus?: boolean
    selectedPhoneNumberId?: UserCreateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: boolean
    createdAt?: Date | string
    hashedRefresh?: string | null
    messageTemplates?: MessageTemplateCreateNestedManyWithoutUserInput
    automations?: AutomationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreditWalletInput = {
    id?: string
    email: string
    password: string
    emailConfirmed?: boolean
    emailConfirmToken?: string | null
    businessName: string
    fullName: string
    metaUserId?: string | null
    appId?: string | null
    appSecret?: string | null
    facebookAcceessToken?: string | null
    grantedScopes?: string | null
    accessTokenExpiresIn?: string | null
    selectedWabaId?: string | null
    displayPhoneNumber?: string | null
    selectedFacebookBusinessId?: string | null
    selectedFacebookBusinessName?: string | null
    selectedPhoneNumberQualityRating?: string | null
    selectedPhoneNumberVerifiedName?: string | null
    webhookStatus?: boolean
    selectedPhoneNumberId?: UserCreateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: boolean
    createdAt?: Date | string
    hashedRefresh?: string | null
    messageTemplates?: MessageTemplateUncheckedCreateNestedManyWithoutUserInput
    automations?: AutomationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreditWalletInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreditWalletInput, UserUncheckedCreateWithoutCreditWalletInput>
  }

  export type CreditTransactionCreateWithoutWalletInput = {
    id?: string
    type: $Enums.CreditTransactionType
    amount: number
    balanceAfter: number
    description: string
    reference?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CreditTransactionUncheckedCreateWithoutWalletInput = {
    id?: string
    type: $Enums.CreditTransactionType
    amount: number
    balanceAfter: number
    description: string
    reference?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CreditTransactionCreateOrConnectWithoutWalletInput = {
    where: CreditTransactionWhereUniqueInput
    create: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput>
  }

  export type CreditTransactionCreateManyWalletInputEnvelope = {
    data: CreditTransactionCreateManyWalletInput | CreditTransactionCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type CreditPurchaseCreateWithoutWalletInput = {
    id?: string
    amountKobo: number
    credits: number
    bonusCredits?: number
    paymentReference: string
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    status?: $Enums.CreditPurchaseStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    package: CreditPackageCreateNestedOneWithoutPurchasesInput
  }

  export type CreditPurchaseUncheckedCreateWithoutWalletInput = {
    id?: string
    packageId: string
    amountKobo: number
    credits: number
    bonusCredits?: number
    paymentReference: string
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    status?: $Enums.CreditPurchaseStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditPurchaseCreateOrConnectWithoutWalletInput = {
    where: CreditPurchaseWhereUniqueInput
    create: XOR<CreditPurchaseCreateWithoutWalletInput, CreditPurchaseUncheckedCreateWithoutWalletInput>
  }

  export type CreditPurchaseCreateManyWalletInputEnvelope = {
    data: CreditPurchaseCreateManyWalletInput | CreditPurchaseCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreditWalletInput = {
    update: XOR<UserUpdateWithoutCreditWalletInput, UserUncheckedUpdateWithoutCreditWalletInput>
    create: XOR<UserCreateWithoutCreditWalletInput, UserUncheckedCreateWithoutCreditWalletInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreditWalletInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreditWalletInput, UserUncheckedUpdateWithoutCreditWalletInput>
  }

  export type UserUpdateWithoutCreditWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    emailConfirmed?: BoolFieldUpdateOperationsInput | boolean
    emailConfirmToken?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    metaUserId?: NullableStringFieldUpdateOperationsInput | string | null
    appId?: NullableStringFieldUpdateOperationsInput | string | null
    appSecret?: NullableStringFieldUpdateOperationsInput | string | null
    facebookAcceessToken?: NullableStringFieldUpdateOperationsInput | string | null
    grantedScopes?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    selectedWabaId?: NullableStringFieldUpdateOperationsInput | string | null
    displayPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessName?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberQualityRating?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberVerifiedName?: NullableStringFieldUpdateOperationsInput | string | null
    webhookStatus?: BoolFieldUpdateOperationsInput | boolean
    selectedPhoneNumberId?: UserUpdateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hashedRefresh?: NullableStringFieldUpdateOperationsInput | string | null
    messageTemplates?: MessageTemplateUpdateManyWithoutUserNestedInput
    automations?: AutomationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreditWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    emailConfirmed?: BoolFieldUpdateOperationsInput | boolean
    emailConfirmToken?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    metaUserId?: NullableStringFieldUpdateOperationsInput | string | null
    appId?: NullableStringFieldUpdateOperationsInput | string | null
    appSecret?: NullableStringFieldUpdateOperationsInput | string | null
    facebookAcceessToken?: NullableStringFieldUpdateOperationsInput | string | null
    grantedScopes?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    selectedWabaId?: NullableStringFieldUpdateOperationsInput | string | null
    displayPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessName?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberQualityRating?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberVerifiedName?: NullableStringFieldUpdateOperationsInput | string | null
    webhookStatus?: BoolFieldUpdateOperationsInput | boolean
    selectedPhoneNumberId?: UserUpdateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hashedRefresh?: NullableStringFieldUpdateOperationsInput | string | null
    messageTemplates?: MessageTemplateUncheckedUpdateManyWithoutUserNestedInput
    automations?: AutomationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CreditTransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: CreditTransactionWhereUniqueInput
    update: XOR<CreditTransactionUpdateWithoutWalletInput, CreditTransactionUncheckedUpdateWithoutWalletInput>
    create: XOR<CreditTransactionCreateWithoutWalletInput, CreditTransactionUncheckedCreateWithoutWalletInput>
  }

  export type CreditTransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: CreditTransactionWhereUniqueInput
    data: XOR<CreditTransactionUpdateWithoutWalletInput, CreditTransactionUncheckedUpdateWithoutWalletInput>
  }

  export type CreditTransactionUpdateManyWithWhereWithoutWalletInput = {
    where: CreditTransactionScalarWhereInput
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyWithoutWalletInput>
  }

  export type CreditTransactionScalarWhereInput = {
    AND?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
    OR?: CreditTransactionScalarWhereInput[]
    NOT?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
    id?: StringFilter<"CreditTransaction"> | string
    walletId?: StringFilter<"CreditTransaction"> | string
    type?: EnumCreditTransactionTypeFilter<"CreditTransaction"> | $Enums.CreditTransactionType
    amount?: IntFilter<"CreditTransaction"> | number
    balanceAfter?: IntFilter<"CreditTransaction"> | number
    description?: StringFilter<"CreditTransaction"> | string
    reference?: StringNullableFilter<"CreditTransaction"> | string | null
    idempotencyKey?: StringNullableFilter<"CreditTransaction"> | string | null
    metadata?: JsonNullableFilter<"CreditTransaction">
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
  }

  export type CreditPurchaseUpsertWithWhereUniqueWithoutWalletInput = {
    where: CreditPurchaseWhereUniqueInput
    update: XOR<CreditPurchaseUpdateWithoutWalletInput, CreditPurchaseUncheckedUpdateWithoutWalletInput>
    create: XOR<CreditPurchaseCreateWithoutWalletInput, CreditPurchaseUncheckedCreateWithoutWalletInput>
  }

  export type CreditPurchaseUpdateWithWhereUniqueWithoutWalletInput = {
    where: CreditPurchaseWhereUniqueInput
    data: XOR<CreditPurchaseUpdateWithoutWalletInput, CreditPurchaseUncheckedUpdateWithoutWalletInput>
  }

  export type CreditPurchaseUpdateManyWithWhereWithoutWalletInput = {
    where: CreditPurchaseScalarWhereInput
    data: XOR<CreditPurchaseUpdateManyMutationInput, CreditPurchaseUncheckedUpdateManyWithoutWalletInput>
  }

  export type CreditPurchaseScalarWhereInput = {
    AND?: CreditPurchaseScalarWhereInput | CreditPurchaseScalarWhereInput[]
    OR?: CreditPurchaseScalarWhereInput[]
    NOT?: CreditPurchaseScalarWhereInput | CreditPurchaseScalarWhereInput[]
    id?: StringFilter<"CreditPurchase"> | string
    walletId?: StringFilter<"CreditPurchase"> | string
    packageId?: StringFilter<"CreditPurchase"> | string
    amountKobo?: IntFilter<"CreditPurchase"> | number
    credits?: IntFilter<"CreditPurchase"> | number
    bonusCredits?: IntFilter<"CreditPurchase"> | number
    paymentReference?: StringFilter<"CreditPurchase"> | string
    checkoutSessionId?: StringNullableFilter<"CreditPurchase"> | string | null
    checkoutUrl?: StringNullableFilter<"CreditPurchase"> | string | null
    status?: EnumCreditPurchaseStatusFilter<"CreditPurchase"> | $Enums.CreditPurchaseStatus
    paidAt?: DateTimeNullableFilter<"CreditPurchase"> | Date | string | null
    createdAt?: DateTimeFilter<"CreditPurchase"> | Date | string
    updatedAt?: DateTimeFilter<"CreditPurchase"> | Date | string
  }

  export type CreditWalletCreateWithoutTransactionsInput = {
    id?: string
    balance?: number
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCreditWalletInput
    purchases?: CreditPurchaseCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletUncheckedCreateWithoutTransactionsInput = {
    id?: string
    userId: string
    balance?: number
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    purchases?: CreditPurchaseUncheckedCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletCreateOrConnectWithoutTransactionsInput = {
    where: CreditWalletWhereUniqueInput
    create: XOR<CreditWalletCreateWithoutTransactionsInput, CreditWalletUncheckedCreateWithoutTransactionsInput>
  }

  export type CreditWalletUpsertWithoutTransactionsInput = {
    update: XOR<CreditWalletUpdateWithoutTransactionsInput, CreditWalletUncheckedUpdateWithoutTransactionsInput>
    create: XOR<CreditWalletCreateWithoutTransactionsInput, CreditWalletUncheckedCreateWithoutTransactionsInput>
    where?: CreditWalletWhereInput
  }

  export type CreditWalletUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: CreditWalletWhereInput
    data: XOR<CreditWalletUpdateWithoutTransactionsInput, CreditWalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type CreditWalletUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCreditWalletNestedInput
    purchases?: CreditPurchaseUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchases?: CreditPurchaseUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type CreditPurchaseCreateWithoutPackageInput = {
    id?: string
    amountKobo: number
    credits: number
    bonusCredits?: number
    paymentReference: string
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    status?: $Enums.CreditPurchaseStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallet: CreditWalletCreateNestedOneWithoutPurchasesInput
  }

  export type CreditPurchaseUncheckedCreateWithoutPackageInput = {
    id?: string
    walletId: string
    amountKobo: number
    credits: number
    bonusCredits?: number
    paymentReference: string
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    status?: $Enums.CreditPurchaseStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditPurchaseCreateOrConnectWithoutPackageInput = {
    where: CreditPurchaseWhereUniqueInput
    create: XOR<CreditPurchaseCreateWithoutPackageInput, CreditPurchaseUncheckedCreateWithoutPackageInput>
  }

  export type CreditPurchaseCreateManyPackageInputEnvelope = {
    data: CreditPurchaseCreateManyPackageInput | CreditPurchaseCreateManyPackageInput[]
    skipDuplicates?: boolean
  }

  export type CreditPurchaseUpsertWithWhereUniqueWithoutPackageInput = {
    where: CreditPurchaseWhereUniqueInput
    update: XOR<CreditPurchaseUpdateWithoutPackageInput, CreditPurchaseUncheckedUpdateWithoutPackageInput>
    create: XOR<CreditPurchaseCreateWithoutPackageInput, CreditPurchaseUncheckedCreateWithoutPackageInput>
  }

  export type CreditPurchaseUpdateWithWhereUniqueWithoutPackageInput = {
    where: CreditPurchaseWhereUniqueInput
    data: XOR<CreditPurchaseUpdateWithoutPackageInput, CreditPurchaseUncheckedUpdateWithoutPackageInput>
  }

  export type CreditPurchaseUpdateManyWithWhereWithoutPackageInput = {
    where: CreditPurchaseScalarWhereInput
    data: XOR<CreditPurchaseUpdateManyMutationInput, CreditPurchaseUncheckedUpdateManyWithoutPackageInput>
  }

  export type CreditWalletCreateWithoutPurchasesInput = {
    id?: string
    balance?: number
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCreditWalletInput
    transactions?: CreditTransactionCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletUncheckedCreateWithoutPurchasesInput = {
    id?: string
    userId: string
    balance?: number
    points?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: CreditTransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type CreditWalletCreateOrConnectWithoutPurchasesInput = {
    where: CreditWalletWhereUniqueInput
    create: XOR<CreditWalletCreateWithoutPurchasesInput, CreditWalletUncheckedCreateWithoutPurchasesInput>
  }

  export type CreditPackageCreateWithoutPurchasesInput = {
    id?: string
    name: string
    priceKobo: number
    credits: number
    bonusCredits?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditPackageUncheckedCreateWithoutPurchasesInput = {
    id?: string
    name: string
    priceKobo: number
    credits: number
    bonusCredits?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditPackageCreateOrConnectWithoutPurchasesInput = {
    where: CreditPackageWhereUniqueInput
    create: XOR<CreditPackageCreateWithoutPurchasesInput, CreditPackageUncheckedCreateWithoutPurchasesInput>
  }

  export type CreditWalletUpsertWithoutPurchasesInput = {
    update: XOR<CreditWalletUpdateWithoutPurchasesInput, CreditWalletUncheckedUpdateWithoutPurchasesInput>
    create: XOR<CreditWalletCreateWithoutPurchasesInput, CreditWalletUncheckedCreateWithoutPurchasesInput>
    where?: CreditWalletWhereInput
  }

  export type CreditWalletUpdateToOneWithWhereWithoutPurchasesInput = {
    where?: CreditWalletWhereInput
    data: XOR<CreditWalletUpdateWithoutPurchasesInput, CreditWalletUncheckedUpdateWithoutPurchasesInput>
  }

  export type CreditWalletUpdateWithoutPurchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCreditWalletNestedInput
    transactions?: CreditTransactionUpdateManyWithoutWalletNestedInput
  }

  export type CreditWalletUncheckedUpdateWithoutPurchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: CreditTransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type CreditPackageUpsertWithoutPurchasesInput = {
    update: XOR<CreditPackageUpdateWithoutPurchasesInput, CreditPackageUncheckedUpdateWithoutPurchasesInput>
    create: XOR<CreditPackageCreateWithoutPurchasesInput, CreditPackageUncheckedCreateWithoutPurchasesInput>
    where?: CreditPackageWhereInput
  }

  export type CreditPackageUpdateToOneWithWhereWithoutPurchasesInput = {
    where?: CreditPackageWhereInput
    data: XOR<CreditPackageUpdateWithoutPurchasesInput, CreditPackageUncheckedUpdateWithoutPurchasesInput>
  }

  export type CreditPackageUpdateWithoutPurchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    priceKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditPackageUncheckedUpdateWithoutPurchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    priceKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutAutomationsInput = {
    id?: string
    email: string
    password: string
    emailConfirmed?: boolean
    emailConfirmToken?: string | null
    businessName: string
    fullName: string
    metaUserId?: string | null
    appId?: string | null
    appSecret?: string | null
    facebookAcceessToken?: string | null
    grantedScopes?: string | null
    accessTokenExpiresIn?: string | null
    selectedWabaId?: string | null
    displayPhoneNumber?: string | null
    selectedFacebookBusinessId?: string | null
    selectedFacebookBusinessName?: string | null
    selectedPhoneNumberQualityRating?: string | null
    selectedPhoneNumberVerifiedName?: string | null
    webhookStatus?: boolean
    selectedPhoneNumberId?: UserCreateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: boolean
    createdAt?: Date | string
    hashedRefresh?: string | null
    messageTemplates?: MessageTemplateCreateNestedManyWithoutUserInput
    creditWallet?: CreditWalletCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAutomationsInput = {
    id?: string
    email: string
    password: string
    emailConfirmed?: boolean
    emailConfirmToken?: string | null
    businessName: string
    fullName: string
    metaUserId?: string | null
    appId?: string | null
    appSecret?: string | null
    facebookAcceessToken?: string | null
    grantedScopes?: string | null
    accessTokenExpiresIn?: string | null
    selectedWabaId?: string | null
    displayPhoneNumber?: string | null
    selectedFacebookBusinessId?: string | null
    selectedFacebookBusinessName?: string | null
    selectedPhoneNumberQualityRating?: string | null
    selectedPhoneNumberVerifiedName?: string | null
    webhookStatus?: boolean
    selectedPhoneNumberId?: UserCreateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: boolean
    createdAt?: Date | string
    hashedRefresh?: string | null
    messageTemplates?: MessageTemplateUncheckedCreateNestedManyWithoutUserInput
    creditWallet?: CreditWalletUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAutomationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAutomationsInput, UserUncheckedCreateWithoutAutomationsInput>
  }

  export type UserUpsertWithoutAutomationsInput = {
    update: XOR<UserUpdateWithoutAutomationsInput, UserUncheckedUpdateWithoutAutomationsInput>
    create: XOR<UserCreateWithoutAutomationsInput, UserUncheckedCreateWithoutAutomationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAutomationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAutomationsInput, UserUncheckedUpdateWithoutAutomationsInput>
  }

  export type UserUpdateWithoutAutomationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    emailConfirmed?: BoolFieldUpdateOperationsInput | boolean
    emailConfirmToken?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    metaUserId?: NullableStringFieldUpdateOperationsInput | string | null
    appId?: NullableStringFieldUpdateOperationsInput | string | null
    appSecret?: NullableStringFieldUpdateOperationsInput | string | null
    facebookAcceessToken?: NullableStringFieldUpdateOperationsInput | string | null
    grantedScopes?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    selectedWabaId?: NullableStringFieldUpdateOperationsInput | string | null
    displayPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessName?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberQualityRating?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberVerifiedName?: NullableStringFieldUpdateOperationsInput | string | null
    webhookStatus?: BoolFieldUpdateOperationsInput | boolean
    selectedPhoneNumberId?: UserUpdateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hashedRefresh?: NullableStringFieldUpdateOperationsInput | string | null
    messageTemplates?: MessageTemplateUpdateManyWithoutUserNestedInput
    creditWallet?: CreditWalletUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAutomationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    emailConfirmed?: BoolFieldUpdateOperationsInput | boolean
    emailConfirmToken?: NullableStringFieldUpdateOperationsInput | string | null
    businessName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    metaUserId?: NullableStringFieldUpdateOperationsInput | string | null
    appId?: NullableStringFieldUpdateOperationsInput | string | null
    appSecret?: NullableStringFieldUpdateOperationsInput | string | null
    facebookAcceessToken?: NullableStringFieldUpdateOperationsInput | string | null
    grantedScopes?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresIn?: NullableStringFieldUpdateOperationsInput | string | null
    selectedWabaId?: NullableStringFieldUpdateOperationsInput | string | null
    displayPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedFacebookBusinessName?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberQualityRating?: NullableStringFieldUpdateOperationsInput | string | null
    selectedPhoneNumberVerifiedName?: NullableStringFieldUpdateOperationsInput | string | null
    webhookStatus?: BoolFieldUpdateOperationsInput | boolean
    selectedPhoneNumberId?: UserUpdateselectedPhoneNumberIdInput | string[]
    facebookConnectStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hashedRefresh?: NullableStringFieldUpdateOperationsInput | string | null
    messageTemplates?: MessageTemplateUncheckedUpdateManyWithoutUserNestedInput
    creditWallet?: CreditWalletUncheckedUpdateOneWithoutUserNestedInput
  }

  export type MessageTemplateCreateManyUserInput = {
    id?: string
    metaTemplateId: string
    name: string
    language: string
    status: string
    category: string
    previousCategory?: string | null
    parameterFormat?: string | null
    components: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: boolean
    isPrimaryDeviceDeliveryOnly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AutomationCreateManyUserInput = {
    id?: string
    name: string
    trigger: string
    triggerValue?: string | null
    action: string
    actionTemplate: string
    enabled?: boolean
    totalRuns?: number
    lastTriggered?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageTemplateUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTemplateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    previousCategory?: NullableStringFieldUpdateOperationsInput | string | null
    parameterFormat?: NullableStringFieldUpdateOperationsInput | string | null
    components?: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: BoolFieldUpdateOperationsInput | boolean
    isPrimaryDeviceDeliveryOnly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageTemplateUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTemplateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    previousCategory?: NullableStringFieldUpdateOperationsInput | string | null
    parameterFormat?: NullableStringFieldUpdateOperationsInput | string | null
    components?: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: BoolFieldUpdateOperationsInput | boolean
    isPrimaryDeviceDeliveryOnly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageTemplateUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    metaTemplateId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    previousCategory?: NullableStringFieldUpdateOperationsInput | string | null
    parameterFormat?: NullableStringFieldUpdateOperationsInput | string | null
    components?: JsonNullValueInput | InputJsonValue
    disableIosAutofill?: BoolFieldUpdateOperationsInput | boolean
    isPrimaryDeviceDeliveryOnly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    trigger?: StringFieldUpdateOperationsInput | string
    triggerValue?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    actionTemplate?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    totalRuns?: IntFieldUpdateOperationsInput | number
    lastTriggered?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    trigger?: StringFieldUpdateOperationsInput | string
    triggerValue?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    actionTemplate?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    totalRuns?: IntFieldUpdateOperationsInput | number
    lastTriggered?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    trigger?: StringFieldUpdateOperationsInput | string
    triggerValue?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    actionTemplate?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    totalRuns?: IntFieldUpdateOperationsInput | number
    lastTriggered?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionCreateManyWalletInput = {
    id?: string
    type: $Enums.CreditTransactionType
    amount: number
    balanceAfter: number
    description: string
    reference?: string | null
    idempotencyKey?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CreditPurchaseCreateManyWalletInput = {
    id?: string
    packageId: string
    amountKobo: number
    credits: number
    bonusCredits?: number
    paymentReference: string
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    status?: $Enums.CreditPurchaseStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditTransactionUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditPurchaseUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    paymentReference?: StringFieldUpdateOperationsInput | string
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCreditPurchaseStatusFieldUpdateOperationsInput | $Enums.CreditPurchaseStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    package?: CreditPackageUpdateOneRequiredWithoutPurchasesNestedInput
  }

  export type CreditPurchaseUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    amountKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    paymentReference?: StringFieldUpdateOperationsInput | string
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCreditPurchaseStatusFieldUpdateOperationsInput | $Enums.CreditPurchaseStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditPurchaseUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    packageId?: StringFieldUpdateOperationsInput | string
    amountKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    paymentReference?: StringFieldUpdateOperationsInput | string
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCreditPurchaseStatusFieldUpdateOperationsInput | $Enums.CreditPurchaseStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditPurchaseCreateManyPackageInput = {
    id?: string
    walletId: string
    amountKobo: number
    credits: number
    bonusCredits?: number
    paymentReference: string
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
    status?: $Enums.CreditPurchaseStatus
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditPurchaseUpdateWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    paymentReference?: StringFieldUpdateOperationsInput | string
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCreditPurchaseStatusFieldUpdateOperationsInput | $Enums.CreditPurchaseStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: CreditWalletUpdateOneRequiredWithoutPurchasesNestedInput
  }

  export type CreditPurchaseUncheckedUpdateWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    amountKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    paymentReference?: StringFieldUpdateOperationsInput | string
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCreditPurchaseStatusFieldUpdateOperationsInput | $Enums.CreditPurchaseStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditPurchaseUncheckedUpdateManyWithoutPackageInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    amountKobo?: IntFieldUpdateOperationsInput | number
    credits?: IntFieldUpdateOperationsInput | number
    bonusCredits?: IntFieldUpdateOperationsInput | number
    paymentReference?: StringFieldUpdateOperationsInput | string
    checkoutSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    checkoutUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCreditPurchaseStatusFieldUpdateOperationsInput | $Enums.CreditPurchaseStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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