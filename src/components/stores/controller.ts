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
        let all = "all stores"
        let amountStores = Object.keys(data).length
        answer(req, res, 200, {all, amountStores, data})
        
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
        let numberPage = page
        answer(req, res, 200, {numberPage, data})
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
        if(data.name == undefined || data.name == null){
            answer(req, res, 422, "Not found")
        }else{
            answer(req, res, 200, data)
        }
    })
    .catch(e => {
        answer(req, res, 422, "Not found")
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
    .then((data) =>{
        let store = `successfully created`
        answer(req, res, 201, {store, data})
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
            let error = "store not found"
            answer(req, res, 422, {error, row})
        }
        let response = "store removed"
        answer(req, res, 201, {response, row})
    })
    .catch(e => {
        answer(req, res, 422, e)
    })
}
