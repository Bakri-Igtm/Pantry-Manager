export const preprocessImage = (imageData) => {
    // Extract the base64 part of the data URL
    const base64Image = imageData.split(',')[1];
    // Construct the data URL
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;
    return dataUrl;
  };
  