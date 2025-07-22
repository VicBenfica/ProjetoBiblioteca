import mysql, { Connection, QueryError } from 'mysql2';
//importa o mysql 

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1467',
    database: 'biblioteca'
};


const mysqlConnection: Connection = mysql.createConnection(dbConfig);
//cria uma instancia de conexao com o banco


mysqlConnection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexao bem-sucedida com o banco de dados MySQL');
});
//tenta abrir a conexão com o banco



export function executarComandoSQL(query: string, valores: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query. ', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}





