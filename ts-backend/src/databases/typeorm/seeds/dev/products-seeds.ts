import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import ProductModel from '../../../../models/ProductModel';
import sonicIngest from '../../../sonic/ingest';
import { lorem } from '../../../../testUtils/fakeData';

async function products(){

    const products = [];
    
    // Processadores AMD
    for(let i=1; i<=15; i++){
      
      const price = String(Math.floor(Math.random() * (1500 - 500 + 1) + 500));
      const cents = '.' + String(Math.floor(Math.random() * 99) + 1);
    
      const product = {
        title: `Processador AMD ${i}`,
        description: `Breve descrição do Processador AMD ${i}`,
        html_body: `${lorem}`,
        price: Number(price + cents),
        quantity_stock: 100,
        quantity_sold: 0,
        discount_percent: 0,
        category_id: 5,
        tangible: true,
        weight: (Math.random() * (1.500 - 0.500) + 0.500).toFixed(3),
        length: (Math.random() * (30 - 10) + 10).toFixed(1),
        height: (Math.random() * (30 - 10) + 10).toFixed(1),
        width: (Math.random() * (30 - 10) + 10).toFixed(1),
      };
    
      products.push(product);
    
      await sonicIngest.ingestProduct(i, product.title);
    }
    
    // Processadores Intel
    for(let i=1; i<=15; i++){
      
      const price = String(Math.floor(Math.random() * (1500 - 500 + 1) + 500));
      const cents = '.' + String(Math.floor(Math.random() * 99) + 1);
    
      const product = {
        title: `Processador Intel ${i}`,
        description: `Breve descrição do Processador Intel ${i}`,
        html_body: `${lorem}`,
        price: Number(price + cents),
        quantity_stock: 100,
        quantity_sold: 0,
        discount_percent: 0,
        category_id: 6,
        tangible: true,
        weight: (Math.random() * (1.500 - 0.500) + 0.500).toFixed(3),
        length: (Math.random() * (30 - 10) + 10).toFixed(1),
        height: (Math.random() * (30 - 10) + 10).toFixed(1),
        width: (Math.random() * (30 - 10) + 10).toFixed(1),
      };
    
      products.push(product);
    
      await sonicIngest.ingestProduct(i + 15, product.title);
    }
    
    // Placas de vídeo AMD
    for(let i=1; i<=15; i++){
      
      const price = String(Math.floor(Math.random() * (15000 - 1500 + 1) + 1500));
      const cents = '.' + String(Math.floor(Math.random() * 99) + 1);
    
      const product = {
        title: `Placa de vídeo AMD ${i}`,
        description: `Breve descrição da Placa de vídeo AMD ${i}`,
        html_body: `${lorem}`,
        price: Number(price + cents),
        quantity_stock: 100,
        quantity_sold: 0,
        discount_percent: 0,
        category_id: 8,
        tangible: true,
        weight: (Math.random() * (2.5 - 1) + 1).toFixed(3),
        length: (Math.random() * (50 - 15) + 15).toFixed(1),
        height: (Math.random() * (50 - 15) + 15).toFixed(1),
        width: (Math.random() * (50 - 15) + 15).toFixed(1),
      };
    
      products.push(product);
    
      await sonicIngest.ingestProduct(i + 30, product.title);
    }
    
    // Placas de vídeo Nvidia
    for(let i=1; i<=15; i++){
      
      const price = String(Math.floor(Math.random() * (15000 - 1500 + 1) + 1500));
      const cents = '.' + String(Math.floor(Math.random() * 99) + 1);
    
      const product = {
        title: `Placa de vídeo Nvidia ${i}`,
        description: `Breve descrição da Placa de vídeo Nvidia ${i}`,
        html_body: `${lorem}`,
        price: Number(price + cents),
        quantity_stock: 100,
        quantity_sold: 0,
        discount_percent: 0,
        category_id: 9,
        tangible: true,
        weight: (Math.random() * (2.5 - 1) + 1).toFixed(3),
        length: (Math.random() * (50 - 15) + 15).toFixed(1),
        height: (Math.random() * (50 - 15) + 15).toFixed(1),
        width: (Math.random() * (50 - 15) + 15).toFixed(1),
      };
    
      products.push(product);
    
      await sonicIngest.ingestProduct(i + 45, product.title);
    }
    
    // Monitores
    for(let i=1; i<=15; i++){
      
      const price = String(Math.floor(Math.random() * (2000 - 200 + 1) + 200));
      const cents = '.' + String(Math.floor(Math.random() * 99) + 1);
    
      const product = {
        title: `Monitor ${i}`,
        description: `Breve descrição de Monitor ${i}`,
        html_body: `${lorem}`,
        price: Number(price + cents),
        quantity_stock: 100,
        quantity_sold: 0,
        discount_percent: 0,
        category_id: 3,
        tangible: true,
        weight: (Math.random() * (2.5 - 1) + 1).toFixed(3),
        length: (Math.random() * (50 - 15) + 15).toFixed(1),
        height: (Math.random() * (50 - 15) + 15).toFixed(1),
        width: (Math.random() * (30 - 15) + 15).toFixed(1),
      };
    
      products.push(product);
    
      await sonicIngest.ingestProduct(i + 60, product.title);
    }
    
    // Mouses
    for(let i=1; i<=15; i++){
      
      const price = String(Math.floor(Math.random() * (200 - 20 + 1) + 20));
      const cents = '.' + String(Math.floor(Math.random() * 99) + 1);
    
      const product = {
        title: `Mouse ${i}`,
        description: `Breve descrição de Mouse ${i}`,
        html_body: `${lorem}`,
        price: Number(price + cents),
        quantity_stock: 100,
        quantity_sold: 0,
        discount_percent: 0,
        category_id: 10,
        tangible: true,
        weight: (Math.random() * (0.800 - 0.100) + 0.100).toFixed(3),
        length: (Math.random() * (15 - 5) + 5).toFixed(1),
        height: (Math.random() * (15 - 5) + 5).toFixed(1),
        width: (Math.random() * (15 - 5) + 5).toFixed(1),
      };
    
      products.push(product);
    
      await sonicIngest.ingestProduct(i + 75, product.title);
    }
    
    // Teclados
    for(let i=1; i<=15; i++){
      
      const price = String(Math.floor(Math.random() * (200 - 20 + 1) + 20));
      const cents = '.' + String(Math.floor(Math.random() * 99) + 1);
    
      const product = {
        title: `Teclado ${i}`,
        description: `Breve descrição de Teclado ${i}`,
        html_body: `${lorem}`,
        price: Number(price + cents),
        quantity_stock: 100,
        quantity_sold: 0,
        discount_percent: 0,
        category_id: 11,
        tangible: true,
        weight: (Math.random() * (1 - 0.500) + 0.500).toFixed(3),
        length: (Math.random() * (50 - 25) + 25).toFixed(1),
        height: (Math.random() * (15 - 5) + 5).toFixed(1),
        width: (Math.random() * (15 - 5) + 5).toFixed(1),
      };
    
      products.push(product);
    
      await sonicIngest.ingestProduct(i + 90, product.title);
    }

    return products;
}

export default class ProductsSeeds implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<any> {

        const productsArray = await products();

        await connection
            .createQueryBuilder()
            .insert()
            .into(ProductModel)
            .values(productsArray)
            .execute()
        ;
    }
}
