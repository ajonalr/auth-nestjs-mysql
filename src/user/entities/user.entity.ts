import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BeforeUpdate, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
    AUXILIAR = 'AUXILIAR',
    ADMIN = 'ADMIN',
}


@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', nullable: false, length: 255 })
    name: string;

    @Column({ type: 'varchar', nullable: false, length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false, length: 255, select: false })
    password: string;

    @Column({ type: 'bool', default: true })
    status: boolean;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.AUXILIAR,
    })
    role: UserRole;


    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;


    @BeforeInsert()
    async hashpassword() {
        if (!this.password) return;
        this.password = await bcrypt.hash(this.password, 15);
    }

    @BeforeUpdate()
    async hashpasswordUpdate() {
        if (!this.password) return;
        this.password = await bcrypt.hash(this.password, 15);
    }


}
