import { Card, Flex, Image } from "antd";

import humidityIcon from "../icons/humidity.svg";
import thermometerIcon from "../icons/thermometer.svg";
import { convertKelvinToCelsius, convertKelvinToFarenheit, getIcon, getTime } from "../lib/Helper";
import clsx from "clsx";

interface IWeatherCard {
  dateString: string;
  data: any[];
  unit: string;
}

export const WeatherCard = (props: IWeatherCard) => {
  const { dateString, data, unit } = props

  return (
    <>
      <h3 style={{ color: "white", textAlign: "center", cursor: "default" }}> {dateString} </h3>
      <Card id="card" bodyStyle={{ paddingTop: 0, paddingBottom: 0 }} style={{ overflow: "hidden", cursor: "default", background: "#ccc" }}>
        <>
          {data.map((el, key) => (
            <Flex
              key={key}
              style={{ width: "122%", marginLeft: "-25px", paddingLeft: 8, paddingRight: 8 }}
              justify="space-between"
              align="center"
              className={clsx(
                { "lightRain": el.weather[0].description === "light rain" },
                { "overcastClouds0": el.weather[0].description === "overcast clouds" && Number(getTime(el.time).split(":")[0]) === 0 },
                { "overcastClouds3": el.weather[0].description === "overcast clouds" && Number(getTime(el.time).split(":")[0]) === 3 },
                { "overcastClouds6": el.weather[0].description === "overcast clouds" && Number(getTime(el.time).split(":")[0]) === 6 },
                { "overcastClouds9": el.weather[0].description === "overcast clouds" && Number(getTime(el.time).split(":")[0]) === 9 },
                { "overcastClouds12": el.weather[0].description === "overcast clouds" && Number(getTime(el.time).split(":")[0]) === 12 },
                { "overcastClouds9": el.weather[0].description === "overcast clouds" && Number(getTime(el.time).split(":")[0]) === 15 },
                { "overcastClouds18": el.weather[0].description === "overcast clouds" && Number(getTime(el.time).split(":")[0]) === 18 },
                { "overcastClouds21": el.weather[0].description === "overcast clouds" && Number(getTime(el.time).split(":")[0]) === 21 },
                { "brokenClouds": el.weather[0].description === "broken clouds" },
              )}>
              <Flex justify="space-around" align="center">
                <div>
                  <p style={{ fontWeight: "bold" }}>{getTime(el.time)}</p>
                </div>
                <Image
                  width={30}
                  src={getIcon(el.weather[0].icon)}
                  alt="Weather icon"
                  preview={false}
                />
              </Flex>
              <Flex justify="space-around" align="center" gap={4}>
                <Image
                  style={{ marginTop: -20 }}
                  width={12}
                  src={humidityIcon}
                  alt="Weather icon"
                  preview={false}
                />
                <p style={{ fontWeight: "600" }}>{el.main.humidity}%</p>
              </Flex>
              <Flex justify="space-around" align="center">
                <Image
                  style={{ marginTop: -20 }}
                  width={15}
                  src={thermometerIcon}
                  alt="Weather icon"
                  preview={false}
                />
                <p style={{ fontWeight: "600" }}>{(unit === "celsius") ? convertKelvinToCelsius(el.main.temp) : convertKelvinToFarenheit(el.main.temp)}</p>
              </Flex>
            </Flex>
          )
          )}
        </>
      </Card >
    </>
  )
}
