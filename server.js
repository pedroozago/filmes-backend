const express = require('express');
const Pool = require('pg').Pool;

const pool = new Pool({  
    user: 'rsmxkdevoteymp', 
    password: '83d702b1b90281036acbaca811c2bb271bd6f9b7ca69d04f668f1cbe859b615b',
    host: 'ec2-3-231-16-122.compute-1.amazonaws.com',
    database: 'dc8t0f65c32u88',
    port: '5432',
    ssl: { rejectUnauthorized: false }
})

const server = express();

server.use(express.json());

//GET
server.get('/filme', async function(request, response) {
   result = await pool.query('SELECT * FROM filmes');

   return response.json(result.rows);
})

//POST
server.post('/filme', async function(request, response) {
    const nome = request.body.nome;
    const diretor = request.body.diretor;
    const ano = request.body.ano;
    const sql= `INSERT INTO filmes (nome, diretor, ano, assistido) VALUES ($1, $2, $3, $4)`;
    await pool.query(sql, [nome, diretor, ano, false]);
    return response.status(204).send();
})












//CRUD EM MEMÓRIA

// server.get('/filme', function(request, response) {
//     response.json(filmes);
// })

// server.post('/filme', function(request, response) {

//     const {id, nome, diretor, ano, assistido} = request.body;

//     filmes.push({id, nome, diretor, ano, assistido})
//     response.status(204).send();
// })

// server.put('/filme/:id', function(request, response){
//     const id = request.params.id;
//     const {nome, diretor, ano, assistido} = request.body;

//     for(let i = 0; i < filmes.length; i++){
//         if(filmes[i].id == id) {
//             filmes[i].nome = nome;
//             filmes[i].diretor = diretor;
//             filmes[i].ano = ano;
//             filmes[i].assistido = assistido;
//             break;
//         }
//     }

//     return response.status(204).send();
// })

// server.delete('/filme/:id', function(request, response) {

//     const id = request.params.id;

//     for(let i = 0; i < filmes.length; i++){
//         if(filmes[i].id == id) {
//             filmes.splice(i, 1)
//             break;
//         }
//     }

//     return response.status(204).send();
// })


//Escutar uma porta com as requisições HTTP
server.listen(process.env.PORT || 3000);