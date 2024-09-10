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

@ApiTags('file-upload')
@Controller('file-upload')
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@Post('uploads')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		return this.fileUploadService.handleFileUpload(file)
	}
}
