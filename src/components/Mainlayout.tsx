import { useState } from "react"

import clsx from "clsx"

import { Button, Col, Flex, Image, Input, Row, Space } from "antd"

import Logo from "/logo.png"

import { WeatherCard } from "./WeatherCard"
import { RenderIf } from "../lib/RenderIf"
import { SystemOfUnitsMenu } from "./SystemOfUnitsMenu"
import { getCurrentTime, getWeatherData } from "../lib/Helper"


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

  const currentTime = Number(getCurrentTime().split(":")[0])

  const setUnitFromChildComponet = (value: string) => setUnit(value)

  console.log()

  const getClassName = (currentTime: number) => {
    if (currentTime >= 6 && currentTime <= 11) {
      return "main-layout morning"
    }

    if (currentTime >= 12 && currentTime <= 15) {
      return "main-layout midday"
    }

    if (currentTime >= 16 && currentTime <= 18) {
      return "main-layout evening"
    }

    if (currentTime >= 19 && currentTime <= 23 || currentTime >= 0 && currentTime <= 5) {
      return "main-layout night"
    }
  }

  const className = getClassName(currentTime)

  return (
    <main className={className} style={{ width: "100vw", height: "100vh", padding: 12 }}>
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
              <Space>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 32, height: 32 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <h1 style={{ textAlign: "left", fontSize: 36, cursor: "default" }}>{location.city}, {location.country}</h1>
              </Space>
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
