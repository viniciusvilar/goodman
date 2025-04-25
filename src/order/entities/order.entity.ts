import { Entity } from "typeorm";

@Entity()
export class Order {
    id: number
    begin_date: Date
    begin_finish: Date
    person_id: number
    status: string
    

}
