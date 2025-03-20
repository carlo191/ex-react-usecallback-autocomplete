import { useEffect, useState } from "react";

import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [suggerimenti, setSuggerimenti] = useState([]);

  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setSuggerimenti([]);
      return;
    }
    try {
      const response = await fetch(
        `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`
      );
      const data = await response.json();
      setSuggerimenti(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts(query);
  }, [query]);

  return (
    <>
      <input
        type="text"
        placeholder="Cerca"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggerimenti.length > 0 && (
        <ul>
          {suggerimenti.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
