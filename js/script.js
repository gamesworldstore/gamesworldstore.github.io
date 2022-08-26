
/*Usuário e senha*/


let user;
const clickUser = document.querySelector('#userid');

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
        logar();
    }
    
}

const logar = () => {
    const login = document.querySelector('.login');
    const loginBackground = document.querySelector("#loginBackground");
    const inputUser = document.querySelector('#inputUser').value;

    loginBackground.textContent = 'Seja Bem Vindo '+ inputUser;

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
    });

};

const div = document.querySelector(".games");
div.style.minWidth = "100vmin";
div.style.maxWidth = "50vmax";

const jogos = [];
let id = 1;

/* Busca por Jogo */

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

document.querySelector(".searchbutton").addEventListener('click', () => {
    criar();
});

document.querySelector("#searchbar").addEventListener('keypress', (e) =>{

    if(e.key == 'Enter'){
        criar();
    }
});

/* Carrinho de Compras */

const p = document.createElement('p');
const caring = document.querySelector("#caring");
const table = document.querySelector('.table');
let tbody = document.querySelector("#tbody");
let thead = document.querySelector("#thead");
let total = document.querySelector("#total");
const button = document.createElement('button');
caring.appendChild(p);

let n = 0;
const carrinho = [];

const somarPrecos = () => {

    let total = carrinho.reduce((valPrev, elemento) => valPrev + parseFloat(elemento.preco), 0);

    return total;
}

const listar = () => {

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
const addJogo = (id) => {
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
            
            itemsCarrinho();
            listar();
        }
    }
}
const tiraJogo = (id) => {
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

                itemsCarrinho();
                listar();
            }  
        }
    }
}

const removerJogo = (id) => {
    for(let i = 0; i < carrinho.length; i++){
        if(carrinho[i].id == id) {
            let qnt = carrinho[i].qnt;

            carrinho.splice(i, 1);
            tbody.deleteRow(i);

            n = n-qnt;

            itemsCarrinho();
            listar();
        }
    }
}

const itemsCarrinho = () => {
    p.textContent = n;
    ocultar(table);
    first_click = true;
}

const montarCarrinho = (titulo, imagem, preco) => {
    p.textContent = '';

    let object = {};
    object.id = n;
    object.qnt = 1;
    object.titulo = titulo;
    object.imagem = imagem;
    object.preco = parseFloat(preco);
    
    carrinho.push(object);

    n++;

    p.style.fontSize = '80%'; 
    p.style.fontWeight = 'bold';
    p.style.marginTop = '-32px';
    p.style.marginLeft = '17px';
    p.style.placeContent = 'center';
    p.style.position= "fixed";
    p.style.color = 'gray';

    itemsCarrinho();
};

const verifica = (titulo) => {
    for(let i = 0; i < carrinho.length; i++){
        if(carrinho[i].titulo === titulo){
            return false;
        }
    }
    return true;

};
const precos = [];

window.addEventListener('load', () => {
    const buy = document.querySelectorAll("p.preco");
    for(let i = 0; i<buy.length; i++){
        precos.push(buy[i].textContent);
    }
});

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

/* Exibir e ocultar carrinho */

let first_click = true;

const ocultar = (table) => {
    tbody.textContent = '';
    thead.textContent = '';
    button.style.display = 'none';
    table.style.display = 'none';
    table.border = "0";
}

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

/* Fazer a Compra */

const ok = document.createElement('button');
const done = document.querySelector('.done');
const doneId = document.querySelector('#done');

button.addEventListener('click', () => {
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
});

ok.addEventListener('click', () =>{
    doneId.style.width = '0%';
    doneId.style.height = '0%';
    done.textContent = '';
    caring.style.position = 'fixed';
}); 