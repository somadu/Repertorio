const http = require('http')
const fs = require('fs')
const url = require('url')
const axios = require('axios')
const { insert, consultar, editar, eliminar} = require('./consulta')

http
  .createServer(async (req, res) => {

    if (req.url == '/' && req.method === 'GET'){
      res.setHeader('content.type', 'text/html')
      const html = fs.readFileSync('index.html', 'utf8')
      res.end(html)
    }

    if (req.url == '/canciones' && req.method === 'GET'){
      const resgistros = await consultar();
      res.end(JSON.stringify(resgistros.rows));
    }

    if (req.url == "/cancion" && req.method == 'POST'){
      let body = "";
      req.on('data', (chunk)=> {
        body += chunk;
      });
      req.on('end', async() => {
        const datos = Object.values(JSON.parse(body));
        const respuesta = await insert(datos);
        res.end(JSON.stringify(respuesta));
      })
    }

    if (req.url == "/cancion" && req.method == 'PUT'){
      let body = "";
      req.on('data', (chunk)=> {
        body += chunk;
      });
      req.on('end', async() => {
        const datos = Object.values(JSON.parse(body));
        const respuesta = await editar(datos);
        res.end(JSON.stringify(respuesta.rows));
      })
    }

    if (req.url.includes("/cancion?id=") && req.method == 'DELETE'){
      const {id} = url.parse(req.url, true).query;
      const respuesta = await eliminar(id);
      res.end(JSON.stringify(respuesta));
    }
    
  })
  .listen(3000);