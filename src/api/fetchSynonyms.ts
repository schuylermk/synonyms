const API_URL = import.meta.env.VITE_API_URL;

// const THESAURUS_API_KEY = 'bc5bfaa4-c15f-4019-95b8-fc5a873804d1';

// const dictKey = '46a4037a-8959-4a0c-bf68-ced57c628c6d';


export const fetchSynonyms = (word: string) => {
    return fetch(`${API_URL}/words?rel_syn=${word}`)
    .then((response) => response.json());
};