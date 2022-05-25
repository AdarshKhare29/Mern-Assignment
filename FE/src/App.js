import './App.css';
import UserData from './components/UserData';
import {useState} from 'react'
import AlbumData from './components/AlbumData';
function App() {
  return (
    <>
    <UserData showAlbum={showAlbum} setShowAlbum={setShowAlbum}/>
    </>
  );
}
export default App;
