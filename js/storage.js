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
    const tasques = JSON.parse(localStorage.getItem("llistaTasques"));

    for (let index = 0; index < categories.length; index++) {
        if (categories[index].nom === nom) {
            // Eliminar categories
            categories.splice(index, 1);
            localStorage.setItem("llistaCategories", JSON.stringify(categories));

            // Eliminar tasques asociades a aquesta categoria
            for (let index2 = 0; index2 < tasques.length; index2++) {
                const tasca = tasques[index2];
                const categoriaTasca = tasca.categoria.nom;

                if (categoriaTasca === nom) {
                    tasques.splice(index2, 1);
                    localStorage.setItem("llistaTasques", JSON.stringify(tasques));
                    index2 -= 1;
                }
            }

            break;
        }
    }
}

export function crearTasca(titol, descripcio, data, categoria, prioritat) {
    const tasques = JSON.parse(localStorage.getItem("llistaTasques"));

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

        const idTask = parseInt(localStorage.getItem("idTask"));
        const novaTasca = {
            id: idTask,
            titol: titol,
            descripcio: descripcio,
            data: data,
            categoria: categoria,
            prioritat: prioritat,
            realitzada: false
        };

        tasques.push(novaTasca);
        localStorage.setItem("llistaTasques", JSON.stringify(tasques));
        localStorage.setItem("idTask", idTask + 1);

    }

}

export function eliminarTasca(id){
    const tasques = JSON.parse(localStorage.getItem("llistaTasques"));

    for (let index = 0; index < tasques.length; index++) {
        const tasca = tasques[index];
        const idTasca = tasca.id;

        if (idTasca == id) {
            tasques.splice(index, 1);
            localStorage.setItem("llistaTasques", JSON.stringify(tasques));
            break;
        }
    }
}

export function canviarTascaRealitzada(id){
    const tasques = JSON.parse(localStorage.getItem("llistaTasques"));
    
    for (let index = 0; index < tasques.length; index++) {
        const tasca = tasques[index];
        const idTasca = tasca.id;

        if (idTasca == id) {
            if (tasca.realitzada) {
                tasca.realitzada = false;
            } else {
                tasca.realitzada = true;
            }

            localStorage.setItem("llistaTasques", JSON.stringify(tasques));
            break;
        }
    }
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

export function tornarCategoria(nom){
    const categories = JSON.parse(localStorage.getItem("llistaCategories"));
    
    for (let index = 0; index < categories.length; index++) {
        const categoria = categories[index];
        
        if (categoria.nom == nom) {
            return categoria;
        }
    }
}