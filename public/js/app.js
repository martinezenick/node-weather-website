console.log('Client Side Javascript File is Loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationField = document.querySelector('#LocationField')
const WeatherField = document.querySelector('#WeatherField')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() // Makes browser not refresh

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location ).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            locationField.textContent = data.error
            WeatherField.textContent = ''
        }
        else {
        locationField.textContent = data.location
        WeatherField.textContent = data.weather
        
        }
    })
})
})