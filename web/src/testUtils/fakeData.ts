
export const fakeUser = {
    id: 1,
    name: 'Fake user',
    email: 'fake@fake.com',
    cpf: '99999999999',
    admin: false,
    addresses: []
};

export const fakeAddress = {
    id: 1,
    street: 'rua foo',
    number: '14b',
    neighborhood: 'bairro bar',
    city: 'Limeira',
    state: 'SP',
    zipcode: '12240-650',
};

export const fakeCategories = [
    {
        id: 1,
        name: "Hardware",
        parent_id: 0,
        created_at: "2021-07-16T15:03:18.173Z",
        updated_at: "2021-07-16T15:03:18.173Z"
    },
    {
        id: 2,
        name: "Processador",
        parent_id: 1,
        created_at: "2021-07-16T15:03:18.173Z",
        updated_at: "2021-07-16T15:03:18.173Z"
    }
]

export const fakeProducts = {
    "count": 1,
    "products": [
        {
            "id": 1,
            "category_id": 1,
            "title": "placa mãe mini-itx 3",
            "description": "hehe",
            "html_body": "fffff",
            "price": "149.99",
            "quantity_stock": 2,
            "quantity_sold": 2,
            "discount_percent": 0,
            "discount_datetime_start": null,
            "discount_datetime_end": null,
            "tangible": true,
            "weight": 1,
            "length": 10,
            "height": 15,
            "width": 15,
            "created_at": "2021-07-16T15:03:21.192Z",
            "updated_at": "2021-07-21T14:28:04.467Z",
            "deleted_at": null,
            "category": {
                "id": 1,
                "name": "Hardware",
                "parent_id": 0,
                "created_at": "2021-07-16T15:03:18.173Z",
                "updated_at": "2021-07-16T15:03:18.173Z"
            },
            "images": [],
            "isOnSale": false,
            "finalPrice": "149.99",
            "dateNow": "2021-07-23T13:13:37.132Z"
        }
    ]
}

export const fakeImage = {
    id: 1,
    url: 'http://test.test/uploads/img.jpg',
    filename: 'fake-img.jpg'
};

export const fakeOrder = {
    "count": 1,
    "orders": [
        {
            "id": 1,
            "user_id": 2,
            "address_id": 1,
            "freight_name": "pac",
            "freight_price": "15",
            "total_price": "299.98",
            "payment_method": "credit_card",
            "status": "paid",
            "boleto_url": null,
            "tracking_code": null,
            "updated_at": "2021-07-21T14:28:04.467Z",
            "deleted_at": null,
            "address": {
                "id": 1,
                "user_id": 2,
                "street": "rua blau",
                "number": "5b",
                "neighborhood": "jardim xablau",
                "city": "lalau",
                "state": "sp",
                "zipcode": "13490000",
                "created_at": "2021-07-16T15:03:09.681Z",
                "updated_at": "2021-07-16T15:03:09.681Z",
                "deleted_at": null
            },
            "products": [
                {
                    "id": 1,
                    "category_id": 1,
                    "title": "placa mãe mini-itx 3",
                    "description": "hehe",
                    "html_body": "fffff",
                    "price": "149.99",
                    "quantity_stock": 98,
                    "quantity_sold": 2,
                    "discount_percent": 0,
                    "discount_datetime_start": null,
                    "discount_datetime_end": null,
                    "tangible": true,
                    "weight": 1,
                    "length": 10,
                    "height": 15,
                    "width": 15,
                    "created_at": "2021-07-16T15:03:21.192Z",
                    "updated_at": "2021-07-21T14:28:04.467Z",
                    "deleted_at": null,
                    "images": [],
                    "isOnSale": false,
                    "finalPrice": "149.99",
                    "dateNow": "2021-07-21T12:22:11.679Z",
                    "orders_products": {
                        "id": 1,
                        "order_id": 1,
                        "product_id": 1,
                        "quantity_buyed": 2,
                        "product_price": "149.99",
                        "product_discount_percent": 0,
                        "created_at": "2021-07-21T14:28:04.467Z",
                        "updated_at": "2021-07-21T14:28:04.467Z"
                    }
                }
            ],
            "createdAt": "2021-07-21T14:28:04.467Z"
        }
    ]
};

export const fakeBoletoOrder = {
    "order": {
        "id": 2,
        "boleto_url": "https://pagar.me"
    },
    "pagarme": {
        "status": "waiting_payment",
    }
}

export const fakeCreditCardOrder = {
    "order": {
        "id": 3,
        "boleto_url": null
    },
    "pagarme": {
        "status": "paid",
    }
}

export const fakeInstallments = {
    freeInstallments: 6,
    maxInstallments: 12,
    interestRate: 10,
    installments: [
        1372.49,
        686.25,
        457.5,
        343.12,
        274.5,
        228.75,
        215.68,
        188.72,
        167.75,
        150.97,
        137.25,
        125.81
    ]
}

export const fakeAxiosUfs = [{
    "id": 35,
    "sigla": "SP",
    "nome": "São Paulo",
    "regiao": {
        "id": 3,
        "sigla": "SE",
        "nome": "Sudeste"
    },
}];

export const fakeAxiosCitys = [{
    "id": 3526902,
    "nome": "Limeira",
    "microrregiao": {
        "id": 35027,
        "nome": "Limeira",
        "mesorregiao": {
            "id": 3506,
            "nome": "Piracicaba",
            "UF": {
                "id": 35,
                "sigla": "SP",
                "nome": "São Paulo",
                "regiao": {
                    "id": 3,
                    "sigla": "SE",
                    "nome": "Sudeste"
                }
            }
        }
    }
}];

export const fakeUserJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJhZG1pbiI6ZmFsc2V9.HsbkIOCWC_cQ5ejXXtDzXpddk7eVcPixzI5cbhhABzM';

export const fakeCpfs = ["71314297082", "30581023056", "97938138061"];

export const fakeFreightPrice = {
    pac: {
        valor: "24,30",
        prazoEntrega: "7",
        //msgErro: "",
    },
    sedex: {
        valor: "25,80",
        prazoEntrega: "2",
        //msgErro: "",
    }
}

export const fakeCartItem = {
    id: 1,
    qtd: 1,
}