"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTaskByDueDateDto = exports.CreateTaskDto = exports.TaskDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class TaskDto {
    constructor(id, description, dueDate, categoryId) {
        this.id = id;
        this.description = description;
        this.dueDate = dueDate;
        this.categoryId = categoryId;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaskDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TaskDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], TaskDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TaskDto.prototype, "categoryId", void 0);
exports.TaskDto = TaskDto;
class CreateTaskDto extends (0, mapped_types_1.OmitType)(TaskDto, ['id']) {
}
exports.CreateTaskDto = CreateTaskDto;
class GetTaskByDueDateDto extends (0, mapped_types_1.PickType)(TaskDto, ['dueDate']) {
}
exports.GetTaskByDueDateDto = GetTaskByDueDateDto;
//# sourceMappingURL=task.dto.js.map