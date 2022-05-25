import './App.css';
import UserData from './components/UserData';
import {useState} from 'react'
import AlbumData from './components/AlbumData';
function App() {
  const[showAlbum,setShowAlbum]=useState(false)

  return (
    <>
    <UserData showAlbum={showAlbum} setShowAlbum={setShowAlbum}/>
    {showAlbum && <AlbumData/>}
    </>
  );
}
export default App;