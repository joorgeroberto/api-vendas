import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

// path é uma lib do node para mainpular diretorios.
// abaixo, temos __dirname que é o diretorio atual e precisamos ir ate a pasta
// de uploads na raiz do projeto.
// "Equivalente" a: ../../uploads
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    // Com este metodo filename, determinamos como nomear os arquivos no servidor
    filename(request, file, callback) {
      // Criando uma string hexadecimal com caracteres randômicos
      const fileHash = crypto.randomBytes(10).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
