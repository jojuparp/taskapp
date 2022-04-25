"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const category_dto_1 = require("./category.dto");
class CreateCategoryDto extends (0, mapped_types_1.OmitType)(category_dto_1.CategoryDto, ['id']) {
}
exports.CreateCategoryDto = CreateCategoryDto;
//# sourceMappingURL=create-category.dto.js.map