import { Inject, Injectable, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 } from 'node-uuid';
import * as random from 'random';

import { User } from './user.entity';

@Injectable()
export class UsersService {
    private saltRounds = 10;
    private v4Length = 36;

    constructor(
        @Inject('UsersRepository') private readonly usersRepository: typeof User,
    ) { }

    async findAll(): Promise<User[]> {
        const users = await this.usersRepository.findAll<User>({
            attributes: {
                exclude: ['password']
            },
        });

        return users;
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findById(id, {
            attributes: {
                exclude: ['password']
            },
        });

        return user;
    }

    public async findOneBy(value: any, field: string) {
        const query = { where: {} };
        query.where[field] = value;
        const usr = await this.usersRepository.findOne(query);
        return usr;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.find({
            where: { email },
        });

        return user;
    }

    async create(body: any) {
        let user = new User();

        const foundUser = await this.findByEmail(body.email);
        if (!foundUser) {
            try {
                body.password = await this.getHash(body.password);
            } catch (e) {
                console.error(e);
                throw new Error('Failed to generate password hash');
            }
            body.signupDate = new Date();
            body.token = random.int(0, 9999) + 1000;
            body.role = 'user';

            user = await user.createFromPost(body);

            return user;
        } else {
            console.log(foundUser);
            throw new HttpException('user already exists', 400);
        }

    }

    async update(id: number, obj: any) {
        const user = await this.usersRepository.findById(id);
        await user.createFromPost(obj, true);
        return await this.usersRepository.findById(id);
    }

    async delete(id: number) {
        await this.usersRepository.destroy({
            where: { id },
        });
    }

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async generateResetToken(id: number) {
        const user = await this.usersRepository.findById(id);
        if (!user.resetToken) {
            user.resetToken = v4() + user.id;
            await user.save();
        }

        return user.resetToken;
    }
}