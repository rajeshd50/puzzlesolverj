'use strict';

let Block = require('./block');
let Board = require('./Board');

let blockArr = [];

blockArr.push(new Block(3,0,0,true));
blockArr.push(new Block(2,3,0,false));
blockArr.push(new Block(2,4,0,false));
blockArr.push(new Block(2,5,0,false));
blockArr.push(new Block(2,0,1,true));
blockArr.push(new Block(2,0,2,true,true));
blockArr.push(new Block(2,3,2,false));
blockArr.push(new Block(2,0,3,false));
blockArr.push(new Block(2,0,5,true));
blockArr.push(new Block(2,1,3,true));
blockArr.push(new Block(2,2,4,false));
blockArr.push(new Block(2,3,4,true));
blockArr.push(new Block(2,4,3,true));
blockArr.push(new Block(2,5,4,false));

let b = new Board(6,6,blockArr);

b.print();