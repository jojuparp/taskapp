export declare class TaskDto {
    readonly id: number;
    readonly description: string;
    readonly dueDate: Date;
    readonly categoryId: number;
    constructor(id: number, description: string, dueDate: Date, categoryId: number);
}
declare const CreateTaskDto_base: import("@nestjs/mapped-types").MappedType<Omit<TaskDto, "id">>;
export declare class CreateTaskDto extends CreateTaskDto_base {
}
declare const GetTaskByDueDateDto_base: import("@nestjs/mapped-types").MappedType<Pick<TaskDto, "dueDate">>;
export declare class GetTaskByDueDateDto extends GetTaskByDueDateDto_base {
}
export {};
