import {
  IsString,
  IsInt,
  IsDate,
  IsNumberString,
  IsISO8601,
  IsNotEmpty,
  isDate,
  IsDateString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  // TODO play with validations
  //@IsNumberString()
  //@IsNotEmpty()
  @IsInt()
  categoryId: number;

  constructor(description: string, dueDate: string, categoryId: number) {
    this.description = description;
    this.dueDate = dueDate;
    this.categoryId = categoryId;
  }
}
