"use client";
import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import Current from "./components/Current";
import WeatherDetails from "./components/WeatherDetails";
import WeekForeCast from "./components/WeekForeCast";
import LandingPage from "../app/components/LandingPage"
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const API_kEY = "3b87a12458d54c95a82182922230612";
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_kEY}&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Could not fetch weather");
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
        AOS.refresh();
      } catch (error: any) {
        setError("city not found");
        setData("");
        AOS.refresh();
      }
    }
  };

  useEffect(()=>{
    AOS.init({
        duration: 1500,
    });
    
},[]);
  
  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <LandingPage />
    );
  } else if (error !== "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <p className="text-3xl font-bold mb-4">City Not Found</p>
        <p className="text-xl">Enter A Valid City</p>
      </div> 
    );
  } else {
    content = (
      <>
        <div data-aos="fade-right" className="flex md:flex-row flex-col p-12 items-center justify-between">
          <Current data={data} />
          <WeekForeCast data={data} />
        </div>
        <div>
          <WeatherDetails data ={data}  />
        </div>
      </>
    );
  }


  return (
    <>
      <div
        className="bg-cover  bg-gradient-to-r  from-blue-500 to-blue-300
     h-fit "
      >
        <div className="bg-white/25 w-full  flex flex-col h-fit">
          {/* INPUT AND LOGO */}
          <div
            className=" flex flex-col md:flex-row
           justify-between items-center p-12"
          >
            <Input handleSearch ={handleSearch} setLocation={setLocation} />
            <h1
              className=" mb-8 md:mb-0 order-1 text-white py-2 px-4
            rounded-xl italic font-bold"
            >
              Weather App
            </h1>
          </div>
          {content}
        </div>
      </div>
    </>
  );
}
