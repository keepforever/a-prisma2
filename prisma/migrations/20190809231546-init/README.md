# Migration `20190809231546-init`

This migration has been generated at 8/9/2019, 11:15:46 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "prisma_two_db_schema"."User"("id" text NOT NULL  ,"name" text   ,"email" text NOT NULL DEFAULT '' ,"arenaHandle" text   ,"password" text NOT NULL DEFAULT '' ,"isAdmin" boolean NOT NULL DEFAULT false ,PRIMARY KEY ("id"));

CREATE TABLE "prisma_two_db_schema"."Deck"("id" text NOT NULL  ,"title" text   ,"list" text   ,"altList" text   ,"altCard" text   ,PRIMARY KEY ("id"));

CREATE TABLE "prisma_two_db_schema"."Comment"("id" text NOT NULL  ,"content" text   ,PRIMARY KEY ("id"));

ALTER TABLE "prisma_two_db_schema"."Deck" ADD COLUMN "author" text   REFERENCES "prisma_two_db_schema"."User"("id") ON DELETE SET NULL;

ALTER TABLE "prisma_two_db_schema"."Comment" ADD COLUMN "author" text   REFERENCES "prisma_two_db_schema"."User"("id") ON DELETE SET NULL,ADD COLUMN "deck" text   REFERENCES "prisma_two_db_schema"."Deck"("id") ON DELETE SET NULL;

CREATE UNIQUE INDEX "User.email._UNIQUE" ON "prisma_two_db_schema"."User"("email")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20190809231546-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,41 @@
+datasource db {
+    provider = "postgresql"
+    url      = "postgresql://postgres:postgres@localhost:5432/prisma_two_db?schema=prisma_two_db_schema"
+}
+
+generator photonjs {
+    provider = "photonjs"
+}
+
+generator nexus_prisma {
+  provider = "nexus-prisma"
+  output   = "../node_modules/@generated/nexus-prisma"
+}
+
+model User {
+    id           String  @id @default(cuid())
+    name         String?
+    email        String  @unique
+    arenaHandle  String?
+    password     String
+    isAdmin      Boolean @default(false)
+    decks        Deck[]
+}
+
+model Deck {
+    id         String  @id @default(cuid())
+    title      String?
+    list       String?
+    altList    String?
+    altCard    String?
+    comments   Comment[]
+    author     User?
+
+}
+
+model Comment {
+    id        String  @id @default(cuid())
+    content   String?
+    author    User?
+    deck      Deck?
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190809231546-init)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190809231546-init'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
