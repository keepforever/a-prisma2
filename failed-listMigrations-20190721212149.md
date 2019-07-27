# Failed listMigrations at 2019-07-22T01:21:49.158Z

## RPC Input One Line

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "listMigrations",
  "params": {
    "projectInfo": "",
    "sourceConfig": "datasource db {\n    provider = \"postgresql\"\n    url      = \"postgresql://postgres:postgres@localhost:5432/prisma_two_db?schema=prisma_two_db_schema\"\n}\n\ngenerator photonjs {\n    provider = \"photonjs\"\n}\n\ngenerator nexus_prisma {\n  provider = \"nexus-prisma\"\n  output   = \"node_modules/@generated/nexus-prisma\"\n}\n\nmodel User {\n    id           String  @id @default(cuid())\n    name         String?\n    email        String  @unique\n    arenaHandle  String?\n    password     String\n    isAdmin      Boolean @default(false)\n    decks        Deck[]\n}\n\nmodel Deck {\n    id         String  @id @default(cuid())\n    title      String?\n    list       String?\n    comments   Comment[]\n    author     User?\n\n}\n\nmodel Comment {\n    id        String  @id @default(cuid())\n    content   String?\n    author    User?\n    deck      Deck?\n}\n"
  }
}
```

## RPC Input Readable

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "listMigrations",
  "params": {
    "projectInfo": "",
    "sourceConfig": "datasource db {\n    provider = \"postgresql\"\n    url      = \"postgresql://postgres:postgres@localhost:5432/prisma_two_db?schema=prisma_two_db_schema\"\n}\n\ngenerator photonjs {\n    provider = \"photonjs\"\n}\n\ngenerator nexus_prisma {\n  provider = \"nexus-prisma\"\n  output   = \"node_modules/@generated/nexus-prisma\"\n}\n\nmodel User {\n    id           String  @id @default(cuid())\n    name         String?\n    email        String  @unique\n    arenaHandle  String?\n    password     String\n    isAdmin      Boolean @default(false)\n    decks        Deck[]\n}\n\nmodel Deck {\n    id         String  @id @default(cuid())\n    title      String?\n    list       String?\n    comments   Comment[]\n    author     User?\n\n}\n\nmodel Comment {\n    id        String  @id @default(cuid())\n    content   String?\n    author    User?\n    deck      Deck?\n}\n"
  }
}
```

## RPC Response

```
null
```

## Stack Trace

```bash
thread 'main' panicked at 'The user does not have root privelege and can not create a new database: ConnectionError(Error(Some("error connecting to server: Connection refused (os error 61)"))

stack backtrace:
   0: backtrace::backtrace::trace::h5511721bea6fa8d5 (0x10dcfd86e)
   1: backtrace::capture::Backtrace::new_unresolved::h28f9c9663a9420c8 (0x10dcfc9c8)
   2: failure::backtrace::internal::InternalBacktrace::new::hbb41405b6d19ab81 (0x10dcfc369)
   3: <failure::backtrace::Backtrace as core::default::Default>::default::h0458ad281d4247c8 (0x10dcfc555)
   4: prisma_query::connector::postgres::PostgreSql::new::h1f21efc12a2cfcdf (0x10d81490b)
   5: sql_migration_connector::SqlMigrationConnector::postgres_helper::h10cbeb4f239a891d (0x10d70d3a0)
   6: sql_migration_connector::SqlMigrationConnector::exists::h2d110c105ff638e7 (0x10d70b906)
   7: migration_core::connector_loader::load_connector::h5d989a1bc479676e (0x10d68306d)
   8: migration_core::migration_engine::MigrationEngine::init::hba5b34748bf21fc8 (0x10d679c38)
   9: <F as jsonrpc_core::calls::RpcMethodSimple>::call::h774b3395bee13c7a (0x10d6bbee8)
  10: <F as jsonrpc_core::calls::RpcMethod<T>>::call::h1464f8be929ead7f (0x10d665a2c)
  11: <futures::future::lazy::Lazy<F,R> as futures::future::Future>::poll::h668ec6fc9740aa9c (0x10d678e32)
  12: <futures::future::then::Then<A,B,F> as futures::future::Future>::poll::h550d42fd170acd67 (0x10d6662f0)
  13: <futures::future::map::Map<A,F> as futures::future::Future>::poll::h5c2ff7578e36ca81 (0x10d68235f)
  14: <futures::future::either::Either<A,B> as futures::future::Future>::poll::h5a312a2b26e314b8 (0x10d679140)
  15: futures::task_impl::std::set::h39259597f0c1dd44 (0x10d6b0f3f)
  16: std::thread::local::LocalKey<T>::with::h388c44217b14f1f6 (0x10d6b4b46)
  17: futures::future::Future::wait::h8889cef155e7abec (0x10d6821af)
  18: jsonrpc_core::io::IoHandler<M>::handle_request_sync::hf66c69aa485c6f61 (0x10d66060f)
  19: migration_core::rpc_api::RpcApi::handle::h3b78035f1bef1619 (0x10d6c10bb)
  20: migration_engine::main::h3526b2b95e311013 (0x10d63cc2d)
  21: std::rt::lang_start::{{closure}}::ha0811c078ac13879 (0x10d63cbd6)
  22: std::panicking::try::do_call::h1252fc9a2ff235eb (0x10dd22ca8)
  23: __rust_maybe_catch_panic (0x10dd2708f)
  24: std::rt::lang_start_internal::h4c054360e442146c (0x10dd2378e)
  25: main (0x10d63cc89))', src/libcore/result.rs:997:5
stack backtrace:
   0: std::sys::unix::backtrace::tracing::imp::unwind_backtrace
   1: std::sys_common::backtrace::_print
   2: std::panicking::default_hook::{{closure}}
   3: std::panicking::default_hook
   4: std::panicking::rust_panic_with_hook
   5: std::panicking::continue_panic_fmt
   6: rust_begin_unwind
   7: core::panicking::panic_fmt
   8: core::result::unwrap_failed
   9: sql_migration_connector::SqlMigrationConnector::postgres_helper
  10: sql_migration_connector::SqlMigrationConnector::exists
  11: migration_core::connector_loader::load_connector
  12: migration_core::migration_engine::MigrationEngine::init
  13: <F as jsonrpc_core::calls::RpcMethodSimple>::call
  14: <F as jsonrpc_core::calls::RpcMethod<T>>::call
  15: <futures::future::lazy::Lazy<F,R> as futures::future::Future>::poll
  16: <futures::future::then::Then<A,B,F> as futures::future::Future>::poll
  17: <futures::future::map::Map<A,F> as futures::future::Future>::poll
  18: <futures::future::either::Either<A,B> as futures::future::Future>::poll
  19: futures::task_impl::std::set
  20: std::thread::local::LocalKey<T>::with
  21: futures::future::Future::wait
  22: jsonrpc_core::io::IoHandler<M>::handle_request_sync
  23: migration_core::rpc_api::RpcApi::handle
  24: migration_engine::main
  25: std::rt::lang_start::{{closure}}
  26: std::panicking::try::do_call
  27: __rust_maybe_catch_panic
  28: std::rt::lang_start_internal
  29: main

```
