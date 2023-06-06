import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ length: 100, unique: true, nullable: false })
    login: string;

    @Column({ length: 100, unique: true, nullable: false })
    email: string;

    @Column({ length: 32, nullable: false })
    password: string;

}

export default User;
