import { IsString, IsInt, IsDate } from 'class-validator';

export class GetTaskDto {
  @IsInt()
  id: number;

  @IsString()
  description: string;

  @IsDate()
  dueDate: Date;

  @IsInt()
  categoryId: number;

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
