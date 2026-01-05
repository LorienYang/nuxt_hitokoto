import {defineEventHandler,getQuery} from "h3";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event)=>{
    const {C} = getQuery(event)
    function randomInt(min:number,max:number){
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    function randomSentences(who:string){
        try {
            const filePath = path.resolve(process.cwd(),`public/sentences/${who}.json`)
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const dataArray = JSON.parse(fileContent)

            return (dataArray[randomInt(Number(dataArray[0].min_Sentences),Number(dataArray[0].max_Sentences))])
        }catch (error) {
            console.error('获取一言失败:', error);
        }
    }
    if (C === "indev"){
        return randomSentences('indev')
    }
    if (C === "star")
        return randomSentences('star')
    else {
        const who = randomInt(1,2)
        if (who === 1){
            return randomSentences('indev')
        }
        if (who === 2) {
            return randomSentences('star')
        }
    }
})