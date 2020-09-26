import { Prescription } from './prescription.entity';

export const prescriptionsProviders = [
  {
    provide: 'PrescriptionsRepository',
    useValue: Prescription,
  },
];