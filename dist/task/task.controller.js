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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const date_dto_1 = require("../app/dto/date.dto");
const create_task_dto_1 = require("./dto/create-task.dto");
const task_dto_1 = require("./dto/task.dto");
const task_service_1 = require("./task.service");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async findAll() {
        const res = await this.taskService.findAll();
        return res;
    }
    async findById(taskId) {
        const res = await this.taskService.findById(taskId);
        return res;
    }
    async findByCategory(categoryId) {
        const res = await this.taskService.findByCategory(categoryId);
        return res;
    }
    async findByDueDate(dateDto) {
        const res = await this.taskService.findByDueDate(dateDto);
        return res;
    }
    async create(createTaskDto) {
        const res = await this.taskService.create(createTaskDto);
        return res;
    }
    async update(taskDto) {
        const res = await this.taskService.update(taskDto);
        return res;
    }
    async delete(taskId) {
        return await this.taskService.delete(taskId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('task/:taskId'),
    __param(0, (0, common_1.Param)('taskId', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('duedate'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_dto_1.DateDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findByDueDate", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:taskId'),
    __param(0, (0, common_1.Param)('taskId', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "delete", null);
TaskController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map