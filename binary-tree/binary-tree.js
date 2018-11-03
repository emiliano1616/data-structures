const _BIGGER = 1;
const _SMALLER = 2;

const _ITERATIVE = 1;
const _RECURSIVE = 2


const createNewLeaf = (value) => {
    return {
        value: value,
        left: null,
        right: null
    }
}

const defaultPrint = (node) => {
    console.log(node.value);
}

module.exports = class BinaryTree {
    constructor(settings) {
        this.settings = settings;
        if (!this.settings.mode) {
            this.settings.mode = _RECURSIVE;
        }
    }
    push(value) {
        if (!this.settings || !this.settings.compareFunction)
            throw "You need to specify a compareFunction before push in the tree";

        if (!this.root)
            this.root = createNewLeaf(value);
        else
            pushInNode(this.root, value, this.settings.compareFunction);
    }

    printInOrder() {
        inOrderSearch(this.root, this.settings.mode, this.settings.printFunction ? this.settings.printFunction : defaultPrint);
    }

    printInPosOrder() {
        posOrderSearch(this.root, this.settings.mode, this.settings.printFunction ? this.settings.printFunction : defaultPrint);
    }

    printInPreOrder() {
        preOrderSearch(this.root, this.settings.mode, this.settings.printFunction ? this.settings.printFunction : defaultPrint);
    }

    getSettings() {
        if (this.settings)
            return JSON.stringify(JSON.parse(this.settings));
    }

    countNodes() {
        var count = 0;
        inOrderSearch(this.root, this.settings.mode, () => count++);

        return count;
    }

    //debug purposes
    printTree(){
        console.log(JSON.stringify(this.root));
    }


}

function pushInNode(_node, _value, _comparefunction) {

    if (_comparefunction(_node.value, _value) == _BIGGER) {
        if (!_node.left) {
            _node.left = createNewLeaf(_value);
        }else {
            pushInNode(_node.left,_value,_comparefunction);
        }
    } else {
        if (!_node.right) {
            _node.right = createNewLeaf(_value);
        } else {
            pushInNode(_node.right,_value,_comparefunction);
        }
    }
}


function inOrderSearchIterative(node, operation, params) {
    let parents = [];
    while (true && (!params || !params.stopSearch)) {
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

function inOrderSearch(node, mode, operation, params) {
    if (mode == _RECURSIVE) {
        inOrderSearchRecursive(node, operation, params);
    } else {
        inOrderSearchIterative(node, operation, params);
    }
}


//TODO: Make iterative
function preOrderSearch(node, mode, operation, params) {
    //StopSearch is totally optional. It should be set on "operation" function if required
    if (!node || (params && params.stopSearch))
        return;

    //This should do whatever you want to do with the visited node.
    operation(node, params);

    preOrderSearch(node.left, mode, operation, params);
    preOrderSearch(node.right, mode, operation, params);

}

//TODO: make iterative
function posOrderSearch(node, mode, operation, params) {
    //StopSearch is totally optional. It should be set on "operation" function if required
    if (!node || (params && params.stopSearch))
        return;

    posOrderSearch(node.left, mode, operation, params);
    posOrderSearch(node.right, mode, operation, params);

    //This should do whatever you want to do with the visited node.
    operation(node, params);

}


function inOrderSearchRecursive(node, operation, params) {
    //StopSearch is totally optional. It should be set on "operation" function if required
    if (!node || (params && params.stopSearch))
        return;

    inOrderSearchRecursive(node.left, operation, params);

    //This should do whatever you want to do with the visited node.
    if (!params || !params.stopSearch) operation(node, params);

    inOrderSearchRecursive(node.right, operation, params);

}
