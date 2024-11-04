import { unstable_flag as flag  } from "@vercel/flags/next"

export const allowExpensiveAI = flag({
    key: "expensive-ai" , 
    description : "Use the expensive AI model" ,
    decide : async () => false , 
    defaultValue : false
})

export const precopmuteFlags = [allowExpensiveAI] as const