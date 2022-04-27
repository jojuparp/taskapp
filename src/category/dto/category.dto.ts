import { IsInt, IsString } from 'class-validator';

export class CategoryDto {

  @IsInt()
  readonly id: number;

  @IsString()
  readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
