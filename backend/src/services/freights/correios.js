const express = require('express');
const axios = require('axios');

/** 
 * @param {express.Request} req */
module.exports = async (req) => {

    if(req.body.length < 15) req.body.length = 15;

    let response, pac, sedex;
    
    try {
        let source = axios.CancelToken.source();
        
        setTimeout(() => {
            source.cancel();
        }, 5000);
        
        response = await axios.get(`http://correios-server.herokuapp.com/frete/prazo?nCdServico=04510&sCepOrigem=13490000&sCepDestino=${req.body.destZipCode}&nVlPeso=${req.body.weight}&nCdFormato=1&nVlComprimento=${req.body.length}&nVlAltura=${req.body.height}&nVlLargura=${req.body.width}&nVlDiametro=0&nVlValorDeclarado=0&sCdMaoPropria=n&sCdAvisoRecebimento=n`, {
            cancelToken: source.token
        });
        
        pac = {
            Valor: response.data.response[0].Valor,
            PrazoEntrega: response.data.response[0].PrazoEntrega,
            MsgErro: response.data.response[0].MsgErro
        }

    } catch (error) {
        
        pac = { message: 'Não foi possivel obter frete' }
    }
    
    try {

        let source = axios.CancelToken.source();
        
        setTimeout(() => {
            source.cancel();
        }, 5000);
                               
        response = await axios.get(`http://correios-server.herokuapp.com/frete/prazo?nCdServico=04014&sCepOrigem=13490000&sCepDestino=${req.body.destZipCode}&nVlPeso=${req.body.weight}&nCdFormato=1&nVlComprimento=${req.body.length}&nVlAltura=${req.body.height}&nVlLargura=${req.body.width}&nVlDiametro=0&nVlValorDeclarado=0&sCdMaoPropria=n&sCdAvisoRecebimento=n`, {
            cancelToken: source.token
        });
        
        sedex = {
            Valor: response.data.response[0].Valor,
            PrazoEntrega: response.data.response[0].PrazoEntrega,
            MsgErro: response.data.response[0].MsgErro
        }

    } catch (error) {
        
        sedex = { message: 'Não foi possivel obter frete' }
    }

    /*
    const [ pac ] = await correios.calcPrecoPrazo({
        "nCdServico": "04510",                  // Código PAC
        "sCepOrigem": "13490000",               // CEP ORIGEM (string sem hífen)
        "sCepDestino": req.body.destZipCode,    // CEP DESTINO (string sem hífen)
        "nVlPeso": req.body.weight,             // Peso em kilogramas (string: "0,500")
        "nCdFormato": 1,                        // 1 – Formato caixa/pacote // 2 – Formato rolo/prisma // 3 – Envelope
        "nVlComprimento": req.body.length,      // Comprimento em centimetros (float)
        "nVlAltura": req.body.height,           // Altura em centimetros (float)
        "nVlLargura": req.body.width,           // Largura em centimetros (float)
        "nVlDiametro": 0,                       // Diametro em centimetros (float)
        "sCdMaoPropria": "N",                   // Serviço adicional "mão própria" (string: "S" para sim, "N" para não)
        "nVlValorDeclarado": 0,                 // Serviço adicional "valor declarado" (float: 0 para não)
        "sCdAvisoRecebimento": "N"              // Serviço adicional "aviso de recebimento" (string: "S" para sim, "N" para não)
    });

    const [ sedex ] = await correios.calcPrecoPrazo({
        "nCdServico": "04014",                  // Código SEDEX
        "sCepOrigem": "13490000",
        "sCepDestino": req.body.destZipCode,
        "nVlPeso": req.body.weight,
        "nCdFormato": 1,
        "nVlComprimento": req.body.length,
        "nVlAltura": req.body.height,
        "nVlLargura": req.body.width,
        "nVlDiametro": req.body.diameter,
        "sCdMaoPropria": "N",
        "nVlValorDeclarado": 0,
        "sCdAvisoRecebimento": "N"
    });*/

    return { pac, sedex };
}