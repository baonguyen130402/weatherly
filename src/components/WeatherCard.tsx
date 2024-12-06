import { Card, Flex, Image } from "antd";

import humidityIcon from "../icons/humidity.svg";
import thermometerIcon from "../icons/thermometer.svg";
import { convertKelvinToCelsius, convertKelvinToFarenheit, getIcon, getTime } from "../lib/Helper";

interface IWeatherCard {
  dateString: string;
  data: any[];
  unit: string;
}

export const WeatherCard = (props: IWeatherCard) => {
  const { dateString, data, unit } = props

  return (
    <Card id="card">
      <h3 style={{ color: "black" }}> {dateString} </h3>
      <>
        {data.map((el) => {
          return (
            <Flex style={{ width: "100%" }} justify="space-between" align="center">
              <Flex justify="space-around" align="center">
                <div>
                  <p>{getTime(el.time)}</p>
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
                <p>{el.main.humidity}%</p>
              </Flex>
              <Flex justify="space-around" align="center">
                <Image
                  style={{ marginTop: -20 }}
                  width={15}
                  src={thermometerIcon}
                  alt="Weather icon"
                  preview={false}
                />
                <p>{(unit === "celsius") ? convertKelvinToCelsius(el.main.temp) : convertKelvinToFarenheit(el.main.temp)}</p>
              </Flex>
            </Flex>
          );
        })}
      </>
    </Card >
  )
}
