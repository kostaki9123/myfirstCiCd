import { unstable_flag as flag  } from "@vercel/flags/next"

export const allowExpensiveAI = flag({
    key: "expensive-ai" , 
    description : "Use the expensive AI model" ,
    decide : async () => false , 
    defaultValue : true
})

export const precopmuteFlags = [allowExpensiveAI] as const