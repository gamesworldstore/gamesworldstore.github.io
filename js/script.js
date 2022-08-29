
/* PARTE DAS FUNÇÕES RESPONSÁVEIS PELO LOGIN */

//Verificação se o usuário já foi inserido ou não, caso não, executa a função logar

let user = false;

const clickUser = document.querySelector('#userid');
let h3 = document.createElement('h3');

const analise = () => {
    if(localStorage.userSave){
        user = JSON.parse(localStorage.getItem('userSave'));
    }
    if(user){
        clickUser.appendChild(h3);
        h3.textContent = '';
        h3.textContent = user;
    }
    else{
        logar();
    }
}

// Função logar cria um layout de login

const logar = () => {
    caring.style.position = 'static';

    itemsCarrinho();

    const loginDiv = document.querySelector('.login');
    loginDiv.style.width = '100vw';
    loginDiv.style.height = '100vh';
    loginDiv.style.display = 'flex';
    loginDiv.style.placeItems = 'center';
    loginDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.869)';
    loginDiv.style.position = 'fixed';

    const loginBackground = document.createElement('div');
    loginDiv.appendChild(loginBackground);
    loginBackground.setAttribute("id", "loginBackground");

    const h1 = document.createElement('h1');
    loginBackground.appendChild(h1);
    h1.textContent = 'Login';

    const inputUser = document.createElement('input');
    loginBackground.appendChild(inputUser);
    inputUser.setAttribute("type", "text");
    inputUser.setAttribute("placeHolder", "Usuário");
    inputUser.setAttribute("id", "inputUser");

    const inputPassword = document.createElement('input');
    loginBackground.appendChild(inputPassword);
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("placeHolder", "Senha");
    inputPassword.setAttribute("id", "inputPassword");

    const loginButton = document.createElement('button');
    loginBackground.appendChild(loginButton);
    loginButton.setAttribute("id", "loginButton");
    loginButton.textContent = 'Entrar';

    loginButton.setAttribute("onclick", "verificar()");

};

//Função que concatena com a função login, se o usuário não inserir os dados parar logar, vai receber os alertas

const verificar = () => {
    const inputUser = document.querySelector('#inputUser').value;
    const inputPassword = document.querySelector('#inputPassword').value;
    let msg = '';

    if(inputUser == ''){
        msg += '- Informe o Usuário. \n';
    }
    if(inputPassword == ''){
        msg += '- Informe a Senha. \n';
    }
    if(msg != ''){
        alert(msg);
    }
    else{
        entrar();
    }
};

// Função que cria a segunda tela pós login, dando as boas vindas ao usuário no site

const entrar = () => {
    const login = document.querySelector('.login');
    const loginBackground = document.querySelector("#loginBackground");
    const inputUser = document.querySelector('#inputUser').value;

    loginBackground.textContent = 'Seja Bem Vindo '+ inputUser;

    user = inputUser;

    const sair = document.createElement('button');
    loginBackground.appendChild(sair);

    sair.style.marginTop = '10px';

    sair.textContent = 'Continuar';

    sair.addEventListener('click', () =>{

        let h3 = document.createElement('h3');
        clickUser.appendChild(h3);

        h3.textContent = inputUser;

        caring.style.position = 'fixed';
        document.querySelector('body').removeChild(login);
        itemsCarrinho();
    });

    localStorage.userSave = JSON.stringify(user);
};


/* PARTE RESPONSÁVEL PELA BUSCA POR JOGOS E CRIAÇÃO DO ARRAY DE JOGOS */

// Função da barra de pesquisa, faz a busca pelos jogos cadastrados no site clicando enter ou clicando na lupa

const div = document.querySelector(".games");
div.style.minWidth = "100vmin";
div.style.maxWidth = "50vmax";

const jogos = [];
let id = 1;

document.querySelector(".searchbutton").addEventListener('click', () => {
    ocultar(table);
    first_click = true;
    criar();
});

document.querySelector("#searchbar").addEventListener('keypress', (e) =>{

    if(e.key == 'Enter'){
        ocultar(table);
        first_click = true;
        criar();
    }
});

// Função que monta faz a busca pelo nome do jogo dentro do array de jogos cadastrados no site utilizando filter e includes;

let controle = true;

