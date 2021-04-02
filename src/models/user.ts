import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import {BaseModel} from './base_model';
import { Profile } from './profile';
import * as bcrypt from 'bcrypt';


const SALT_ROUND = 10; 


@Entity('user')
export class User extends BaseModel{

    @Column('varchar',{name:'email',nullable: false, unique :true})
    email: string;

    @Column('varchar',{name:'username',nullable: false, unique: true})
    username:string;

    @Column('varchar',{name:'password',nullable: false})
    password :string;

    @Column('varchar',{name:'name',nullable: true})
    name: string;

    @Column('simple-array',{name:'category',nullable: true})
    category: Array<string>;

    @OneToOne(()=> Profile)
    @JoinColumn()
    Profile:Profile;

    constructor(obj: Partial<User> ){
        super();
        Object.assign(this, obj);
    }


    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(SALT_ROUND));
    }


    async comparePassword(password:string){
        return bcrypt.compare(password, this.password);
    }


    

}