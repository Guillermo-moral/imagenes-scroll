window.addEventListener("load", () => {
	var contenedor = document.querySelector(".contenedor");
	var paginador = document.querySelector(".paginador");
	var indice = 0;

	// Crea DOM
	const imagen = url => {
		var img = document.createElement("img");
		img.src = url;
		return img;
	}

	// Llama a back y carga imágenes de 15 en 15
	function getImagenes(indice) {
		Ajax.request(`datos/imagenes.php?i=${indice}`, respuesta => {
			JSON.parse(respuesta).forEach(item => {
				contenedor.appendChild(imagen(item.url));
			});
		});
		indice += 15;
		return indice;
	}

	// Actualiza indice
	indice = getImagenes(indice);

	// Carga nuevas imágenes en scroll
	window.addEventListener("scroll", () => {
		if (window.scrollY >= paginador.offsetTop - window.innerHeight) {
			indice = getImagenes(indice);
		}
	});

});