const criar = () => {
    if(controle){
        montarObjeto();
    };

    const input = document.querySelector("#searchbar").value;
    const busca = jogos.filter(jogo => jogo.titulo.includes(input));

    const h1 = document.querySelector("#h1title");
    h1.textContent = 'Pesquisa';
    div.textContent = '';

    for(let jogo of busca) {
        mostrar(jogo.titulo, jogo.imagem, jogo.preco, jogo.id);
    } 
};

// Função que monta o objeto array de jogos, utilizando na filtragem acima

const montarObjeto = () => {
    const jogo = document.querySelectorAll("h4.jogo");
    const imagens = document.querySelectorAll("#gamesIMG");
    const precos = document.querySelectorAll("p.preco");

    for (let i = 0; i < jogo.length; i++) {

        let object = {};
        let titulo = jogo[i].textContent;
        let imagem = imagens[i].src;
        let preco = precos[i].textContent;

        object.id = id;
        object.titulo = titulo;
        object.imagem = imagem;
        object.preco = preco;
        
        jogos.push(object);
        id++;
    }
    controle = false;
};

// Função que exibe na tela o novo objeto criado a partir do array de jogos e filtrado na busca por nome

const mostrar = (titulo, imagem, preco, id) => {
    const li =document.createElement('li');
    const ul = document.createElement('ul').appendChild(li);

    const ptitle = document.createElement('h4');
    const img = document.createElement('img');
    const button = document.createElement('button');
    
    div.appendChild(ul);
    li.appendChild(img);
    li.appendChild(ptitle);
    li.appendChild(button);

    button.setAttribute("onclick", "comparar("+ id +")");

    li.style.padding = "10px";
    img.style.width="300px";
    ptitle.style.margin = '0';

    img.src = imagem;
    ptitle.textContent = titulo;
    button.textContent = 'R$: ' + preco;
};

/* PARTE RESPONSÁVEL PELA CRIAÇÃO DO CARRINHO DE COMPRAS */

const p = document.createElement('p');
const caring = document.querySelector("#caring");
const table = document.querySelector('.table');
let tbody = document.querySelector("#tbody");
let thead = document.querySelector("#thead");
let total = document.querySelector("#total");
const button = document.createElement('button');

caring.appendChild(p);

caring.style.position = 'fixed';

let n = 0;
let carrinho = [];

//Evento executado no load com o número de itens do carrinho

window.addEventListener('load', () => {
    if(localStorage.nSave){
        n = JSON.parse(localStorage.getItem('nSave'));
    }

    p.textContent = n;
    p.style.fontSize = '100%'; 
    p.style.fontWeight = 'bold';
    p.style.marginTop = '-30px';
    p.style.marginLeft = '17px';
    p.style.textAlign = 'center';
    p.style.position= "fixed";
    p.style.color = 'gray';

})

// Função para ocultar a exibição do carrinho ao clicar nele

const ocultar = (table) => {
    tbody.textContent = '';
    thead.textContent = '';
    button.style.display = 'none';
    table.style.display = 'none';
    table.border = "0";
};

// Evento para ver o clique do carrinho, para abrir ou fechar o carrinho

let first_click = true;

caring.addEventListener('click', () => {
    if(first_click){
        listar(table);
        first_click = false;
    }
    else{
        ocultar(table);
        first_click = true;
    }
});

// Função para ocultar a janela o carrinho de compras, utilizada sempre ao fazer uma atualização de adição de novo jogo ao carrinho,
// ou quando clica no carrinho para fechar, e não ficar exibindo na tela

const itemsCarrinho = () => {
    p.textContent = n;

    ocultar(table);
    first_click = true;
};

// Função responsável pela criação dos objetos que serão inseridos ao array carrinho

const montarCarrinho = (titulo, imagem, preco) => {
    if(localStorage.carrinhoSave){
        carrinho = JSON.parse(localStorage.getItem('carrinhoSave'));
    }
    if(localStorage.nSave){
        n = JSON.parse(localStorage.getItem('nSave'));
    }
    p.textContent = '';

    let object = {};
    object.id = n;
    object.qnt = 1;
    object.titulo = titulo;
    object.imagem = imagem;
    object.preco = parseFloat(preco);
    
    carrinho.push(object);

    n++;

    itemsCarrinho();
    localStorage.nSave = JSON.stringify(n);
    localStorage.carrinhoSave = JSON.stringify(carrinho);
};

// Função de Listagem do Carrinho de Compras

