import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ukm from "App/Models/Ukm";
import Uploader from "App/Helpers/Uploader";

export default class UkmsController {

    async index({request, response}: HttpContextContract) {
        const {type} = request.all();
        const ukm = await Ukm.query().where('type', type)
        return response.success(ukm)
    }

    async show({params, response}: HttpContextContract) {
        const ukm = await Ukm.query()
            .where('slug', params.id)
            .first()

        if (ukm === null) return response.error('Ukm tidak ditemukan')

        return response.success(ukm)
    }

    async store({request, response}: HttpContextContract) {

        const {name, type, slug, description, visi, misi} = request.all()

        if (name == null) return response.error('Nama ukm tidak boleh kosong')

        const logo = await Uploader.logo(request.file('logo')!);

        await Ukm.create({
            type: type,
            name: name,
            slug: slug,
            description: description,
            visi: visi,
            misi: misi,
            logo: logo
        })

        return response.success(null, 'Berhasil tambah data')
    }

    async update({params, request, response}: HttpContextContract) {
        const ukm = await Ukm.query()
            .where('id', params.id)
            .first()

        if (ukm === null) return response.error('Ukm tidak ditemukan')

        const payload = request.all();
        const logo = request.file('logo')
        if (logo != null) payload.logo = await Uploader.logo(logo)

        ukm.merge(payload)
        await ukm.save()

        return response.success(null, 'Berhasil ubah data')
    }

    async destroy({params, response}: HttpContextContract) {
        const ukm = await Ukm.query()
            .where('id', params.id)
            .first()

        if (ukm === null) return response.error('Ukm tidak ditemukan')

        await ukm.delete()

        return response.success(null, 'Berhasil hapus data')
    }

}
