import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFile,
	Param,
	UseGuards,
	Body,
	ValidationPipe,
	ParseFilePipeBuilder,
	HttpStatus,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RegisterUserAvatarGuard } from './register.user.avatar.guard'

@ApiTags('upload photo')
@Controller('file-upload')
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@Post('upload_photo')
	@ApiResponse({
		status: 200,
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard, RegisterUserAvatarGuard)
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: 'png',
				})
				.build({
					errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					fileIsRequired: true,
				}),
		)
		file: Express.Multer.File,
	) {
		return this.fileUploadService.handleFileUpload(file)
	}
}
