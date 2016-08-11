'use strict';

const EMPTY = '2';
const MERGED = '5';
const DICE = '3';
const BLOCK = '1';
const TARGET = '4';

const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;

module.exports = class State {
  constructor(config) {
    this.config = config;
  }

  getVal() {
  	return this.config;
  }

  countOf(str, ch) {
    let count = 0;
    while (str.indexOf(ch) >= 0) {
      count++;
      str = str.substring(str.indexOf(ch) + 1);
    }
    return count;
  }

  getBoardByRow() {
    let board = this.config;
    let arr = board.split('');
    let res = [];

    while (arr.length) {
      res.push(arr.splice(0, 3));
    }

    return res;
  }

  getBoardByCol() {
    let board = this.config;
    let arr = board.split('');
    let res = [];

    for (let i = 0; i < 3; i++) {
      res.push(arr.filter((e, index) => {
        return index % 3 == i;
      }));
    }

    return res;
  }

  isWin() {
    let str = String(this.config);

    if (str.length < 9) {
      return false;
    }

    if (str.indexOf(DICE) >= 0) {
      return false;
    }

    if (str.indexOf(TARGET) >= 0) {
      return false;
    }

    let mergeCount = this.countOf(str, MERGED),
      blockCount = this.countOf(str, BLOCK),
      emptyCount = this.countOf(str, EMPTY);

    if ((mergeCount + blockCount + emptyCount) === 9) {
      return true;
    }
    return false;
  }

  canMove(dir) {
    let board = this.config;
    let bRow = [];
    if ((dir == UP) || (dir == DOWN)) {
      bRow = this.getBoardByCol();
    } else {
      bRow = this.getBoardByRow();
    }
    let mov = 1;
    if ((dir == LEFT) || (dir == UP)) {
      mov = -1;
    }
    let canMove = false;
    bRow.forEach((element, index) => {
      let s = element.slice();
      
      while (s.indexOf(DICE) >= 0) {
        
        let ind = s.indexOf(DICE);
        let toCheck = ((dir == RIGHT) || (dir == DOWN)) ? (element.length - 1) : 0;
        if (ind == toCheck) {
          s = s.splice(ind + 1);
          continue;
        }
        if ((s[ind + mov] == EMPTY) || ((s[ind + mov] == TARGET))) {
          canMove = true;
        }
        s = s.splice(ind + 1);
      }

      s = element.slice();
      while (s.indexOf(MERGED) >= 0) {
        let ind = s.indexOf(MERGED);
        let toCheck = ((dir == RIGHT) || (dir == DOWN)) ? (element.length - 1) : 0;
        if (ind == toCheck) {
          s = s.splice(ind + 1);
          continue;
        }

        if ((s[ind + mov] == EMPTY) || ((s[ind + mov] == TARGET))) {
          canMove = true;
        }
        s = s.splice(ind + 1);
      }
    });

    return canMove;
  }

  move(dir) {
    if (!this.canMove(dir)) {
      return false;
    }
    switch (dir) {
    	case UP:
    		return this.__moveUp();
    	case DOWN:
    		return this.__moveDown();
    	case LEFT:
    		return this.__moveLeft();
    	case RIGHT:
    		return this.__moveRight();
    }
  }

  __moveUp() {
  	return this.__moveUpOrLeft(this.getBoardByCol(),UP);
  }

  __moveDown() {
  	return this.__moveDownOrRight(this.getBoardByCol(),DOWN);
  }

  __moveLeft() {
  	return this.__moveUpOrLeft(this.getBoardByRow(),LEFT);
  }

  __moveRight() {
  	return this.__moveDownOrRight(this.getBoardByRow(),RIGHT);
  }

  __moveUpOrLeft(table,dir) {
  	for(let i=0;i<table.length;i++) {
  		let rc = table[i];
  		for(let j=0;j<(rc.length-1);j++) {
  			if((rc[j]===EMPTY)||(rc[j]===TARGET)) {
  				if((rc[j+1]===DICE)) {
  					rc[j+1] = EMPTY;
  					rc[j] = (rc[j]===TARGET)?MERGED:DICE;
  				} else if(rc[j+1]==MERGED) {
  					rc[j+1] = TARGET;
  					rc[j] = (rc[j]===TARGET)?MERGED:DICE;
  				}
  			}
  		}
  	}
  	if(dir==LEFT) {
  		return table.map((e)=>{return e.join('');}).join('');
  	}else {
  		let r = [];
  		for(let ii = 0;ii<table.length;ii++) {
  			for(let jj=0;jj<table[ii].length;jj++) {
  				r.push(table[jj][ii]);
  			}
  		}
  		return r.join('');
  	}
  }

  __moveDownOrRight(table,dir) {
  	for(let i=0;i<table.length;i++) {
  		let rc = table[i];
  		for(let j=rc.length-1;j>0;j--) {
  			if((rc[j]===EMPTY)||(rc[j]===TARGET)) {
  				if((rc[j-1]===DICE)) {
  					rc[j-1] = EMPTY;
  					rc[j] = (rc[j]===TARGET)?MERGED:DICE;
  				} else if(rc[j-1]==MERGED) {
  					rc[j-1] = TARGET;
  					rc[j] = (rc[j]===TARGET)?MERGED:DICE;
  				}
  			}
  		}
  	}
  	if(dir==RIGHT) {
  		return table.map((e)=>{return e.join('');}).join('');
  	}else {
  		let r = [];
      for(let ii = 0;ii<table.length;ii++) {
        for(let jj=0;jj<table[ii].length;jj++) {
          r.push(table[jj][ii]);
        }
      }
      return r.join('');
  	}
  }
}
