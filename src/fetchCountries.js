//делает запрос на бекенд------------


export default function fetchCountries(searchQuery) {
return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
        const countries = response.json()
        console.log(countries)
        return countries;
    })
    .catch(error=>console.log(error))
}




    



