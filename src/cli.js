import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcoesErros.js';
import { quebraTextoEmParagrafos } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-e, --entrada <string>', 'caminho do texto a ser processado')
    .option('-s, --saida <string>','caminho da pasta onde vai salvar o resultado')
    .action((options) => {
        const  {entrada , saida: saida} = options; //deconstruct
        if(!entrada || !saida) {
            console.error('erro: favor inserir caminho de origem e saida');
            program.help();
            return;
        }
        const caminhoEntrada = path.resolve(entrada);
        const caminhoSaida = path.resolve(saida);
        try{
            processaArquivo(caminhoEntrada, caminhoSaida);
        }catch(erro){
            console.log(chalk.red('Ocorreu um erro no processamento'), erro);
        }
        console.log(chalk.green('Texto processado com sucesso!'));
    });

program.parse();

function processaArquivo(entrada, saida){
    //função assíncrona
    fs.readFile(entrada, 'utf-8', (err, textoLido) => {
       try{
            if(err){
                throw err;
            }
            const objetosPalavrasRepetidasPorParagrafo = quebraTextoEmParagrafos(textoLido);
            criaESalvaArquivoResultados(objetosPalavrasRepetidasPorParagrafo, saida);
            console.log('fim do processamento');
            
       } catch(erro){
            trataErros(erro);
       }
    });
}

async function criaESalvaArquivoResultados(arrayObjetosPalavrasRepetidasPorParagrafo, caminhoGravacaoArquivoResultado){
    const arquivoNovo = `${caminhoGravacaoArquivoResultado}/resultado.txt`;
    const objetoPalavrasString = montaSaidaArquivo(arrayObjetosPalavrasRepetidasPorParagrafo);
    try{
        await fs.promises.writeFile(arquivoNovo, objetoPalavrasString);
        console.log('arquivo criado');
        
    }catch(erro){
        throw new Error(erro);
    }
}