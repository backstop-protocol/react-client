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

    getRoute () {
        const path = this.routeProps.history.location.pathname
        if(path.indexOf("maker") > -1) {
            return "maker"
        }
        if(path.indexOf("compound")> -1) {
            return "compound"
        }
    }
}

export default new RouterStore()