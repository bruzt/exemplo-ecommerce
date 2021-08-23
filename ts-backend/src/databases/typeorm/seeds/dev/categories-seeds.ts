import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import CategoryModel from '../../../../models/CategoryModel';

export default class CategoriesSeeds implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<any> {

        await connection
            .createQueryBuilder()
            .insert()
            .into(CategoryModel)
            .values([{
                name: 'Hardware',
                parent_id: 0,
            }, {
                name: 'Periféricos',
                parent_id: 0,
            }, {
                name: 'Monitores',
                parent_id: 0,
            }, {
                name: 'Processadores',
                parent_id: 1,
            }, {
                name: 'AMD',
                parent_id: 4,
            }, {
                name: 'Intel',
                parent_id: 4,
            }, {
                name: 'Placas de Vídeo',
                parent_id: 1,
            }, {
                name: 'AMD',
                parent_id: 7,
            }, {
                name: 'Nvidia',
                parent_id: 7,
            }, {
                name: 'Mouses',
                parent_id: 2,
            }, {
                name: 'Teclados',
                parent_id: 2,
            }])
            .execute()
        ;
    }
}
