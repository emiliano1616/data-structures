const createNode = (item, priority) => {
    return {
        node: item,
        priority: priority
    }
}

const orders = {
    'ASC': (a, b) => { return a > b },
    'DESC': (a, b) => { return a < b }
}

module.exports = class PriorityQueue {
    constructor(settings) {
        this.settings = settings;
        this.queue = [];

        if (settings) {
            this.order = settings.order ? settings.order : '<';
        } else {
            this.order = '<';
        }

    }

    enqueue(item, priority) {
        let node = createNode(item, priority);
        let i = 0;
        while (i < this.queue.length && orders[this.order](this.queue[i].priority, priority)) i++;

        this.queue.splice(i, 0, node);
    }

    dequeue() {
        if (!this.isEmpty())
            return this.queue.shift();
    }

    updatePriority(item, priority) {
        if (!this.settings || this.settings.compareFunction)
            throw "To update an item priority you need to declare a compareFunction in the settings";

        for (let i = 0; i < this.queue.length; i++) {
            if (this.settings.compareFunction(this.queue[i].node, item) == 0) {
                this.queue[i].priority = priority;
                return;
            }
        }

        //At this point, I can assume that it was not found, so I'm adding it.
        this.enqueue(item, priority);
    }

    front() {
        if(!this.isEmpty())
            return this.queue[0];
    }

    isEmpty() {
        return this.queue.length == 0;
    }

    print() {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.settings && this.settings.printFunction) {
                this.settings.printFunction(JSON.parse(JSON.stringify(this.queue[i])));
            } else {
                console.log(this.queue[i]);
            }
        }
    }

}
