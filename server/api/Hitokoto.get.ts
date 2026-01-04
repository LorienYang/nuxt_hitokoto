import {defineEventHandler,getQuery} from "h3";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event)=>{
    const {C} = getQuery(event)
    function randomInt(min:number,max:number){
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    function randomIndev(){
        try {
            const filePath = path.resolve(process.cwd(),'public/sentences/indev.json')
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const dataArray = JSON.parse(fileContent)
            const config = dataArray[0]
            const minVal = Number(config.min_Sentences)
            const maxVal = Number(config.max_Sentences)

            const commonInfo = {
                from: "QQ",
                from_who: "Indevclassic",
                creator: "Indevclassic",
                created_at: new Date().toISOString()
            };
            const Hitokoto = (dataArray[randomInt(minVal,maxVal)])
            return {
                ...Hitokoto,
                ...commonInfo
            }
        }catch (error) {
            console.error('获取一言失败:', error);
        }
    }
    function randomStar(){
        try {
            const filePath = path.resolve(process.cwd(),'public/sentences/star.json')
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const dataArray = JSON.parse(fileContent)
            const config = dataArray[0]
            const minVal = Number(config.min_Sentences)
            const maxVal = Number(config.max_Sentences)
            const commonInfo = {
                from: "QQ",
                from_who: "Star_On_Water",
                creator: "Star_On_Water",
                created_at: new Date().toISOString()
            };
            const Hitokoto = (dataArray[randomInt(minVal,maxVal)])
            return {
                ...Hitokoto,
                ...commonInfo
            }
        }catch (error) {
            console.error('获取一言失败:', error);
        }
    }
    if (C === "indev"){
        return randomIndev()
    }
    if (C === "star")
        return randomStar()
})