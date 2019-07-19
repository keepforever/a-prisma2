# Migration `20190716234456-augment`

This migration has been generated at 7/16/2019, 11:44:56 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "prisma_two_db_schema"."User" DROP COLUMN "isGood",ADD COLUMN "password" text NOT NULL DEFAULT '' ;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20190716230950-init..20190716234456-augment
--- datamodel.dml
+++ datamodel.dml
@@ -6,14 +6,19 @@
 generator photonjs {
     provider = "photonjs"
 }
+generator nexus_prisma {
+  provider = "nexus-prisma"
+  output   = "node_modules/@generated/nexus-prisma"
+}
+
 model User {
     id    String  @id @default(cuid())
     name  String?
     email String  @unique
+    password String
     posts Post[]
-    isGood Boolean @default(true)
     profile Profile?
 }
 model Post {
```

## Photon Usage

You can use a specific Photon built for this migration (20190716234456-augment)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190716234456-augment'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
