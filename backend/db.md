# Sequelize/Postgres

## Dev Postgres

```
sudo docker run -d \
    --name ecommerce-dev \
    -e POSTGRES_USER=dbuser \
    -e POSTGRES_PASSWORD=F83ai8qD \
    -e POSTGRES_DB=ecommerce-dev \
    -p 5432:5432 \
    postgres:13.1
```

```
postgres://dbuser1:123@localhost:5432/ecommerce-tests
```

```
sudo docker exec -ti ecommerce-tests psql -d ecommerce-tests -U dbuser1 -W
```

# Sequelize Migrations

```
npx sequelize migration:create --name name-the-migration

npx sequelize db:migrate

npx sequelize db:migrate:undo
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
sudo docker run -d \
    -e AUTH_PASSWORD=test \
    -p 1491:1491 \
    --name sonic-test \
    bruzt/sonic-env:v1.3.0
```
