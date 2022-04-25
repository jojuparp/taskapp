import { Type } from "class-transformer";
import { IsDate } from "class-validator";

/* For general Date validation in request body */
export class DateDto {

  @Type(() => Date)
  @IsDate()
  readonly date: Date;

  constructor(date: Date) {
    this.date = date;
  }
}