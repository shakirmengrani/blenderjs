module.exports = (req, res, next) => {
    if(req.user){
        const _role = req.url.split("/")[1];
        if(_role !== "media"){
            if(String(req.user.role).toLocaleLowerCase() === _role){
                next()
            }else{
                res.sendError(null, "Un-Authorized user !", 401);
            }
        }else{
            next()
        }
    }else{
        next()
    }
}