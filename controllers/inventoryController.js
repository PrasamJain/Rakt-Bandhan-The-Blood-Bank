const userModel = require("../models/userModel");
const inventoryModel = require('../models/inventoryModel');
const donationModel = require('../models/donationModel');
const mongoose = require("mongoose");

// Create Inventory | POST
const createInventoryController = async (req, res) => {
    try {
        const { email,action } = req.body;
        // Validation
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User Not Found");
        }
        // if (inventoryType === "in" && user.role !== "donar") {
        //     throw new Error("Not a donar account")
        // }
        // if (inventoryType === "out" && user.role !== "hospital") {
        //     throw new Error("Not a Hostpital")
        // }
        // save record

        if (req.body.inventoryType === 'out') {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityofBlood = req.body.quantity;
            const organisation = new mongoose.Types.ObjectId(req.body.userId);

            // cal Blood quantity
            //calculate Blood Quanitity
            const totalInofRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: "in",
                        bloodGroup: requestedBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            // console.log("Total In", totalInofRequestedBlood);
            const totalIn = totalInofRequestedBlood[0]?.total || 0;

            // cal out blood quatntity
            const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([{
                $match: {
                    organisation,
                    inventoryType: "out",
                    bloodGroup: requestedBloodGroup,
                },
            },
            {
                $group: {
                    _id: "$bloodGroup",
                    total: { $sum: "$quantity" },
                },
            },])
            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

            // In and OUT
            const availableQuantityOfBloodGroup = totalIn - totalOut;

            /// Quantity validation
            if (availableQuantityOfBloodGroup < requestedQuantityofBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
                })
            }
            req.body.hospital = user?._id;
        } else {
            req.body.donar = user?._id;
        }

        /// save record
        const inventory = new inventoryModel(req.body);
        // console.log("inventory ",inventory);
        await inventory.save();
        return res.status(201).send({
            success: true,
            mesage: "New Blood Record Added",
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Create Inventory API",
            error
        })
    }
}


// Create Donation | POST
const createDonationController = async (req, res) => {
    try {
        const { status,requestType, donorName, donorEmail, donorPhone, bloodGroup, organisation,recipient } = req.body;

        // Validation
        if (!donorName || !donorEmail || !donorPhone || !bloodGroup) {
            throw new Error("Please provide all donor details");
        }

        // Additional validation logic can be added if needed

        // Save donation record
        const donation = new donationModel({
            status,
            requestType,
            donorName,
            donorEmail,
            donorPhone,
            bloodGroup,
            organisation,
            recipient,
            // Add more fields as needed
        });

        await donation.save();

        return res.status(201).send({
            success: true,
            message: "New Donation Record Added",
            donation
        });
    } catch (error) {
        console.log("error in controller: ",error);
        return res.status(500).send({
            success: false,
            message: "Error in Create Donation API",
            error
        });
    }
}


// GET ALL BLOOD RECORDS || GET
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({ organisation: req.body.userId, }).populate('donar').populate("hospital").sort({ createdAt: -1 });
        // console.log(req.body.userId);
;        return res.status(200).send({
            success: true,
            message: "Get All records successfully",
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get All Inventory API",
            error
        })
    }
}

// GET HOSPITAL BLOOD RECORDS || GET
const getInventoryHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find(req.body.filters).populate('donar').populate("hospital").populate("organisation").sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "Get All Hospital Consumer records successfully",
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get All Hospital Consumer Inventory API",
            error
        })
    }
}

/// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({ organisation: req.body.userId }).limit(3).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "Recent Inventory Data",
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Recent Inventory API",
            error
        })
    }
}

/// GET DONAR RECORDS
const getDonarsController = async (req, res) => {
    try {
        const organisation = req.body.userId;
        console.log("organisation : ",organisation);
        // find donars
        const donarId = await donationModel.distinct("_id", {
            organisation,
        })
        // console.log("donarId : ",donarId);
        const donars = await donationModel.find({ _id: { $in: donarId } });

        return res.status(200).send({
            success: true,
            message: "Donar Record Fetched Successfully",
            donars
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get Donars Records API",
            error
        })
    }
};


