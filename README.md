# Prototipo de um e-commerce
Backend: REST API feita com Express.js, banco de dados Postgres utilizando o ORM Sequelize.</br>
Frontend: Feita com React.js utilizando o framework Next.js para gerar páginas estáticas dos produtos com meta tags para maximizar a indexação de motores de busca.

## Backend
- Validação de dados recebidos pela rota com o pacote Celebrate, para garantir que os dados são do tipo correto;
- Rotas para cadastro, atualização e remoção de usuários, endereços, categorias, produtos, upload de imagens de produtos e ordens de compra;
- Rota para autenticação de usuário com JWT (json web token);
- Upload de imagens do produto.

## Frontend
- Menu dropdown de categorias de produtos, montada automaticamente a partir das categorias cadastradas no banco de dados;
- Busca recursiva de produtos cadastrados nas categorias filhas;
- Barra de busca pelo nome do produto;
- Paginação na página de busca, com filtros de menor e maior valor;
- Card do produto, mostrando imagem, nome, preço, "em falta", porcentagem de desconto e preço após desconto;
- Página do produto exibindo um slider das imagens cadastradas, breadcrumb da arvore de categoria, nome, desconto, preço, quantidade a conprar, quantidade em estoque, descrição, dados de peso e medida e detalhes do produto;
- Carrinho de compra, montrando preço total, botoẽs para aumentar e diminuir quantidade ou remover do carrinho, integração com a API dos conrreios para calculo de frete;
- Página para seleção do endereço de entrega, podendo cadstrar um novo endereço ou apagar um já cadastrado (podendo ter vários cadastrados);
- Página de pagamento, integrado com a API de pagamentos do Pagar.me, podendo escolher entre cartão de crédito ou boleto;
- Tela de confirmação de compra, no caso de boleto exibe link para boleto;
- Tela da conta do usuário, onde ele pode alterar suas informações de cadastro (nome, email e senha), adicionar ou remover endereços e visualizar suas ordens de compra.
