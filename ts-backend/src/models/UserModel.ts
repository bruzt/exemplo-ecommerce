import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	OneToMany
} from 'typeorm';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import AddressModel from './AddressModel';
import OrderModel from './OrderModel';

@Entity('users')
export default class UserModel extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	email!: string;

	@Column()
	cpf!: string;

	@Column()
	password!: string;

	@Column()
	admin!: boolean;

	@Column()
	reset_password_token?: string;

	@Column()
	reset_password_expires?: Date;

	@CreateDateColumn({ name: 'created_at' })
	created_at!: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at!: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deleted_at?: Date;

	private tempPassword?: string;

	///////////////////////////////////////////

	@OneToMany(() => AddressModel, address => address.user)
	addresses?: AddressModel[];
	
	@OneToMany(() => OrderModel, order => order.user)
	orders?: OrderModel[];

	///////////////////////////////////////////

	@AfterLoad()
	private loadPassword() {

		this.tempPassword = this.password;
	}

	@BeforeInsert()
	@BeforeUpdate()
	private async hashPassword() {

		if (this.tempPassword !== this.password) {

			const salt = await bcrypt.genSalt();
			this.password = await bcrypt.hash(this.password, salt);
		}
	}

	///////////////////////////////////////////

	checkPassword(password: string) {
		return bcrypt.compare(password, this.password);
	}

	generateJwt() {
		return jwt.sign({ userId: this.id, admin: this.admin }, process.env.APP_SECRET as string, { expiresIn: '12h' });
	}
}