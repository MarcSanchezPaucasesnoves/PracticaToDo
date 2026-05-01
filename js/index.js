import { eliminarTasca, canviarTascaRealitzada } from "../js/storage.js";

document.addEventListener('DOMContentLoaded', () => {
    pintarTasques();

    document.getElementById('crearNovaTasca').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = "crear-tasca.html";
    });
});

function pintarTasques(){
    const contenidorTasquesPendents = document.getElementById("contenidorTasquesPendents");
    const contenidorTasquesFetes = document.getElementById("contenidorTasquesFetes");
    contenidorTasquesPendents.innerHTML = "";
    contenidorTasquesFetes.innerHTML = "";
    const tasques = JSON.parse(localStorage.getItem("llistaTasques"));

    const colorTascaBaixa = "#fccccc";
    const colorTascaCompletadaBaixa = "#F8DFE0";
    const colorTascaMitjana = "#fbe4cc";
    const colorTascaCompletadaMitjana = "#f7ebdf";
    const colorTascaAlta = "#ccfbcc";
    const colorTascaCompletadaAlta = "#dff7df";

    for (let index = 0; index < tasques.length; index++) {
        const tasca = tasques[index];
        const idTasca = tasca.id;
        const titol = tasca.titol;
        const descripcio = tasca.descripcio;
        const data = tasca.data;
        const nomCategoria = tasca.categoria.nom;
        const colorCategoria = tasca.categoria.color;
        const prioritat = tasca.prioritat;
        const realitzada = tasca.realitzada;


        const targeta = document.createElement('div');
        targeta.className = 'flex gap-20px justify-content-space-between padding-5px box-sizing-border-box border-radius';


        const colEsquerra = document.createElement('div');
        colEsquerra.className = 'flex flex-direction-column';

        const pTitol = document.createElement('p');
        pTitol.textContent = titol;

        const divCategoria = document.createElement('div');
        divCategoria.className = 'categoria-tasca-pendent';
        divCategoria.style.backgroundColor = colorCategoria;
        divCategoria.textContent = nomCategoria;

        const pData = document.createElement('p');
        pData.className = 'font-size-13px';
        pData.textContent = data;

        const pDescripcio = document.createElement('p');
        pDescripcio.className = 'font-size-13px';
        pDescripcio.textContent = descripcio;


        const colDreta = document.createElement('div');
        colDreta.className = 'flex flex-direction-column justify-content-space-between align-items-flex-end';

        const pPrioritat = document.createElement('p');
        pPrioritat.textContent = prioritat;

        const contenidorIcones = document.createElement('div');
        contenidorIcones.className = 'flex gap-5px';


        const iconaFet = document.createElement('span');
        iconaFet.className = 'cursor-pointer';

        const iconaEliminar = document.createElement('span');
        iconaEliminar.className = 'cursor-pointer';
        iconaEliminar.innerHTML = `<svg width="32px" height="32px" viewBox="0 0 19.00 19.00" version="1.1" xmlns="http://w3.org"><g><path d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 Z" fill="#000000"></path></g></svg>`;


        iconaFet.addEventListener('click', () => {
            canviarTascaRealitzada(idTasca);
            pintarTasques();
        });

        iconaEliminar.addEventListener('click', () => {
            eliminarTasca(idTasca);
            pintarTasques();
        });


        if (!realitzada) {
            if (prioritat == "Baixa") {
                targeta.style.backgroundColor = colorTascaBaixa;
            } else if (prioritat == "Mitjana") {
                targeta.style.backgroundColor = colorTascaMitjana;
            } else {
                targeta.style.backgroundColor = colorTascaAlta;
            }

            iconaFet.innerHTML = `<svg fill="#000000" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://w3.org"><g><path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21ZM17.737,8.824a1,1,0,0,1-.061,1.413l-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,0,1,1.415-1.414l2.323,2.323,5.294-4.853A1,1,0,0,1,17.737,8.824Z"></path></g></svg>`;


            colEsquerra.append(pTitol, divCategoria, pData, pDescripcio);

            contenidorIcones.append(iconaFet, iconaEliminar);
            colDreta.append(pPrioritat, contenidorIcones);


            targeta.append(colEsquerra, colDreta);
            contenidorTasquesPendents.appendChild(targeta);

        } else {
            if (prioritat == "Baixa") {
                targeta.style.backgroundColor = colorTascaCompletadaBaixa;
            } else if (prioritat == "Mitjana") {
                targeta.style.backgroundColor = colorTascaCompletadaMitjana;
            } else {
                targeta.style.backgroundColor = colorTascaCompletadaAlta;
            }

            iconaFet.innerHTML = `<svg fill="#2ec27e" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#2ec27e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>`;
            pTitol.style.textDecoration = "line-through";


            colEsquerra.append(pTitol, divCategoria, pData, pDescripcio);

            contenidorIcones.append(iconaFet, iconaEliminar);
            colDreta.append(pPrioritat, contenidorIcones);


            targeta.append(colEsquerra, colDreta);
            contenidorTasquesFetes.appendChild(targeta);
        }


    }
}