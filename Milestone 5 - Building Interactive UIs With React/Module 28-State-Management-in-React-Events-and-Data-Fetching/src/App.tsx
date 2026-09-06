
import { Suspense } from 'react'
import './App.css'
// import Batter from './Batter'
// import Cart  from './Cart'
// import Counnter from './Counter'
import Users from './Users'
import Posts from './Post';
import Todos from './Todos';





const usersDataPromise = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  return data;
}


const postDataPromise = async () => {
  const res = await fetch ('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return data;
}


function App() {

  // function handleClick() {
  //   alert('Button Clicked')
  // }

  // const handleAddToCard = (id) => {
  //   alert('buying item' + id)
  // }


  return (
    <>
      {/* <button onClick='handleClick()'>Click Me</button> */}
      {/* <button onClick={handleClick}>Click Me 2</button>
      <button onClick={handleClick}>Click Me 3</button>

      <button onClick={() => alert('Click 4')}>Click Me 4</button>

      <button onClick={() => handleAddToCard(65)}>Buy this</button> */}
      {/* <Cart></Cart> */}

      {/* <Counnter></Counnter>
      <Batter></Batter> */}
      <Suspense fallback={<p>Loading...</p>}>
        <Users usersDataPromise={usersDataPromise()}></Users>
      </Suspense>
      <Suspense fallback={<p>Loading Posts Data...</p>}>
        <Posts postDataPromise = {postDataPromise()}></Posts>
      </Suspense>

      <Todos></Todos>



    </>
  )
}

export default App


/**
 * 1. componenet
 * 2. jsx (c0nditional renderiong, list render)
 * 3. props
 * 4. event
 * 5. state
 * 6. data loading ( use )
 * 
*/