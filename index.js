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
            if(!this.novaOperacao){
                this.numeroAnterior = this.numeroAtual;
                this.operador = botao;
                this.display = 0;
            }
            else return;
        },
        lidarDecimal(){
            if (!this.display.includes('.')) this.display = this.display+'.';
            this.numeroAtual = this.display;
        },
        lidarIgual(){
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
                    return;              
            }
            this.display = resultado;
            this.numeroAtual = null;
            this.numeroAnterior = null;
            this.operador = null;
            this.novaOperacao = true;
        },
        lidarClear(){
            this.display = 0;
            this.numeroAtual = null;
            this.numeroAnterior = null;
            this.operador = null;
            this.novaOperacao = true;
        }
    }
}).mount("#app");