import { Inject, Injectable } from '@nestjs/common';
import { Prescription, IPrescription } from './prescription.entity';

@Injectable()
export class PrescriptionsService {
    constructor(
        @Inject('PrescriptionsRepository') private readonly prescriptionsRepository: typeof Prescription,
    ) { }

    async findAll(user): Promise<Prescription[]> {
        return await this.prescriptionsRepository.findAll<Prescription>({
            where: { userId: user.id },
        });
    }

    async findOne(id: number): Promise<Prescription> {
        return await this.prescriptionsRepository.findById(id);
    }

    async create(obj: any) {
        const prescription = new Prescription();
        return await prescription.createFromPost(obj);
    }

    async update(id: number, obj: any) {
        const prescription = await this.prescriptionsRepository.findById(id);
        await prescription.createFromPost(obj, false);

        return await prescription.save();
    }

    async delete(id: number) {
        await this.prescriptionsRepository.destroy({
            where: { id },
        }).catch((error) => {
            console.log(error);
        });
    }
}