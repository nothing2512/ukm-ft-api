import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UkmMember from "App/Models/UkmMember";
import Uploader from "App/Helpers/Uploader";

export default class UkmMembersController {

    async index({request, response}: HttpContextContract) {
        const member = await UkmMember.query()
            .where('ukmId', request.input('ukmId'))
            .orderBy('position')
        return response.success(member)
    }

    async show({params, response}: HttpContextContract) {
        const ukm = await UkmMember.query()
            .where('slug', params.id)
            .first()

        if (ukm === null) return response.error('Ukm tidak ditemukan')

        return response.success(ukm)
    }

    async store({request, response}: HttpContextContract) {

        const {name, ukmId, position} = request.all()

        if (name == null) return response.error('Nama penyimpanan tidak boleh kosong')

        const photo = await Uploader.photo(request.file('photo')!);

        await UkmMember.create({
            ukmId: ukmId,
            name: name,
            position: position,
            photo: photo
        })

        return response.success(null, 'Berhasil tambah data')
    }

    async update({params, request, response}: HttpContextContract) {
        const ukm = await UkmMember.query()
            .where('id', params.id)
            .first()

        if (ukm === null) return response.error('Ukm tidak ditemukan')

        const payload = request.all();
        const photo = request.file('photo')
        if (photo != null) payload.photo = await Uploader.photo(photo)

        ukm.merge(payload)
        await ukm.save()

        return response.success(null, 'Berhasil ubah data')
    }

    async destroy({params, response}: HttpContextContract) {
        const ukm = await UkmMember.query()
            .where('id', params.id)
            .first()

        if (ukm === null) return response.error('Ukm tidak ditemukan')

        await ukm.delete()

        return response.success(null, 'Berhasil hapus data')
    }

}
