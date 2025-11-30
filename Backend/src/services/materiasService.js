import models from "../models/index.js";

export async function fetchAllMaterias() {
    return models.Materia.findAll();
}

export class MateriasService {
    
}