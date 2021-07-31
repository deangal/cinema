let Premission = require('../models/premissionSchema')
const jfile = require('jsonfile')
const premissonFile = './premissions.json'

const getAllPremissions= ()=>{

    return new Promise((resolve,reject)=>{

        jfile.readFile(premissonFile,(err, data)=>{
            if(err){
                reject(err)
            } 
            else {
                resolve(data)
            }
            
        })
    })

}

const getAllPremissionsFromDb= ()=>{

    return new Promise((resolve, reject)=>{
        Premission.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                 
                jfile.writeFile(premissonFile,data,(err)=>{
                if(err){
                    reject(err)
                }else {
                    resolve("Premissions Imported!")
                }
            })
               
            }
        })

    })
}

const getPremissionById =  (id) => {

    return new Promise((resolve, reject)=>{
        jfile.readFile(premissonFile,(err, data)=>{
            if(err){
                reject(err)
            }
            else {

                var returnValue = data.filter(item=> item.id == id)
                resolve(returnValue)
    
            }
        })
    })
}

const addPremissionToDb = (newPremission)=> {
    return new Promise((resolve,reject)=> {

        let premission = new Premission({
            role : newPremission.role,
            premissions : newPremission.premissions
          
           
            
        })
        premission.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(premission)
            }
        })
    })
}


const addPremission = (obj) => {

    return new Promise((resolve, reject)=>{
        jfile.readFile(premissonFile,(err, data)=>{
            if(err){
                reject(err)
            } 
            else {
        data.push(obj)
        addPremissionToDb(obj)
        jfile.writeFile(premissonFile,data,(err)=>{
            if(err){
                reject(err)
            }else {
                resolve("Premission Created!")
            }
        })
    }
    
})

}) 

} 



const deletePremission = (id) => {

    return new Promise((resolve, reject)=>{


        const index = premissonFile.findIndex(item=>item.id == id)

    
        jfile.writeFile(premissonFile[index],'',(err)=>{
            if(err){
                reject(err)
            }else {
                resolve("Premission Deleted!")
            }
        })
    } ) 
} 

const updatePremission = (id,updatedPremission) => {

    return new Promise((resolve, reject)=>{


        Premission.findByIdAndUpdate(id,{
            role : updatedPremission.role,
            premissions : updatedPremission.premissions
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve("Premission was updated!")
                getAllPremissionsFromDb()
            }
        })

    })
}






module.exports = {getAllPremissions,getPremissionById,addPremission,deletePremission,updatePremission,addPremissionToDb,getAllPremissionsFromDb}
 