"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const task_dto_1 = require("./task.dto");
class CreateTaskDto extends (0, mapped_types_1.OmitType)(task_dto_1.TaskDto, ['id']) {
}
exports.CreateTaskDto = CreateTaskDto;
//# sourceMappingURL=create-task.dto.js.map