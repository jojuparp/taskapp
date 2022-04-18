import { Cat } from 'src/cats/model/cat';
import { CatsService } from './cats.service';
interface custom {
    key: string;
}
export declare class CatsController {
    private catsService;
    constructor(catsService: CatsService);
    create(cat: Cat): Promise<string>;
    findAll(reqBody: any): custom;
    findOne(id: string): string;
}
export {};
