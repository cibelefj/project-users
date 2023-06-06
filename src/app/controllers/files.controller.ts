import { Request, Response, Router } from 'express';
import * as multer from 'multer';
import { FileFilterCallback } from 'multer';
import * as path from 'path';
import multerConfig from '../config/multer';

const fileRouter = Router();

// Configuração do multer
const upload = multer({
  ...multerConfig,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite máximo de 5MB para o tamanho do arquivo
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // Filtro para verificar se o arquivo tem no mínimo 1KB
    if (file.size < 1024) {
      cb(new Error('O arquivo deve ter no mínimo 1KB.'));
    } else {
      cb(null, true);
    }
  },
});

// Rota para upload de arquivo
fileRouter.post('/', upload.single('file'), (req: Request & { file: any }, res: Response): Response => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const { filename, originalname, mimetype } = req.file;

    return res.status(200).json({ filename, originalname, mimetype });
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    return res.status(500).json({ error: 'Erro ao fazer upload do arquivo.' });
  }
});

// Rota para download de arquivo
fileRouter.get('/:filename', (req: Request, res: Response): void => {
  try {
    const { filename } = req.params;
    console.log(filename);

    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);

    res.download(filePath, (err: Error) => {
      if (err) {
        console.error('Erro ao fazer download do arquivo:', err);
        res.status(500).json({ error: 'Erro ao fazer download do arquivo.' });
      }
    });
  } catch (error) {
    console.error('Erro ao fazer download do arquivo:', error);
    res.status(500).json({ error: 'Erro ao fazer download do arquivo.' });
  }
});

export default fileRouter;

