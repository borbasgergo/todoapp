import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import bcrypt from "bcrypt"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column("varchar")
    username!: string

    @Column({
        select: false,
        type: "varchar"
    })
    password!: string

    @Column("text")
    email!: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        
        try {
            this.password = await bcrypt.hash(this.password, 10)
    
        } catch (e) {
            console.log(e)
            throw new Error("Some problem when hashing")
    
        }

    }

}