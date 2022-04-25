import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class AppModule implements OnModuleInit, OnModuleDestroy {
    private databaseService;
    private categoryService;
    private taskService;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
