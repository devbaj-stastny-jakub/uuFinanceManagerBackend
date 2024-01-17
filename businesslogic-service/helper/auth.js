const databaseService = require('../services/databaseService');

const getIsAuthorized = async (userId, householdId, roles) => {
	const household = await databaseService.household.get(householdId);
	let profile = null;
	let authorized = false;
	if (household.ownerId === userId) profile = 'owner';
	if (!profile && household.membersIds.find((id) => id === userId)) profile = 'member';
	if (roles.includes(profile)) authorized = true;
	return authorized;
};

module.exports = getIsAuthorized;
