import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

import { ArchiveBox } from './components/svgs/index';
import './App.css';
import { Stripe, Gmail, Alexa } from './dataset';

const dataset = [...Stripe, ...Gmail, ...Alexa].map((text) => ({ text }));

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fuse = new Fuse(dataset, {
      keys: ['text'],
      includeScore: true,
      threshold: 0.6,
    });

    const results = searchQuery ? fuse.search(searchQuery) : [];
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
                {item.item.text}
              </a>
            ))}
          </div>
          <button>Search</button>
        </div>
      </header>
    </div>
  );
}

export default App;
