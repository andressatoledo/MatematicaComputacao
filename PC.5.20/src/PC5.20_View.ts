import {calcularDistancia} from "./PC5.20"

const anguloGraus = 30;     // 30°
const alturaCm = 1000;       //10m -> 1000cm

const distancia = calcularDistancia(anguloGraus, alturaCm);

console.log(`A distância calculada é: ${distancia.toFixed(2)} metros.`);
