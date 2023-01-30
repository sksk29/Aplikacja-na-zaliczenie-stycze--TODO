import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [AuthModule],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
