1. Start Postgres Docker Conatiner

### 10-27-2019, new spin up postgres command

```sh
docker run -p 5432:5432 -d \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=mydatabase \
    -v pgdata:/var/lib/postgresql/data \
    postgres
```
### Old spin up postgres command
```sh
docker run -p 5432:5432 -d \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=prisma_two_db \
    -v pgdata:/var/lib/postgresql/data \
    postgres
```

The POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB used to instantiate the PostgreSQL docker container get used in `prsima/schema.prisma` like so:

```js
datasource db {
    provider = "postgresql"
    url      = "postgresql://postgres:postgres@localhost:5432/prisma_two_db?schema=prisma_two_db_schema"
}
```

2. Once your PostgreSQL backend is up and running, you need to create the tables. This is facilitated by the `prisma2 cli`

-   instantiate your migration:

```sh
prisma2 lift save --name '<whatever_name>'
```

-   run migration

```sh
prisma2 lift save --name 'add-profile-model'
```

Afterwards (and assuming a `success` message), if you were to connect to your database (for example with the popular [tableplus.io](https://tableplus.io/)), you should see the migration changes reflected in empty tables.

# Fresh Start Protocol

When you want to erase the data and data volume associated with the container you originally created run:

```sh
# remove container
docker rm <container_name>
docker volume rm pgdata
```

then, begin again at step 1 at the top.

common cli commands

```sh
prisma2 lift save --name '<whatever_name>'
```

```sh
prisma2 lift save --name 'add-profile-model'
```

```sh
prisma2 lift up
```

<Details><Summary>Expand to the view the <strong>collapsed text</strong>.</Summary>

### This is collapsed.

</Details>

### This is NOT collapsed.
