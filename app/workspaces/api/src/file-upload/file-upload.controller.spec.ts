import { Test, TestingModule } from '@nestjs/testing'
import { FileUploadController } from './file-upload.controller'
import { UserModule } from '../user/user.module'
import { FileUploadService } from './file-upload.service'

describe('UploadController', () => {
	let controller: FileUploadController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FileUploadController],
			imports: [UserModule],
			providers: [FileUploadService],
		}).compile()

		controller = module.get<FileUploadController>(FileUploadController)
	})

	it('should upload a file', async () => {
		const file = {
			originalname: 'file.png',
			filename: 'file.png',
			path: './USERNAME_FOR_TEST',
		} as Express.Multer.File

		const result = controller.uploadFile(file)

		expect(result).toEqual({
			message: 'File uploaded successfully',
			filePath: './USERNAME_FOR_TEST',
		})
	})
})
