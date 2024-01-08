import React, { useState, useRef, useEffect } from "react";
import { useGetSynonyms } from "./hooks/useGetSynonyms";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const { isLoading, synonyms, getSynonyms } = useGetSynonyms();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    getSynonyms(word);
  };

  const scrollRef = useRef<number | null>(null);

  const handleSynonymClicked = (newWord: string) => {
    setFormSubmitted(true);
    setWord(newWord);
    getSynonyms(newWord);
    scrollRef.current = window.scrollY;
  };

  // Function to scroll to the synonyms list
  useEffect(() => {
    if (scrollRef.current !== null) {
      window.scrollTo(0, scrollRef.current); // Restore scroll position
    }
  }, [synonyms]);

  const hasSynonyms = synonyms.length > 0;

  return (
    <div className="App m-12 text-left">
      <h1 className="mb-16 font-medium text-left text-3xl">
        Find Synonyms and Similar Words
      </h1>
      <div className="mb-32 sm:mb-32 text-4xl min-[480px]:text-6xl">
        📙 &nbsp; ↦ &nbsp; 📚📚📚
      </div>
      <h3 className="text-left text-lg mb-8">
        Input a word below, then press
        <span className="font-semibold text-base text-gray-500">
          &nbsp;Return/Enter{" "}
        </span>
        or click the Submit button and get a list of related words.
      </h3>
      {word && (
        <div>
          <br />
        </div>
      )}
      <form onSubmit={handleFetchSynonyms}>
        <div className="relative text-left">
          <input
            id="word-input"
            onChange={(e) => setWord(e.target.value)}
            value={word}
            placeholder="Enter word"
            required
            className="
            peer 
            placeholder-transparent
            text-left
            h-10
            text-sm
            text-gray-900
            bg-amber-50 
            border 
            rounded-md 
            border-gray-300 
            hover:border-violet-300 
            focus:border-violet-500
            "
          />
          <label
            htmlFor="word-input"
            className="
              absolute 
              -top-8
              left-0
              peer-placeholder-shown:mt-0
              peer-placeholder-shown:font-medium 
              peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:top-2
              peer-placeholder-shown:left-4
              text-sm
              font-medium
              text-teal-800
              dark:text-teal-400
              transition-all
            "
          >
            Input word
          </label>
          <button
            className="
              mt-8
              min-[391px]:mt-0 
              min-[391px]:ml-4 
              h-10 
              w-32 
              text-lime-50 
              bg-violet-600 
              rounded-md 
              hover:text-lime-50 
              hover:bg-violet-700 
              hover:border-violet-700 
              focus:border-teal-400 
              focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {hasSynonyms ? (
            <div className="text-left m-5">
              <br className="mt-5" />
              <hr className="-ml-5" />
              <div className="flex items-center -ml-8 -mt-4">
                <span className="text-8xl"> &nbsp;⬐</span>
                <h3 className="font-semibold text-2xl">
                  &nbsp; &nbsp; &nbsp; Results!
                </h3>
              </div>

              <ol className="text-left inline-block cursor-pointer">
                {synonyms.map((synonym, index) => (
                  <li
                    className="list-decimal"
                    key={index}
                    onClick={() => handleSynonymClicked(synonym.word)}
                  >
                    <p className="text-blue-500">&nbsp;{synonym.word}</p>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            formSubmitted &&
            word && (
              <div className="mt-5 text-left text-sm text-red-600">
                There are no matches for your word in the database.
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

export default App;
