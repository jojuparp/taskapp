import { CategoryDto } from "./category.dto";
declare const CreateCategoryDto_base: import("@nestjs/mapped-types").MappedType<Omit<CategoryDto, "id">>;
export declare class CreateCategoryDto extends CreateCategoryDto_base {
}
export {};
