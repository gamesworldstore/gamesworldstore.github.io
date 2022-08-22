const div = document.querySelector(".games");
div.style.minWidth = "100vmin";
div.style.maxWidth = "50vmax";

const jogos = [];

const montarObjeto = () => {
    const jogo = document.querySelectorAll("h4.jogo");
    const imagens = document.querySelectorAll("#gamesIMG");
    for (let i = 0; i < jogo.length; i++) {

        let object = {};
        let titulo = jogo[i].textContent;
        let imagem = imagens[i].src;
        object.titulo = titulo;
        object.imagem = imagem;
        jogos.push(object);
    }
};
const mostrar = (titulo, imagem) => {
    const li =document.createElement('li');
    const ul = document.createElement('ul').appendChild(li);

    const ptitle = document.createElement('h4');
    const img = document.createElement('img');

    div.appendChild(ul);
    li.appendChild(img);
    li.appendChild(ptitle);

    li.style.padding = "10px";
    img.style.width="300px";
    ptitle.style.color ="white";
    ptitle.style.textAlign = "center";
    
    img.src = imagem;
    ptitle.textContent = titulo;
};

const button = document.querySelector(".searchbutton").addEventListener("click", () => {

    montarObjeto();

    const input = document.querySelector("#searchbar").value;
    const busca = jogos.filter(jogo => jogo.titulo.includes(input));
    console.log(busca);

    div.textContent = '';
    for(let jogo of busca) {
        mostrar(jogo.titulo, jogo.imagem);
    }
});