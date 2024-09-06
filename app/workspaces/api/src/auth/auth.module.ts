import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { UserService } from '../user/user.service'
import { AuthController } from './auth.controller'

@Module({
	controllers: [AuthController],
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: 'SECRET',
			signOptions: { expiresIn: '60s' },
		}),
	],
	providers: [AuthService, LocalStrategy],
	exports: [AuthService],
})
export class AuthModule {}
