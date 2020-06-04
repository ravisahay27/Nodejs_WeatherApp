
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    const location = search.value
    console.log("Searched location" + location)

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                // messageOne.textContent = data.error.info
            }
            else {
                console.log(data)
                 messageOne.textContent = data.Location
                 messageTwo.textContent = data.Weather
                
            }

        })
    })

})