'use strict'

const createError = require('http-errors');
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const router = express.Router();

// Carrega as Rotas
const index = require('./routes/index');
const authRoute = require('./auth/routes/authRoute');
const userRoute = require('./routes/userRoute');
const locationRoute = require('./routes/localizacaoRoute');
const avaliacaoDesempenhoRoute = require('./routes/avaliacaoDesempenho');
const avaliacaoProbatorioRoute = require('./routes/avaliacaoProbatorio');
const unidadeRoute = require('./routes/unidadeRoute');
//Middleware
const verificaToken = require('./auth/verificaToken');
app.use(logger('dev'));
app.use(parser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);
app.use('/auth', authRoute);
app.use('/usuario', verificaToken, userRoute);
app.use('/localizacao', verificaToken, locationRoute);
app.use('/avaliacao/desempenho', verificaToken, avaliacaoDesempenhoRoute);
app.use('/avaliacao/probatorio', verificaToken, avaliacaoProbatorioRoute);
app.use('/unidade', verificaToken, unidadeRoute);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("Erro catch 404");
    next(createError(404));
  });
  

app.use(function(err, req, res, next) {
  if (app.get('env') !== 'development')
      delete err.stack;
      res.status(err.status).json({
      'error': {
          'message': err.message,
          'status': err.status,
          'stack': err.stack
      }
  });
});

 module.exports = app;
