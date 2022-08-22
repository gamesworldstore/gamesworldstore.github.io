const div = document.querySelector(".games");
div.style.minWidth = "100vmin";
div.style.maxWidth = "50vmax";

const jogos = [];

const montarObjeto = () => {
    const jogo = document.querySelectorAll("h4.jogo");
    const imagens = document.querySelectorAll("#gamesIMG");
    const precos = document.querySelectorAll("#cart");
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