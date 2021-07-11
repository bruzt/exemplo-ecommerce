# Rotas


### BUSCA, ADICIONA, ALTERA OU REMOVE USUÁRIOS
- GET /users 
- GET /users/:id
- POST /users 
- PUT /users
- DELETE /users

### BUSCA, ADICIONA, ALTERA OU REMOVE ENDEREÇOS DE UM USUÁRIO
- GET /addresses 
- POST /addresses 
- PUT /addresses/:id 
- DELETE /addresses/:id 

### BUSCA OU ADICIONA PEDIDOS DE UM USUÁRIO
- GET /orders 
- POST /orders 

### BUSCA, ALTERA OU REMOVE PEDIDOS DE UM USUÁRIO POR UM ADMIN
- GET /admin/orders
- PUT /admin/orders/:id 
- DELETE /admin/orders/:id

### UPDATE DE SENHA POR EMAIL ("PERDEU A SENHA?")
- POST /reset-password 
- PUT /reset-password 

### AUTENTICAÇÃO JWT 
- POST /sessions 

### BUSCA, ADICIONA, ALTERA OU REMOVE UM PRODUTO
- GET /products 
- GET /products/:id 
- POST /products 
- PUT /products/:id 
- DELETE /products/:id

### ADICIONA OU REMOVE IMAGENS DO PRODUTO
- POST /products/:id/images 
- DELETE /products/images/:id 

### BUSCA, ADICIONA, ALTERA OU REMOVE UMA CATEGORIA
- GET /categories 
- POST /categories 
- PUT /categories/:id 
- DELETE /categories/:id 

### CALCULO DE FRETE
- POST /freight

## Executar testes automatizados

Instale os pacotes com ``` npm install ``` e inicie o [Sonic](https://github.com/valeriansaliou/sonic) com [Docker](https://www.docker.com/):

```
sudo docker run -d --rm \
    -e AUTH_PASSWORD=test \
    -p 1491:1491 \
    --name sonic-test \
    bruzt/sonic-env:v1.3.0
```

E o [Redis](https://github.com/redis/redis):
```
sudo docker run -d --rm \
    -p 6380:6379 \
    --name redis-test \
    redis:6.2.4
```

Execute o comando ``` npm test ``` para iniciar os testes, depois de terminado você pode entrar no diretório "coverage/lcov-report" que será gerado na raiz do projeto e abrir o arquivo "index.html" no seu navegador para ver a cobertura de código.
