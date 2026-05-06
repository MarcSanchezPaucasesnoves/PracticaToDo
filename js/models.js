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
                required: ["nom", "color"],
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


        let errorId = false;

        for (let index = 0; index < tasques.length; index++) {
            const tasca = tasques[index];
            const resultatValidar = validar(tasca);

            if (!resultatValidar) {
                errorId = true;
                break;
            }
            
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
            alert("Una de les tasques té una id que ja existeix o no té el format correcte");
        }


    } catch (error) {
        console.log("Error");
    }
};
