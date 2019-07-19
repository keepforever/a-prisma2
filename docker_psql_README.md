### to launch container
```sh
docker run -p 5432:5432 -d \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=prisma_two_db \
    -v pgdata:/var/lib/postgresql/data \
    postgres
```

### to connect to running container with interactive terminal (-it)
-U (POSTGRES_USER)

```sh
docker exec -it <container-id/> psql -U postgres prisma_two_db
```

current container id = 5dd598950f51

docker exec -it 5dd598950f51 psql -U postgres prisma_two_db

### Restart docker container after it's been created

```sh
docker start silly_lamarr -i
# -i = interactive mode, i.e. you see console output and it commandeers the terminal output.  CTRL+c will shut down the container in interactive mode.
```

## Fresh Start Protocal

```sh
# remove container
docker rm <container_name>
docker volume rm pgdata
```
