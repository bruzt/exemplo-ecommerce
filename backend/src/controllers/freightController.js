/*const Correios = require('node-correios');
const correios = new Correios();*/
const axios = require('axios');
const { parseStringPromise } = require('xml2js');

module.exports = {

    store: async (req, res) => {

        if(req.body.length < 15) req.body.length = 15;

        let response, json, pac, sedex;
        
        try {
            const source = axios.CancelToken.source();
            
            setTimeout(() => {

                source.cancel();

            }, 5000);
            
            response = await axios.get(`https://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=13490000&sCepDestino=${req.body.destZipCode}&nVlPeso=${req.body.weight}&nCdFormato=1&nVlComprimento=${req.body.length}&nVlAltura=${req.body.height}&nVlLargura=${req.body.width}&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04510&nVlDiametro=0&StrRetorno=xml`, {
                cancelToken: source.token
            });
            
            json = await parseStringPromise(response.data);

            pac = {
                Valor: json.Servicos.cServico[0].Valor[0],
                PrazoEntrega: json.Servicos.cServico[0].PrazoEntrega[0],
                MsgErro: json.Servicos.cServico[0].MsgErro[0]
            }

        } catch (error) {
            
            pac = { message: 'Não foi possivel obter frete' }
        }
        
        try {

            const source = axios.CancelToken.source();
            
            setTimeout(() => {

                source.cancel();

            }, 5000);
        
            response = await axios.get(`https://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=13490000&sCepDestino=${req.body.destZipCode}&nVlPeso=${req.body.weight}&nCdFormato=1&nVlComprimento=${req.body.length}&nVlAltura=${req.body.height}&nVlLargura=${req.body.width}&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=04014&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3`, {
                cancelToken: source.token
            });
            
            json = await parseStringPromise(response.data);

            sedex = {
                Valor: json.Servicos.cServico[0].Valor[0],
                PrazoEntrega: json.Servicos.cServico[0].PrazoEntrega[0],
                MsgErro: json.Servicos.cServico[0].MsgErro[0]
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

        return res.json({ pac, sedex });
    }
}
