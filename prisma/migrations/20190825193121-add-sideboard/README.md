# Migration `20190825193121-add-sideboard`

This migration has been generated at 8/25/2019, 7:31:21 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "prisma_two_db_schema"."Deck" ADD COLUMN "sideBoardList" text   ;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20190809231546-init..20190825193121-add-sideboard
--- datamodel.dml
+++ datamodel.dml
@@ -7,35 +7,36 @@
     provider = "photonjs"
 }
 generator nexus_prisma {
-  provider = "nexus-prisma"
-  output   = "../node_modules/@generated/nexus-prisma"
+    provider = "nexus-prisma"
+    output   = "../node_modules/@generated/nexus-prisma"
 }
 model User {
-    id           String  @id @default(cuid())
-    name         String?
-    email        String  @unique
-    arenaHandle  String?
-    password     String
-    isAdmin      Boolean @default(false)
-    decks        Deck[]
+    id          String  @id @default(cuid())
+    name        String?
+    email       String  @unique
+    arenaHandle String?
+    password    String
+    isAdmin     Boolean @default(false)
+    decks       Deck[]
 }
 model Deck {
-    id         String  @id @default(cuid())
-    title      String?
-    list       String?
-    altList    String?
-    altCard    String?
-    comments   Comment[]
-    author     User?
+    id            String    @id @default(cuid())
+    title         String?
+    list          String?
+    sideBoardList String?
+    altList       String?
+    altCard       String?
+    comments      Comment[]
+    author        User?
 }
 model Comment {
-    id        String  @id @default(cuid())
-    content   String?
-    author    User?
-    deck      Deck?
-}
+    id      String  @id @default(cuid())
+    content String?
+    author  User?
+    deck    Deck?
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190825193121-add-sideboard)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190825193121-add-sideboard'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
