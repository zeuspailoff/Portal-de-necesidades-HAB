import insertNewDemand from "./demands/insertNewDemand.middleware.js";
import getAllDemands from "./demands/getAllDemands.middleware.js";
import getDemandById from "./demands/getDemandById.middleware.js";
import getAllDemandsByUserId from "./demands/getAllDemandsByUserId.middleware.js";
import deleteDemand from "./demands/deleteDemand.middleware.js";
import updateDemandStatus from "./demands/updateDemandStatus.middleware.js";
import editDemand from "./demands/editDemand.middleware.js";
import demandExists from "./demands/demandExists.middleware.js"
import newProposal from "./proposals/insertNewProposal.middleware.js";
import deleteProposal from "./proposals/deleteProposal.middleware.js";
import editProposalById from "./proposals/editProposal.middleware.js";
import getProposalById from "./proposals/getProposalById.middleware.js";
import getProposalByDemandId from "./proposals/getProposalByDemand.middleware.js";
import proposalExists from "./proposals/proposalExists.middleware.js";
import newUser from "./users/insertNewUser.middleware.js";
import updateUserStatus from "../middlewares/users/updateUser.middleware.js"
import getUserById from "../middlewares/users/getUserById.middleware.js";
import deleteUserById from "../middlewares/users/deleteUser.middleware.js";
import validateUser from "../middlewares/users/validateUser.middleware.js";
import getUserList from "./users/getAllUsers.middleware.js";
import userExists from "../middlewares/users/userExists.middleware.js";
//import getUserAcount from "../middlewares/users/getUserAccount.middleware.js";
import updateUser from "../middlewares/users/updateUser.middleware.js";
import getAllUsers from "../middlewares/users/getAllUsers.middleware.js";
import findOrFailUser from "../middlewares/users/findOrFailUser.middleware.js";
import passwordUpdate from "../middlewares/users/passwordUpdateUser.middleware.js";
import loginUser from "../middlewares/users/loginUser.middleware.js";
import authUser from "../middlewares/security/authUser.middleware.js";
import getOwnUser from "../middlewares/users/getOwnUser.middleware.js";
import isOwner from "../middlewares/security/isOwner.middleware.js";
import updateProposalStatus from "../middlewares/proposals/updateProposalStatus.middleware.js";

export {
    insertNewDemand,
    getAllDemands,
    getDemandById,
    getAllDemandsByUserId,
    deleteDemand,
    updateDemandStatus,
    editDemand,
    demandExists,
    newProposal,
    deleteProposal,
    editProposalById,
    getProposalById,
    getProposalByDemandId,
    proposalExists,
    newUser,
    validateUser,
    updateUserStatus,
    getUserById,
    deleteUserById,
    getUserList,
    userExists,
    //getUserAcount,
    updateUser,
    getAllUsers,
    findOrFailUser,
    passwordUpdate,
    loginUser,
    authUser,
    getOwnUser,
    isOwner,
    updateProposalStatus
}