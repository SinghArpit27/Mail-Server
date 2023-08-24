export const PLANS = {
    BASIC: 'Basic Plan',
    INTERMEDIATE: 'Intermediate Plan',
    ENTERPRISE: 'Enterprise Plan',
};

const PLAN_LIMITS = {
    [PLANS.BASIC]: {
        characterLimit: 200,
        maxFileUploads: 1,
        maxBccCount: 2,
        maxCcCount: 2,
    },
    [PLANS.INTERMEDIATE]: {
        characterLimit: 350,
        maxFileUploads: 3,
        maxBccCount: 4,
        maxCcCount: 4,
    },
    [PLANS.ENTERPRISE]: {
        characterLimit: Infinity,
        maxFileUploads: Infinity,
        maxBccCount: Infinity,
        maxCcCount: Infinity,
    },
};

export function getPlanLimits(plan) {
    return PLAN_LIMITS[plan] || PLAN_LIMITS[PLANS.BASIC];
}

// module.exports = {
//     PLANS,
//     getPlanLimits,
// };