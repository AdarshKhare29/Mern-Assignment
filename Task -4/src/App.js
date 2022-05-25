import './App.css';
import * as data from './db.json'
import Tree from './components/Tree.js/index.js';
function App() {
  let jsonData=JSON.parse(JSON.stringify(data))
  return (
    <>
    <Tree explorer={jsonData}/>
    </>
    
  );
}

export default App;
