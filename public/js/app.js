console.log('Client side js file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMessage = document.querySelector('#m-1')
const forecastMessage = document.querySelector('#m-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    locationMessage.textContent = 'Loading...'
    forecastMessage.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                locationMessage.textContent = data.location
                forecastMessage.textContent = data.latitude + ' Latitude, ' + data.longitude + ' Longitude'
            }  
        })
    })
})