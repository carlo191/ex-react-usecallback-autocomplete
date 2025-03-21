import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

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
      console.log("API");
    } catch (error) {
      console.error(error);
    }
  };
  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), []);

  useEffect(() => {
    debouncedFetchProducts(query);
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
