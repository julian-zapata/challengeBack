const express = require("express");
const appStore = express()
import { answer } from "../../routes/response";
import { paramStoreValidate } from "../../routes/validations";
import {getAllStores, nameStore, pageStores, addStore, deleteStore} from "./controller"


appStore.get("/", async function(req, res) {

    let page = req.query.page
    let name = req.query.name
    
    if(page > 0){
        await pageStores(page, req, res)
    }

    if(name != null){
        console.log(name)
        await nameStore(name, req, res)
    }

    await getAllStores(req, res)
})


appStore.post("/", async function(req, res) {
    
    let name = req.body.name
    let address = req.body.address

    await paramStoreValidate.validateAsync({name, address })
        .then(() => {
            addStore(name, address, req, res)
        })
        .catch(() =>{
            answer(req, res, 422, "los campos deben estar completos")
        })
})


appStore.delete("/:id", async function(req, res) {

    let id = req.params.id
    await deleteStore(id, req, res)

})


export default appStore;