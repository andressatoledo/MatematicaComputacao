/* 

PC. 5.20. Desenvolva um programa que calcule a distância, medida pelo instrumento topográfico 
do exercício EP.5.7 A entrada para o programa deve ser o ângulo, em graus, e a medida de 
referência h, em centimetros. A saída deve ser a distância, em metros. 

 */

// Convertendo graus para radianos, pois assim a conversão é mais efetiva
function converterGrausParaRadianos(graus: number): number {
    return graus * (Math.PI / 180);
}

// Calcular a distância com base no ângulo e altura
export function calcularDistancia(anguloGraus: number, alturaCm: number): number {
    const anguloRadianos = converterGrausParaRadianos(anguloGraus);
    const alturaMetros = alturaCm / 100; 

    // Fórmula: d = h / tan(θ)
    const distancia = alturaMetros / Math.tan(anguloRadianos);
    return distancia;
}


