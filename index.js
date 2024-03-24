const { createApp } = Vue;

createApp({
    data(){
        return{
            display: '0',
            numeroAtual: null,
            numeroAnterior: null,
            operador: null,
            novaOperacao: true
        }
    },
    methods: {
        lidarBotao(botao){
            switch (botao){
                case "*":
                case "-":
                case "+":
                case "/":
                    this.lidarOperador(botao);
                    break;
                case ".":
                    this.lidarDecimal();
                    break;
                case "=":
                    if (!this.novaOperacao) this.lidarIgual();
                    break;
                case "AC":
                    this.lidarClear();
                    break;
                default:
                    this.lidarNumero(botao);
            }
        },
        lidarNumero(botao){
            //para evitar que o usuário continue realizando operações com sujeira das variáveis\
            //esta rotina, primeiro, verifica se uma nova operação está sendo iniciada\
            //caso tenha sido clicado em "=" ou "AC", concatenando os valores da String contida no display\
            //a cada clique nos números, evitando que a string inicie em 0
            if (this.display == 0 || this.novaOperacao){
                this.display = botao;
                this.numeroAtual = this.display;
                this.novaOperacao = false;
            }
            else{
                this.numeroAtual = this.display+botao;
                this.display = this.numeroAtual;
            }
        },
        lidarOperador(botao){
            //seta o valor atual em uma segunda variável para futura realização dos cálculos\
            //caso seja uma nova operação, essa rotina retorna sem nenhuma ação, para evitar cálculos com sujeiras das variáveis
            if(!this.novaOperacao){
                this.numeroAnterior = this.numeroAtual;
                this.operador = botao;
                this.display = 0;
            }
            else return;
        },
        lidarDecimal(){
            //apenas adiciona o "." caso já nao contenha antes na string\
            //para evitar ter mais de 1 caracter "." na string
            if (!this.display.includes('.')) this.display = this.display+'.';
            this.numeroAtual = this.display;
        },
        lidarIgual(){
            //realiza os cálculos dependendo do operador selecionado anteriormente
            var resultado = 0;
            switch (this.operador){
                case "*":
                    resultado = parseFloat(this.numeroAnterior) * parseFloat(this.numeroAtual);
                    break;
                case "-":
                    resultado = parseFloat(this.numeroAnterior) - parseFloat(this.numeroAtual);
                    break;
                case "+":
                    resultado = parseFloat(this.numeroAnterior) + parseFloat(this.numeroAtual);
                    break;
                case "/":
                    resultado = parseFloat(this.numeroAnterior) / parseFloat(this.numeroAtual);
                    break;
                default:
                    return;//caso o usuário clique em "=" sem antes selecionar um operador\
                    //esta rotina retorna sem nenhuma ação
            }
            this.display = resultado;

            //após realizar os cálculos e exibir no display\
            //as variáveis são zeradas e novaOperação = true\
            //indicando que esta operação já finalizou e uma nova está sendo iniciada\
            //recomeçando assim os cálculos desde o início novamente
            this.numeroAtual = null;
            this.numeroAnterior = null;
            this.operador = null;
            this.novaOperacao = true;
        },
        lidarClear(){
            //zera todas as variáveis e exibe 0 no display,\
            //iniciando os cálculos desde o início novamente
            this.display = 0;
            this.numeroAtual = null;
            this.numeroAnterior = null;
            this.operador = null;
            this.novaOperacao = true;
        }
    }
}).mount("#app");