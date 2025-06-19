import { Request, Response } from 'express';
import { rotateImage } from '../service/rotateImage';

export const uploadHandler = (req: Request, res: Response) => {
  console.log(req.file)
  if (!req.file){
    res.status(400).send('Nenhum arquivo enviado.');
    
  }

  const fileUrl = `/uploads/${req.file?.filename}`;
  res.status(200).json({ filename: req.file?.filename, url: fileUrl });
};

export const rotateImageHandler = async (req: Request, res: Response) => {
  const { filename, degrees } = req.body;
  
  if (!filename || !degrees) {
    res.status(400).json({ error: 'Parâmetros filename e degrees são obrigatórios.' });
  }

  try {
    const rotatedFilename= await rotateImage(filename, Number(degrees));
    
    const outputUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}/rotated/${rotatedFilename}`;
    res.json({ rotatedFile: outputUrl, filename: rotatedFilename }); 
  } catch (error) {
    res.status(500).json({ error: 'Erro ao rotacionar imagem.' });
  }
};
