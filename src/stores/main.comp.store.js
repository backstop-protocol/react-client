import { makeAutoObservable } from "mobx"
import * as B from "../lib/bInterface"
import * as ApiHelper from "../lib/ApiHelper"

class MainCompStore {
    constructor (){
        makeAutoObservable(this)
    }

    
}