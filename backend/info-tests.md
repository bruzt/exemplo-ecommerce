
# Posgres Test

```
sudo docker run -d \
    --name ecommerce-tests \
    -e POSTGRES_USER=dbuser1 \
    -e POSTGRES_PASSWORD=123 \
    -e POSTGRES_DB=ecommerce-tests \
    -p 5432:5432 \
    postgres:12.3
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
