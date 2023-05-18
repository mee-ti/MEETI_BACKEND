import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserInfo } from '../UserInfo';

import { User } from '../users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    // 해당 라인 추가, 참고로 강의에선 Comments 인데 저는 Cat과 같이 단수형으로 만들어서 Comment 입니다.
    // @InjectModel(Comments.name) private readonly commentModel: Model<Comments>,
  ) { }

  // async findAll() {
  //   const result = await this.catModel
  //     .find()
  //     // populate 파라미터 변경
  //     .populate({ path: 'comments', model: this.commentModel });

  //   return result;
  // }

  async userData(userId: string): Promise<UserInfo> {
    const user = await this.userModel.findById(userId).select('-password'); //select는 원하는 필드를 고를 수 있다 마이너스 하면 그것을 제외하고 email name 이런식으로 공백으로 구분
    return user;
  }

  async allUserData(): Promise<UserInfo[]> {
    const user = await this.userModel.find();

    return user;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const user = await this.userModel.deleteOne({ _id: userId });
    if (user) return true;
    else return false;
  }

  // async findByIdAndUploadImg(id: any, fileName: string) {
  //   const cat = await this.catModel.findById(id);

  //   cat.imgUrl = `http://localhost:8000/media/${fileName}`;
  //   console.log(cat);
  //   return cat; //필요한 필드만 리턴
  // }

  async findCatByIdWithoutPassword(userId: string | Types.ObjectId): Promise<User | null> {
    const user = await this.userModel.findById(userId).select('-password') //select는 원하는 필드를 고를 수 있다 마이너스 하면 그것을 제외하고 email name 이런식으로 공백으로 구분
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async existByEmail(email: string): Promise<boolean> {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    else return false;
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async findByIdAndUploadImg(userId: string, imgUrl: string): Promise<UserInfo> {
    try {
      await this.userModel.updateOne({ _id: userId }, { $set: { imgUrl: imgUrl } });
      const user = await this.userModel.findById(userId).select('-password');
      return user;
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }
}