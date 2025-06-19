import { Router } from 'express';
import multer from 'multer';

import { storage } from '../config/multerConfig';
import { uploadHandler, rotateImageHandler } from '../controllers/imageController';

const router = Router();



const upload = multer({ storage });

// Upload da imagem
router.post('/upload', upload.single('file'), uploadHandler);

// Rotação da imagem (por nome e grau)
router.post('/rotate', rotateImageHandler);

export default router;
