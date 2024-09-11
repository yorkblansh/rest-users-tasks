import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFile,
	Param,
	UseGuards,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service'
import { ApiTags } from '@nestjs/swagger'
import { UserService } from '../user/user.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RegisterUserAvatarGuard } from './register.user.avatar.guard'

@ApiTags('file-upload')
@Controller('file-upload')
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@Post('uploads')
	@UseGuards(JwtAuthGuard, RegisterUserAvatarGuard)
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		return this.fileUploadService.handleFileUpload(file)
	}
}
