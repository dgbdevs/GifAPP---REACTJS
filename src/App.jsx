import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState()
  const [tipo, setTipo] = useState('gifs')
  const [selected,setSelected]=useState([])

  //Funcion para buscar gif en GiPHY
  const buscarGif = () => {
    fetch(`https://api.giphy.com/v1/${tipo}/search?api_key=${import.meta.env.VITE_API_GIPHY}&q=${search}&limit=15&offset=0&rating=g&lang=es`)
      .then(response => response.json())
      .then(data => setData(data))
  }

  //Cambio de parametro de busqueda Switch
  const cambiarTipo = () => {
    if (document.getElementsByName('tipo')[0].checked) {
      setTipo('stickers')
    } else {
      setTipo('gifs')
    }
  }

  //ejecuto la funcion cuando cambia search o tipo
  useEffect(() => {
    buscarGif();
  }, [search, tipo])

  
  //Borro el gif cargado
  const delSelected = (i) =>{
    let arr = selected
    arr.splice(i,1)
    setSelected(arr)
   
  }

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
      <hr></hr>
      <div className='gif-container'>
      {data ?
        data.data.map((d, index) => {
          return (
            /* onClick cargo gifs a selected */
            <div key={index}   className='resultImg' onClick={()=>setSelected([...selected,d.images.fixed_height_small.url])}>
              <img               
                src={d.images.fixed_height_small.url}
                               
              ></img>
            </div>
          )
        })
        :
        <></>
      }
      </div> 
      <hr></hr>
      <div >
        {selected?
        <div className='gif-container'>
          {/* MUESTRO GIF SELECCIONADOS */}
          {selected.map((s,index)=>{
             return (
              <div  className='resultImg' onClick={()=>delSelected(index)}>
                <img               
                  src={s}
                  key={index}                
                ></img>
              </div>
            )

          })}
        </div>
        :
        <></>  
      }  
      </div>     
    </div>
  )
}

export default App
