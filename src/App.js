import React, { useState, useEffect } from 'react';

import { ArchiveBox } from './components/svgs/index';
import './App.css';
import { Stripe, Gmail, Alexa } from './dataset';
import { Engine, Search } from './search-engine';

// Here's the dataset that neeed to be used indexed for the search engine
const dataset = [...Stripe, ...Gmail, ...Alexa].map((text) => ({ text }));
const engine = Engine(dataset);

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = Search(engine, searchQuery);
    setSearchResults(results);
  }, [searchQuery]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Knowd Technical Interview - Novelist</p>
        <div className="container">
          <div className="flex bg-white ">
            <img
              src="https://www.knowd.ai/_next/image?url=%2Flogo.gif&w=32&q=75"
              className="w-10 h-full self-center m-3"
            />
            <input
              className="w-full rounded-t text-black border-0 focus:ring-transparent focus:ring-0 focus:ring-offset-0"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />
          </div>
          <div className="w-full max-h-60 overflow-auto scroll-smooth overflow-x-auto bg-white rounded-b">
            {searchResults.map((item, index) => (
              <a
                href="#"
                key={index}
                className="text-black text-left w-full hover:bg-stone-400 truncate flex"
              >
                <span className="self-center mx-3">
                  <ArchiveBox />
                </span>
                {dataset[item[0]].text}
              </a>
            ))}
          </div>
          <button
            onClick={() =>
              console.log(
                Search(engine, 'email').map((item) => ({
                  text: dataset[item[0]].text,
                  similarity: item[1],
                }))
              )
            }
          >
            Search
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
