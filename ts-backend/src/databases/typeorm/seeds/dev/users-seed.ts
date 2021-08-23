import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import bcrypt from 'bcryptjs';

import UserModel from '../../../../models/UserModel';

export default class UsersSeeds implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<any> {

        await connection
            .createQueryBuilder()
            .insert()
            .into(UserModel)
            .values([{
                name: 'test admin user',
                email: 'test@test.com',
                cpf: '97938138061',
                admin: true,
                password: bcrypt.hashSync('123456', 8),
                created_at: new Date(),
                updated_at: new Date(),
            }])
            .execute()
        ;
    }
}
