// Iteration 1: Devuelve un array con todos los directores
function getAllDirectors(moviesArray) {
    // Usamos map para recorrer cada película y quedarnos solo con el director
    return moviesArray.map(movie => movie.director);
}

// Iteration 2: ¿Cuántas películas de Drama dirigió Steven Spielberg?
function howManyMovies(moviesArray) {
    // Filtramos las películas que sean de Spielberg Y del género Drama
    // Al final usamos .length para contar cuántas hay
    return moviesArray.filter(movie => 
        movie.director === "Steven Spielberg" && 
        movie.genre.includes("Drama")
    ).length;
}

// Iteration 3: Calcula el promedio de todas las puntuaciones
function scoresAverage(moviesArray) {
    // Si el array está vacío, devolvemos 0 para evitar dividir entre 0
    if (moviesArray.length === 0) return 0;

    // Sumamos todas las puntuaciones con reduce
    // Usamos (movie.score || 0) por si alguna película no tiene puntuación
    const total = moviesArray.reduce((acumulador, movie) => 
        acumulador + (movie.score || 0), 0
    );

    // Dividimos entre el total de películas para obtener el promedio
    const promedio = total / moviesArray.length;

    // Redondeamos a 2 decimales y devolvemos
    return Math.round(promedio * 100) / 100;
}

// Iteration 4: Calcula el promedio de puntuación solo de películas de Drama
function dramaMoviesScore(moviesArray) {
    // Primero filtramos solo las películas que sean del género Drama
    const dramas = moviesArray.filter(movie => movie.genre.includes("Drama"));

    // Si no hay ninguna película de drama, devolvemos 0
    if (dramas.length === 0) return 0;

    // Sumamos las puntuaciones de todas las películas de drama
    const total = dramas.reduce((acumulador, movie) => 
        acumulador + (movie.score || 0), 0
    );

    // Calculamos el promedio dividiendo entre el número de dramas
    const promedio = total / dramas.length;

    // Redondeamos a 2 decimales y devolvemos
    return Math.round(promedio * 100) / 100;
}

// Iteration 5: Ordena las películas por año de forma ascendente
function orderByYear(moviesArray) {
    // Hacemos una copia del array para no modificar el original
    let copiaArray = [].concat(moviesArray);

    // Ordenamos por año
    // Si dos películas tienen el mismo año, las ordenamos alfabéticamente por título
    return copiaArray.sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year; // Orden ascendente por año
        } else {
            return a.title.localeCompare(b.title); // Orden alfabético si el año es igual
        }
    });
}

// Iteration 6: Ordena alfabéticamente y devuelve solo los primeros 20 títulos
function orderAlphabetically(moviesArray) {
    // Hacemos una copia del array para no modificar el original
    let copiaArray = [...moviesArray];

    return copiaArray
        .sort((a, b) => a.title.localeCompare(b.title)) // Ordenamos alfabéticamente por título
        .slice(0, 20)                                    // Nos quedamos solo con los primeros 20
        .map(movie => movie.title);                      // Extraemos solo el título de cada película
}

// Iteration 7: Convierte la duración de las películas de horas a minutos
function turnHoursToMinutes(moviesArray) {
    // Hacemos una copia del array para no modificar el original
    let copiaArray = [...moviesArray];

    return copiaArray.map(movie => {
        // Separamos el string "2h 22min" en ["2h", "22min"]
        const partes = movie.duration.split(" ");

        // Extraemos el número de horas (parseInt ignora la "h")
        const horas = parseInt(partes[0]);

        // Extraemos los minutos, si no hay minutos usamos 0
        const minutos = parseInt(partes[1] || 0);

        // Devolvemos la película con la duración convertida a minutos
        return {
            ...movie,                          // Copiamos todos los datos de la película
            duration: (horas * 60) + minutos   // Sobreescribimos solo la duración
        };
    });
}

// Iteration 8: Encuentra el año con mejor puntuación media
function bestYearAvg(moviesArray) {
    // Si el array está vacío, devolvemos null
    if (moviesArray.length === 0) return null;

    // Paso 1: Agrupamos las películas por año usando reduce
    // El acumulador es un objeto donde cada clave es un año
    const peliculasPorAño = moviesArray.reduce((acumulador, pelicula) => {
        const año = pelicula.year;

        // Si el año no existe aún en el acumulador, lo creamos
        if (!acumulador[año]) {
            acumulador[año] = { año: año, puntuacionTotal: 0, cantidad: 0 };
        }

        // Sumamos la puntuación y aumentamos el contador de películas de ese año
        acumulador[año].puntuacionTotal += pelicula.score;
        acumulador[año].cantidad++;

        return acumulador;
    }, {}); // Empezamos con un objeto vacío

    // Paso 2: Convertimos el objeto en array para poder recorrerlo
    const años = Object.values(peliculasPorAño);

    // Empezamos asumiendo que el primer año es el mejor
    let mejorAño = años[0];
    let mejorMedia = años[0].puntuacionTotal / años[0].cantidad;

    // Recorremos el resto de años para ver si alguno tiene mejor media
    for (let i = 1; i < años.length; i++) {
        const mediaActual = años[i].puntuacionTotal / años[i].cantidad;

        // Si la media actual es mejor, actualizamos el mejor año
        if (mediaActual > mejorMedia) {
            mejorMedia = mediaActual;
            mejorAño = años[i];
        }
    }

    // Paso 3: Redondeamos la media a 2 decimales
    const mediaRedondeada = Math.round(mejorMedia * 100) / 100;

    // Devolvemos el resultado como string con el formato requerido
    return `The best year was ${mejorAño.año} with an average score of ${mediaRedondeada}`;
}