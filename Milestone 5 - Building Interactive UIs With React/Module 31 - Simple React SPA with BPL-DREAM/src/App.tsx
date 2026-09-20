import { Suspense, useState } from "react";
import Banner from "./components/Banner"
import Nav from "./components/Nav"
import Players from "./components/players/Players";
import type { Iplayer } from "./type/playerType";
import { ToastContainer } from "react-toastify";

const playersFetch = async (): Promise<Iplayer[]> => {
  const res = await fetch('/data.json')
  const data = await res.json();
  return data;
}


function App() {
  // console.log(playersFetch)
  // const playersPromise = playersFetch()
  const [playersPromise] = useState(() => playersFetch());

  const [coin, setCoin] = useState(1500)


  return (
    <>
      <Nav coin={coin} />
      {/* <Banner /> */}
      <Suspense fallback={<h2>Loading........</h2>}>
        <Players playersPromise={playersPromise} coin={coin} setCoin={setCoin} />
      </Suspense>
      <ToastContainer />

      {/* <button className="btn btn-error">Error</button> */}
    </>
  )
}

export default App
