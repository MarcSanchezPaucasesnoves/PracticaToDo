import { crearCategoria, crearTasca, comprovarCategoria, existeixIdTasca } from "./storage.js";

export async function recuperarValidarTasques(rutaArxiu) {
    
    const schema = {
        type: "object",
        properties: {
            id: { type: "string" },
            titol: { type: "string" },
            descripcio: { type: "string" },
            data: { type: "string" },
            categoria: {  
                type: "object",
                properties: {
                    nom: { type: "string" },
                    color: { type: "string" }
                },
                required: ["nombre", "color"],
                additionalProperties: false
            },
            prioritat: { type: "string", enum: ["Baixa", "Mitjana", "Alta"] },
            realitzada: { type: "boolean" }
        },
        required: ["id", "titol", "categoria", "prioritat", "realitzada"],
        additionalProperties: false
    };

    try {
        const Ajv = window.Ajv;
        const ajv = new Ajv();

        const resposta = await fetch(rutaArxiu);
        const tasques = await resposta.json();

        const validar = ajv.compile(schema);
        const resultat = validar(tasques[0]);

        if (resultat) {
            console.log("Correctes");
        } else {
            console.log("Dades amb un format incorrecte");
        }


        let errorId = false;

        for (let index = 0; index < tasques.length; index++) {
            const tasca = tasques[index];
            
            if (existeixIdTasca(tasca.id)) {
                errorId = true;
                break;
            }
        }


        if (!errorId) {
            tasques.forEach(tasca => {
                if (!comprovarCategoria(tasca.categoria.nom)) {
                    crearCategoria(tasca.categoria.nom, tasca.categoria.color);
                }

                crearTasca(tasca.titol, tasca.descripcio, tasca.data, tasca.categoria, tasca.prioritat, tasca.id, tasca.realitzada);
            });
        } else {
            alert("Una id d'una de les tasques ja existeix");
        }


    } catch (error) {
        console.log("Error");
    }
};
