# Protótipo de um e-commerce
Backend: REST API feita com Express.js, banco de dados Postgres utilizando o ORM Sequelize.</br>
Frontend: Feita com React.js utilizando o framework Next.js para gerar páginas estáticas dos produtos com meta tags para maximizar a indexação de motores de busca.

## Backend
- Validação de dados recebidos pela rota com o pacote [Celebrate](https://github.com/arb/celebrate), para garantir que os dados são do tipo correto;
- Rotas para cadastro, atualização e remoção de usuários, endereços, categorias, produtos, upload de imagens de produtos e ordens de compra;
- Rota para autenticação de usuário com JWT (json web token);
- Upload de imagens do produto.

## Frontend
- Menu dropdown de categorias de produtos, montada automaticamente a partir das categorias cadastradas no banco de dados;
- Busca recursiva de produtos cadastrados nas categorias filhas;
- Barra de busca pelo nome do produto;
- Paginação na página de busca, com filtros de menor e maior valor;
- Card do produto, mostrando imagem, nome, preço, "em falta", porcentagem de desconto e preço após desconto;
- Página do produto exibindo um slider das imagens cadastradas, breadcrumb da árvore de categoria, nome, desconto, preço, quantidade a comprar, quantidade em estoque, dados de peso e medida, descrição e detalhes do produto;
- Carrinho de compra, montrando preço total, botões para aumentar e diminuir quantidade ou remover do carrinho, integração com a API dos correios para calculo de frete;
- Página para seleção do endereço de entrega, podendo cadastrar um novo endereço ou apagar um já cadastrado (podendo ter vários endereços cadastrados por usuário);
- Página de pagamento integrado com a API de pagamentos do Pagar.me, podendo escolher entre cartão de crédito ou boleto;
- Tela de confirmação de compra, no caso de boleto exibe link para boleto;
- Tela da conta do usuário, onde ele pode alterar suas informações de cadastro (nome, email e senha), adicionar ou remover endereços e visualizar suas ordens de compra.

<p align="center">
  <img src="https://github.com/bruzt/exemplo-ecommerce/blob/master/ecommerce1.png?raw=true">
</p>
<p align="center">
  <img src="https://github.com/bruzt/exemplo-ecommerce/blob/master/ecommerce2.png?raw=true">
</p>
<p align="center">
  <img src="https://github.com/bruzt/exemplo-ecommerce/blob/master/ecommerce3.png?raw=true">
</p>

## Para testar

Se você deseja testar esse app basta instalar os pacotes com "npm install" nos diretórios backend e web, iniciar um banco de dados postgres com o comando (requer Docker):

```
sudo docker run -d \
    --name ecommerce-tests \
    -e POSTGRES_USER=dbuser1 \
    -e POSTGRES_PASSWORD=123 \
    -e POSTGRES_DB=ecommerce-tests \
    -p 5432:5432 \
    postgres:12.3
```

*Se você deseja usar outro banco você precisará alterar os dados no arquivo .env.dev dentro do diretório backend.

No diretório backend, execute o comando para executar as migrations e criar as tabelas no banco de dados com o comando "npx sequelize db:migrate" e inicie a API com o comando "npm run dev", depois, a mesma coisa no diretório web, execute o comando "npm run dev" para iniciar a aplicação, acesse no navegador o endereço "http://locahost:3000" e você deve ver a página inicial sem nenhum produto.

### Cadastrando um produto

Atualmente não existe uma interface administrativa (to-do), para cadastrar um produto você precisará criar um usuário administrador, acesse o banco com uma GUI client como o [Postbird](https://www.electronjs.org/apps/postbird) (para Postgres), você pode cadastrar o usuário na interface da loja como um usuário comum e depois, no Postbird, alterar o campo "admin" de "false" para "true".

Com o REST Client [Insomnia](https://insomnia.rest/), importe o workspace do projeto (o arquivo está na raiz desse projeto: "Insomnia_workspace.json"), execute a rota "session" (login) para te retornar uma JWT (JSON Web Token) para acessar as rotas, configure a Bearer token com o JWT na rota "store" de "categories" e "products", crie uma categoria de produto e depois um produto cadastrado ao id daquela categoria, recarregando a página web o card do produto deve aparecer.

