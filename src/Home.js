import React, { useEffect, useState } from 'react'
import searchImage from './images/search.png'
import './style.css'
import weather from './images/cloudy.png'
import humidity from './images/humidity.png'
import wind from './images/wind1.png'
import rain from './images/rain.png'
import drizzle from './images/drizzle.png'
import mist from './images/mist.png'
import clear from './images/clear-sky.png'
import axios from 'axios'


function Home() {
    const[data,setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: weather
    })
    const[name, setName] = useState('');

    const handleClick = () => {
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=174683c1f297b6ae29e039a626abfaaf&units=metric`;
        axios.get(apiUrl)
        .then(res => {
            let imagePath = '';
            if((res.data.weather[0]).main == "Clouds") {
                imagePath = weather
            } 
            else if(res.data.weather[0].main == 'Clear') {
                imagePath = clear
            }else if(res.data.weather[0].main == 'Rain') {
                imagePath = rain
            } else if(res.data.weather[0].main == 'Drizzle') {
                imagePath = drizzle
            } else if(res.data.weather[0].main == 'Mist') {
                imagePath = mist
            } else{
                imagePath = weather
            }
            console.log(res.data);
            setData({...data,celcius: res.data.main.temp,name: res.data.name, 
            humidity: res.data.main.humidity, speed: res.data.wind.speed , image: imagePath})
        })
        .catch(err => console.log(err));
        }
    }
  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
            <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)}/>
            <button><img src={searchImage} onClick={handleClick} alt=''/></button>
        </div>
        <div className='winfo'>
            <img src={data.image} alt='' />
            <h1>{data.celcius}°c</h1>
            <h2>{data.name}</h2>
            <div className='details'>
                <div className='col'>
                    <img src={humidity} alt='' />
                    <div className='humidity'>
                        <p>{data.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className='col'>
                <img src={wind} alt='' />
                    <div className='wind'>
                        <p>{Math.round(data.speed)} km/h</p>
                        <p>Wind</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home












