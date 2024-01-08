const API_URL = import.meta.env.VITE_API_URL;

export const fetchSynonyms = (word: string) => {
    return fetch(`${API_URL}/words?rel_syn=${word}`)
    .then((response) => response.json());
  };
