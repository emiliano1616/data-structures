const priorityQueue = require('./priority-queue');


var queue = new priorityQueue({
    order: "DESC"
});

queue.enqueue(1,5);
queue.enqueue(2,2);
queue.enqueue(3,1);
queue.enqueue(4,6);


console.log("primero en la lista", queue.dequeue());

queue.enqueue(100,100);

queue.print();