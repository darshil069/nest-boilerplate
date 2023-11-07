import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';
import { ListOfUserDto } from './dto/listOfUser.dto';
import { Messages } from 'src/utils/constants/message';
import { HandleResponse } from 'src/services/handleResponse';
import { ResponseData } from 'src/utils/constants/response';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async listOfUser(dto: ListOfUserDto) {
    let error: any = null;
    const { condition } = dto;

    const listOfUser: any = await this.userModel
      .findAll({
        attributes: { exclude: ['password', 'is_deleted'] },
        where: { ...condition, is_deleted: false },
        order: [['createdAt', 'DESC']],
      })
      .catch((err: any) => {
        Logger.error(err);
        error = err;
      });

    if (error) {
      Logger.log(`${Messages.FAILED_TO} list of user.`);
      return HandleResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseData.ERROR,
        `${Messages.FAILED_TO} list of user.`,
        undefined,
        undefined,
      );
    }

    if (listOfUser && listOfUser.length > 0) {
      Logger.log(`List of user is ${Messages.GET_SUCCESS}`);
      return HandleResponse(
        HttpStatus.OK,
        ResponseData.SUCCESS,
        undefined,
        listOfUser,
        undefined,
      );
    } else {
      Logger.error(Messages.NOT_FOUND);
      return HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        Messages.NOT_FOUND,
        undefined,
        undefined,
      );
    }
  }
}
