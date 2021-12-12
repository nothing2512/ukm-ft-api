import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class AuthController {

    async login({auth, request, response}: HttpContextContract) {
        const {email, password} = request.all()

        const user = await User.findBy('email', email)
        if (user == null) return response.status(200).json({
            status: false,
            message: 'Email tidak terdaftar',
            data: null
        })

        const isLogged = await Hash.verify(user.password, password)
        if (!isLogged) return response.status(200).json({
            status: false,
            message: 'Password salah',
            data: null
        })

        const token = await auth.login(user)

        return response.success({
            user: user,
            token: token
        })
    }

    async logout({auth, response}: HttpContextContract) {
        await auth.logout()
        return response.success(null, 'berhasil logout')
    }
}
