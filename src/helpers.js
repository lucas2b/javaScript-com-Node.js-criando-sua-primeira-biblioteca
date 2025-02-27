//Devolve as chaves de palavras repetidas em formato de array de strings
function filtraPalavrasRepetidas(objetoParagrafo){
    //Object.keys Retorna um array de strings contendo todas as chaves do objeto, as chaves são palavras.
    //filter apenas filtra o array de strings
    return Object.keys(objetoParagrafo).filter(chave => objetoParagrafo[chave] > 1);
}

function montaSaidaArquivo(arrayObjetosPalavrasRepetidasPorParagrafo){
    let textoFinal = '';
    arrayObjetosPalavrasRepetidasPorParagrafo.forEach((objetoParagrafo, indice) => {
        const duplicadas = filtraPalavrasRepetidas(objetoParagrafo).join(', ');
        textoFinal += `Palavras repetidas no parágrafo ${indice+1}: ${duplicadas} \n`;
    });

    return textoFinal;
}

export { montaSaidaArquivo };