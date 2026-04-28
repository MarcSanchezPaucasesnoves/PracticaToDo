import { crearCategoria, eliminarCategoria } from "../js/storage.js";

document.addEventListener('DOMContentLoaded', () => {

    const errorCategoria = document.getElementById("errorCategoria");
    const nomCategoria = document.getElementById("categoria");
    const colorCategoria = document.getElementById("colorCategoria");

    if (!localStorage.getItem("llistaCategories")) {
        localStorage.setItem("llistaCategories", JSON.stringify([]));
    }

    document.getElementById("afegirCategoria").addEventListener("click", (event) => {
        event.preventDefault();
        const novaCategoria = crearCategoria(nomCategoria.value.trim(), colorCategoria.value.trim());

        if(novaCategoria){
            pintarCategories();
        } else{
            errorCategoria.classList.remove("hide");
        }
    });

    document.getElementById("categoria").addEventListener("click", (event) => {
        errorCategoria.classList.add("hide");
    });

    pintarCategories();

});


function pintarCategories() {
    const contenidorCategories = document.getElementById("contenidorCategories");
    contenidorCategories.innerHTML = "";
    const categories = JSON.parse(localStorage.getItem("llistaCategories"));

    for (let index = 0; index < categories.length; index++) {
        const categoria = categories[index];
        const nom = categoria.nom;
        const color = categoria.color;


        const divPrincipal = document.createElement('div');
        divPrincipal.className = "flex border-radius box-sizing-border-box padding-left-10px padding-right-10px justify-content-space-between align-items-center heigth-50px width-100pc bg-color-gray";


        const divInfo = document.createElement('div');
        divInfo.className = "flex gap-10px justify-content-center align-items-center";

        const cercle = document.createElement('div');
        cercle.className = "circle";
        cercle.style.backgroundColor = color;

        const texto = document.createElement('p');
        texto.textContent = nom;

        divInfo.append(cercle, texto);


        const formulario = document.createElement('form');
        const boto = document.createElement('button');
        boto.className = "remove-button";
        boto.textContent = "Eliminar";
        boto.addEventListener("click", (event) => {
            event.preventDefault();
            eliminarCategoria(nom);
            pintarCategories();
        });

        formulario.appendChild(boto);


        divPrincipal.append(divInfo, formulario);
        contenidorCategories.appendChild(divPrincipal);
    }
}
