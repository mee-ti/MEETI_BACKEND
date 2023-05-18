import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import { Response } from 'express';


interface EmailOptions {
  to: string;
  from: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GOOGLE_ID, // TODO: config
        pass: process.env.GOOGLE_PW // TODO: config
      }
    });
  }

  async sendMemberJoinVerification(emailAddress: string, res: Response) {
    try {
      const authNum: string = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");

      console.log(authNum);

      const mailOptions: EmailOptions = {
        to: emailAddress,
        from: `meeti@gmail.com `,
        subject: '가입 인증 코드',
        html: `
        인증 코드를 입력해주세요.<br/>        
          <b>${authNum}</b>
        </form>
      `
      }
      await this.transporter.sendMail(mailOptions);

      res.cookie('authNum', authNum, { path: '/', expires: new Date(Date.now() + 3000000) });

      return { result: true, authNum: authNum };
    }
    catch (error) {
      return { result: false, authNum: '' };
    }
  }
}