1. Start Postgres Docker Conatiner
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


# Fresh Start Protocol
When you want to erase the data and data volume associated with the container you originally created run:
```sh
# remove container
docker rm <container_name>
docker volume rm pgdata
```
then, begin again at step 1 at the top. 