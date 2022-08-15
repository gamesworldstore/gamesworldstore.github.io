const div = document.querySelector(".games");

class Jogos {

    constructor(){
        this.jogos = [
            {"titulo": "Forza Horizon 4","imagem": "/img/forza4.jpg"},
            {"titulo": "God of War The Game","imagem": "/img/gdwar.jpg"},
            {"titulo": "Grand Theft Auto 5","imagem": "/img/gta5.jpg"},
            {"titulo": "Naruto Shippuden Ninja Storm 4", "imagem": "/img/nstorm4.jpg"},
            {"titulo": "OP Pirate Warriors 4", "imagem": "/img/onep4.jpg"},
            {"titulo": "Resident Evil 7: Biohazard", "imagem": "/img/resident7.jpg" },
            {"titulo": "Resident Evil Village", "imagem": "/img/resident8.jpg"},
            {"titulo": "The Witcher 3 Wild Hunter", "imagem": "/img/witcher3.jpg"}
        ];
    }
    /* Lupa de Busca*/
    mostrar(titulo, imagem){
        const ul = document.createElement('ul');
        const li =document.createElement('li');
        const ptitle = document.createElement('h4');
        const img = document.createElement('img');
        div.appendChild(ul);
        ul.appendChild(li);
        li.appendChild(img);
        li.appendChild(ptitle);
        img.src = imagem;
        ptitle.textContent = titulo;
    }

    search(){
        const input = document.querySelector("#searchbar").value;
    
            const busca = this.jogos.filter(jogo => jogo.titulo.includes(input));
            console.log(busca);

            div.textContent = '';
            for(let jogo of busca) {
                jogos.mostrar(jogo.titulo, jogo.imagem);
            }
        
    }

}

let jogos = new Jogos();