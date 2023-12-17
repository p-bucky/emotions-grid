const EMOTION_COLOR_CODES = {
  happy: { id: 1, code: "#FFD700", label: "Happy" },
  sad: { id: 2, code: "#6495ED", label: "Sad" },
  cry: { id: 3, code: "#4682B4", label: "Cry" },
  angry: { id: 4, code: "#FF6347", label: "Angry" },
  nostalgia: { id: 5, code: "#FFDAB9", label: "Nostalgia" },
};

const URLS = {
  GET_POSTS: "https://wyvhbxxxvqzeewyjlgku.supabase.co/rest/v1/posts?select=*",
  POST_POSTS: "https://wyvhbxxxvqzeewyjlgku.supabase.co/rest/v1/posts"
};
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dmhieHh4dnF6ZWV3eWpsZ2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI3NTIzMTIsImV4cCI6MjAxODMyODMxMn0.-ActYIe7qnbTznFf-RXYHfunkJ2U4AwU_nt5r0LT8oA";
