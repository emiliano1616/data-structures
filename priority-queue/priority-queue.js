const createNode = (item, priority) => {
    return {
        node: item,
        priority: priority
    }
}

const operators = {
    '>': (a, b) => {return  a > b },
    '<': (a, b) => {return  a < b }
}

module.exports = class PriorityQueue {
    constructor(settings) {
        this.settings = settings;
        this.queue = [];

        if (settings) {
            this.operator = settings.operator ? settings.operator : '<';
        } else {
            this.operator = '<';
        }

    }

    enqueue(item, priority) {
        let node = createNode(item, priority);
        let i = 0;
        while(i < this.queue.length && operators[this.operator](this.queue[i].priority,priority)) i++;

        this.queue.splice(i,0,node);
    }

    dequeue() {

    }

    updatePriority(item, priority) {
        if (!settings || settings.compareFunction)
            throw "To update an item priority you need to declare a compareFunction in the settings";
    }

    front() {

    }

    isEmpty() {
        return this.queue.length == 0;
    }

    print() {
        for(let i = 0; i < this.queue.length; i++) {
            if(this.settings && this.settings.printFunction) {
                this.settings.printFunction(JSON.parse(JSON.stringify(this.queue[i])));
            } else {
                console.log(this.queue[i]);
            }
        }
    }

}
