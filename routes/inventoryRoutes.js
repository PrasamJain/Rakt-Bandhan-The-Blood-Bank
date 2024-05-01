const express = require('express');
const { 
    createInventoryController,
    createDonationController, 
    getInventoryController, 
    getDonarsController,
    updateDonorStatus, 
    getRequestController,
    getHospitalController, 
    getOrgnaisationController, 
    getInventoryHospitalController, 
    getOrgnaisationForHospitalController, 
    getRecentInventoryController,
    getAllPossibleOrgController 
} = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// routes
// ADD INVENTOR || post
router.post('/create-inventory', authMiddleware, createInventoryController)

// ADD donation details || post
router.post('/submit-donation', authMiddleware, createDonationController)

// GET ALL BLOOD RECORDS || GET
router.get('/get-inventory', authMiddleware, getInventoryController)

// GET RECENT BLOOD RECORDS  || GET
router.get('/get-recent-inventory', authMiddleware, getRecentInventoryController)

// GET ALL HOSPITAL BLOOD RECORDS || GET
router.post('/get-inventory-hospital', authMiddleware, getInventoryHospitalController)

// GET ALL DONAR RECORDS || GET
router.get('/get-donars', authMiddleware, getDonarsController)

// Update status accept or reject
router.put('/update-donor-status', authMiddleware, updateDonorStatus)

//GET pending request at reciver side
router.get('/pending-request', authMiddleware, getRequestController)

// GET ALL DONAR RECORDS || GET
router.get("/get-hospitals", authMiddleware, getHospitalController);

// GET ALL ORGANISATION RECORDS || GET
router.get("/get-organisations", authMiddleware, getOrgnaisationController);

//GET ALL REGISTER ORGANISATION || GET
router.get("/get-all-organisations", authMiddleware, getAllPossibleOrgController);

// GET ALL ORGANISATION RECORDS || GET
router.get("/get-orgnaisation-for-hospital", authMiddleware, getOrgnaisationForHospitalController);

module.exports = router;