const updateDonorStatus = async (req, res) => {
    const { id } = req.body; // Assuming donorId is passed in the URL parameters
    const { status } = req.body; // Assuming the new status is sent in the request body

    // console.log("donorId & Status : ", id , status);
    try {
        // Find the donor in your database based on donorId
        const donor = await donationModel.findById(id);

        if (!donor) {
            return res.status(404).json({ success: false, message: 'Donor not found' });
        }

        // Update the donor's status
        donor.status = status;
        await donor.save();

        res.status(200).json({ success: true, message: 'Donor status updated successfully', donor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



/// GET DONAR RECORDS
const getRequestController = async (req, res) => {
    try {
        const recipient = req.body.userId;
        // console.log("recipient : ",recipient);
        // find donars
        const donarId = await donationModel.distinct("_id", {
            recipient,
        });
        const donars = await donationModel.find({ _id: { $in: donarId } });
        
        // const org = donars[0].organisation;
        const org = donars.map(donor => donor.organisation);
        const organisation = await userModel.find({ _id: { $in: org } });

        return res.status(200).send({
            success: true,
            message: "Donar Record Fetched Successfully",
            donars,
            organisation
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Get Donars Records API",
            error
        })
    }
};





/// GET HOSPITALS RECORDS
const getHospitalController = async (req, res) => {
    try {
        const organisation = req.body.userId;
        
        console.log("organisation : ",organisation);
        //GET HOSPITAL ID
        const hospitalId = await donationModel.distinct("_id", {
            organisation,
        });
        //FIND HOSPITAL
        const hospitals = await donationModel.find({ _id: { $in: hospitalId } });
        // const hospitals = await userModel.find({ _id: { $in: hospitalId }});
        return res.status(200).send({
            success: true,
            message: "Hospitals Data Fetched Successfully",
            hospitals,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In get Hospital API",
            error,
        });
    }
};

// GET ORG for HOSPITAL PROFILES
const getOrgnaisationForHospitalController = async (req, res) => {
    try {
        const hospital = req.body.userId;
        //GET organisation ID
        const orgId = await inventoryModel.distinct("organisation", {
            hospital,
        });
        //FIND organisation
        const organisations = await userModel.find({
            _id: { $in: orgId },
        });
        return res.status(200).send({
            success: true,
            message: "HOSPITAL Organisation Data Fetched Successfully",
            organisations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In get HOSPITAL Organisation API",
            error,
        });
    }
}

// GET ORG  PROFILES
const getOrgnaisationController = async (req, res) => {
    try {
        const donar = req.body.userId;
        //GET organisation ID
        const orgId = await inventoryModel.distinct("organisation", {
            donar,
        });
        //FIND organisation
        const organisations = await userModel.find({
            _id: { $in: orgId },
        });
        return res.status(200).send({
            success: true,
            message: "Organisation Data Fetched Successfully",
            organisations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In get Organisation API",
            error,
        });
    }
}

// GET ALL REGISTER ORG
const getAllPossibleOrgController = async (req, res) => {
    try {
        const role = "organisation";
        //GET organisation ID
        const orgId = await userModel.distinct("_id", {
            role,
        });
        //FIND organisation
        // console.log("poss_Org :",orgId);
        const organisations = await userModel.find({
            _id: { $in: orgId },
        });
        return res.status(200).send({
            success: true,
            message: "Organisation Data Fetched Successfully",
            organisations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In get Organisation API",
            error,
        });
    }
}


module.exports = { 
    createInventoryController,
    createDonationController, 
    getInventoryController, 
    getDonarsController,
    updateDonorStatus, 
    getRequestController,
    getHospitalController, 
    getOrgnaisationController, 
    getOrgnaisationForHospitalController, 
    getInventoryHospitalController, 
    getRecentInventoryController,
    getAllPossibleOrgController, 
}