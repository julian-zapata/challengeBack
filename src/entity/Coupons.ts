import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Coupons {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar")
    code: string;

    @Column("varchar")
    email: string;

    @Column("datetime")
    assigned: Date;
    
    @Column("datetime",)
    expired: Date;

}
