import { Button, Col, Flex, Input, Row } from "antd"
import { getWeatherData } from "../lib/Helper"
import { useState } from "react"
import { WeatherCard } from "./WeatherCard"
import { SystemOfUnitsMenu } from "./SystemOfUnitsMenu"
import { RenderIf } from "../lib/RenderIf"

export const Mainlayout = () => {
  const [city, setCity] = useState("" as string)
  const [unit, setUnit] = useState("" as string)
  const [location, setLocation] = useState({
    city: "",
    country: ""
  })
  const [weatherData, setWeatherData] = useState([] as any[])

  console.log(weatherData)

  const handleButtonClick = async (city: string) => {
    const { sortedData: data, simplifiedData } = await getWeatherData(city)

    setWeatherData(data)
    setLocation({
      city: simplifiedData.city,
      country: simplifiedData.country
    })
  }

  const setUnitFromChildComponet = (value: string) => setUnit(value)

  return (
    <Row style={{ justifyContent: "center" }}>
      <Row>
        <Col span={24}>
          <Flex style={{ marginBottom: "90px", width: "100vw" }} justify="center" align="center" vertical>
            <Flex style={{ width: "40%" }} justify="center" align="center" gap={4}>
              <Flex justify="space-around" align="center" gap={4}>
                <p>City: </p>
                <Input onChange={(event) => setCity(event.target.value)} placeholder="Your City..." />
              </Flex>
              <Button type="primary" variant="outlined" onClick={() => handleButtonClick(city)}>Get Weather Forecast</Button>
            </Flex>
            <SystemOfUnitsMenu setUnitFromChildComponent={setUnitFromChildComponet} />
          </Flex>
        </Col>
      </Row>
      <RenderIf isTrue={weatherData.length !== 0 ? true : false}>
        <h1>{location.city}, {location.country}</h1>
      </RenderIf>
      <Flex justify="center" align="start" gap={6}>
        {weatherData.map((el) => (
          <Row>
            <Col span={24}>
              <WeatherCard dateString={el.dateString} data={el.data} unit={unit} />
            </Col>
          </Row>
        ))
        }
      </Flex>
    </Row>
  )
}
