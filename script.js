var searchBtn = document.getElementById("submitbtn")
var movieContainer = document.getElementById("moviecontainer")



searchBtn.addEventListener("click", async (event) => {
    event.preventDefault()

    try {
        //const apiKey = "Hcncqhk28zhby6Khi8w9tsyLpYKYKYun"
        //const searchTerm = "hello"
        //const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchForm.value)}`
        const apiKey = "0d02fe98abd1fa29b643a231a9ac3b49"

        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;


        const response = await fetch(url)
        const data = await response.json()
        
        const results = data.results

        const sample = results[0].poster_path;

        const img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/original/${sample}`
        movieContainer.appendChild(img)



        console.log(data)
    } catch (error) {
        console.log(error)
    }
    console.log("Button clicked")
})