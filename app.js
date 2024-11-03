
async function getCityWeather(city) {
  let url = `https://api.weatherapi.com/v1/forecast.json?key=e859a0448431435eaad121257231002&q=${city}`
  
  const response = await fetch(url)
  const data = await response.json()
  
  return data
}

function displayWeather(data) {
  const location = data.location
  const current = data.current
  const hourly = data.forecast.forecastday[0].hour

  console.log(location)
  console.log(current)
  console.log(hourly)

  const result = document.querySelector("#result")
  result.innerHTML = `
  <div id="result">

    <div class="result">

      <h1>Location Weather Forecast</h1>
      
      <div class="result-wrapper">
        <div id="today">
          <h2>Today Weather</h2>
          <div class="today-wrapper">
            <div class="current">
              <div class="outlook">
                <div class="condition">
                  <img src="${current.condition.icon}" alt="">
                  <h4>${current.condition.text}</h4>
                </div>
                <div class="wind">
                  <p>Wind: ${current.wind_kph}</p>
                  <p>Precitation: ${current.precip_in}</p>
                  <p>Pressure: ${current.pressure_in}</p>
                  <h1> ${current.temp_c}C<sup>0</sup></h1>
                </div>

              </div>
              
              <div class="location">
                <h2>Information</h2>
                <table>
                  <tr>
                    <th>Country</th>
                    <td>${location.country}</td>
                  </tr>
                  <tr>
                    <th>Region</th>
                    <td>${location.region}</td>
                  </tr>
                  <tr>
                    <th>Lat/Lon</th>
                    <td>${location.lat} / ${location.lon}</td>
                  </tr>
                  <tr>
                    <th>Datetime</th>
                    <td>${location.localtime}</td>
                  </tr>
                  <tr>
                    <th>Timezone</th>
                    <td>${location.tz_id}</td>
                  </tr>
                </table>
  

                  <div class="hours-wrapper">
                  ${displayWeatherHourly(hourly)}
            </div>

              </div>
            </div>
          </div>
        </div>`
}

function displayWeatherHourly(dataHourly) {
  let dataHourlyHtml = `` 
  
  for (let i = 0; i < dataHourly.length; i++){
    dataHourlyHtml = dataHourlyHtml + `
            <div class="hour">
                <p>${dataHourly[i].time}</p>
                <img src="${dataHourly[i].condition.icon}" alt="">
                <p>${dataHourly[i].temp_c} C<sup>0</sup></p>
              </div>`
  }
  // console.log(dataHourlyHtml)
  return dataHourlyHtml
}


window.addEventListener("DOMContentLoaded", async () => {

  
  console.log("everything is running from here")

  const data = await getCityWeather("Phnom Penh")
  console.log(data)

  displayWeather(data)

  const searchForm = document.querySelector("#searchForm")
  const searchTerm = document.querySelector("#searchTerm")


  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    let city = searchTerm.value
    console.log(city)

    const cityData = await getCityWeather(city)
    console.log(cityData)
    displayWeather(cityData)
  })

})