export const API_URL = "http://localhost:8805";
export const SORT_OPTIONS = [
  { value: "_sort=difficulty", text: "возрастанию сложности", key: "difficulty_asc" },
  { value: "_sort=-difficulty", text: "убыванию сложности", key: "difficulty_desc" },
  { value: "_sort=status", text: "выполненным задачам", key: "status_asc" },
  { value: "_sort=-status", text: "невыполненным задачам", key: "status_desc" },
];

export const COUNT_OF_PAGES_OPTIONS = [
  { value: "10", text: "10", key: "10" },
  { value: "20", text: "20", key: "20" },
  { value: "50", text: "50", key: "50" },
  { value: "100", text: "100", key: "100" },
];

export const DEFAULT_PER_PAGE = 10;

export const AUTH_STORAGE = "authKey";
