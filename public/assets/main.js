const API = "api/"


function saveToken(token, name) {
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
}

function getToken() {
  return localStorage.getItem("token");
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  location.href = "index.html";
}

async function apiFetch(url, options = {}) {
  const token = getToken(); // Make sure this function gets the token from localStorage
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options
  };
  
  // Add Authorization header if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(API + url, config);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}