
import insertNewDemand from "../middleware/demands/insertNewDemand.js";
import getAllDemands from "../middleware/demands/getAllDemands.js";
import getDemandById from "../middleware/demands/getDemandById.js";
import deleteDemand from "../middleware/demands/deleteDemand.js";
import updateDemandStatus from "../middleware/demands/updateDemandStatus.js";
import editDemand from "../middleware/demands/editDemand.js";
import insertFile from "../middleware/files/insertFile.js";
import deleteFile from "../middleware/files/deleteFile.js";
import newProposal from "../middleware/propousal/propousals.middleware.js";
import deleteProposal from "../middleware/propousal/deleteProposal.js";
import editProposalById from "../middleware/propousal/editProposal.js";
import getProposalById from "../middleware/propousal/getProposalById.js";
import getProposalByDemandId from "../middleware/propousal/getProposalByDemand.js";

export {
    insertNewDemand,
    getAllDemands,
    getDemandById,
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

}