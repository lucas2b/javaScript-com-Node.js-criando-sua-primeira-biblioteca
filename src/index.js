export function quebraTextoEmParagrafos(texto){
    const paragrafos = texto.toLowerCase().split('\n');
    
    //map do parágrafo para um objeto fomando uma lista
    const objetosPalavrasRepetidasPorParagrafo = paragrafos
        .filter(paragrafo => paragrafo) //utilização de truphy ou falsy para descartar parágrafos vazios
        .map(paragrafo => { 
        return montaObjetoComPalavrasContadas(paragrafo) //mapeia um paragrafo para um objeto
    });

    return objetosPalavrasRepetidasPorParagrafo;
}

function montaObjetoComPalavrasContadas(texto){
    const listaPalavras = texto.split(' ');
    const objetoResultado = {}; //objeto resultado

    listaPalavras.forEach(palavra => {
        if(palavra.length >= 3){
            const palavraLimpa = removeCaracteresInvalidosPalavra(palavra);
            objetoResultado[palavraLimpa] = (objetoResultado[palavraLimpa] || 0) + 1; //pega o vlr num. atual da palavra e incrementa 1, ou inicia com 1
        }
    });
    return objetoResultado;//retorna um objeto com o número de palavras repetidas no texto

    /* ex:
        {
            carro: 4,
            casa: 2,
            cachorro: 3
        }
    */
}

function removeCaracteresInvalidosPalavra(palavra){
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}