import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Uploader from "App/Helpers/Uploader";

export default class UsersController {

    async detail({auth, response}: HttpContextContract) {
        const user = auth.user!

        return response.success({
            id: user.id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        })
    }

    async update({auth, request, response}: HttpContextContract) {
        const payload = request.all()
        const user = auth.user!

        const photo = request.file('photo')
        if (photo !== null) payload.photo = await Uploader.photo(photo!)

        user.merge(payload)
        await user.save()

        return response.success(user)
    }
}
