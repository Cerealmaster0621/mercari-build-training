import { useState } from 'react';
import './App.css';
import { ItemList } from './components/ItemList';
import { Listing } from './components/Listing';
import SearchBox from './components/SearchBox'

function App() {
  // reload ItemList after Listing complete
  const [reload, setReload] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearch = (keyword:string)=>{
    setSearchKeyword(keyword);
  }
  return (
    <div>
      <header className='Title'>
        <p>
          <b>Simple Mercari</b>
        </p>
      </header>
      <div>
        <Listing onListingCompleted={() => setReload(true)} />
        <SearchBox onSearch={handleSearch}/>
      </div>
      <div>
        <ItemList reload={reload} onLoadCompleted={() => setReload(false)} searchKeyword={searchKeyword} />
      </div>
    </div>
  )
}

export default App;