const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;

module.exports = class tree {
  constructor(val,parent = null, mv = null, left = null, right = null, up = null, down = null) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.up = up;
    this.down = down;
    this.mv = mv;
  }

  isRoot() {
    return !this.parent;
  }

  getState() {
  	return this.val;
  }

  getChilds() {
  	return [this.left,this.right,this.up,this.down];
  }

  ifLeaf() {
    return !this.left && !this.right && !this.middle;
  }

  getLevel() {
  	let tmp = this;
  	let count = 0;
    do {
      count++;
      tmp = tmp.parent;
    } while (tmp && tmp.parent);
    return count;
  }

  getDir() {
  	let arr = [];
  	let tmp = this;
  	let count = 0;
    do {
      count++;
      arr.push({dir:tmp.mv,val:tmp.val.getVal()});
      tmp = tmp.parent;
    } while (tmp && tmp.parent);
    return arr.reverse();
  }

  add(t,move) {
  	let tr;
  	switch (move) {
  		case UP:
  			tr = new tree(t,this,'up');
  			break;
  		case DOWN:
  			tr = new tree(t,this,'down');
  			break;
  		case LEFT:
  			tr = new tree(t,this,'left');
  			break;
  		case RIGHT:
  			tr = new tree(t,this,'right');
  			break;
  		default:
  			tr = new tree(t,this,'root');
  	}
    if (this.isLoop(tr)) {
      return false;
    }
    switch (move) {
    	case UP:
    		this.up = tr;
    		break;
    	case DOWN:
    		this.down = tr;
    		break;
    	case LEFT:
    		this.left = tr;
    		break;
    	case RIGHT:
    		this.right = tr;
    		break;
    }
  }

  isLoop(t) {
    let tmp = this;
    do {
      if (tmp.val.getVal() == t.val.getVal()) {
        return true;
      }
      tmp = tmp.parent;
    } while (tmp && tmp.parent);
    return false;
  }

  getRoot(t) {
    let tmp = this;

    while (tmp.parent) {
      tmp = tmp.parent;
    }
    return tmp;
  }

  printRec(t) {
    if (t) {
      console.log('--> parent --> ', t.val.getVal(), ' from ',t.mv);
      if (t.left) {
      	console.log('        --> left  -->  ', t.left.val.getVal(), ' from ',t.left.mv);
      }

      if (t.right) {
      	console.log('        --> right -->  ', t.right.val.getVal(), ' from ',t.right.mv);
      }

      if (t.up) {
      	console.log('        --> up    -->  ', t.up.val.getVal(), ' from ',t.up.mv);
      }
      if (t.down) {
      	console.log('        --> down  -->  ', t.down.val.getVal(), ' from ',t.down.mv);
      }

      if (t.left) {
        this.printRec(t.left);
      }

      if (t.right) {
        this.printRec(t.right);
      }

      if (t.up) {
        this.printRec(t.up);
      }
      if (t.down) {
        this.printRec(t.down);
      }
    } else {
      return;
    }
  }

  print() {
    this.printRec(this);
  }
}
