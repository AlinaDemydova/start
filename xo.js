class gameXO {
	constructor() {
		this.container = document.getElementById('container');
		this.winCombinations = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],
		[0, 4, 8],[2, 4, 6]];
		this.positionX = 160;
		this.positionY = 70;
		this.numberCells = 9;
		this.playerX = 'X';
		this.playerO = 'O';
		this.counter_active = '';
		this.inHTML = '';
		this.clone = '';
		this.nclone = '';
		this.xoBox = document.createElement('div');
		this.xxx = document.createElement('div');
		this.ooo = document.createElement('div');
		this.h1 = document.createElement('h1');
		this.table = document.createElement('div');
		this.button = document.createElement('button');
	}

	createField = () => {
		for(let i = 1; i <= 8; i++) {
			let hr = document.createElement('hr');
			this.fill(hr, this.container, 'hr hr' + i);
		}
		for(let i = 0; i < 8; i++) {
			let br = document.createElement('br');
			this.container.appendChild(br);
		}
		this.fill(this.xoBox, this.container, 'xoBox', '');
		this.fill(this.xxx, this.xoBox, 'xo', 'xxx', this.playerX);
		this.fill(this.ooo, this.xoBox, 'xo', 'ooo', this.playerO);
		this.fill(this.h1, this.container, 'h1', '', 'Let`s go!');
		this.fill(this.table, this.container, 'table', '');
		this.fill(this.button, this.container, 'button', 'newGame', 'New game');
		for(let i = 0; i < 9; i++) {
			let td = document.createElement('div');
			this.fill(td, this.table, 'td');
		}
		this.go();
	};

	fill = (name, parent, clName, id, inner) => {
		parent.appendChild(name);
		name.className = clName;
		if (id) name.id = id;
		if (inner) name.innerHTML = inner;
	};

	go = () => {
		let tdArray = document.querySelectorAll('.td');
		window.addEventListener('mousemove', this.mMove);
		window.addEventListener('mouseup', this.mUp);			
		xxx.addEventListener('mousedown', this.mDown);
		ooo.addEventListener('mousedown', this.mDown);
		this.mOver(event, tdArray);
		this.loadNewGame();
	};

	mDown = (event) => {
			this.counter_active = true;
			this.inHTML = event.target.innerHTML;
			this.clone = event.target.cloneNode(true);
			this.clone.id = 'clone';
			event.target.removeEventListener('mousedown', this.mDown);
	};

	mMove = (event) => {
		if (this.counter_active === true) {
			let y = event.clientY - this.positionY;
			let x = event.clientX - this.positionX;
			this.clone.style.cssText = 'opacity: 0.5; position: absolute; top: ' + y + 'px; left: ' + x + 'px';
			this.xoBox.appendChild(this.clone);
		}	
	};

	mUp = (event) => {
		this.counter_active = false;
		this.nclone = this.clone.cloneNode(true);
		this.clone.remove();
	};

	mOver = (event, tdArray) => {
		tdArray.forEach((elem) => {
			elem.addEventListener('mouseover', (event) => {
				if (this.inHTML === this.playerX || this.inHTML === this.playerO) {
					if (event.target.className === 'td' && event.target.className !== 'filled') {
						this.nclone.style.cssText = 'opacity: 1.0; position: relative; top: 0px; left: 0px';						
						elem.appendChild(this.nclone);
						elem.className = 'filled';
						this.checkTurn(tdArray);
						this.inHTML = '';
					}
				}
				this.checkWinner(tdArray);
			});
		});
	}

	checkTurn = (tdArray) => {
		if (this.checkWinner(tdArray)) {
			return;
		}
		if (this.inHTML === this.playerX) {
			this.h1.innerHTML = this.playerO + ', your turn';
			ooo.addEventListener('mousedown', this.mDown);
		} else {
			this.h1.innerHTML = this.playerX + ', your turn';
			xxx.addEventListener('mousedown', this.mDown);
		}
	};
	
	checkWinner = (tdArray) => {
		for (let i = 0; i < this.winCombinations.length; i++) {
			let variant = this.winCombinations[i];
			if (tdArray[variant[0]].firstElementChild && tdArray[variant[1]].firstElementChild && tdArray[variant[2]].firstElementChild) {
				let result = tdArray[variant[0]].firstElementChild.innerHTML === tdArray[variant[1]].firstElementChild.innerHTML 
					&& tdArray[variant[1]].firstElementChild.innerHTML === tdArray[variant[2]].firstElementChild.innerHTML;
				if (result) {
					this.h1.innerHTML = tdArray[variant[0]].firstElementChild.innerHTML + ' is winner!';
					document.querySelector('.hr' + [i + 1]).className += ' dblock';
					return true;
				}
				if (!result && document.querySelectorAll('.filled').length === this.numberCells) {
					this.h1.innerHTML = 'Draw!';
				}
			}
		}
	};

	loadNewGame() {
		document.getElementById('newGame').addEventListener('click', function() {
			document.location.reload();
		});
	};
}

let newgameXO = new gameXO();
newgameXO.createField();
