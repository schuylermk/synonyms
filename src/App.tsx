import { useState } from "react";
import "./App.css";

type Synonym = {
  word: string;
  score: number;
};

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);

  const fetchSynonyms = (word: string) => {
    fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
      .then((response) => response.json())
      .then(setSynonyms);
  };

  const handleGettingSynonyms = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSynonyms(word);
  };

  const handleSynonymClicked = (newWord: string) => {
    setWord(newWord);
    fetchSynonyms(newWord);
  };

  return (
    <div className="App">
      <form className="mb-8" onSubmit={handleGettingSynonyms}>
        <label htmlFor="word-input">Your word</label>
        <input
          value={word}
          className="ml-4"
          onChange={(e) => setWord(e.target.value)}
          id="word-input"
        />
        <button className="ml-4">Submit</button>
      </form>

      {synonyms.map((synonym) => (
        <p
          onClick={() => handleSynonymClicked(synonym.word)}
          key={synonym.word}
        >
          {synonym.word}
        </p>
      ))}
    </div>
  );
}

export default App;
