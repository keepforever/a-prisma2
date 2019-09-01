# Migration `20190901171802-init-aws`

This migration has been generated at 9/1/2019, 5:18:02 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User"("arenaHandle" text   ,"email" text NOT NULL DEFAULT '' ,"id" text NOT NULL  ,"isAdmin" boolean NOT NULL DEFAULT false ,"name" text   ,"password" text NOT NULL DEFAULT '' ,PRIMARY KEY ("id"))
;

CREATE TABLE "public"."Deck"("altCard" text   ,"altList" text   ,"id" text NOT NULL  ,"list" text   ,"sideBoardList" text   ,"title" text   ,PRIMARY KEY ("id"))
;

CREATE TABLE "public"."Comment"("content" text   ,"id" text NOT NULL  ,PRIMARY KEY ("id"))
;

ALTER TABLE "public"."Deck" ADD COLUMN "author" text   REFERENCES "public"."User"("id") ON DELETE SET NULL;

ALTER TABLE "public"."Comment" ADD COLUMN "author" text   REFERENCES "public"."User"("id") ON DELETE SET NULL,ADD COLUMN "deck" text   REFERENCES "public"."Deck"("id") ON DELETE SET NULL;

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20190901171802-init-aws
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,42 @@
+datasource db {
+    provider = "postgresql"
+    url      = "postgresql://postgres:2Cu92EeHkwj2E@deck-app-database-1.cgd4q1qfb0nk.us-east-2.rds.amazonaws.com"
+}
+
+generator photonjs {
+    provider = "photonjs"
+}
+
+generator nexus_prisma {
+    provider = "nexus-prisma"
+    output   = "../node_modules/@generated/nexus-prisma"
+}
+
+model User {
+    id          String  @id @default(cuid())
+    name        String?
+    email       String  @unique
+    arenaHandle String?
+    password    String
+    isAdmin     Boolean @default(false)
+    decks       Deck[]
+}
+
+model Deck {
+    id            String    @id @default(cuid())
+    title         String?
+    list          String?
+    sideBoardList String?
+    altList       String?
+    altCard       String?
+    comments      Comment[]
+    author        User?
+
+}
+
+model Comment {
+    id      String  @id @default(cuid())
+    content String?
+    author  User?
+    deck    Deck?
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190901171802-init-aws)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190901171802-init-aws'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
