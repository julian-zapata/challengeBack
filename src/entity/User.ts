import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("nvarchar")
    firstName: string;

    @Column("nvarchar")
    lastName: string;

    @Column("int")
    age: number;

}
