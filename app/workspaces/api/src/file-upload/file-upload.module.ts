import { Module } from '@nestjs/common'
import { FileUploadService } from './file-upload.service'
import { FileUploadController } from './file-upload.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { UserModule } from '../user/user.module'
import { UserDto } from 'src/user/dto/user.api.dto'

@Module({
	imports: [
		UserModule,
		MulterModule.register({
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const user = req.user as UserDto

					cb(null, user.username + '.jpg')
				},
			}),
		}),
	],
	controllers: [FileUploadController],
	providers: [FileUploadService],
	exports: [FileUploadService],
})
export class FileUploadModule {}
