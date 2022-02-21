import {Event, Observable} from "./Observable.js";

class EventBus extends Observable {
   
    constructor() {
        super();
    }

    relayEvent(event) {
        this.notifyAll(new Event("globalEvent", {
            originalEvent: event
        }));
    }

}


const BUS = new EventBus();

export default BUS;