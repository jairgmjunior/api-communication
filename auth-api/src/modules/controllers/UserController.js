import UserException from "../exceptions/UserException.js";
import UserService from "../services/UserService.js";
import * as httpStatus from "../../config/constants/HttpStatus.js"

class UserController{

    async findByEmail(req, res){
        let user = await UserService.findByEmail(req);
        return res.status(user.status).json(user);
    }

    async getAccessToken(req, res){
        let accessToken = await UserService.getAccessToken(req);
        return res.status(accessToken.status).json(accessToken);
    }

   
}

export default new UserController();