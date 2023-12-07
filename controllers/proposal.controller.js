import newProposal from '../services/proposals.services.js';

export const createProposal = async (body) => {
    const { user_id, demand_id, description } = body;
    const proposal = await newProposal(user_id, demand_id, description);

    return proposal;
};
