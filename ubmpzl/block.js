'use strict';

const starter = 97;

let last = 0;

module.exports = class Block {
	constructor(len = 2, posx = 0,posy = 0, isHorizontal = true, isTarget = false,id=null) {
		this.id = String.fromCharCode((starter+last));
		last++;
		if(last == 26) {
			last = 0;
		}
		
		this.len = len;
		this.isHorizontal = isHorizontal;
		this.isTarget = isTarget;
		this.posx = posx;
		this.posy = posy;
	}

	setId(id) {
		this.id = id;
	}

	getId() {
		return this.id;
	}

	setPos(posx = 0,posy = 0) {
		this.posx = posx;
		this.posy = posy;
	}

	getPos() {
		return [this.posx,this.posy];
	}

	getLen() {
		return this.len;
	}

	isHorizon() {
		return this.isHorizontal;
	}

	isTarget() {
		return this.isTarget;
	}
}