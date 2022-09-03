import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { getUser } from '../auth/decorator/get-user.decorator';
import { Role } from '../auth/decorator/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { UserStatus } from '../auth/user-status.enum';
import { Item } from '../entities/item.entity';
import { User } from '../entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor) // ハンドラーがレスポンスを返す前にパスワード除外
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  @Role(UserStatus.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Body() createItemDto: CreateItemDto,
    @getUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.create(createItemDto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @getUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.updateStatus(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @getUser() user: User,
  ): Promise<void> {
    await this.itemsService.delete(id, user);
  }
}
