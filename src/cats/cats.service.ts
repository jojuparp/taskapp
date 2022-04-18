import { Injectable } from '@nestjs/common';
import { Cat } from './model/cat';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    console.log('polling for all cats');
    return this.cats;
  }
}
