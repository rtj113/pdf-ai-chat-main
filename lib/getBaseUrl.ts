const getBaseUrl = () =>
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://pdf-to-ai-chat.vercel.app";
  
  export default getBaseUrl;