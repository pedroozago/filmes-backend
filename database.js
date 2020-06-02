//yarn para startar
//yarn add pg
const Pool = require('pg').Pool;

//1 - Abrir a conexão
//2 - Executar o comando SQL (query, insert)
//3 - Fechar a conexão

const pool = new Pool({  
    user: 'rsmxkdevoteymp', 
    password: '83d702b1b90281036acbaca811c2bb271bd6f9b7ca69d04f668f1cbe859b615b',
    host: 'ec2-3-231-16-122.compute-1.amazonaws.com',
    database: 'dc8t0f65c32u88',
    port: '5432',
    ssl: { rejectUnauthorized: false }
})

// const sqlTabelaFilmes = `
//     CREATE TABLE IF NOT EXISTS filmes
//     (
//         id serial primary key,
//         nome varchar(255),
//         diretor varchar(255),
//         ano int,
//         assistido boolean
//     )
// `;

// pool.query(sqlTabelaFilmes, (error, result) => {
//     if(error)
//         throw error
    
//     console.log('Tabela criada com sucesso!');
// });

//INSERT
const sql_insert = `
        INSERT INTO filmes (nome, diretor, ano, assistido) VALUES ('Ford Vs Ferrari','Pedro Ford',2019, true)
`;

pool.query(sql_insert, function(error, result) {
    if(error)
        throw error;

    console.log(result.rowCount);
})



//SELECT
// const sql_select = `SELECT * FROM filmes`;

// pool.query(sql_select, function(error, result) {
//     if(error)
//         throw error;

//     console.log(result.rows);
// })