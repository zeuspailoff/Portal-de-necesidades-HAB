import insertNewDemand from "./demands/insertNewDemand.middleware.js";
import getAllDemands from "./demands/getAllDemands.middleware.js";
import getDemandById from "./demands/getDemandById.middleware.js";
import getAllDemandsByUserId from "./demands/getAllDemandsByUserId.middleware.js";
import deleteDemand from "./demands/deleteDemand.middleware.js";
import updateDemandStatus from "./demands/updateDemandStatus.middleware.js";
import editDemand from "./demands/editDemand.middleware.js";
import newProposal from "./proposals/insertNewProposal.middleware.js";
import deleteProposal from "./proposals/deleteProposal.middleware.js";
import editProposalById from "./proposals/editProposal.middleware.js";
import getProposalById from "./proposals/getProposalById.middleware.js";
import getProposalByDemandId from "./proposals/getProposalByDemand.middleware.js";
import newUser from "./users/insertNewUser.middleware.js";

export {
    insertNewDemand,
    getAllDemands,
    getDemandById,
    getAllDemandsByUserId,
    deleteDemand,
    updateDemandStatus,
    editDemand,
    newProposal,
    deleteProposal,
    editProposalById,
    getProposalById,
    getProposalByDemandId,
    newUser
}