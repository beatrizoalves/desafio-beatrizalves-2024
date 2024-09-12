class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ['savana'] },
        LEOPARDO: { tamanho: 2, biomas: ['savana'] },
        CROCODILO: { tamanho: 3, biomas: ['rio'] },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'] },
        GAZELA: { tamanho: 2, biomas: ['savana'] },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'] }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      
      if (!this.animais.hasOwnProperty(animal)) {
        return { erro: "Animal inválido" };
      }
  
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida" };
      }
  
      const animalInfo = this.animais[animal];
      const tamanhoNecessario = animalInfo.tamanho * quantidade;
      let recintosViaveis = [];
  
      this.recintos.forEach(recinto => {
        let espacoOcupado = 0;
        let carnívoroPresente = false;
        let especiesDiferentes = false;
        let podeAdicionar = true;
  
        
        if (!animalInfo.biomas.includes(recinto.bioma)) {
          return;
        }
  
        
        recinto.animais.forEach(animalExistente => {
          const infoExistente = this.animais[animalExistente.especie];
          espacoOcupado += infoExistente.tamanho * animalExistente.quantidade;
  
        
          if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animalExistente.especie)) {
            carnívoroPresente = true;
            if (animalExistente.especie !== animal) {
              podeAdicionar = false;
            }
          }
  
          if (animalExistente.especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
            podeAdicionar = false;
          }
  
          
          if (animalExistente.especie !== animal) {
            especiesDiferentes = true;
          }
        });
  
   
        const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado - (especiesDiferentes ? 1 : 0);
        if (podeAdicionar && espacoDisponivel >= tamanhoNecessario) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - tamanhoNecessario} total: ${recinto.tamanhoTotal})`);
        }
      });
  
      
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis: recintosViaveis.sort() };
    }
  }
  
  export { RecintosZoo as RecintosZoo };