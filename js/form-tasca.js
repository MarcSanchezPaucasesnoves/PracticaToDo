import { crearLlistaTasques, crearLlistaCategories, crearTasca, comprovarTitolTasca, comprovarCategoria, tornarCategoria } from "../js/storage.js";

document.addEventListener('DOMContentLoaded', () => {
    crearLlistaTasques();
    crearLlistaCategories();
    refrescarCategories();

    const errorTitol = document.getElementById('errorTitolTasca');
    const errorCategoria = document.getElementById('errorCategoriaTasca');

    document.getElementById('botoCrearTasca').addEventListener('click', (event) => {
        event.preventDefault();
        const titol = document.getElementById('titol').value;
        const descripcio = document.getElementById('descripcio').value;
        const data = document.getElementById('data').value;
        const categoriaText = document.getElementById('categoria').value;
        const prioritat = document.getElementById('prioritat').value;


        let tascaCreada = true;


        if (!comprovarTitolTasca(titol)) {
            errorTitol.classList.remove('hide');
            tascaCreada = false;
        }

        if (categoria.length == 0) {
            errorCategoria.classList.remove('hide');
            tascaCreada = false;
        }

        if(tascaCreada){
            const categoria = tornarCategoria(categoriaText);

            crearTasca(titol, descripcio, data, categoria, prioritat);
        }

    });

    document.getElementById('titol').addEventListener('click', () => {
        errorTitol.classList.add('hide');
    });

    document.getElementById('categoria').addEventListener('click', () => {
        errorCategoria.classList.add('hide');
    });
    
});

function refrescarCategories(){
    const categories = JSON.parse(localStorage.getItem("llistaCategories"));
    const selectCategories = document.getElementById("categoria");

    selectCategories.innerHTML = "";

    for (let index = 0; index < categories.length; index++) {
        const categoria = categories[index];
        const nom = categoria.nom;
        
        const optionCategoria = document.createElement('option');
        optionCategoria.value = nom;
        optionCategoria.text = nom;

        selectCategories.appendChild(optionCategoria);

    }

}