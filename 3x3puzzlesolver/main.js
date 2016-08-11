let State = require('./state');
let tree = require('./StateHolder');

const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;

const EMPTY = '2';
const MERGED = '5';
const DICE = '3';
const BLOCK = '1';
const TARGET = '4';

let s = new State('542311324');

let initialBoard = '121244353';

let res = [];
let cnt = 0;
function start() {
	let start = new State(initialBoard);
	let rootTree = new tree(start);
	rootTree.add(start,null,0);
	moves(rootTree,rootTree,start);

	console.log('total moves',res.length);

	let len = res.map((e)=>{return e.length;})

	let minIndex = -1,min = 99999;

	for(let i=0;i<len.length;i++) {
		if(min>len[i]) {
			min = len[i];
			minIndex = i;
		}
	}

	console.log('min win',res[minIndex]);
}

function moves(treeRoot,par,state) {
	let l,r,u,d;
	if(state.isWin() && (par.getDir().length<10)) {
		res.push(par.getDir());
		return;
	}
	if(state.canMove(LEFT)) {
		l = new State(state.move(LEFT));
		par.add(l,LEFT);
	}
	if(state.canMove(RIGHT)) {
		r = new State(state.move(RIGHT));
		par.add(r,RIGHT);
	}
	if(state.canMove(UP)) {
		u = new State(state.move(UP));
		par.add(u,UP);
	}
	if(state.canMove(DOWN)) {
		d = new State(state.move(DOWN));
		par.add(d,DOWN);
		
	}

	let ch = par.getChilds(); 
	for(let c = 0;c<ch.length;c++) {
		if(ch[c]) {
			moves(treeRoot,ch[c],ch[c].getState());
		}
	}
}

start();