# Sequelize/Postgres

## Dev Postgres

```
sudo docker run -d \
    --name ecommerce-dev \
    -e POSTGRES_USER=dbuser \
    -e POSTGRES_PASSWORD=F83ai8qD \
    -e POSTGRES_DB=ecommerce-dev \
    -p 5432:5432 \
    postgres:13.2
```

```
postgres://dbuser1:123@localhost:5432/ecommerce-tests
```

```
sudo docker exec -ti ecommerce-tests psql -d ecommerce-tests -U dbuser1 -W
```

## Test Postgres

```
sudo docker run -d \
    --name ecommerce-test \
    -e POSTGRES_USER=dbtest \
    -e POSTGRES_PASSWORD=gh9U35vq \
    -e POSTGRES_DB=ecommerce-test \
    -p 5433:5432 \
    postgres:13.2
```

### TypeORM
```
npx typeorm migration:create -n migration-name
```

# Sonic

## Sonic Dev

```
sudo docker run -d \
    -e AUTH_PASSWORD=a8uY3TgP \
    -p 1491:1491 \
    --name sonic-dev \
    bruzt/sonic-env:v1.3.0
```

## Sonic Test

```
sudo docker run -d --rm \
    -e AUTH_PASSWORD=test \
    -p 1492:1491 \
    --name sonic-test \
    bruzt/sonic-env:v1.3.0
```