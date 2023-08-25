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

 // const planName = req.body.plan;
            // if(planName === "Basic"){
            //     const newPlanData = {
            //         name: 'Basic Plan',
            //         price: 0,
            //         limits: {
            //             maxCharacters: 200,
            //             maxFiles: 1,
            //             maxBCC: 2,
            //             maxCC: 2,
            //         },
            //         allowRARFiles: false,
            //     };

            //     const newPlan = new Plan(newPlanData);
            //     const savedPlan = await newPlan.save();
            //     console.log('Plan created successfully:', savedPlan);
            // }
            // else if(planName === "Intermediate"){
            //     const newPlanData = {
            //         name: 'Basic Plan',
            //         price: `10$`,
            //         limits: {
            //             maxCharacters: 350,
            //             maxFiles: 3,
            //             maxBCC: 4,
            //             maxCC: 4,
            //         },
            //         allowRARFiles: false,
            //     };

            //     const newPlan = new Plan(newPlanData);
            //     const savedPlan = await newPlan.save();
            //     console.log('Plan created successfully:', savedPlan);
            // }
            // else if(planName === "Enterprise"){
            //     const newPlanData = {
            //         name: 'Basic Plan',
            //         price: `20$`,
            //         limits: {
            //             maxCharacters: 200,
            //             maxFiles: 1,
            //             maxBCC: 2,
            //             maxCC: 2,
            //         },
            //         allowRARFiles: true,
            //     };

            //     const newPlan = new Plan(newPlanData);
            //     const savedPlan = await newPlan.save();
            //     console.log('Plan created successfully:', savedPlan);
            // }