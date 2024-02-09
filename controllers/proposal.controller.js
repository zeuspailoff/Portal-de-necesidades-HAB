import { newProposal, deleteProposal, editProposal, getProposalById, getProposalByDemandId, proposalExists, updateProposalStatus, insertVote,getMostVotedProposalByUserId } from '../services/proposals.services.js';
import insertManyFiles from '../helpers/insertFilesInEntity.helper.js';

const entity_type = 'proposals'

export const createProposal = async (user_id, demand_id, description, files = null) => {

    const response = await newProposal(user_id, demand_id, description);

    const filesSrc = { documents: [] }

    if (files != null) {

        const entity_id = response.insertId;
        filesSrc.documents = await (insertManyFiles(entity_id, files, entity_type));
    }

    response.files = {
       ...filesSrc.documents
    };

    return response;
};

export const deleteProposalById = async (id) => {
    const response = await deleteProposal(id);
    return response;
};

export const editProposalById = async (id, description, files = null) => {
    const response = await editProposal(id, description);

    const filesSrc = { documents: [] }


    if (files) {
        filesSrc.documents = await (insertManyFiles(id, files, entity_type));
    }

    response.files = { ...filesSrc.documents };


    return response;
};

export const getProposal = async (id) => {
    const response = await getProposalById(id);
    return response;
};

export const getProposalByDemand = async (demand_id) => {
    const responses = await getProposalByDemandId(demand_id);
    return responses;
};

export const proposalAlreadyExists = async (proposal_id) => {
    const response = await proposalExists(proposal_id);
    return response;
}

export const updateProposalStatusById = async (id) => {
    const response = await updateProposalStatus(id);
    return response;
};

export const voteProposal = async (value, proposal_id, user_id, demand_id) => {
    const voteAvg = await insertVote(value, proposal_id, user_id, demand_id);
    return voteAvg;
}

export const popularProposalsByUserId = async (user_id) => {
    const response = await getMostVotedProposalByUserId(user_id);

    return response;
}