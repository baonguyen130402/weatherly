import axios from "axios"
import { useEffect, useRef, useState } from "react"

export const getWeatherData = async (city: string) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_KEY}`

  const { data: json } = await axios.get(endpoint)

  const simplifiedData = {
    city: json.city.name,
    country: json.city.country,
    data: json.list.map((el: any, index: number) => {
      const newDate = new Date(el.dt_txt);

      return {
        ...el,
        index: index,
        date: newDate.toDateString(),
        time: newDate.toTimeString(),
      };
    }),
  }

  const groupBy = (array: any[], property: string) => {
    return array.reduce((acc, x) => {
      if (!acc[x[property]]) {
        acc[x[property]] = [];
      }

      acc[x[property]].push(x);

      return acc;
    }, {});
  }

  const groupedData = groupBy(simplifiedData.data, "date");

  const datesAsArray = Object.keys(groupedData).reduce((acc: any[], cur: string) => {
    acc.push({ dateString: cur, data: groupedData[cur] });

    return acc;
  }, []);

  const sortedData = [...datesAsArray].sort(
    (a, b) =>
      new Date(a.dateString).valueOf() - new Date(b.dateString).valueOf()
  );

  return { simplifiedData, sortedData }
}

export const getIcon = (icon: string) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

export const getTime = (dateString: string) => {
  const stringArray = dateString.split(" ");
  const timeStamp = stringArray[0].split(":");
  const time = timeStamp[0] + ":" + timeStamp[1];

  return time;
}

export const convertKelvinToCelsius = (temperature: number) => {
  const cTemperature = temperature - 273;
  const temp = Math.round(cTemperature);
  const formalTemp = temp + "°C";

  return formalTemp;
}

export const convertKelvinToFarenheit = (temperature: number) => {
  const fTemperature = ((temperature - 273.15) * 9) / 5 + 32;
  const temp = Math.round(fTemperature);
  const formalTemp = temp + "°F";

  return formalTemp;
}
