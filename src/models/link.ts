import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "./base_model";
import { Profile } from "./profile";

@Entity('link')
export class Link extends BaseModel{
    @Column('varchar',{name:'title',nullable: false}) 
    title:string;

    @Column('varchar',{name:'url',nullable: false}) 
    url:string;

    @Column('varchar',{name:'image_url',nullable: true}) 
    image_url: string;

    @Column('bool',{name:'is_priority',nullable: false, default:false}) 
    isPriority: boolean;

    @Column('int',{name:'times_clicked',nullable: false, default:0}) 
    timesClicked: number;

    @Column('date',{name:'last_click_date',nullable: false}) 
    lastClickDate: Date;

    @ManyToOne(()=> Profile, profile => profile.links)
    profile: Profile;

    constructor(obj: Partial<Link> ){
        super();
        Object.assign(this, obj);
    }

}