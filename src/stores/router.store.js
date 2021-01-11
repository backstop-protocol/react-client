/**
 * @format
 */
import { makeAutoObservable, runInAction } from "mobx"

class RouterStore {
    routeProps = {}

    constructor (){
        makeAutoObservable(this)
    }

    setRouteProps = history => {
        this.routeProps.history = history
    }
}

export default new RouterStore()