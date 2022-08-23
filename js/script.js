const div = document.querySelector(".games");
div.style.minWidth = "100vmin";
div.style.maxWidth = "50vmax";

const jogos = [];

/* Busca por Jogo */

const montarObjeto = () => {
    const jogo = document.querySelectorAll("h4.jogo");
    const imagens = document.querySelectorAll("#gamesIMG");
    const precos = document.querySelectorAll("#cart");

    for (let i = 0; i < jogo.length; i++) {

        let object = {};
        let titulo = jogo[i].textContent;
        let imagem = imagens[i].src;
        let preco = precos[i].innerText;

        object.titulo = titulo;
        object.imagem = imagem;
        object.preco = preco;
        
        jogos.push(object);
    }
};
const mostrar = (titulo, imagem, preco) => {
    const li =document.createElement('li');
    const ul = document.createElement('ul').appendChild(li);

    const ptitle = document.createElement('h4');
    const img = document.createElement('img');
    const button = document.createElement('button');
    

    div.appendChild(ul);
    li.appendChild(img);
    li.appendChild(ptitle);
    li.appendChild(button);

    li.style.padding = "10px";
    img.style.width="300px";
    
    img.src = imagem;
    ptitle.textContent = titulo;
    button.textContent = preco;
};

const criar = () => {
    montarObjeto();

    const input = document.querySelector("#searchbar").value;
    const busca = jogos.filter(jogo => jogo.titulo.includes(input));
    const h1 = document.querySelector("#h1title");
    h1.textContent = 'Pesquisa';
    div.textContent = '';
    for(let jogo of busca) {
        mostrar(jogo.titulo, jogo.imagem, jogo.preco);
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
const button = document.createElement('button');

caring.appendChild(p);

let n = 0;

const carrinho = [];

const listar = () => {
    
    table.border = "1";

    tbody.textContent = '';
    thead.textContent = '';
    
    let th = thead.insertRow();

    let titulo = th.insertCell();
    let preco = th.insertCell();
    if(carrinho.length == 0){
        th.textContent = 'Carrinho Vazio';
    }
    else{
        
        table.appendChild(button);
        button.style.display = 'inline';

        titulo.textContent = 'Jogo';
        preco.textContent = 'Preço';
        for(let i = 0; i < carrinho.length; i++){
            let tr = tbody.insertRow();
    
            let titulo = tr.insertCell();
            let preco = tr.insertCell();
    
            titulo.textContent = carrinho[i].titulo;
            preco.textContent = carrinho[i].preco;
        }
        button.textContent = 'Comprar';
    }
};

const montarCarrinho = (titulo, imagem, preco) => {
    p.textContent = '';

    let object = {};
    object.titulo = titulo;
    object.imagem = imagem;
    object.preco = preco;
    carrinho.push(object);

    n++;

    p.style.fontSize = '80%'; 
    p.style.fontWeight = 'bold';
    p.style.marginTop = '-31px';
    p.style.marginLeft = '16px';
    p.style.placeContent = 'center';
    p.style.position= "absolute";
    p.style.color = 'gray';
    
    p.textContent = n;

};

const verifica = (titulo) => {
    for(let i = 0; i < carrinho.length; i++){
        if(carrinho[i].titulo === titulo){
            return false;
        }
    }
    return true;

};

const comparar = (n) => {
    montarObjeto();
    const buy = document.querySelectorAll("#cart");
    
    for (let i = 0; i < jogos.length; i++){
        if(buy[n-1].innerText === jogos[i].preco){
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

button.addEventListener('click', () => {
    while(carrinho.length){
        carrinho.pop();
        n = 0;
        p.textContent = null;
        tbody.textContent = '';
        thead.textContent = '';
        button.style.display = 'none';
        table.border = "0";
        first_click = true;
    }
});
    

