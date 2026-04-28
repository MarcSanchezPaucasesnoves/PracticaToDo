export function crearCategoria(nom, color){
    const categories = JSON.parse(localStorage.getItem("llistaCategories"));
    const novaCategoria = {
        nom: nom,
        color: color
    };
    let existeix = false;

    for (let index = 0; index < categories.length; index++) {
        if (categories[index].nom.toLowerCase() === novaCategoria.nom.toLowerCase()) {
            existeix = true;
            break;
        }
    }

    if (!existeix) {
        categories.push(novaCategoria);
        localStorage.setItem("llistaCategories", JSON.stringify(categories));
        return true;
    } else{
        return false;
    }
}

export function eliminarCategoria(nom){
    const categories = JSON.parse(localStorage.getItem("llistaCategories"));
    for (let index = 0; index < categories.length; index++) {
        if (categories[index].nom === nom) {
            categories.splice(index, 1);
            localStorage.setItem("llistaCategories", JSON.stringify(categories));
            break;
        }
    }
}