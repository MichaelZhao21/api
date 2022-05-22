import { Router } from 'express';
import { join } from 'path';
const router = Router();

const PUBLIC_PATH = process.env.NODE_ENV ? 'public' : '../../public';

router.get('/', async function (req, res, next) {
    res.sendFile(join(__dirname, `${PUBLIC_PATH}/index.html`));
});

// router.get('/admin', async function (req, res, next) {
//     res.sendFile(path.join(__dirname, '../../public/admin.html'));
// });

export default router;
