import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';

@Module({
  controllers: [ItemsController],
  providers: [],
})
export class ItemsModule {}
