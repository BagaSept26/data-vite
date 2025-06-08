export const getBackendUrl = async () => {
  try {
    const githubRawUrl = 'https://raw.githubusercontent.com/BagaSept26/data-vite/main/backend.txt';
    const response = await fetch(githubRawUrl);
    if (!response.ok) {
      console.error(`Failed to fetch backend URL from GitHub: ${response.status} ${response.statusText}`);
      return null;
    }
    const text = await response.text();
    return text.trim();
  } catch (error) {
    console.error("Error fetching backend URL:", error);
    return null;
  }
};