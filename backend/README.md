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

Instale os pacotes com "npm install" e execute o comando "npm test".
