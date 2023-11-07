import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ListOfUserDto } from './dto/listOfUser.dto';
import { UserService } from './user.service';
// import { JwtGuard } from 'src/services/auth/guard/jwt.guard';
// import { Roles } from 'src/services/auth/decorators/roles.decorator';
// import { Role } from 'src/utils/constants/roles';
// import { RolesGuard } from 'src/services/auth/guard/roles.guard';
// import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

//   This commented code is a use of the authentication

//   @Roles(Role.CUSTOMER)
//   @UseGuards(JwtGuard, RolesGuard)
//   @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('listOfUser')
  listOfUser(@Body() dto: ListOfUserDto) {
    return this.userService.listOfUser(dto);
  }
}
