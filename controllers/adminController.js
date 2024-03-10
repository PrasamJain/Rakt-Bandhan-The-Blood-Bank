const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");

const getDonarsListController = async (req, res) => {
    try {
        const donarData = await userModel
            .find({ role: "donar" })
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            Toatlcount: donarData.length,
            message: "Donar List Fetched Successfully",
            donarData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Donar List API",
            error
        })
    }
}
//GET HOSPITAL LIST
const getHospitalListController = async (req, res) => {
    try {
        const hospitalData = await userModel
            .find({ role: "hospital" })
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            Toatlcount: hospitalData.length,
            message: "HOSPITAL List Fetched Successfully",
            hospitalData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Hospital List API",
            error,
        });
    }
};
//GET ORG LIST
const getOrgListController = async (req, res) => {
    try {
        const orgData = await userModel
            .find({ role: "organisation" })
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            Toatlcount: orgData.length,
            message: "ORG List Fetched Successfully",
            orgData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In ORG List API",
            error,
        });
    }
};

const getTransactionController = async (req, res) => {

    console.log("req.body.userId", req.body);
    try {

        const inventory = await inventoryModel
            .find()
            .populate('donar')
            .populate("hospital")
            .populate("organisation")
            .sort({ createdAt: -1 });
        console.log(inventory);
        
        return res.status(200).send({
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

// DELETE || Donar ||Hospital || Organisation
const deleteDonarController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: " Record Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while deleting ",
            error,
        });
    }
};




// EXPORT
module.exports = { getDonarsListController, getHospitalListController, getOrgListController, getTransactionController, deleteDonarController }