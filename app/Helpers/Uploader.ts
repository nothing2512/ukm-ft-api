import {MultipartFileContract} from "@ioc:Adonis/Core/BodyParser";
import Application from "@ioc:Adonis/Core/Application";
import { v4 as uuidv4 } from 'uuid';

export default class Uploader {

    static async photo(file: MultipartFileContract) {
        return this.upload(file, 'photo')
    }

    static async logo(file: MultipartFileContract) {
        return this.upload(file, 'logo')
    }

    static async upload(file: MultipartFileContract, directory: string) {
        console.log(file.tmpPath)
        const filename = uuidv4() + '.' + file.extname
        await file.move(Application.tmpPath(`uploads/${directory}`), {
            name: filename,
            overwrite: true
        })

        return `attachments/${directory}/${filename}`
    }
}
