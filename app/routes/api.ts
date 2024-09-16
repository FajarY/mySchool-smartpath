import express from 'express';
import studentApi from './api/studentApi';
import teacherApi from './api/teacherApi';
import classApi from './api/classApi';

const router = express.Router();

router.use('/student', studentApi);
router.use('/teacher', teacherApi);
router.use('/class', classApi);

export default router;