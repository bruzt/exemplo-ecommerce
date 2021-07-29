// @ts-ignore
//import axios from 'axios';
//const correiosApi = require('node-correios');
import frete from 'frete';

interface IArgs {
    destZipCode: string;
    weight: string;
    length: number;
    height: number;
    width: number;
}

export default async function correios({
    destZipCode,
    height,
    length,
    weight,
    width
}: IArgs) {

    if (length < 15) length = 15;

    /*let response, pac, sedex;
    
    try {
        const source = axios.CancelToken.source();
        
        setTimeout(() => {
            source.cancel();
        }, 5000);
        
        response = await axios.get(`http://correios-server.herokuapp.com/frete/prazo?nCdServico=04510&sCepOrigem=13490000&sCepDestino=${req.body.destZipCode}&nVlPeso=${req.body.weight}&nCdFormato=1&nVlComprimento=${req.body.length}&nVlAltura=${req.body.height}&nVlLargura=${req.body.width}&nVlDiametro=0&nVlValorDeclarado=0&sCdMaoPropria=n&sCdAvisoRecebimento=n`, {
            cancelToken: source.token
        });
        
        pac = {
            valor: response.data.response[0].Valor,
            prazoEntrega: response.data.response[0].PrazoEntrega,
            msgErro: response.data.response[0].MsgErro
        }

    } catch (error) {
        
        pac = { message: 'Não foi possivel obter frete' }
    }
    
    try {

        const source = axios.CancelToken.source();
        
        setTimeout(() => {
            source.cancel();
        }, 5000);
                               
        response = await axios.get(`http://correios-server.herokuapp.com/frete/prazo?nCdServico=04014&sCepOrigem=13490000&sCepDestino=${req.body.destZipCode}&nVlPeso=${req.body.weight}&nCdFormato=1&nVlComprimento=${req.body.length}&nVlAltura=${req.body.height}&nVlLargura=${req.body.width}&nVlDiametro=0&nVlValorDeclarado=0&sCdMaoPropria=n&sCdAvisoRecebimento=n`, {
            cancelToken: source.token
        });
        
        sedex = {
            valor: response.data.response[0].Valor,
            prazoEntrega: response.data.response[0].PrazoEntrega,
            msgErro: response.data.response[0].MsgErro
        }

    } catch (error) {
        
        sedex = { message: 'Não foi possivel obter frete' }
    }*/

    /*let pac, sedex, response;

    try {
        [ response ] = await correiosApi.calcPrecoPrazo({
            "nCdServico": "04510",                  // Código PAC
            "sCepOrigem": "13490000",               // CEP ORIGEM (string sem hífen)
            "sCepDestino": destZipCode,             // CEP DESTINO (string sem hífen)
            "nVlPeso": weight,                      // Peso em kilogramas (string: "0,500")
            "nCdFormato": 1,                        // 1 – Formato caixa/pacote // 2 – Formato rolo/prisma // 3 – Envelope
            "nVlComprimento": length,               // Comprimento em centimetros (float)
            "nVlAltura": height,                    // Altura em centimetros (float)
            "nVlLargura": width,                    // Largura em centimetros (float)
            "nVlDiametro": 0,                       // Diametro em centimetros (float)
            "sCdMaoPropria": "N",                   // Serviço adicional "mão própria" (string: "S" para sim, "N" para não)
            "nVlValorDeclarado": 0,                 // Serviço adicional "valor declarado" (float: 0 para não)
            "sCdAvisoRecebimento": "N"              // Serviço adicional "aviso de recebimento" (string: "S" para sim, "N" para não)
        });

        pac = {
            valor: response.Valor,
            prazoEntrega: response.PrazoEntrega,
            msgErro: response.MsgErro
        }
    } catch (error) {
        pac = {
            message: 'Não foi possível obter o frete'
        }
    }

    try {
        [ response ] = await correiosApi.calcPrecoPrazo({
            "nCdServico": "04014",                  // Código SEDEX
            "sCepOrigem": "13490000",
            "sCepDestino": destZipCode,
            "nVlPeso": weight,
            "nCdFormato": 1,
            "nVlComprimento": length,
            "nVlAltura": height,
            "nVlLargura": width,
            "nVlDiametro": 0,
            "sCdMaoPropria": "N",
            "nVlValorDeclarado": 0,
            "sCdAvisoRecebimento": "N"
        });

        sedex = {
            valor: response.Valor,
            prazoEntrega: response.PrazoEntrega,
            msgErro: response.MsgErro
        }
    } catch (error) {
        sedex = {
            message: 'Não foi possível obter o frete'
        }
    }*/

    let pac, sedex;

    try {
        [ pac ] = await frete()
            .servico(frete.servicos.pac)
            .cepOrigem('13467460')
            .cepDestino(destZipCode)
            .formato(frete.formatos.caixaPacote)
            .peso(Number(weight.replace(',', '.')))
            .comprimento(length)
            .altura(height)
            .largura(width)
            .diametro(0)
            .maoPropria('N')
            .valorDeclarado(0)
            .avisoRecebimento('N')
            .precoPrazo()
        ;
    } catch (error) {
        pac = {
            message: 'Não foi possível obter o frete'
        }
    }

    try {
        [ sedex ] = await frete()
            .servico(frete.servicos.sedex)
            .cepOrigem('13467460')
            .cepDestino(destZipCode)
            .formato(frete.formatos.caixaPacote)
            .peso(Number(weight.replace(',', '.')))
            .comprimento(length)
            .altura(height)
            .largura(width)
            .diametro(0)
            .maoPropria('N')
            .valorDeclarado(0)
            .avisoRecebimento('N')
            .precoPrazo()
        ;
    } catch (error) {
        sedex = {
            message: 'Não foi possível obter o frete'
        }
    }

    return { pac, sedex };
}
