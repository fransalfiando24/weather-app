import React, {useState, useEffect} from 'react'
import './weatherStyles.css'
import Clear from'../assets/Clear.jpg'
import Cloudy from'../assets/Clouds.jpg'
import Rain from'../assets/Rain.jpg'
function WeatherComponent() {
    const [dataWeather, setWeather] = useState([]);
    const [location, setLocation] = useState("");
    const [weatherDesc, setWeatherDesc] = useState("Clear");
    const [isShow, setIsShow] = useState(false);


    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}`;
    const getWeather = async(event) => {
        if (event.key === 'Enter'){
            setIsShow(true);
            const api = await fetch(baseURL);
            const data = await api.json();
            // console.log(data);
            setWeather(data);
            setWeatherDesc(data.weather[0].main);
        }
        setLocation('');
    }

    // useEffect(() => {
    //     getWeather();
    // },[])
    return (
        <div className="background" 
            style={ weatherDesc == "Clouds" ? {backgroundImage: `url(${Cloudy})`} :
                    weatherDesc == "Rain" ? {backgroundImage: `url(${Rain})`} :
                    {backgroundImage: `url(${Clear})`}
            }>
            <div className="container"> 
                <div className={!isShow ? 'search not-show' : 'search'}>
                    <input type="text" 
                            placeholder="Enter Location" 
                            onChange={e =>setLocation(e.target.value)}
                            onKeyPress={getWeather}
                />
                </div>
                { dataWeather.length === 0 ? 
                    <div className={isShow ? 'welcome' : 'welcome not-show'}>
                        <h1>Welcome to Weather App</h1>
                        <p>You can input the location for check the weather.</p><br/>
                        <p style={{fontSize: '1rem'}}>Fran's Alfiando 2022.</p>
                    </div> :
                    <>
                        <div className="top">
                            <div className="location">
                                {dataWeather.name ? <p>{dataWeather.name}</p> : 'Location not Found. Please insert again !' }
                            </div>
                            <div className="temp">
                                {dataWeather.main ? <h1>{dataWeather.main.temp.toFixed()}°F</h1> : null}
                                {dataWeather.weather ? <img src={"http://openweathermap.org/img/wn/" + dataWeather.weather[0].icon + "@2x.png"}/> : null }
                            </div>
                            <div className="descriptions">
                                {dataWeather.main ? <p>{dataWeather.weather[0].main}</p> : null }
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="feels">
                                {dataWeather.main ? <p className='data'>{dataWeather.main.feels_like.toFixed()}°F</p> : null }
                                <p>Feels Like</p>
                            </div>
                            <div className="humadity">
                                {dataWeather.main ? <p className='data'>{dataWeather.main.humidity}%</p> : null }
                                <p>Humidity</p>
                            </div>
                            <div className="wind">
                                {dataWeather.wind ?<p className='data'>{dataWeather.wind.speed} MPH</p> : null }
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </>
                }  
            </div>
        </div>
    )
}

export default WeatherComponent
