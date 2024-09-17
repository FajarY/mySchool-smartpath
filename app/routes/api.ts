import express from 'express';
import studentApi from './api/studentApi';
import teacherApi from './api/teacherApi';
import classApi from './api/classApi';
import { tokenParser } from '../modules/lib';

const router = express.Router();

router.use('/student', tokenParser, studentApi);
router.use('/teacher', tokenParser, teacherApi);
router.use('/class', tokenParser, classApi);

export default router;