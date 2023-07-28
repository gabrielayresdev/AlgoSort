// Função assíncrona que pausa a execução do programa
export default async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
