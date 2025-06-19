import express from 'express';
import path from 'path';
import imageRoutes from './src/routes/image';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());

const rotatedDir = path.resolve(
  __dirname,
  'src',
  'config',
  'rotated'
);

const UploadsDir = path.resolve(
  __dirname,
  'src',
  'config',
  'uploads'
);

app.use('/rotated', express.static(rotatedDir));
app.use('/uploads', express.static(UploadsDir));

app.use(express.json());
app.use('/api', imageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Servindo imagens de ${rotatedDir}`);
});
