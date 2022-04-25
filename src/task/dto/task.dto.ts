import { OmitType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsString, IsInt, IsDate } from 'class-validator';

export class TaskDto {
  @IsInt()
  readonly id: number;

  @IsString()
  readonly description: string;

  @Type(() => Date)
  @IsDate()
  readonly dueDate: Date;

  @IsInt()
  readonly categoryId: number;

  constructor(
    id: number,
    description: string,
    dueDate: Date,
    categoryId: number,
  ) {
    this.id = id;
    this.description = description;
    this.dueDate = dueDate;
    this.categoryId = categoryId;
  }
}
