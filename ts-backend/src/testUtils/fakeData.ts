
export const fakeCpfs = ["71314297082", "30581023056", "97938138061"];

export const fakeUser = {
    name: "fake user",
    cpf: "61311682023",
    email: "fake@admin.com",
    password: "123456"
};

export const fakeAddress = {
    street: 'rua lala',
    number: '11',
    neighborhood: 'bairro haha',
    city: 'kakanopolis',
    state: 'fp',
    zipcode: '73214596024'
};

export const fakeCategory = {
    name: 'fake category',
};

export const fakeProduct = {
    title: 'fake product',
    description: 'bla bla bla',
    html_body: '<p>vai</p>',
    price: "10.50",
    quantity_stock: 100,
    tangible: true,
    weight: 5,
    length: 15,
    height: 15,
    width: 15,
};

export const fakeOrder = {
    freight_name: 'pac',
    freight_price: 10.50,
    total_price: 30.00,
    payment_method: 'credit_card',
    status: 'paid',
};

export const fakeCreditCard = {
    "installments": 2,
    "card_number": "4111111111111111",
    "card_cvv": "546",
    "card_expiration_date": "1025",
    "card_holder_name": "Jajau Lalau",
    "customer": {
        "external_id": "1",
        "name": "Jajau Lalau",
        "email": "teste1@teste.com",
        "type": "individual",
        "country": "br",
        "phone_numbers": ["+5519999999999"],
        "documents": [
            {
            "type": "cpf",
            "number": "99999999999"
            }
        ]
    },
    "billing": {
        "name": "Jajau Lalau",
        "address": {
            "street": "rau lalau",
            "street_number": "55a",
            "neighborhood": "bairro haha",
            "city": "cordeirópolis",
            "state": "sp",
            "zipcode": "13490000",
            "country": "br",
        }
    },
    "shipping": {
        "name": "Jajau Lalau",
        "address": {
            "street": "rau lalau",
            "street_number": "55a",
            "neighborhood": "bairro haha",
            "city": "cordeirópolis",
            "state": "sp",
            "zipcode": "13490000",
            "country": "br",
        }
    },
};

export const fakeBoleto = {
    "customer": {
        "external_id": "1",
        "name": "Jajau Lalau",
        "email": "teste1@teste.com",
        "type": "individual",
        "country": "br",
        "phone_numbers": ["+5519999999999"],
        "documents": [
            {
            "type": "cpf",
            "number": "99999999999"
            }
        ]
    },
    "shipping": {
        "name": "Jajau Lalau",
        "address": {
            "street": "rau lalau",
            "street_number": "55a",
            "neighborhood": "bairro haha",
            "city": "cordeirópolis",
            "state": "sp",
            "zipcode": "13490000",
            "country": "br",
        }
    },
};

export const lorem = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
