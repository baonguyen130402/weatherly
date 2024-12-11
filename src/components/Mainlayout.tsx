import { useState } from "react"

import { Button, Col, Flex, Image, Input, Row, Space } from "antd"

import Logo from "/logo.png"

import { WeatherCard } from "./WeatherCard"
import { RenderIf } from "../lib/RenderIf"
import { getWeatherData } from "../lib/Helper"
import { SystemOfUnitsMenu } from "./SystemOfUnitsMenu"


export const Mainlayout = () => {
  const [city, setCity] = useState("" as string)
  const [unit, setUnit] = useState("" as string)
  const [location, setLocation] = useState({
    city: "",
    country: ""
  })
  const [weatherData, setWeatherData] = useState([] as any[])

  const handleButtonClick = async (city: string) => {
    const { sortedData: data, simplifiedData } = await getWeatherData(city)

    setWeatherData(data)
    setLocation({
      city: simplifiedData.city,
      country: simplifiedData.country
    })
  }

  console.log(weatherData)

  const setUnitFromChildComponet = (value: string) => setUnit(value)

  return (
    <main id="main-layout" style={{ width: "100vw", height: "100vh", padding: 12 }}>
      <Flex justify='center' align='center' gap={30} vertical>
        <Row gutter={16}>
          <Col span={24}>
            <Space align="center">
              <Image
                width={60}
                src={Logo}
                alt="Weatherly logo"
                preview={false}
              />
              <h1 style={{ fontSize: 60, margin: 0 }}>WEATHERLY</h1>
            </Space>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center" }} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24}>
            <Flex style={{ width: "100vw" }} justify="center" align="center" vertical>
              <Flex style={{ width: "25%", marginBottom: 8 }} justify="center" align="center" gap={4}>
                <Input onChange={(event) => setCity(event.target.value)} placeholder="Your City Name..." />
                <Button style={{ borderColor: "white", borderWidth: "1px" }} type="primary" variant="outlined" onClick={() => handleButtonClick(city)}>Get Weather Forecast</Button>
              </Flex>
              <SystemOfUnitsMenu setUnitFromChildComponent={setUnitFromChildComponet} />
            </Flex>
          </Col>
          <Flex vertical>
            <RenderIf isTrue={weatherData.length !== 0 ? true : false}>
              <h1 style={{ textAlign: "left" }}>{location.city}, {location.country}</h1>
            </RenderIf>
            <Flex justify="center" align="start" gap={6}>
              {weatherData.map((el, key) => (
                <Row key={key}>
                  <Col span={24}>
                    <WeatherCard dateString={el.dateString} data={el.data} unit={unit} />
                  </Col>
                </Row>
              ))
              }
            </Flex>
          </Flex>
        </Row>
      </Flex>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </main>
  )
}

let temp = document.getElementById('card')
console.log(temp)
