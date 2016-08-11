'use strict';

module.exports = class Board {
	constructor(x=6,y=6,blockList = []) {
		this.blockList = blockList;
		this.x = x;
		this.y = y;
		this.renderBoard();
	}

	__genId() {
		this.id = '';

		for(let i=0; i<this.x;i++) {
			let row = '';
			for(let j=0;j<this.y;j++) {
				row += ''+this.board[i][j];
			}
			this.id += row;
		}
	}

	renderBoard() {
		this.board = [];
		for(let i=0;i<this.x;i++) {
			let t = [];
			for(let j=0;j<this.y;j++) {
				t.push(0);
			}
			this.board.push(t);
		}
		if(!this.blockList.length) {
			this.__genId();
			return;
		}
		for(let i=0;i<this.blockList.length;i++) {
			let pos = this.blockList[i].getPos();
			let len = this.blockList[i].getLen();
			let isHor = this.blockList[i].isHorizon();
			let id = this.blockList[i].id;

			let stx = pos[0];
			let sty = pos[1];
			for(let j=0;j<len;j++) {
				this.board[sty][stx] = id;
				if(isHor) {
					stx++;
				} else {
					sty++;
				}
			}
		}
		this.__genId();
	}

	getId() {
		return this.id;
	}

	ifBlockColide(block) {
		let pos = block.getPos();
		let len = block.getLen();
		let isHor = block.isHorizon();

		let stx = pos[0];
		let sty = pos[1];
		for(let i=0;i<len;i++) {
			if(board[stx][sty]!=0) {
				return true;
			}
			if(isHor) {
				stx++;
			} else {
				sty++;
			}
		}
		return false;
	}

	isBlockOnPos(posx,posy) {
		return this.board[posx][posy]!=0;
	}

	addBlock(block) {
		if(!this.blockList.length) {
			this.blockList.push(block);
			this.renderBoard();
			return true;
		}

		if(this.ifBlockColide(block)) {
			return false;
		}

		this.blockList.push(block);
		this.renderBoard();
	}

	print() {
		console.log('---------------')
		for(let i=0; i<this.x;i++) {
			let row = '';
			for(let j=0;j<this.y;j++) {
				row += this.board[i][j] + ' ';
			}
			console.log('| '+row+'|');
		}
		console.log('---------------')
	}
}
