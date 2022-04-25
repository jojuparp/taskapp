import { TaskDto } from "./task.dto";
declare const CreateTaskDto_base: import("@nestjs/mapped-types").MappedType<Omit<TaskDto, "id">>;
export declare class CreateTaskDto extends CreateTaskDto_base {
}
export {};
