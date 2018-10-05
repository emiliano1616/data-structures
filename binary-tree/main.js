const bts = require('./binary-tree');
// let val = bts.hello(); // val is "Hello"   


function compareInt(a, b) {
    return a > b ? bts.BIGGER : bts.SMALLER;
}

// bts.push(4, compareInt);
// bts.push(6, compareInt);
// bts.push(7, compareInt);
// bts.push(0, compareInt);
// bts.push(1, compareInt);
// console.log(JSON.stringify(bts.getTree()));
// console.log(JSON.stringify(bts.getTree()));
// bts.setMode(bts.modes.ITERARIVE);
console.time();

for(var i = 0; i < 300000 ; i++){
    // bts.push(1,compareInt);
    bts.push(Math.floor(Math.random() *1000) ,compareInt);
}

console.timeEnd();

console.log(bts.countNodes());


// function print() {
//     console.log("test");
// }

// console.log("ORDER");
// bts.printInOrder();

// console.log("PRE");
// bts.printPreOrder();

// console.log("POST");
// bts.printPosOrder();