import { newProposal, deleteProposal, editProposal, getProposalById, getProposalByDemandId, proposalExists, updateProposalStatus,insertVote } from '../services/proposals.services.js';
import insertManyFiles from '../helpers/insertFilesInEntity.helper.js';

const entity_type = 'proposals'

export const createProposal = async (user_id, demand_id, description, files = null) => {
    const response = await newProposal(user_id, demand_id, description);

    const filesSrc = { insertId: response.insertId, files: [] }

    if (files) {
        const entity_id = response.insertId;
        filesSrc.files = await (insertManyFiles(entity_id, files, entity_type));
    }

    return filesSrc;
};


export const deleteProposalById = async (id) => {
    const response = await deleteProposal(id);
    return response;
};

export const editProposalById = async (id, description, files = null) => {
    const response = await editProposal(id, description);

    if (files) {
        const entity_id = response.insertId;
        filesSrc.files = await (insertManyFiles(entity_id, files, entity_type));
    }
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

export const proposalAlreadyExists = async (response_id) => {
    const response = await proposalExists(response_id);
    return response;
}

export const updateProposalStatusById = async (id) => {
    const response = await updateProposalStatus(id);
    return response;
};
export const voteProposal = async (value, proposal_id, user_id) => {
    if (user_id == proposal.user_id)
        errors.unauthorizedUser('el propietrario no puede votar ☠️')

    const voteAvg = await insertVote(value, proposal_id, user_id);

    return voteAvg;
}
