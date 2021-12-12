import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Uploader from "App/Helpers/Uploader";
import User from "App/Models/User";

export default class UsersController {

    async index({response}: HttpContextContract) {
        const users = await User.query()
            .orderBy('name')
        return response.success(users)
    }

    async store({auth, request, response}: HttpContextContract) {
        const payload = request.all()

        let user = await User.findBy('email', payload.email)
        if (user !== null) return response.error('Email telah terdaftar di akun lain')

        const photo = request.file('photo')
        payload.photo = await Uploader.photo(photo!)

        user = await User.create(payload)
        const token = await auth.login(user)

        return response.success({
            user: user,
            token: token
        })
    }

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

    async update({auth, params, request, response}: HttpContextContract) {
        const payload = request.all()
        let user
        if (params.id == undefined) user = auth.user!
        else {
            user = await User.query()
                .where('id', params.id)
                .first()
        }

        const photo = request.file('photo')
        if (photo !== null) payload.photo = await Uploader.photo(photo!)

        user.merge(payload)
        await user.save()

        return response.success(user)
    }

    async destroy({params, response}: HttpContextContract) {
        const user = await User.query()
            .where('id', params.id)
            .first()

        if (user === null) return response.error('User tidak ditemukan')

        await user.delete()

        return response.success(null, 'Berhasil hapus data')
    }
}
