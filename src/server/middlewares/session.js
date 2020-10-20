const db = require("../../library/db");
const { error } = require("../messeges")
const { decrypt } = require("../../library/encryption")

module.exports = async (req, res, next) => {
    if(req.user){
        const user = await db("users").where({id: req.user.id}).first()
        if(!user){
            return res.sendError(null, "user not found")
        }else{
            try{
                let devInfo = req.get('dlc') || req.headers['dlc'] || 'undefined';
                if(devInfo !== 'undefined'){
                    let devInfo = JSON.parse(decrypt((req.get('dlc') || req.headers['dlc'] || 'undefined').toString()));
                    if(devInfo){
                        console.log("devInfo", devInfo)
                        let session = await db("sessions").where({"user_id": req.user.id}).first();
                        if(session){
                            // if(session.device_id !== devInfo.device_id){
                            //     sendNotification([session.push_token], {title: "You've logout from this device", data:{status: "logout"}})
                            // }
                            await db("sessions").where({"user_id": req.user.id}).update({"device_id": devInfo.device_id, "push_token": devInfo.push_token, "device_type": devInfo.device_type, "updated_at": db.fn.now()})
                        }else{
                            await db("sessions").insert({"device_id": devInfo.device_id, "push_token": devInfo.push_token, "device_type": devInfo.device_type, "user_id": req.user.id}).returning("*")
                        }
                    }
                }
                return next()    
            }catch(err) {
                return res.sendError(err, error("tokenError").message)
            }
        }
    }else{
        return next()
    }
}