const listar = () => {
    if(localStorage.carrinhoSave){
        carrinho = JSON.parse(localStorage.getItem('carrinhoSave'));
    }

    table.style.boxShadow = "0 0 15px rgb(125, 125, 125)";
    table.style.backgroundColor = "rgb(36, 11, 98)";
    table.border = "1";
    table.style.display = 'inline';

    tbody.textContent = '';
    thead.textContent = '';
    total.textContent = '';
    
    let th = thead.insertRow();

    let qnt = th.insertCell();
    let titulo = th.insertCell();
    let preco = th.insertCell();
    let acoes = th.insertCell();

    if(carrinho.length == 0){

        th.textContent = 'Carrinho Vazio';
    }
    else{

        table.appendChild(button);
        button.style.display = 'inline';
        
        qnt.textContent = 'Qnt';
        titulo.textContent = 'Jogo';
        preco.textContent = 'Preço';
        acoes.textContent = 'Ações';

        for(let i = 0; i < carrinho.length; i++){

            const ex = document.createElement('button');
            const mais = document.createElement('button');
            const menos = document.createElement('button');

            let tr = tbody.insertRow();
            
            let qnt = tr.insertCell();
            let titulo = tr.insertCell();
            let preco = tr.insertCell();

            let excluir = tr.insertCell();
        
            excluir.classList.add('button_align');

            excluir.appendChild(mais);
            excluir.appendChild(menos);
            excluir.appendChild(ex);

            mais.setAttribute("onclick", "addJogo("+ carrinho[i].id +")");
            menos.setAttribute("onclick", "tiraJogo("+ carrinho[i].id +")");
            ex.setAttribute("onclick", "removerJogo("+ carrinho[i].id +")");

            qnt.textContent = carrinho[i].qnt;
            titulo.textContent = carrinho[i].titulo;
            preco.textContent = 'R$: ' + carrinho[i].preco + ',00';

            mais.textContent = '+';
            menos.textContent = '-';
            ex.textContent = 'x';
        }
        
        let tl = total.insertRow();
        let row = tl.insertCell();
        let tot = tl.insertCell();
        let val = tl.insertCell();

        tl.classList.add('total_car');
        
        tot.style.textAlign = 'right';
        tot.textContent = 'Total:';
        val.textContent = 'R$: ' + somarPrecos() +',00';

        button.textContent = 'Comprar';
    }
};

// Função da Soma dos preços do total de itens dentro do carrinho de compras

const somarPrecos = () => {
    if(localStorage.carrinhoSave){
        carrinho = JSON.parse(localStorage.getItem('carrinhoSave'));
    }

    let total = carrinho.reduce((valPrev, elemento) => valPrev + parseFloat(elemento.preco), 0);

    return total;
};

// Função aumentar a quantidade de um jogo dentro do carrinho

const addJogo = (id) => {
    if(localStorage.carrinhoSave){
        carrinho = JSON.parse(localStorage.getItem('carrinhoSave'));
    }
    if(localStorage.nSave){
        n = JSON.parse(localStorage.getItem('nSave'));
    }

    for(let i = 0; i < carrinho.length; i++){
        if(carrinho[i].id == id) {
            let qnt = carrinho[i].qnt;
            let preco = carrinho[i].preco;
            
            preco = preco / qnt;
            qnt++;
            preco = preco * qnt;

            carrinho[i].qnt = qnt;
            carrinho[i].preco = preco;

            n++;

            localStorage.nSave = JSON.stringify(n);
            localStorage.carrinhoSave = JSON.stringify(carrinho);

            itemsCarrinho();
            listar();
        }
    }
    
};

// Função para reduzir a quantidade de um jogo dentro do carrinho, se qnt = 0, o jogo é deletado

const tiraJogo = (id) => {
    if(localStorage.carrinhoSave){
        carrinho = JSON.parse(localStorage.getItem('carrinhoSave'));
    }
    if(localStorage.nSave){
        n = JSON.parse(localStorage.getItem('nSave'));
    }

    for(let i = 0; i < carrinho.length; i++){
        if(carrinho[i].id == id) {
            let qnt = carrinho[i].qnt;
            let preco = carrinho[i].preco;
            preco = preco / qnt;
            qnt--;
            preco = preco * qnt;
            
            if(qnt == 0){
                removerJogo(id);
                first_click = false;
            }
            else{
                carrinho[i].qnt = qnt;
                carrinho[i].preco = preco;
                n--;

                localStorage.nSave = JSON.stringify(n);
                localStorage.carrinhoSave = JSON.stringify(carrinho);

                itemsCarrinho();
                listar();
            }  
        }
    }
    
}

