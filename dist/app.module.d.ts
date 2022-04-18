import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class AppModule implements OnModuleInit, OnModuleDestroy {
    private databaseService;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
