import {
  Table,
  Column,
  Model,
  HasMany,
  BeforeCreate,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  BelongsToMany,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

export interface IUser {
  id?: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  token: string;
  resetToken: string;
  activated: boolean;
  inviteToken: string;
  role: string;
  origin: string;
  signupDate: Date;
  isPatient: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  timestamps: true
})
export class User extends Model<User> implements IUser {

  @Column name: string;

  @Column phone: string;

  @Column email: string;

  @Column password: string;

  @Column token: string;

  @Column resetToken: string;

  @Column activated: boolean;

  @Column inviteToken: string;

  @Column role: string;

  @Column origin: string;

  @Column(DataType.DATE) signupDate: Date;

  @Column isPatient: boolean;

  @CreatedAt createdAt: Date;

  @UpdatedAt updatedAt: Date;

  public async createFromPost(obj: any, save: boolean = true) {
    if (obj.hasOwnProperty('name')) { this.name = obj.name };
    if (obj.hasOwnProperty('phone')) { this.phone = obj.phone };
    if (obj.hasOwnProperty('email')) { this.email = obj.email };
    if (obj.hasOwnProperty('password')) { this.password = obj.password };
    if (obj.hasOwnProperty('inviteToken')) { this.token = obj.token };
    if (obj.hasOwnProperty('activated')) { this.activated = obj.activated };
    if (obj.hasOwnProperty('role')) { this.role = obj.role };
    if (obj.hasOwnProperty('origin')) { this.origin = obj.origin };
    if (obj.hasOwnProperty('token')) { this.token = obj.token };
    if (obj.hasOwnProperty('signupDate')) { this.signupDate = obj.signupDate };
    if (obj.hasOwnProperty('isPatient')) { this.isPatient = obj.isPatient };
    if (obj.hasOwnProperty('resetToken')) { this.resetToken = obj.resetToken };

    // save to generate an ID
    if (save) {
      await this.save();
    }

    if (obj.hasOwnProperty('patientId') && obj.patientId != null) { (<any>this).setPatient(obj.patientId); }
    if (obj.hasOwnProperty('caregiverId') && obj.caregiverId != null) { (<any>this).setCaregiver(obj.caregiverId); }

    if (save) {
      return await this.save();
    } else {
      return this;
    }
  }

  public static async seed() {
    let user1 = new User();
    user1.id = 1;
    user1.name = 'Admin Istrator';
    user1.email = 'test@mail.com';
    user1.password = '$2a$10$x0zhDOVszaqq8ajGsBYkROCNP8NKA6w3Pak53lxbS65s9gWbHucqy'; // password
    user1.activated = true;
    user1.role = 'admin';
    user1.isPatient = true;
    user1.origin = 'seed';

    await user1.save();

    return user1;
  }
}