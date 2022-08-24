const div = document.querySelector(".games");
div.style.minWidth = "100vmin";
div.style.maxWidth = "50vmax";

const jogos = [];

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

        object.titulo = titulo;
        object.imagem = imagem;
        object.preco = preco;
        
        jogos.push(object);
    }
    controle = false;
};

const mostrar = (titulo, imagem, preco) => {
    const li =document.createElement('li');
    const ul = document.createElement('ul').appendChild(li);

    const ptitle = document.createElement('h4');
    const img = document.createElement('img');
//  const button = document.createElement('button');
    

    div.appendChild(ul);
    li.appendChild(img);
    li.appendChild(ptitle);
//  li.appendChild(button);

    li.style.padding = "10px";
    img.style.width="300px";
    ptitle.style.margin = '0';

    img.src = imagem;
    ptitle.textContent = titulo;
//  button.textContent = 'R$: ' + preco;
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
let total = document.querySelector("#total");
const button = document.createElement('button');
caring.appendChild(p);

let n = 0;

const carrinho = [];

const somarPrecos = () => {
    let total = carrinho.reduce((valPrev, elemento) => valPrev + parseFloat(elemento.preco), 0);
    return total;
}
// let x = 0;

const listar = () => {

    table.style.boxShadow = "0 0 15px rgb(125, 125, 125)";
    table.style.backgroundColor = "rgb(36, 11, 98)";
    table.border = "1";
    table.style.display = 'inline';
    

    tbody.textContent = '';
    thead.textContent = '';
    total.textContent = '';
    
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
            //const ex = document.createElement('button');
        
        //    x++;

            let tr = tbody.insertRow();
    
            let titulo = tr.insertCell();
            let preco = tr.insertCell();
        //  let excluir = tr.insertCell();

      /*    excluir.appendChild(ex);
            ex.id = x;
            excluir.style.display = 'inline';
            excluir.style.border = 'none';
            ex.style.cursor = 'pointer';
            ex.style.fontSize = '90%';
            ex.style.padding = '0 4px';
            ex.style.marginTop = '1px';
            ex.style.position = 'relative'; */
            titulo.textContent = carrinho[i].titulo;
            preco.textContent = 'R$: ' + carrinho[i].preco;
           /* ex.textContent = 'x'; */
            
        }
        let tl = total.insertRow();
        let tot = tl.insertCell();
        let val = tl.insertCell();
        
        tot.textContent = 'Total';
        val.textContent = 'R$: ' + somarPrecos() +',00';

        button.textContent = 'Comprar';
    }
};

/* ex.addEventListener('click', () => {
    for(let i = 0; i < carrinho.length; i++){
        if(ex.id == carrinho[i].id){
            carrinho[i].pop();
        }
    }
}); */

const montarCarrinho = (titulo, imagem, preco) => {
    p.textContent = '';

    let object = {};
    object.titulo = titulo;
    object.imagem = imagem;
    object.preco = preco;
    object.id = n;
    carrinho.push(object);

    n++;

    p.style.fontSize = '80%'; 
    p.style.fontWeight = 'bold';
    p.style.marginTop = '-32px';
    p.style.marginLeft = '17px';
    p.style.placeContent = 'center';
    p.style.position= "fixed";
    p.style.color = 'gray';
    
    p.textContent = n;
    ocultar(table);
    first_click = true;

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
    if(controle){
        montarObjeto();
    };
    const buy = document.querySelectorAll("p.preco");
    
    for (let i = 0; i < jogos.length; i++){
        if(buy[n-1].textContent === jogos[i].preco){
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
    
    const h1 = document.createElement('h1');
    

    done.appendChild(h1);
    done.appendChild(ok);
    
    h1.textContent = 'Compra Concluída!';
    ok.textContent = 'OK';
});

ok.addEventListener('click', () =>{
    done.textContent = '';
});
    

