import { Router } from "express";
import { getCarsByBrand } from "../controllers/brandController.js";

const router = Router();


//test
router.get('/carsbybrand', getCarsByBrand);


// router.get('/', getRecords);
// router.get('/:id', getRecord)
// router.post('/', createRecord);
// router.put('/:id', updateRecord);
// router.delete('/:id', deleteRecord);

export const brandRoutes = router;