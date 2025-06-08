import { getBackendUrl } from "./github";

const BASE_URL_PLACEHOLDER = 'http://localhost:8000'; // Placeholder, akan diganti

export const uploadFile = async (file, prompt) => {
    const backendUrl = await getBackendUrl() || BASE_URL_PLACEHOLDER;
    const formData = new FormData();
    formData.append('file', file);
    if(prompt) {
      formData.append('prompt', prompt)
    }
    try {
        const response = await fetch(`${backendUrl}/upload`, {
            method: 'POST',
            body: formData,
        });
        return await response.json();
    } catch (error) {
        console.error("Upload error:", error);
        return { error: 'Failed to upload file.' };
    }
};

export const getQuickInsights = async () =>{
    const backendUrl = await getBackendUrl() || BASE_URL_PLACEHOLDER;
    try{
        const response = await fetch(`${backendUrl}/quick-insights`);
        return await response.json();
    } catch (error){
        console.error("Quick Insights error:", error);
        return { error: 'Failed to get quick insights.'};
    }
};
export const visualizeData = async (
    chartType,
    columnX,
    columnY,
    chartTitle
) =>{
    const backendUrl = await getBackendUrl() || BASE_URL_PLACEHOLDER;
    try{
        const response = await fetch(`${backendUrl}/visualize-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipe_grafik: chartType, 
                kolom_x:columnX,
                kolom_y: columnY,
                judul_grafik: chartTitle
            }),
        });
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        return { imageUrl: URL.createObjectURL(blob)};
    } catch(error){
        console.error("Visualize error:", error);
        return { error: 'Failed to visualize data.'};
    }
};


export const askAi = async (prompt) => {
    const backendUrl = await getBackendUrl() || BASE_URL_PLACEHOLDER;
    try {
        const response = await fetch(`${backendUrl}/ask-ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });
        return await response.json();
    } catch (error) {
        console.error("Ask AI error:", error);
        return { error: 'Failed to ask AI.' };
    }
};