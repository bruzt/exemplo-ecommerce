
export const fakeProducts = {
    "count": 3,
    "products": [
        {
            "id": 1,
            "category_id": 1,
            "title": "Processador AMD Ryzen 7 5950X",
            "description": "hehe",
            "html_body": "fffff",
            "price": "299.99",
            "quantity_stock": 100,
            "quantity_sold": 0,
            "discount_percent": 0,
            "discount_datetime_start": null,
            "discount_datetime_end": null,
            "tangible": true,
            "weight": 1,
            "length": 10,
            "height": 15,
            "width": 15,
            "created_at": "2021-08-05T14:36:48.540Z",
            "updated_at": "2021-08-05T14:36:48.540Z",
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
            "finalPrice": "299.99",
            "dateNow": "2021-08-11T11:47:14.681Z"
        },
        {
            "id": 2,
            "category_id": 1,
            "title": "Processador AMD Ryzen 7 5950X",
            "description": "hehe",
            "html_body": "fffff",
            "price": "299.99",
            "quantity_stock": 100,
            "quantity_sold": 0,
            "discount_percent": 0,
            "discount_datetime_start": null,
            "discount_datetime_end": null,
            "tangible": true,
            "weight": 1,
            "length": 10,
            "height": 15,
            "width": 15,
            "created_at": "2021-08-05T14:37:15.360Z",
            "updated_at": "2021-08-05T14:37:15.360Z",
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
            "finalPrice": "299.99",
            "dateNow": "2021-08-11T11:47:14.681Z"
        },
        {
            "id": 3,
            "category_id": 1,
            "title": "Processador AMD Ryzen 7 5950X",
            "description": "hehe",
            "html_body": "fffff",
            "price": "299.99",
            "quantity_stock": 100,
            "quantity_sold": 0,
            "discount_percent": 0,
            "discount_datetime_start": null,
            "discount_datetime_end": null,
            "tangible": true,
            "weight": 1,
            "length": 10,
            "height": 15,
            "width": 15,
            "created_at": "2021-08-05T14:36:51.149Z",
            "updated_at": "2021-08-05T14:36:51.149Z",
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
            "finalPrice": "299.99",
            "dateNow": "2021-08-11T11:47:14.681Z"
        },
    ]
};

export const fakeProduct = fakeProducts.products[0];

export const fakeCategories = [
    {
        "id": 3,
        "name": "AMD",
        "parent_id": 2,
        "created_at": "2021-08-09T15:05:26.760Z",
        "updated_at": "2021-08-09T15:05:26.760Z"
    },
    {
        "id": 1,
        "name": "Hardware",
        "parent_id": 0,
        "created_at": "2021-07-16T15:03:18.173Z",
        "updated_at": "2021-07-16T15:03:18.173Z"
    },
    {
        "id": 2,
        "name": "Processador",
        "parent_id": 1,
        "created_at": "2021-07-23T15:17:34.280Z",
        "updated_at": "2021-07-23T15:17:34.280Z"
    },
    {
        "id": 4,
        "name": "Ryzen",
        "parent_id": 3,
        "created_at": "2021-08-09T15:05:36.061Z",
        "updated_at": "2021-08-09T15:05:36.061Z"
    }
];

export const fakeOrders = {
    "count": 1,
    "orders": [
        {
            "id": 1,
            "user_id": 1,
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
            "products": [fakeProduct]
        }
    ]
};
