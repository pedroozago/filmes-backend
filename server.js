const express = require('express');

const server = express();

const Pool = require('pg').Pool

const pool = new Pool({

    user: 'rsmxkdevoteymp',
    password: '83d702b1b90281036acbaca811c2bb271bd6f9b7ca69d04f668f1cbe859b615b',
    host: 'ec2-3-231-16-122.compute-1.amazonaws.com',
    database: 'dc8t0f65c32u88',
    port: '5432',
    ssl: {
        rejectUnauthorized: false
    }
})

//sql de criação da tabela de filmes no banco
const sqlTabelaFilmes = `
    CREATE TABLE IF NOT EXISTS filmes
    (
        id serial primary key,
        nome varchar(255),
        diretor varchar(255),
        ano int,
        assistido boolean
    )
`;

pool.query(sqlTabelaFilmes, (error, result) => {
    if(error)
        throw error
    
    console.log('Tabela criada com sucesso!');
});






server.use(express.json());

const filmes = [
    {id: 1, nome: 'Clube da luta', diretor: 'David Fincher', ano: 1999, assistido: 'Sim'},
    {id: 2, nome: 'Vingadores ', diretor: 'Joss Whedon', ano: 2012, assistido: 'Sim'}
]

server.get('/filme', function(request, response) {
    response.json(filmes);
})

server.post('/filme', function(request, response) {

    const {id, nome, diretor, ano, assistido} = request.body;

    filmes.push({id, nome, diretor, ano, assistido})
    response.status(204).send();
})

server.put('/filme/:id', function(request, response){
    const id = request.params.id;
    const {nome, diretor, ano, assistido} = request.body;

    for(let i = 0; i < filmes.length; i++){
        if(filmes[i].id == id) {
            filmes[i].nome = nome;
            filmes[i].diretor = diretor;
            filmes[i].ano = ano;
            filmes[i].assistido = assistido;
            break;
        }
    }

    return response.status(204).send();
})

server.delete('/filme/:id', function(request, response) {

    const id = request.params.id;

    for(let i = 0; i < filmes.length; i++){
        if(filmes[i].id == id) {
            filmes.splice(i, 1)
            break;
        }
    }

    return response.status(204).send();
})




server.listen(process.env.PORT || 3000);