
import { insertNewDemand } from "../middleware/demands/inserNewDemand.js";
import newProposal from "../middleware/propousal/propousals.middleware.js";
import deleteProposal from "../middleware/propousal/deleteProposal.js";
import editProposalById from "../middleware/propousal/editProposal.js";
import getProposalById from "../middleware/propousal/getProposalById.js";
import getProposalByDemandId from "../middleware/propousal/getProposalById.js";

export {
    insertNewDemand,
    newProposal,
    deleteProposal,
    editProposalById,
    getProposalById,
    getProposalByDemandId,
    deleteProposal
}