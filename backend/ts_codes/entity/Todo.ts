import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 100
    })
    do!: string;

    @Column()
    isDone!: boolean;
    
    @Column()
    userId!: number

}