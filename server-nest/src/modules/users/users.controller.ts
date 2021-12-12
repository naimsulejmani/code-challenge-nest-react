import { UserActivity } from './../../database/entities/user-actitivty.entity';
import { Body, Controller, Get, Param, Post, UseGuards, Delete } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @Roles('admin')
  async getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get('/:id')
  @Roles('admin')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getById(id);
  }

  @Get('/:id/activity')
  @Roles('admin')
  async getLoginActivity(@Param('id') id: string): Promise<UserActivity[]> {
    return this.userService.getActivityLogin(id);
  }

  @Delete('/:id')
  @Roles('admin')
  async deleteUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.deleteUserById(id);
  }

  @Post()
  @Roles('admin')
  async createUser(@Body() user: UserEntity): Promise<UserEntity> {
    return this.userService.createUser(user);
  }
}
