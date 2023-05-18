import { Body, Controller, Delete, Get, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateUserDto } from '../dto/create-user.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { UserInfo } from '../UserInfo';

import { UsersService } from '../services/users.service';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('users')
@ApiTags('user api')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({ summary: '회원가입', description: 'user 생성 API' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 500, description: 'Server Error !!' })
  @ApiResponse({ status: 404, description: 'Client Error !!' })
  @Post('/sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: '이메일 인증', description: '인증 요청 API' })
  @Post('/email-verify')
  async verifyEmail(@Body('email') email: string, @Res({ passthrough: true }) res: Response) {

    return await this.usersService.verifyEmail(email, res);
  }

  @ApiOperation({ summary: '인증코드 요청', description: '인증코드 요청 API' })
  @Post('/email-authentication')
  async authenticationEmail(@Body('authNum') authNum: string, @Req() req: Request, @Res({ passthrough: true }) res: Response) {

    return await this.usersService.authenticationEmail(authNum, req, res);
  }

  @ApiOperation({ summary: '로그인', description: 'user 로그인 API' })
  @ApiResponse({ status: 201, description: '로그인 성공' })
  @Post('/sign-in')
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.authService.jwtSignIn(userLoginDto);
  }

  //@UseGuards(JwtAuthGuard) 배포 및 테스트 시 주석 해제
  @ApiOperation({ summary: '모든 유저 조회', description: '모든 user 정보조회 API' })
  @Get('/')
  async getAllUser(): Promise<UserInfo[]> {
    return await this.usersService.findAll();
  }

  // @UseGuards(JwtAuthGuard) 배포 및 테스트 시 주석 해제
  @ApiOperation({ summary: '특정 유저 조회', description: 'user 정보조회 API' })
  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    return await this.usersService.findUser(userId);
  }

  // @UseGuards(JwtAuthGuard) 배포 및 테스트 시 주석 해제
  @ApiOperation({ summary: '회원탈퇴', description: 'user 회원탈퇴 API' })
  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<boolean> {
    return await this.usersService.deleteUser(userId);
  }

  // @UseGuards(JwtAuthGuard) 배포 및 테스트 시 주석 해제
  @ApiOperation({ summary: '프로필 업로드', description: 'user 프로필 업로드 API' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('image')) // @FilesInterceptor 하면 여러개
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File, @Body('id') userId: string): Promise<UserInfo> {
    console.log(file);

    return await this.usersService.uploadFileToS3('users', file, userId);
  }
}