import { Module } from '@nestjs/common';
import { FastestValidatorModule } from '@nest-up/nest-fastest-validator';

import { PrismaModule } from '../prisma';

import { TodosModule } from './modules/todos/todos.module';

@Module({
  imports: [FastestValidatorModule.forRoot(), PrismaModule, TodosModule]
})
export class AppModule {}
