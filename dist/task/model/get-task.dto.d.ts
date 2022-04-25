export declare class GetTaskDto {
    readonly id: number;
    readonly description: string;
    readonly dueDate: Date;
    readonly categoryId: number;
    constructor(id: number, description: string, dueDate: Date, categoryId: number);
}
