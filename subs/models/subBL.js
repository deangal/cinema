const Sub = require('./subSchema')



const getAllSubs = ()=> {

    return new Promise((resolve, reject)=>{
        Sub.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}

const getSubById = (SubId)=> {
    return new Promise((resolve, reject)=>{
        Sub.findById(SubId,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}



const addSub = (newSub)=> {
    return new Promise((resolve,reject)=> {

        let sub = new Sub({
          memberId : newSub.memberId,
          movies : newSub.movies
        })
        console.log(sub);
        sub.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(sub)
            }
        })
    })
}


const updateSub = (SubId, updatedData) => {
    return new Promise((resolve, reject)=>{
        Sub.findByIdAndUpdate(SubId,{
            memberId : updatedData.memberId,
             movies : updatedData.movies
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve("Sub was updated!")
            }
        })

    })
}

const deleteSub = (SubId)=> {
    return new Promise((resolve,reject)=>{
        Sub.findByIdAndDelete(SubId,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Sub deleted!!!")
            }
        })
    })
}

module.exports = {getAllSubs,getSubById,addSub,updateSub,deleteSub}