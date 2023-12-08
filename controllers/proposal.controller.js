

import { newProposal, deleteProposal, editProposal, getProposalById, getProposalByDemandId } from '../services/proposals.services.js';


export const createProposal = async (body) => {
    const { user_id, demand_id, description } = body;
    const proposal = await newProposal(user_id, demand_id, description);

    return proposal;
};


export const deleteProposalById = async (id) => {
    const proposal = await deleteProposal(id);
    return proposal;
};

export const editProposalById = async (id, description) => {
    const proposal = await editProposal(id, description);
    return proposal;
};

export const getProposal = async (id) => {
    const proposal = await getProposalById(id);
    return proposal;
};

export const getProposalByDemand = async (demand_id) => {
    const proposals = await getProposalByDemandId(demand_id);
    return proposals;
};
