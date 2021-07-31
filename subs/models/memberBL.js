const Member = require('./memberSchema')



const getAllMembers = ()=> {

    return new Promise((resolve, reject)=>{
        Member.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}


const getMemberById = (MemberId)=> {
    return new Promise((resolve, reject)=>{
        Member.findById(MemberId,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}




const addMember = (newMember)=> {
    return new Promise((resolve,reject)=> {

        let member = new Member({
            name : newMember.name,
            email : newMember.email,
            city : newMember.city,
            
        })
        console.log(member);
        member.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(member)
            }
        })
    })
}


const updateMember = (MemberId, updatedData) => {
    return new Promise((resolve, reject)=>{
        Member.findByIdAndUpdate(MemberId,{
            name : updatedData.name,
            email : updatedData.email,
            city : updatedData.city,
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve("Member was updated!")
            }
        })

    })
}

const deleteMember = (MemberId)=> {
    return new Promise((resolve,reject)=>{
        Member.findByIdAndDelete(MemberId,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Member deleted!!!")
            }
        })
    })
}

module.exports = {getAllMembers,getMemberById,addMember,updateMember,deleteMember}