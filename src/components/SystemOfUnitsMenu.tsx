import { Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from '@ant-design/icons'

export const SystemOfUnitsMenu = (props: any) => {
  const { setUnitFromChildComponent: setUnit } = props

  const items: MenuProps['items'] = [
    {
      label: (
        <a
          onClick={() => setUnit("celsius")}
          target="_blank" rel="noopener noreferrer">
          Celsius (°C)
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a
          onClick={() => setUnit("farenheit")}
          target="_blank" rel="noopener noreferrer">
          Farenheit (°F)
        </a>
      ),
      key: '1',
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space className="systemUnit">
          CHOOSE YOUR SYSTEM OF UNITS
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}
