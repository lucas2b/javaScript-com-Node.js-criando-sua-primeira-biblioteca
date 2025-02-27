export default function trataErros(erro){
    if(erro.code === 'ENOENT'){
        throw new Error('Arquivo não encontrato.');
    }else{
        throw new Error('Ocorreu um erro na aplicação:', erro);
    }
}