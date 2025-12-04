import { Router } from "express";
import { createRecord, deleteRecord, getRecord, getRecords } from "../controllers/fueltypeController.js";


const router = Router();


router.get('/', getRecords);
router.get('/:id', getRecord)
router.post('/', createRecord);
router.delete('/:id', deleteRecord)

export const fueltypeRoutes = router;