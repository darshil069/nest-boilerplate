import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';
import moment = require('moment-timezone');
import { DataTypes } from 'sequelize';
import { Role } from 'src/utils/constants/roles';
import { MaxLength } from 'class-validator';
import { Enum } from 'src/utils/constants/enum';

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @MaxLength(11)
  id: number;

  @AllowNull(true)
  @MaxLength(50)
  @Column
  first_name: string;

  @AllowNull(true)
  @MaxLength(150)
  @Column
  last_name: string;

  @AllowNull(false)
  @MaxLength(15)
  @Unique
  @Column
  phone_no: string;

  @AllowNull(true)
  @Column({
    type: DataTypes.ENUM(Enum.MALE, Enum.FEMALE, Enum.OTHER),
  })
  gender: string;

  @AllowNull(false)
  @Unique
  @MaxLength(50)
  @Column
  email: string;

  @AllowNull(true)
  @Column
  password: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(Role.ADMIN, Role.CUSTOMER),
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
    this.updatedAt = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
  }

  @Column({ defaultValue: false })
  is_deleted: boolean;
}
