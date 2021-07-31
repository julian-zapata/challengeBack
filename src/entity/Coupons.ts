import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Coupons {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    email: string;
    //customer_email

    @Column()
    assigned: Date;
    //assigned_at,
    
    @Column()
    expired: Date;
    // expires_at, 

}
