let API_url = "https://www.omdbapi.com/?t="
let API_key = "a8fb63d"

const displayimg = document.querySelector('.displayimg')

document.querySelector('#searchForm').addEventListener('submit', () => {
    event.preventDefault();
    searchkey = document.querySelector('#Search-response').value
    console.log(searchkey)
    searchmovie(searchkey);
})



async function searchmovie(title) {
    try {
        const req_url = API_url + title + `&apikey=${API_key}`
        const res = await fetch(req_url, {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        if(data.Response=="True"){
        console.log('Status is ok')
        displayimg.style.display = 'none'
        renderimg(data.Poster);
        render(data)
        }
        else if(data.Response=='False'){
            alert(data.Error)
        }
    } catch (error) {
        console.log(error)
    }
}


function renderimg(url) {
    const movieImage = document.querySelector(".movieimg");
    movieImage.innerHTML = ''
    const imageElement = document.createElement('img')
    imageElement.src = url;
    movieImage.appendChild(imageElement)
}

function render(data) {
    document.querySelector('.title').innerHTML = `<h2>${data.Title}</h2>`
    document.querySelector('.country').innerHTML = data.Country
    document.querySelector('.rating').innerHTML = `${data.imdbRating} <i class="fa-solid fa-star"></i>`
    newcol = document.querySelector('.newcol')
    newcol.classList.add('col')
    newcolmargin = document.querySelector('.secondrow')
    newcolmargin.classList.add('mt-5')
    document.querySelector('.released').innerHTML = `Release date: ${data.Released}`
    document.querySelector('.lang').innerHTML = data.Language
    document.querySelector('.director').innerHTML = `Director: ${data.Director}`
    document.querySelector('.runtime').innerHTML = data.Runtime
    document.querySelector('.awards').innerHTML = `Awards: ${data.Awards}`
    document.querySelector('.genre').innerHTML = data.Genre
    document.querySelector('.release').innerHTML = `Released: ${data.Released}`
    document.querySelector('.type').innerHTML = `Type: ${data.Type}`
    document.querySelector('.writer').innerHTML = `Writer: ${data.Writer}`
    document.querySelector('.plot').innerHTML = `Plot: ${data.Plot}`
    document.querySelector('.actors').innerHTML = `Actors: ${data.Actors}`
}
