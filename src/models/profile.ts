import { AfterInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseModel } from "./base_model";
import { Link } from "./link";
import { User } from "./user";

@Entity('profile')
export class Profile extends BaseModel{

    @Column('varchar',{name:'title',nullable: false}) 
    title:string;

    @Column('varchar',{name:'url',nullable: false}) 
    url: string;
    
    @Column('varchar',{name:'profile_icon_url', nullable: true}) 
    profileIconUrl: string;

    @Column('varchar',{name:'bio',nullable: true}) 
    bio:string;

    @Column('jsonb',{name:'theme', nullable: false}) 
    theme :{
        type: 'degrade'|'image'|'color';
        image_url: string | undefined;
        color_main: string | undefined;
        color_secundary: string | undefined;
    }

    
    @Column('int',{name:'view',nullable: false, default:0 })
    view: number;

    @OneToOne(()=> User)
    @JoinColumn()
    user:User;

    @ManyToOne(() => Link, link=> link.profile )
    links:Array<Link>

    constructor(obj: Partial<Profile> ){
        super();
        Object.assign(this, obj);
    }
    
}