const { Pool } = require('pg')

const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  database: 'repertorio',
  port: 5432
});

const insert = async (datos) => {
  const consulta = {
    text: ' INSERT INTO repertorio (cancion, artista, tono) values ($1, $2, $3)',
    values: datos,
  };
  try {
    const result = await pool.query(consulta)
    return result;
  }catch(error){
    console.log(error)
    return error;
  }
}

const consultar = async () =>{
  try {
    const result = await pool.query('SELECT * FROM repertorio');
    return result
  }catch(error){
    console.log(error)
    return error;
  }
}

const editar = async (datos) => {
  const consulta = {
    text:`UPDATE repertorio SET
    cancion = $1,
    artista = $2,
    tono = $3
    WHERE cancion = $1 RETURNING *`,
    values: datos,
  };
  try {
    const result = await pool.query(consulta);
    console.log(result)
    return result
  }catch(error){
    console.log(error)
    return error;
  }
}

const eliminar = async (id) => {
  try {
    const result = await pool.query(
      `DELETE FROM repertorio WHERE id = '${id}'`);
    return result
  }catch(error){
    console.log(error)
    return error;
  }
}

module.exports = {insert, consultar, editar, eliminar};