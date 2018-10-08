const priorityQueue = require('./priority-queue');


var queue = new priorityQueue({
    operator: "<"
});

queue.enqueue(1,5);
queue.enqueue(2,2);
queue.enqueue(3,1);
queue.enqueue(4,6);


queue.print();