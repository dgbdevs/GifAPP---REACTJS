import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState()
  const [tipo, setTipo] = useState('stickers')

  const buscarGif = async () => {
    fetch(`https://api.giphy.com/v1/${tipo}/search?api_key=${import.meta.env.VITE_API_GIPHY}&q=${search}&limit=10&offset=0&rating=g&lang=es`)
      .then(response => response.json())
      .then(data => setData(data))
  }

  const cambiarTipo = () => {
    if (document.getElementsByName('tipo')[0].checked) {
      setTipo('gifs')
    } else {
      setTipo('stickers')
    }
  }

  useEffect(() => {
    buscarGif();
  }, [search, tipo])



  return (
    <div className="App">
      <div className='title'>
        <input
          onChange={(e) => setSearch(e.target.value)}
        >
        </input>
        <div className='switch-container'>
          <label>Gifs</label>
          <label className='switch'>
            <input type='checkbox' name='tipo' onChange={() => cambiarTipo()}></input>
            <span className='spanbtn' />
          </label>
          <label>Stickers</label>
        </div>
      </div>

      <h2>{search}</h2>
      {data ?
        data.data.map((d, index) => {
          return (
            <img src={d.images.fixed_height_small.url} key={index}></img>
          )
        })
        :
        <></>
      }
    </div>
  )
}

export default App
