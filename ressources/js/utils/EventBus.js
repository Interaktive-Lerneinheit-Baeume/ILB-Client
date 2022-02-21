import {Event, Observable} from "./Observable.js";

class EventBus extends Observable {
   
    constructor() {
        super();
    }

    broadcast(data) {
        this.notifyAll(new Event("event", data));
    }

}


const BUS = new EventBus();

export default BUS;