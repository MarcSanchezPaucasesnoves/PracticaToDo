export function crearCategoria(nom, color){
    const categories = JSON.parse(localStorage.getItem("llistaCategories"));
    const novaCategoria = {
        nom: nom,
        color: color
    };


    if (!comprovarCategoria(nom)) {
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

export function crearTasca(titol, descripcio, data, categoria, prioritat){
    const tasques = JSON.parse(localStorage.getItem("llistaTasques"));

    let tascaCreada = false;

    if (comprovarCategoria(categoria) && comprovarTitolTasca(titol)) {

        if (tasques.length == 0) {

            const novaTasca = {
                id: 1,
                titol: titol,
                descripcio: descripcio,
                data: data,
                categoria: categoria,
                prioritat: prioritat,
                realitzada: false
            };
            tasques.push(novaTasca);
            localStorage.setItem("llistaTasques", JSON.stringify(tasques));
            localStorage.setItem("idTask", 2);

        } else {

            const idTask = localStorage.getItem("idTask");
            const novaTasca = {
                id: idTask,
                titol: titol,
                descripcio: descripcio,
                data: data,
                categoria: categoria,
                prioritat: prioritat,
                realitzada: false
            };

            localStorage.setItem("idTask", idTask + 1);

        }
        tascaCreada = true;
    }
    return tascaCreada;
    
}

export function comprovarCategoria(nom){
    const categories = JSON.parse(localStorage.getItem("llistaCategories"));
    let existeix = false;

    for (let index = 0; index < categories.length; index++) {
        if (categories[index].nom === nom) {
            existeix = true;
            break;
        }
    }
    return existeix;

}

export function comprovarTitolTasca(titol){
    return titol.trim().length > 0;
}

export function crearLlistaTasques(){
    if (!localStorage.getItem("llistaTasques")) {
        localStorage.setItem("llistaTasques", JSON.stringify([]));
    }
}

export function crearLlistaCategories(){
    if (!localStorage.getItem("llistaCategories")) {
        localStorage.setItem("llistaCategories", JSON.stringify([]));
    }
}