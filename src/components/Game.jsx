import Brahiozavr from '../images/brahiozavr.png'
import Paherinozavr from '../images/paherinozavr.png'
import Spinosaurus from '../images/spinosaurus.png'
import Triceratop from '../images/triceratop.png'
import Cover from '../images/cover.png'


import { useEffect, useState } from 'react'
import   './Game.css'



const initialArrayCards = [
      {id:1, img:Brahiozavr},
      {id:2, img:Paherinozavr},
      {id:3, img:Spinosaurus},
      {id:4, img:Triceratop}     
]



const Game = () => {

  const [arrayCards, setArrayCards] = useState([])
  const [oppenCards, setOppenCards] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)

  const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards]

  const shuffle = (array) => {
    let currentindex = array.length,
      temporaryValue,
      randomIndex

      while (currentindex !== 0) {
        randomIndex = Math.floor(Math.random() * currentindex)
        currentindex -= 1

        temporaryValue = array[currentindex]
        array[currentindex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      return array
}

  useEffect(() => {
  setArrayCards(shuffle(pairOfArrayCards))
  },[])

  const flipCard = (index) => () => {
    setOppenCards(opened => [...opened, index])
    setMoves(prevMove => prevMove + 1)
  }
 
  useEffect(() => {
    if (oppenCards < 2) return
    const firstMatched = arrayCards[oppenCards[0]]
    const secondMatched = arrayCards [oppenCards[1]]

    if (secondMatched && firstMatched.id === secondMatched.id){
      setMatched([...matched,firstMatched.id])
    }

    if (oppenCards.length === 2) setTimeout(() => setOppenCards([]),1000)

  },[oppenCards])
 
  return (
    <div className='container'>
      <p className='quantity-moves'>Сделано ходов { moves}</p>
      <div className='cards'>
        {arrayCards.map((item,index) =>{
          let isFlipped = false

          if(oppenCards.includes(index)) isFlipped = true
          if (matched.includes(item.id)) isFlipped = true

          return(
            <div key={index} className={`card ${isFlipped ? 'flipped' : ''}`}
              onClick={flipCard(index)}>
              <div className='inner'>
                <div className='front'>
                  <img src={item.img} width="200px"/>
                </div>
                <div className='back'>
                  <img src={Cover}/>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Game