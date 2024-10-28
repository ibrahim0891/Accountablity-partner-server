

const utilities = {
   
} 


utilities.genarateRandomToken = () => {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
    return token
}
 

utilities.userAlreadyExists = async (UserModel, email) => {
    let user = await UserModel.findOne({ email: email }); 
    if (!user || user.length == 0) {
        return { userExist: false, user: null };
    } else { 
        return { userExist : true, user: user };
    }
};
module.exports = utilities 


 