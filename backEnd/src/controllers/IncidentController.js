const connection = require('../database/connection')

module.exports = {
    //que
    async index(request,response){
        const {page = 1} = request.query

        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
        .join('ongs','ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['incidents.*'
        ,'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city', 
        'ongs.uf'])
        //que
        response.header('X-total-Count',count['count(*)'])
        return response.json(incidents)
    },


    async create(request,response){
        const {title,description,value} = request.body;
        const ong_id = request.headers.authorization

        const result = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        //essa parte
        const id = result[0]
        
        return response.json({ id })
    },

    async delete(request,response){
        //aqui tamb
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = connection('incidents').where('id',id)
        .select('ong_id')
        .first()

        if(incident.ong_id =! ong_id){
            return response.status(401).json( {error:'Operation not permited'})
        }

        await connection('incidents').where('id',id).delete()
        return response.status(204).send()

    }

}