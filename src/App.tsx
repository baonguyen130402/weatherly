import { Flex } from 'antd'
import './App.css'
import { Mainlayout } from './components/Mainlayout'

function App() {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <Flex justify='center' align='center'>
        <Mainlayout />
      </Flex>
    </main>
  )
}

export default App
