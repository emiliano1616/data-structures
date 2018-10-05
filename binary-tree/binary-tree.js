const _BIGGER = 1;
const _SMALLER = 2;

const _ITERATIVE = 1;
const _RECURSIVE = 2

module.exports = {
    getTree: _getTree,
    push: _push,
    printInOrder: _printInOrder,
    printPreOrder: _printPreOrder,
    printPosOrder: _printPosOrder,
    countNodes: _countNodes,
    setMode: _setMode,
    BIGGER: _BIGGER,
    SMALLER: _SMALLER,
    modes: {
        ITERARIVE: _ITERATIVE,
        RECURSIVE: _RECURSIVE
    }
}



let root = null;
let mode = _RECURSIVE;

function _setMode(_mode) {
    if (root)
        throw "Cannot set mode in an existing tree";
    mode = _mode;
}
// var root = createBinaryTree(2);

function createNewLeaf(value) {
    return {
        value: value,
        left: null,
        right: null
    }
}

function createBinaryTree(rootValue) {
    return createNewLeaf(rootValue);
}

function inOrderSearchIterative(node, operation, params) {
    let parents = [];
    while (true && (!params || !params.stopSearch)) {
        // console.log(parents);
        if (node) {
            parents.push(node);
            node = node.left;
        } else {
            if (parents.length > 0) {
                node = parents.pop();
                operation(node, params);
                node = node.right;

            } else {
                return;
            }
        }

    }
}

function inOrderSearch(node, operation, params) {
    if (mode == _RECURSIVE) {
        inOrderSearchRecursive(node, operation, params);
    } else {
        inOrderSearchIterative(node, operation, params);
    }
}


//TODO: Make iterative
function preOrderSearch(node, operation, params) {
    //StopSearch is totally optional. It should be set on "operation" function if required
    if (!node || (params && params.stopSearch))
        return;

    //This should do whatever you want to do with the visited node.
    operation(node, params);

    preOrderSearch(node.left, operation, params);
    preOrderSearch(node.right, operation, params);

}

//TODO: make iterative
function posOrderSearch(node, operation, params) {
    //StopSearch is totally optional. It should be set on "operation" function if required
    if (!node || (params && params.stopSearch))
        return;

    posOrderSearch(node.left, operation, params);
    posOrderSearch(node.right, operation, params);

    //This should do whatever you want to do with the visited node.
    operation(node, params);

}


function inOrderSearchRecursive(node, operation, params) {
    //StopSearch is totally optional. It should be set on "operation" function if required
    if (!node || (params && params.stopSearch))
        return;

    inOrderSearch(node.left, operation, params);

    //This should do whatever you want to do with the visited node.
    if (!params || !params.stopSearch) operation(node, params);

    inOrderSearch(node.right, operation, params);

}


function pushInNode(_node, _value, _comparefunction) {

    //I'm creating this operation function inside push because i wont be using it anywhere else.
    var operation = function (node, params) {
        if (params.compareFunction(node.value, params.value) == _BIGGER) {
            if (!node.left) {
                node.left = createNewLeaf(params.value);
                params.stopSearch = true; // once the leaf is created, I do not need the search to continue
            }
        } else {
            if (!node.right) {
                node.right = createNewLeaf(params.value);
                params.stopSearch = true; // once the leaf is created, I do not need the search to continue
            }
        }
    }

    var params = {
        compareFunction: _comparefunction,
        value: _value,
        stopSearch: false
    }
    inOrderSearch(_node, operation, params);
}

function defaultPrint(node) {
    console.log(node.value);
}

function _printInOrder(printFunction) {
    inOrderSearch(root, printFunction ? printFunction : defaultPrint);
}


function _printPreOrder(printFunction) {
    preOrderSearch(root, printFunction ? printFunction : defaultPrint);
}


function _printPosOrder(printFunction) {
    posOrderSearch(root, printFunction ? printFunction : defaultPrint);
}

function _countNodes() {
    var count = 0;
    function countFunction() {
        count++;
    }
    inOrderSearch(root, countFunction);
    return count;
}

function _getTree() {
    return root;
}

function _push(value, compareFunction) {
    if (!root) {
        root = createBinaryTree(value);
        return;
    }

    if (!compareFunction) {
        throw "You need to specify a compareFunction before push in the tree";
    }

    pushInNode(root, value, compareFunction);
}

