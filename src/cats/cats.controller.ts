import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { Request } from 'express';
import { takeLast } from 'rxjs';
import { Cat } from 'src/cats/model/cat';
import { CatsService } from './cats.service';

interface custom {
  key: string;
}

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body() cat: Cat) {
    console.log(cat);
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Body() reqBody): custom {
    const a = {
      key: 'value',
    };
    return a;
  }

  @Get(':id/get')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
