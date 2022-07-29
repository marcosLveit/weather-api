//const browserObject = require('./browser');

import {start} from './browser';

export async function getBasicData(){
    let brouserInstance = await start();
    let page = await brouserInstance.newPage();
    await page.goto('https://www.inumet.gub.uy/');
    await page.waitForSelector(".v2");
    let dataTemperatura = await page.$eval("#temperaturaActual", elem => {
        return {
            'tag': 'temperatura actual',
            'value': elem.innerHTML,
            'unit': elem.nextElementSibling?.innerHTML
        }
    });
    let dataViento = await page.$eval("#valViento", elem => {
        return {
            'tag': 'viento',
            'value': elem.innerHTML,
            'unit': elem.nextElementSibling?.innerHTML
        }
    });
    let dataPresion = await page.$eval("#valPresion", elem => {
        return {
            'tag': 'presión',
            'value': elem.innerHTML,
            'unit': elem.nextElementSibling?.innerHTML
        }
    });
    let dataHumedad = await page.$eval("#valHumedad", elem => {
        return {
            'tag': 'humedad',
            'value': elem.innerHTML,
            'unit': elem.nextElementSibling?.innerHTML
        }
    });
    let dataVisibilidad = await page.$eval("#valVisibilidad", elem => {
        return {
            'tag': 'humedad',
            'value': elem.innerHTML,
            'unit': elem.nextElementSibling?.innerHTML
        }
    });
    let dataEstado = await page.evaluate(() => {
        let element = document.querySelector("#iconoGrandeEA");
        //@ts-ignore
        let computed = window.getComputedStyle(element, "::after");
        console.log(element, computed);
        let result = Object.entries(computed).filter(style => style[0] == 'content');
        return {
            'tag': 'estado',
        //@ts-ignore
            'value': result[0][1].replaceAll('"', '')
        }
    });
    await brouserInstance.close();
    return [dataTemperatura, dataViento, dataPresion, dataHumedad, dataVisibilidad, dataEstado];
}