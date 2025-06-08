export const getBackendUrl = async () => {
  try {
    const githubRawUrl = 'https://raw.githubusercontent.com/<nama_user_github>/<nama_repo_anda>/main/backend.txt'; // Ganti dengan URL raw file Anda
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