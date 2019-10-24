class gameXO {
	constructor() {
		this.container = document.getElementById('container');
		this.winCombinations = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],
		[0, 4, 8],[2, 4, 6]];
		this.positionX = 160;
		this.positionY = 70;
		this.numberCells = 9;
		this.counter_active = '';
		this.inHTML = '';
		this.clone = '';
		this.nclone = '';
		this.tdArray = document.querySelectorAll('.td');
		this.xoBox = document.createElement('div');
		this.xxx = document.createElement('div');
		this.ooo = document.createElement('div');
		this.h1 = document.createElement('h1');
		this.table = document.createElement('div');
		this.button = document.createElement('button');
	}

	createField() {
		for(let i = 1; i <= 8; i++) {
			let hr = document.createElement('hr');
			this.fill(hr, this.container, 'hr hr' + i);
		}
		for(let i = 0; i < 8; i++) {
			let br = document.createElement('br');
			this.container.appendChild(br);
		}
		this.fill(this.xoBox, this.container, 'xoBox', '');
		this.fill(this.xxx, this.xoBox, 'xo', 'xxx', 'X');
		this.fill(this.ooo, this.xoBox, 'xo', 'ooo', 'O');
		this.fill(this.h1, this.container, 'h1', '', 'Let`s go!');
		this.fill(this.table, this.container, 'table', '');
		this.fill(this.button, this.container, 'button', 'newGame', 'New game');
		for(let i = 0; i < 9; i++) {
			let td = document.createElement('div');
			this.fill(td, this.table, 'td');
		}
		this.go();
	};
	fill(name, parent, clName, id, inner) {
		parent.appendChild(name);
		name.className = clName;
		if (id) name.id = id;
		if (inner) name.innerHTML = inner;
	};
	go() {
		window.addEventListener('mousemove', this.mMove);
		window.addEventListener('mouseup', this.mUp);
		this.loadNewGame();
		xxx.addEventListener('mousedown', this.mDown);
		ooo.addEventListener('mousedown', this.mDown);
	
		this.tdArray.forEach(function(elem) {
			elem.addEventListener('mouseover', this.mOver);
		});		
	};
	mDown(event) {
			this.counter_active = true;
			this.inHTML = event.target.innerHTML;
			this.clone = event.target.cloneNode(true);
			this.clone.id = 'clone';
			event.target.removeEventListener('mousedown', this.mDown);
			console.log(this.clone);	
	};
	mMove(event) {
		console.log(this.clone);
		if (this.counter_active === true) {
			let y = event.clientY - positionY;
			let x = event.clientX - positionX;
			this.clone.style.cssText = 'opacity: 0.5; position: absolute; top: ' + y + 'px; left: ' + x + 'px';
			this.xoBox.appendChild(this.clone);
		}
	};
	mUp(event) {
		this.counter_active = false;
		console.log(this.clone);
		this.nclone = this.clone.cloneNode(true);
		this.clone.remove();
	};
	/*mOver(event) {
		if (this.inHTML === 'X' || this.inHTML === 'O') {
			if (event.target.className === 'td' && event.target.className !== 'filled') {
				this.nclone.style.cssText = 'opacity: 1.0; position: relative; top: 0px; left: 0px';
				elem.appendChild(this.nclone);
				elem.className = 'filled';
				this.checkTurn();
				this.inHTML = '';
			}
		}
		this.checkWinner();
	}*/
/*	checkTurn() {
		if (this.checkWinner()) {
			return;
		}
		if (this.inHTML === 'X') {
			h1.innerHTML = 'O, your turn';
			ooo.addEventListener('mousedown', this.mDown);
		} else {
			h1.innerHTML = 'X, your turn';
			xxx.addEventListener('mousedown', this.mDown);
		}
	};*/
	
/*	checkWinner() {
		for (let i = 0; i < winCombinations.length; i++) {
			let variant = winCombinations[i];
			if (td[variant[0]].firstElementChild 
				&& td[variant[1]].firstElementChild 
				&& td[variant[2]].firstElementChild) {
				let result = td[variant[0]].firstElementChild.innerHTML === td[variant[1]].firstElementChild.innerHTML 
					&& td[variant[1]].firstElementChild.innerHTML === td[variant[2]].firstElementChild.innerHTML;
				if (result) {
					h1.innerHTML = td[variant[0]].firstElementChild.innerHTML + ' is winner!';
					document.querySelector('.hr' + [i + 1]).className += ' dblock';
					return true;
				}
				if (!result && document.querySelectorAll('.filled').length === numberCells) {
					h1.innerHTML = 'Draw!';
				}
			}
		}
	};*/
	loadNewGame() {
		document.getElementById('newGame').addEventListener('click', function() {
			document.location.reload();
		});
	};

}

let newgameXO = new gameXO();
newgameXO.createField();