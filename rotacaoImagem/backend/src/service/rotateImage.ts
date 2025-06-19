import path from "path";
import { Image } from "image-js";

function rotateImage90(image: Image): Image {
  const { width, height } = image;
  const newImage = new Image(height, width);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = image.getPixelXY(x, y);
      newImage.setPixelXY(height - 1 - y, x, pixel);
    }
  }
  return newImage;
}

function rotateImage180(image: Image): Image {
  const { width, height } = image;
  const newImage = new Image(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = image.getPixelXY(x, y);
      newImage.setPixelXY(width - 1 - x, height - 1 - y, pixel);
    }
  }
  return newImage;
}

function rotateImage270(image: Image): Image {
  const { width, height } = image;
  const newImage = new Image(height, width);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = image.getPixelXY(x, y);
      newImage.setPixelXY(y, width - 1 - x, pixel);
    }
  }
  return newImage;
}

function rotateImageAny(image: Image, degrees: number): Image {
  const angle = (degrees * Math.PI) / 180;
  const { width, height } = image;

  const newWidth = Math.ceil(Math.abs(width * Math.cos(angle)) + Math.abs(height * Math.sin(angle)));
  const newHeight = Math.ceil(Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle)));

  const rotatedImage = new Image(newWidth, newHeight);

  const cx = width / 2;
  const cy = height / 2;
  const ncx = newWidth / 2;
  const ncy = newHeight / 2;

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const dx = x - ncx;
      const dy = y - ncy;

      const srcX = Math.round(cx + dx * Math.cos(-angle) - dy * Math.sin(-angle));
      const srcY = Math.round(cy + dx * Math.sin(-angle) + dy * Math.cos(-angle));

      if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
        const pixel = image.getPixelXY(srcX, srcY);
        rotatedImage.setPixelXY(x, y, pixel);
      }
    }
  }
  return rotatedImage;
}

// ⬇️ Esta função agora retorna só o nome do arquivo, não o path completo
export const rotateImage = async (filepath: string, degrees: number): Promise<string> => {
  try {
    const uploadsDir = path.resolve(__dirname, "../config/uploads");
    const rotatedDir = path.resolve(__dirname, "../config/rotated");
    const inputPath = path.join(uploadsDir, filepath);
    const image = await Image.load(inputPath);

    let rotatedImage: Image;
    if (degrees === 90) {
      rotatedImage = rotateImage90(image);
    } else if (degrees === 180) {
      rotatedImage = rotateImage180(image);
    } else if (degrees === 270) {
      rotatedImage = rotateImage270(image);
    } else {
      rotatedImage = rotateImageAny(image, degrees);
    }

    const outputFilename = `rotated_${degrees}_${path.basename(filepath)}`;
    const outputPath = path.join(rotatedDir, outputFilename);
    await rotatedImage.save(outputPath, { format: 'png' });
    return outputFilename;
    
  } catch (error) {
    console.error("Error rotating image:", error);
    throw error;
  }
};
