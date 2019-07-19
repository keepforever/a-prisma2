# Migration `20190716230950-init`

This migration has been generated at 7/16/2019, 11:09:50 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "prisma_two_db_schema"."User"("id" text NOT NULL  ,"name" text   ,"email" text NOT NULL DEFAULT '' ,"isGood" boolean NOT NULL DEFAULT true ,PRIMARY KEY ("id"));

CREATE TABLE "prisma_two_db_schema"."Post"("id" text NOT NULL  ,"title" text NOT NULL DEFAULT '' ,"published" boolean NOT NULL DEFAULT false ,"isGood" boolean NOT NULL DEFAULT true ,PRIMARY KEY ("id"));

CREATE TABLE "prisma_two_db_schema"."Profile"("id" text NOT NULL  ,"description" text   ,"isVerified" boolean NOT NULL DEFAULT true ,PRIMARY KEY ("id"));

ALTER TABLE "prisma_two_db_schema"."Post" ADD COLUMN "author" text   REFERENCES "prisma_two_db_schema"."User"("id");

ALTER TABLE "prisma_two_db_schema"."Profile" ADD COLUMN "author" text   REFERENCES "prisma_two_db_schema"."User"("id");

CREATE UNIQUE INDEX "User.email._UNIQUE" ON "prisma_two_db_schema"."User"("email")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20190716230950-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,32 @@
+datasource db {
+    provider = "postgresql"
+    url      = "postgresql://postgres:postgres@localhost:5432/prisma_two_db?schema=prisma_two_db_schema"
+}
+
+generator photonjs {
+    provider = "photonjs"
+}
+
+model User {
+    id    String  @id @default(cuid())
+    name  String?
+    email String  @unique
+    posts Post[]
+    isGood Boolean @default(true)
+    profile Profile?
+}
+
+model Post {
+    id        String  @id @default(cuid())
+    title     String
+    published Boolean @default(false)
+    author User?
+    isGood Boolean @default(true)
+}
+
+model Profile {
+    id           String  @id @default(cuid())
+    description  String?
+    isVerified   Boolean @default(true)
+    author User?
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190716230950-init)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190716230950-init'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