// Função que remove o jogo do carrinho

const removerJogo = (id) => {
    if(localStorage.carrinhoSave){
        carrinho = JSON.parse(localStorage.getItem('carrinhoSave'));
    }

    if(localStorage.nSave){
        n = JSON.parse(localStorage.getItem('nSave'));
    }

    for(let i = 0; i < carrinho.length; i++){
        if(carrinho[i].id == id) {
            let qnt = carrinho[i].qnt;

            carrinho.splice(i, 1);
            tbody.deleteRow(i);

            n = n-qnt;

            localStorage.nSave = JSON.stringify(n);
            localStorage.carrinhoSave = JSON.stringify(carrinho);

            itemsCarrinho();
            listar();
        }
    }
}

/* PARTE RESPONSÁVEL PELO CLIQUE NOS BOTÕES DE COMPRA DOS JOGOS E ENVIÁ-LOS AO CARRINHO DE COMPRAS */

// Criação de um array com os preços dos jogos assim que o site abrir

const precos = [];

window.addEventListener('load', () => {
    const buy = document.querySelectorAll("p.preco");

    for(let i = 0; i<buy.length; i++){
        precos.push(buy[i].textContent);
    }
});

// Função que verifica se o jogo já foi adicionado ao carrinho através do título, para não ficar repetido

const verifica = (titulo) => {
    if(localStorage.carrinhoSave){
        carrinho = JSON.parse(localStorage.getItem('carrinhoSave'));
    }

    for(let i = 0; i < carrinho.length; i++){
        if(carrinho[i].titulo === titulo){
            return false;
        }
    }
    return true;

};

// Função responsável por adicionar jogos ao carrinho quando clicar em qualquer botão de comprar jogo nos jogos disponíveis
// Essa mesma função é implementada tanto no home quanto quando você pesquisa por um jogo

const comparar = (n) => {
    if(controle){
        montarObjeto();
    };

    for (let i = 0; i < jogos.length; i++){
        if(precos[n-1] === jogos[i].preco){
            if(verifica(jogos[i].titulo)){
                montarCarrinho(jogos[i].titulo, jogos[i].imagem, jogos[i].preco);
            }
        }
    }
};


/* PARTE RESPONSÁVEL PELO CLIQUE NO BOTÃO COMPRAR, EFETUAR A COMPRA DOS JOGOS NO CARRINHO */

const ok = document.createElement('button');
const done = document.querySelector('.done');
const doneId = document.querySelector('#done');

// Botão comprar, ao clicar nele, vai verificar se o usuário já foi logado, caso contrário vai pedir para efetuar o login
// Logo depois vai limpar o carrinho de compras
// E logo depois vai inicializar uma tela que irá dizer que a compra foi efetuada

button.addEventListener('click', () => {
    if(localStorage.userSave){
        user = JSON.parse(localStorage.getItem('userSave'));
    }
    if(localStorage.nSave){
        n = JSON.parse(localStorage.getItem('nSave'));
    }

    if(user){
        while(carrinho.length){
            carrinho.pop();
            n = 0;
            p.textContent = null;
            tbody.textContent = '';
            thead.textContent = '';
            button.style.display = 'none'; 
            table.style.display = 'none';
            table.border = "0";
            first_click = true;
        }
        
        doneId.style.width = '100%';
        doneId.style.height = '100%';
        const h1 = document.createElement('h1');
    
        done.appendChild(h1);
        done.appendChild(ok);
        
        h1.textContent = 'Compra Concluída!';
        ok.textContent = 'OK';
        caring.style.position = 'static';

        localStorage.nSave = JSON.stringify(n);
        localStorage.carrinhoSave = JSON.stringify(carrinho);
    }
    else{
        logar();
    }
});

// Botão e evento exibido da compra efetuada, ao clicar em ok irá sumir a tela de compra efetuada

ok.addEventListener('click', () =>{
    doneId.style.width = '0%';
    doneId.style.height = '0%';
    done.textContent = '';
    caring.style.position = 'fixed';
}); 
