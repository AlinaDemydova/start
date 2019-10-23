window.addEventListener('load', function() {
	let usersArray = [];
	let addUser = document.getElementById('addUser');
	const minInterval = 15;
	const maxInterval = 30;
	const msec = 1000;

	addUser.addEventListener('click', function(event) {
		fetch('https://randomuser.me/api').then(data => data.json()).then(function(data) {
			let users = data.results;
			return users.map(function(user) {
				let users = document.getElementById('users'),
					block = document.createElement('div'),
					img = document.createElement('img'),
					info = document.createElement('div'),
					name = document.createElement('p'),
					city = document.createElement('p'),
					phone = document.createElement('p');
				fill(block, users, 'block');
				fill(img, block, 'img', user.picture.medium);
				fill(info, block, 'info');
				fill(name, info, 'name', user.name.first + ' ' + user.name.last);
				fill(city, info, 'city', user.location.city);
				fill(phone, info, 'phone', user.phone);
				let newUser = {
					'name': user.name.first,
					'age': user.dob.age,
					'img': user.picture.medium
				};
				usersArray.push(newUser);
				if (usersArray.length === 1) {
					getSms(usersArray);
				}
			})
		}).catch(function(error) {
			console.log(error);
		});
	});

	function fill(name, parent, clName, inner) {
		parent.appendChild(name);
		name.className = clName;
		if (name.className === 'img') {
			name.src = inner;
			return;
		}
		if (name.className === 'age') {
			name.innerHTML = '(' + inner + ')';
			return;
		}
		if (inner) {
			name.innerHTML = inner;
		}
	}

	function getSms(usersArray) {
		let randomInt = randomInteger(minInterval, maxInterval) * msec;
		setInterval(function(randomInt) {
			fetch('https://www.randomtext.me/api/gibberish/p-1/15-32').then(data => data.json()).then(function(data) {
				let userWriteText = randomInteger(0, usersArray.length - 1);
				return usersArray.map(function(user, index) {
					if (userWriteText === index) {
						let chat = document.getElementById('chat'),
							block = document.createElement('div'),
							img = document.createElement('img'),
							info = document.createElement('div'),
							name = document.createElement('p'),
							age = document.createElement('span'),
							msg = document.createElement('p');
						fill(block, chat, 'block');
						fill(img, block, 'img', user.img);
						fill(info, block, 'info');
						fill(name, info, 'name', user.name);
						fill(age, info, 'age', user.age);
						fill(msg, info, 'msg', data.text_out);
						randomInt = randomInteger(minInterval, maxInterval) * msec;
					}
				})
			}).catch(function(error) {
				console.log(error);
			});
		}, randomInt)
	}

	function randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	}


});