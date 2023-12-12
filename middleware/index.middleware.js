import insertNewDemand from "./demands/insertNewDemand.middleware.js";
import getAllDemands from "../middleware/demands/getAllDemands.js";
import getDemandById from "../middleware/demands/getDemandById.js";
import getAllDemandsByUserId from "../middleware/demands/getAllDemandsByUserId.js";
import deleteDemand from "../middleware/demands/deleteDemand.js";
import updateDemandStatus from "../middleware/demands/updateDemandStatus.js";
import editDemand from "../middleware/demands/editDemand.js";
import insertFile from "../middleware/files/insertFile.js";
import deleteFile from "../middleware/files/deleteFile.js";
import newProposal from "./proposals/insertNewProposal.js";
import deleteProposal from "./proposals/deleteProposal.js";
import editProposalById from "./proposals/editProposal.js";
import getProposalById from "./proposals/getProposalById.js";
import getProposalByDemandId from "./proposals/getProposalByDemand.js";
import newUser from "./users/insertNewUser.js";

export {
    insertNewDemand,
    getAllDemands,
    getDemandById,
    getAllDemandsByUserId,
    deleteDemand,
    updateDemandStatus,
    editDemand,
    insertFile,
    deleteFile,
    newProposal,
    deleteProposal,
    editProposalById,
    getProposalById,
    getProposalByDemandId,
    newUser
}