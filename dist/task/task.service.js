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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_repository_1 = require("./task.repository");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async findAll() {
        const res = await this.taskRepository.findAll();
        return res;
    }
    async findById(id) {
        const res = await this.taskRepository.findById(id);
        return res;
    }
    async findByCategory(categoryId) {
        const res = await this.taskRepository.findByCategory(categoryId);
        return res;
    }
    async findByDueDate(dateDto) {
        const res = await this.taskRepository.findByDueDate(dateDto);
        return res;
    }
    async create(createTaskDto) {
        const res = await this.taskRepository.create(createTaskDto);
        return res;
    }
    async update(taskDto) {
        const res = await this.taskRepository.update(taskDto);
        return res;
    }
    async delete(id) {
        await this.taskRepository.delete(id);
    }
    async initTaskTable() {
        await this.taskRepository.initTaskTable();
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map