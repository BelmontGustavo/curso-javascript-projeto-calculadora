class CalcController{

    constructor(){ // o metodo construtor é executado automaticamente quando tem uma instancia da classe

        this._operation = []; // crio um atributo chamado "operador" que vai pegar o operador e adicionar em um array
        this._displayCalcEl = document.querySelector("#display"); //document serve para interagir com elementos da pagina. # é usado para selecionar um id e 
        // ponto(".") serve para selecionar uma class. E o querySelector serve para selecionar esses
        // elementos. Crio uma variavel para que possa manipular esses dados e no final dela coloco o termo
        // "EL" por questão de boa pratica para indicar que é uma variavel de elemento da pagina

        this._dateEl = document.querySelector("#data"); //# significa id=
        this._timeEl = document.querySelector("#hora");     
        
        this._currentDate;
        this.initialize();
        this._locale = 'pt-br';

        this.iniButtonsEvents();
        

    }

    initialize(){ // tudo que quiser que aconteça ao iniciar a calculadora coloco nesse metodo
        
        this.setDisplayDateTime(); // chamo o metodo declarado la embaixo ja pra exibir data e hora

        /*let interval =*/ setInterval(() =>{ // server para executar algum comanda a cada X milisegundo. Nesse caso, estou atualizando data e hora a cada 1 seg
                                // criei uma variavel let = setInterval para armazenar o ID do intervalo

        this.setDisplayDateTime(); // coloco o metodo de chamar data e hora dentro do setInterval para que ele possa ser executado a cada
                                   // 1segundo

        }, 1000);

        this.setLastNumberToDisplay();

        /*setTimeout(() =>{ // setTimeout serve para executar uma unica ação depois de um periodo de tempo

            clearInterval(interval); // clearInterval para a execução do setInterval

        }, 10000);*/
   
       
    }

    // *****  GETS e SETs  *****

    get getDisplayCalc(){ // por questões de boas praticas criamos os atributos com "underline" na frente para indicar que ele é do tipo "private"
                       // ou seja que so pode ser acesso nessa classe. Desse modo, para que um objeto consiga acessar criamos os encapsulamentos
                       // get e set para capturar e setar valor no atributo 
        
        return this._displayCalcEl.innerHTML; //innerHTML server para pegar a informação selecionada e/ou adicionar um valor dentro dela 

    
    }
    set setDisplayCalc(valueDisplay){

       this._displayCalcEl.innerHTML = valueDisplay;

    }

    get getDisplayDate(){
        return this._dateEl.innerHTML;
    }

    set setDisplayDate(valueDisplayDate){
        return this._dateEl.innerHTML = valueDisplayDate;
    }

    get getDisplayTime(){
        return this._timeEl.innerHTML;
    }

    set setDisplayTime(valueTime){
        return this._timeEl.innerHTML = valueTime;
    }

    get getCurrentDate(){
        return new Date();
    }

    set setCurrentDate(valueDate){
        this._currentDate = valueDate;
    }

    //METODOS

    setDisplayDateTime(){ // Ao abrir a calculadora para que não demore a exibir a data, devido o setinterval só começar a rodar a partir
                        // depois de 1 segundo, crio esse metodo e o chamo no initialize, antes mesmo de executar o setInterval
                        // para que ele possa assim que abrir a calculadora ja exibir a data e hora atual
        this.setDisplayDate = this.getCurrentDate.toLocaleDateString(this._locale,{ 
            day: "2-digit", //depois de definir a regiao, posso colocar uma virgula e abrir cochetes para formar a data. Aqui vai exibir dia
                            // com 2 digitos, mes em extenso e ano com 4 digitos. 
            month: "long",
            year: "numeric"

        });
        this.setDisplayTime = this.getCurrentDate.toLocaleTimeString(this._locale);
    }

    addEventListenerAll(element, event, fn){ // crio um metodo que não é nativo do JS chamado "addEventListenerAll" para adicionar todos 
                                            // os eventos que quero, seja click, clicar e arrastar (drag)...
    
        event.split(' ').forEach(event =>{ // o comando split transforma uma string em array
            element.addEventListener(event, fn, false); // esse metodo irá pegar cada elemento e aplicar o evento dele. Como  split esta
                                                        // com um espaço significa que o array tera como indece [0] a primeira palavra da string
                                                        // e como indice [1] a segunda palavra que vem depois do espaço. Adiciono a função
                                                        // que tambem pode ser passada (fn) e marco como false para caso usuario click
                                                        // mais de uma vez em sequencia no botão ele so considere um click
                                                                
        }); 


    }
    
    clearAll(){ // crio um metodo "clearAll" para limpar tudo que tiver no display, ou seja, o "atributo" operation vai voltar a ficar
                // com um array vazio. Isso ocorre quando clica na tecla "AC" que significa "clear all"
        this._operation = [];
        this.setLastNumberToDisplay();
    }
    clearEntry(){ // crio um metodo "clearEntry" para limpar o ultimo registro inserido no array. Isso vai ocorrer quando clicar em "CE"
        this._operation.pop(); // o comando "pop" remove a ultima informação de um array.
        this.setLastNumberToDisplay(); 
    }

    getLastOperation(){ // crio um metodo para recuperar o valor da ultima posição do array
        return this._operation[this._operation.length-1]; // dessa forma eu listo o meu array (this._operation) e o indice do ultimo 
                                                    // elemento do array vai ser a contagem de elementos dele(length) - 1
                                                    //Ou seja, se o array tiver [1,2,'+',3] o lenght vai ser igua a 4, pois tem 4 elementos,
                                                    // - 1 vai dar exatamente o indice do ultimo elemento visto que todo array começa
                                                    // do indece [0] que no caso vai retornar o valor '3'
        
    }

    setLastValor(value){ // crio um metodo para substituir o ultimo valor do array

        this._operation[this._operation.length-1] = value;

    }
    isOperation(value){
        
        return (['+', '-', '*', '/','%'].indexOf(value) > -1); // indexOf verifica se o valor passado(value) existe dentro do array 
                                                                // caso sim ele retorna o indece desse valor e caso nao ele retorna '-1'
        
    }

    calc(){

        let last = '' //crio uma variavel last que vai receber inicialmente um valor vazio para que possa trabalhar com ela nos proximos ifs.

        if(this._operation.length > 3){ // aqui eu faço uma condição para caso o array possua mais de 3 elementos ele deletar o ultimo
                                        // e armazenar esse na variavel last;

           last = this._operation.pop();  // aqui uso o pop para excluir o ultimo registro informado no array. Mas antes de excluir
                                            // crio um variavel chamada "last" que guardar esse valor deixando ela de ser vazio
        }
        
        
        let result = eval(this._operation.join('')); // o metodo join transforma um array em string e substitui o separador pelo que quiser
                                                     // que por padrão o separador do array sao virgulas. Dessa forma, se eu colocar 
                                                      // join('') ele vai substituir a virgula por nada/vazio. Agora se eu colocasse
                                                     // join('AA') ele iria colocar um AA no separador do array. Ou seja, 
                                                 // se o array é [1,+,2] utilizando join('AA') ficaria 1AA+AA2 e fazendo join('')
                                                 // ele nao vai ter nenhum separador ficando 1+2. Apos aplicar o join eu faço um
                                                 // eval para calcular a expressão que ta no array. Ou seja, juntando o metodo
                                                // calc() com o metodo "pushOperation()" ele vai realizar um calculo dos 3 primeiros
                                                //elementos, quardar o resultado e guardar o valor que foi digitado por ultimo
        
            if(last == '%'){ // faço um if para verificar se o ultimo operador digitado (variavel last) é uma porcentagem.

           let resultPorcent = (result / 100); // se sim, eu pego o resultado do eval (operacao com os 3 primeiros numeros do array) 
                                          //e divido por 100

            this._operation = [resultPorcent]; // por fim, indico que o array vai receber o resultado dessa divisao. E nao adiciono o ultimo operador
                                                // no array pois como o ultimo foi o proprio "%" ele já utilizou para fazer a operacao acima;
        
            }   else{

                this._operation = [result]; //se o ultimo valor digitado (last) nao for % ele vai gravar no array o resultado do eval 

            if(last != '') this._operation.push(last); // e caso o last nao tenha valor vazio eu faço um push no array adicionando ele.                     
        
        }     
           this.setLastNumberToDisplay(); // ao realizar essa operação eu seto o resultado no display chamando o metodo "setLastNumBerToDisplay"
    }

    pushOperation(value){ // crio um metodo para adicionar o valor digitado no array e caso passe de 3 registros no array ele faça a operação
                        // dos 3 primeiros valores e depois contunue a adicionar mais valores
        this._operation.push(value);
        if(this._operation.length > 3){ // esse if vai fazer com que se o array passar de três elementos ele chama o metodo "calc()" da linha
                                        // 143
           this.calc(); 
           
        } 
    }

    setLastNumberToDisplay(){ // crio um metodo para setar o ultimo numero digitado no display

        let lastNumber;
        
        for(let i = this._operation.length-1; i >= 0; i--){ // faço um for para varrer o array da ulltima posição ate o 0
            if(!this.isOperation(this._operation[i])){ // e cada volta eu faço um if para verificar se NAO é um operador. Salientando
                                                        //a exclamação (!) dentro do if esta negando a operação, ou seja, esse if lê-se
                                                        // se NAO o this._operation[i] NAO é um operador
                
                lastNumber = this._operation[i]; // se nao é um operador então é um numero, dessa forma, como ele varreu o array de tras
                break;                          // pra frente esse numero so pode ser o ultimo que estava presente no array.
                 
            }
        }

        if(!lastNumber) lastNumber = 0; // coloco esse if para caso não tenha "lastNumber" o valor dele seja = 0. Ou seja, quando nao tiver
                                        // ultimo numero o valor do lastnumber = 0;
        //teste comentario
                    
        this.setDisplayCalc = lastNumber; // por fim, como já encontrei o ultimo numero do array eu seto ele no display.
    }

    addOperation(value){ // crio um metodo para capturar o que o usuario clicou, se foi um numero ou um 
                        
        if(isNaN(this.getLastOperation())){ //esse if verifico se o ultmo valor digitado, que já esta no array, NAO é um numero
                     
                   
              if(this.isOperation(value)){ //Como no if acima eu já verifico que não é um numero, ou seja, é um operador ou 
                                            //outra coisa(. ou = por exemplo) aqui eu verifico se o value digitado agora também é 
                                            //um operador através do metodo isOperation que possui um array com todos os operadores. 
                                            //Se sim, eu tenho que substituir o ultimo operador que ta na calculadora, ou seja, 
                                            //se o usuario digitou 5 + 5 + e agora digitou o '*' eu tenho que trocar o ultimo "+" por "*" 
                                            //ficando 5 + 5 * 
                    
                    this.setLastValor(value); //dessa forma eu pego o ultimo valor do array que já sei que eh um operador
                                              // e substituo ele pelo value
                                                              
               
                   }else if (isNaN(value)){  // Esse else IF serve para caso o array estiver vazio, ou seja, nao vai cair no if da linha 145, 
                                            // pois nao tem "getLastOperation" ainda. Ele valida se o valor
                                            // digitado não é um numero se nao for ele nao faz nada. Pois nao é possivel adiciona
                                            // um operador quando nao tem nenhum numero. 
                  
                        
                  
                         }else{ //agora se for um numero ele cai nesse else e adiciona um valor no array 
                            this.pushOperation(value); // nesse caso ele ta adicionando um valor ao console
                                this.setLastNumberToDisplay(); // aqui eu chamo o metodo setLastNumberToDisplay para setar esse valor no display
                            
                          }                              
        
        } else{ // esse else refere-se ao primeiro if que verifica se o ultimo indice do array não é um numero. Se nao for ele cai nesse else
            
                if(this.isOperation(value)){ 
                    this.pushOperation(value); // dessa forma realizo outro if para verificar se o valor digitado é um operador e caso sim
                                                // eu adiciono esse no array. E caso adicione mais de operador um ele vai cair no if mais acima 
                                                // da linha 148 que vai substituir o operador
                                                                 
                
                    }else{ // por fim faço esse else para caso seja um numero(else da linha 171) e não seja um operador(if acima) 
                            //so pode ter outro numero no array. logo ao inves de inserir novo valor concateno o antigo 
                            //com o novo digitado e substituo
                        let novoValor = this.getLastOperation().toString() + value.toString(); // aqui eu pego o ultimo numero 
                        //digitado e concateno com o numero que já esta digitado na calculadora e converto eles para string 
                        //para poder concatenar faço um parseInt para converter novamente o valor contatanado para numero
                        this.setLastValor(parseInt(novoValor)); // aqui uso o metodo "setLastValor" para substituir o ultimo valor adicionado
                                                                // no array.
                        
                            this.setLastNumberToDisplay(); // aqui eu chamo o metodo setLastNumberToDisplay para setar esse valor no display                                                                
                        
                }

         
        }
    }

    

    setError(){ // crio um metodo para caso o usuario execute algo nao esperado imprimir "error" no console
        this.setDisplayCalc = "Error";
    }

        execBtn(value){ // crio um metodo "execBtn" que la embaixo mediante o texto que vem ao clicar no botao, ele executar alguma ação
                        // ações essas definidas no Switch

          switch(value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;                
            case 'soma': 
                this.addOperation('+');
                break;
            case 'subtracao': 
                this.addOperation('-');
                break;

            case 'multiplicacao': 
                this.addOperation('*');
                break;
            case 'divisao': 
                this.addOperation('/');
                break;

            case 'porcento': 
                this.addOperation('%'); 
                break;
            case 'igual': 
                this.calc();
                break;
            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':                                
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '8':
            case '7':
            case '9':
                this.addOperation(parseInt(value)); // aqui estou chamado o metodo "addOperation" para add um dos numeros ao array e
                                                    // uso o parseInt para converter para "inteiro"
                break;                         
            default: this.setError();
          }
        }   
    
    iniButtonsEvents(){ // crio um metodo para capturar todos os botoes e realizar ações (eventos) neles
        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // documento.querSelectorAll seleciona tudo que encontrar 
                                                                            // nos parametros passados nesse caso id = buttons e filhos "g", 
                                                                            // ou id = partes e filhos "g"

                                                                                    
        buttons.forEach((btn, index) =>{ // crio um forEach para pecorrer a lista com todos os botões e armazenar no parametro "btn" e tambem
                                        // pegar o index. E crio um arrow function (=> para ficar "escutando" (addEventListener) )
            
           this.addEventListenerAll(btn,'click drag', e=>{ // colocando o "btn" significa que o envento vai ser rodado em cima desse elemento
                                                          // colocando a string 'click drag' pelo o metodo "addEventListenerAll" criado acima 
                                                          // o sistema entende que são dois eventos "click" e depois "drag(clicar e arrastar)"
                                                         // depois adiciono a arrow function "e"
                
                let textBtn = (btn.className.baseVal.replace("btn-","")); //coloco uma variavel chamada "textBtn" para armazenar o texto do
                                                                        // do botao
                this.execBtn(textBtn);   
                
                //return console.log(textBtn);
                          
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{ // crio outro evento para mudar o curso do mouse para "maosinha"
                btn.style.cursor = "pointer"; // quando executar os eventos mouseover, mouseup e mousedown em cima de button mude o cursor
                                            // do mouse para maosinha (style.cursor = "pointer(maosinha)")
            })
        });                                                                            
    }
}