import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory buffer temporarily

const upload = multer({ storage });

export default upload;
