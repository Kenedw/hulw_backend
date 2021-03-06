'use strict';

const ImportClient = require('../config/config');
const client = ImportClient.get();

  exports.get=  () =>  {

      //Realiza a leitura no banco de dados
      const query = client.query('SELECT * FROM "LOCALIZACAO" ')

      query.then(function(row){
          results.push(row)
      })

      return query

  }

  exports.create =  function(localizacaoNovo)  {
    const results = []
    console.log('localizacaoNovo ' + JSON.stringify(localizacaoNovo));

    const data = {id_Localizacao: localizacaoNovo.id_Localizacao, ano: localizacaoNovo.dt_Ano, idUsuario: localizacaoNovo.id_Usuario,
        idUnidade: localizacaoNovo.id_Unidade, isChefe: localizacaoNovo.is_Chefe};

     const query = client.query('INSERT INTO "LOCALIZACAO"("id_Localizacao","dt_Ano", "id_Usuario", "id_Unidade", "is_Chefe") values($1,$2, $3, $4, $5)',
      [data.id_Localizacao,data.ano, data.idUsuario, data.idUnidade, data.isChefe]);

   return query;
}

exports.update =  function(id_Localizacao, localizacaoNovo)  {
    const results = []
    console.log('id '+  JSON.stringify(id_Localizacao) +'  localizacaoNovo ' + JSON.stringify(localizacaoNovo));

    const data = {ano: localizacaoNovo.dt_Ano, idUsuario: localizacaoNovo.id_Usuario,
        idUnidade: localizacaoNovo.id_Unidade, isChefe: localizacaoNovo.is_Chefe};

      const query = client.query('UPDATE "LOCALIZACAO" SET "dt_Ano"=($1), "id_Usuario"=($2), "id_Unidade"=($3), "is_Chefe"=($4) WHERE "id_Localizacao"=($5)',
        [data.ano, data.idUsuario, data.idUnidade, data.isChefe,id_Localizacao]);
  
    return query;
}


exports.getById =  function(id_Localizacao)  {
    //Realiza a leitura no banco de dados
    const query = client.query('SELECT * FROM "LOCALIZACAO" WHERE "id_Localizacao"=($1)', [id_Localizacao])

    query.then(function(row){
        results.push(row)
    })

    return query


}

exports.getByUserId = function(id_Usuario){
     //Realiza a leitura no banco de dados
    const query = client.query('SELECT * FROM "LOCALIZACAO" WHERE "id_Usuario"=($1)', [id_Usuario])

    query.then(function(row){
        results.push(row)
    })

    return query
}

exports.getUserIdById = function(id_Unidade){
    //Realiza a leitura no banco de dados
    const query = client.query('SELECT "id_Usuario" FROM "LOCALIZACAO" WHERE "id_Unidade"=($1)', [id_Unidade])

    query.then(function(row){
        results.push(row)
    })

    return query
}

exports.remove =  function(id_Localizacao)  {

    console.log(JSON.stringify(id_Localizacao));

    //Realiza a leitura no banco de dados
    const query = client.query('DELETE FROM "LOCALIZACAO" WHERE "id_Localizacao"=($1)', [id_Localizacao])

    query.then(function(row){
        results.push(row)
    })

    return query


}
