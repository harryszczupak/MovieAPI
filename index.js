const button = document.querySelector('button');
const container = document.querySelector('.container');
const input = document.querySelector('input');
button.addEventListener('click', () => {
	const value = input.value;
	fetch(`https://www.omdbapi.com/?s=${value}&page=1&apikey=d718772`)
		.then((Response) => {
			if (Response.ok) {
				return Response.json();
			} else {
				throw new Error('Error:', Response.status);
			}
		})
		.then((Data) => ShowMovie(Data))
		.catch((Error) => {
			console.error(Error);
		});
});

function ShowMovie(Data) {
	console.log(Data);
	if (Data.Response == 'True') {
		const { Search } = Data;
		const DeleteButton = document.createElement('button');

		DeleteButton.setAttribute('class', 'del-button');

		DeleteButton.textContent = 'x';

		const Banner = document.createElement('img');

		const MovieTitle = document.createElement('h1');

		const MovieYearInfo = document.createElement('span');

		const MovieBanner = document.createElement('div');

		const MovieFooter = document.createElement('div');

		const DownInfo = document.createElement('div');

		MovieTitle.textContent = Search[0].Title;

		MovieYearInfo.textContent = Search[0].Year;

		Banner.src = Search[0].Poster;

		MovieFooter.appendChild(MovieTitle);

		MovieFooter.appendChild(MovieYearInfo);

		MovieBanner.appendChild(Banner);

		DownInfo.appendChild(MovieFooter);

		MovieBanner.appendChild(DownInfo);

		MovieBanner.appendChild(DeleteButton);

		container.appendChild(MovieBanner);

		document.body.appendChild(container);

		DeleteButton.addEventListener('click', () => {
			MovieBanner.remove();
		});
	} else {
		console.log(Data.Error);
	}
}
