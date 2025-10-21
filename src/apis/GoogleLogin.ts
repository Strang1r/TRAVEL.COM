const BASE_URL = "https://www.googleapis.com/oauth2/v3";
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const SCOPE =
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
const RESPONSE_TYPE = "token";
const PROMPT = "consent";

export const getGoogleAuthURL = (): string => {
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}&prompt=${PROMPT}`;
};

export const getGoogleUserInfo = async (accessToken: string) => {
  const response = await fetch(`${BASE_URL}/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Google API Error:", data);
    throw new Error(data.error?.message || "Failed to fetch user info");
  }
  return data;
};

