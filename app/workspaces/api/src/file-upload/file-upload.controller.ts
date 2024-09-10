import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFile,
	Param,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service'
import { ApiTags } from '@nestjs/swagger'
import multer from 'multer'

@ApiTags('file-upload')
@Controller('file-upload')
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@Post('uploads')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Param('username') username: string,
	) {
		// const upload = multer({ dest: 'uploads/' })
		// console.log(file)
		return this.fileUploadService.handleFileUpload(file)
	}
}
