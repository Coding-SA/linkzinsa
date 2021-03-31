import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum StateData{
    ACTIVE = 'active',
    DELECTED = 'deleted',
    INCOMPLETE= 'incomplete'
}


export class BaseModel extends BaseEntity {

    @PrimaryGeneratedColumn('uuid',{ name:'id'})
    id: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt:Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
    
    @Column({type: 'enum', enum: StateData, default: StateData.INCOMPLETE})
    state: StateData

}