import { Body, Controller, Post, Req } from "@nestjs/common";
import { resolve } from "path";
import { LoginAdministratorDto } from "src/dtos/administrator/login.adiministrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as crypto from 'crypto';
import { LoginInfoAdministratorDto } from "src/dtos/administrator/login.info.administrator.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdministratorDto } from "src/dtos/administrator/jwt.data.administrator.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";

@Controller('auth') // http://localhost:3000/auth/
export class AuthController {
    constructor(
        public administratorService: AdministratorService
    ) { }

    @Post('login')
    async doLogin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise<LoginInfoAdministratorDto | ApiResponse> {
      const admin = await this.administratorService.getByUsername(data.username)
    
      
      if (!admin) {
        return new Promise(resolve => resolve(new ApiResponse('error', -3001, 'wrong account username')))
      }

      const passwordHash = crypto.createHash('sha512')
      passwordHash.update(data.password)
      const passwordHashString = passwordHash.digest('hex').toUpperCase()

      if (admin.passwordHash !== passwordHashString) {
        return new Promise(resolve => resolve(new ApiResponse('error', -3002, 'wrong account password')))
      }

      const jwtData = new JwtDataAdministratorDto()
      jwtData.administratorId = admin.administratorId
      jwtData.username = admin.username
      let now = new Date()
      now.setDate(now.getDate() + 14)
      const expTime = now.getTime() / 1000
      jwtData.exp = expTime
      jwtData.ip = req.ip.toString()
      jwtData.ua = req.headers["user-agent"]

      let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret)

      const response = new LoginInfoAdministratorDto(
        admin.administratorId,
        admin.username,
        token
      )

      return new Promise(resolve => resolve(response))

    }

  }
