import { TaskDto } from './task.dto';
declare const CreateOrUpdateTaskDto_base: import("@nestjs/mapped-types").MappedType<Omit<TaskDto, "id">>;
export declare class CreateOrUpdateTaskDto extends CreateOrUpdateTaskDto_base {
}
export {};
