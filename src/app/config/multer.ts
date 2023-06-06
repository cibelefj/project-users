import * as multer from 'multer';
import * as path from 'path';
import * as crypto from 'crypto';

// Configura as opções de armazenamento do multer
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (req, file, callback) => {
    // Gera um hash aleatório para garantir nomes de arquivo únicos
    const hash = crypto.randomBytes(6).toString('hex');
    const fileName = `${hash}-${file.originalname}`;
    callback(null, fileName);
  }
});

export default {
  storage: storage
};
