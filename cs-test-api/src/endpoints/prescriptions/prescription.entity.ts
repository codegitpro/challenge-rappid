import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  DataType,
  CreatedAt,
  UpdatedAt,
  AfterDelete,
  AfterCreate
} from 'sequelize-typescript';

import * as moment from 'moment';
import { User } from '../users/user.entity';

export interface IPrescription {
  id?: number;
  name: string;
  dosage: string;
  dosageType: string;
  dosageSize: number;
  timesPerDay: number;
  start: Date;
  expiry: Date;
  reminder: boolean;
  interval: string;
  notes: string;
  address: string;
  userId?: number;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  timestamps: true
})
export class Prescription extends Model<Prescription> implements IPrescription {

  @Column name: string;

  @Column dosage: string;

  @Column dosageType: string;

  @Column dosageSize: number;

  @Column timesPerDay: number;

  @Column(DataType.DATE) start: Date;

  @Column(DataType.DATE) expiry: Date;

  @Column reminder: boolean;

  @Column interval: string;

  @Column notes: string;

  @Column address: string;

  @ForeignKey(() => User)
  @Column userId: number;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt createdAt: Date;

  @UpdatedAt updatedAt: Date;

  public async createFromPost(obj: any, save: boolean = true) {
    if (obj.hasOwnProperty('name')) { this.name = obj.name };
    if (obj.hasOwnProperty('dosage')) { this.dosage = obj.dosage };
    if (obj.hasOwnProperty('dosageType')) { this.dosageType = obj.dosageType };
    if (obj.hasOwnProperty('dosageSize')) { this.dosageSize = obj.dosageSize };
    if (obj.hasOwnProperty('timesPerDay')) { this.timesPerDay = obj.timesPerDay };
    if (obj.hasOwnProperty('start')) { this.start = obj.start };
    if (obj.hasOwnProperty('expiry')) { this.expiry = obj.expiry };
    if (obj.hasOwnProperty('reminder')) { this.reminder = obj.reminder };
    if (obj.hasOwnProperty('interval')) { this.interval = obj.interval };
    if (obj.hasOwnProperty('notes')) { this.notes = obj.notes };
    if (obj.hasOwnProperty('address')) { this.address = obj.address };

    // save to generate an ID
    if (save) {
      await this.save();
    }

    // set association data
    if (obj.hasOwnProperty('userId')) { (<any>this).setUser(obj.userId); }

    return this;
  }

  public static async seed(user: User) {

    const aryPrescriptions = [
      ['Hydrochlorathiazide','12.5','mg'],
      ['Nexium','40','mg'],
      ['Ciprofloxacin','500','mg'],
      ['Blexten','20','mg'],
      ['Nalcrom','100','mg']
    ]

    const prescriptions = [];
    for (let i = 0; i < aryPrescriptions.length; i++) {
      const tmpPerscription = new Prescription();
      prescriptions.push(tmpPerscription);
      tmpPerscription.id = i + 1;
      tmpPerscription.name = aryPrescriptions[i][0];
      tmpPerscription.userId = user.id;
      tmpPerscription.user = user;
      tmpPerscription.start = moment().startOf('year').toDate();
      tmpPerscription.expiry = moment().endOf('month').toDate();
      tmpPerscription.dosage = aryPrescriptions[i][1];
      tmpPerscription.dosageType = aryPrescriptions[i][2];
      tmpPerscription.timesPerDay = 2;
      tmpPerscription.interval = '09:00,18:00';
      tmpPerscription.notes = "Don't worry, be happy!";
      tmpPerscription.address = null;
      await tmpPerscription.save();
    }

    return prescriptions[0];
  }
}