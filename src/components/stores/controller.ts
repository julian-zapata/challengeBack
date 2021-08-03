import { stringify } from "querystring";
import "reflect-metadata";
import { getRepository, getConnection} from "typeorm";
import { Stores } from "../../entity/Stores";
import { answer } from "../../routes/response";

//listado de todas las tiendas
export async function getAllStores(req, res) {
     await getRepository(Stores)
    .createQueryBuilder("stores")
    .getMany()
    .then(data => {
        let amountStores = Object.keys(data).length
        answer(req, res, 200, {data, amountStores})
        
    })
    .catch(e => {
        answer(req, res, 422, e)
    })
}

//listado de 10 tiendas por pagina
export async function pageStores(page, req, res) {

    let startPage = page * 10;
    let finishPage = startPage - 10

    await getRepository(Stores)
    .createQueryBuilder("stores")
    .where("stores.id BETWEEN :finishPage AND :startPage", { finishPage: finishPage, startPage: startPage })
    .take(10)
    .getMany()
    .then(data => {
        answer(req, res, 200, data)
    })
    .catch(e => {
        answer(req, res, 422, e)
    })
}

//busqueda de tienda por nombre
export async function nameStore(name, req, res) {
    await getRepository(Stores)
    .createQueryBuilder("stores")
    .where("stores.name = :name", { name: name })
    .getOne()
    .then(data => {
        answer(req, res, 200, data)
    })
    .catch(e => {
        answer(req, res, 422, e)
    })
}

//alta de nueva tienda
export async function addStore(name, address, req, res){
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Stores)
    .values([
        { 
            name: name,
            address: address,
        }
    ])
    .execute()
    .then(data =>{
        answer(req, res, 201, `creado exitosamente`)
    })
    .catch(e => {
        answer(req, res, 422, e)
    })
}

//eliminar tienda
export async function deleteStore(id, req, res) {
    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Stores)
    .where("id = :id", { id: id })
    .execute()
    .then(row => {
        if(row.affected == 0){
            answer(req, res, 422, "no se encuentra tienda")
        }
        answer(req, res, 201, "tienda eliminada")
    })
    .catch(e => {
        answer(req, res, 422, e)
    })
}
