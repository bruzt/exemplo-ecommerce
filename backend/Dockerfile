FROM node:14.15.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]

# sudo docker build -t ecommerce-backend .

# sudo docker run -d --rm --name ecommerce-backend -e DB_DIALECT=postgres -e DB_HOST=localhost -e DB_USERNAME=dbuser1 -e DB_PASSWORD=123 -e DB_DATABASE=ecommerce-tests -e APP_SECRET=s1f6a51sf -e CORS_ORIGIN_URL=* -e MAILER_HOST=smtp.mailtrap.io -e MAILER_PORT=2525 -e MAILER_USER=82763040bfd3c8 -e MAILER_PASS=118eaa31afaeb5 -e IMG_STORAGE_LOCATION=local -e FRONTEND_URL=http://localhost:3000 -e PAGARME_API_KEY=ak_test_dy3JovJOlwemJ5zC4VyIjDVQEL2pmb --network="host" -p 3001:3001 ecommerce-backend
