import Header from './components/header/Header'

function App() {
  const date = new Date(Date.now())

  return (
    <>
      <Header 
        city={'São Paulo'}
        state={'SP'}
        date={date}
      />
    </>
  )
}

export default App
