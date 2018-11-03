const bts = require('./binary-tree');
// let val = bts.hello(); // val is "Hello"   



function compareInt(a, b) {
    return a > b ? 1 : 2;
}


let settings = {
    compareFunction: compareInt,
    mode:2
}

const tree = new bts( settings);


// tree.push(4, compareInt);
// tree.push(6, compareInt);
// tree.push(7, compareInt);
// tree.push(0, compareInt);
// tree.push(1, compareInt);
// console.log(JSON.stringify(bts.getTree()));
// console.log(JSON.stringify(bts.getTree()));
// bts.setMode(bts.modes.ITERARIVE);
// console.time();

for(var i = 0; i < 100 ; i++){
    // bts.push(1,compareInt);
    tree.push(Math.floor(Math.random() *1000) ,compareInt);
}

// console.timeEnd();

// console.log(tree.countNodes());
tree.printInOrder();
// tree.printTree();


// function print() {
//     console.log("test");
// }

// console.log("ORDER");
// bts.printInOrder();

// console.log("PRE");
// bts.printPreOrder();

// console.log("POST");
// bts.printPosOrder();