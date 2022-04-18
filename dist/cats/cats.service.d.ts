import { Cat } from './model/cat';
export declare class CatsService {
    private readonly cats;
    create(cat: Cat): void;
    findAll(): Cat[];
}
