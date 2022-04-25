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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const category_module_1 = require("../category/category.module");
const db_module_1 = require("../db/db.module");
const db_service_1 = require("../db/db.service");
const task_module_1 = require("../task/task.module");
const task_service_1 = require("../task/task.service");
const category_service_1 = require("../category/category.service");
let AppModule = class AppModule {
    async onModuleInit() {
        await this.databaseService.initClient();
        await this.databaseService.createPool();
        await this.categoryService.initCategoryTable();
        await this.taskService.initTaskTable();
    }
    async onModuleDestroy() {
        await this.databaseService.closePool();
    }
};
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", db_service_1.DatabaseService)
], AppModule.prototype, "databaseService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", category_service_1.CategoryService)
], AppModule.prototype, "categoryService", void 0);
__decorate([
    (0, common_1.Inject)(),
    __metadata("design:type", task_service_1.TaskService)
], AppModule.prototype, "taskService", void 0);
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [db_module_1.DatabaseModule, task_module_1.TaskModule, category_module_1.CategoryModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map