import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../config/constants/HttpStatus.js"
import UserException from "../exceptions/UserException.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as secrets from "../../config/constants/secrets.js";

class UserService{
    async findByEmail(req){
        try{
            const { email } = req.params;
            const { authUser } = req;

            this.validateRequestData(email);

            let user = await UserRepository.findByEmail(email);

            this.validadeUserNotFound(user);

            this.validateAuthenticatedUser(user, authUser);
            return{
                status: httpStatus.SUCCESS,
                user:{
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            };
        }
        catch(err){
            return {
                status : err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message : err.message
            };
        }
    }

    validateRequestData(email){
        if(!email){
            throw new UserException(httpStatus.BAD_REQUEST, "User email was not informed.");
        }
    }

    validadeUserNotFound(user){
        if(!user){
            throw new UserException(httpStatus.BAD_REQUEST, "User was not found.");
        }
    }

    validateAuthenticatedUser(user, authUser){
        if(!authUser || user.id !== authUser.id){
            throw new UserException(httpStatus.FORBIDDEN, "You cannot see user data.")
        }
    }

    async getAccessToken(req){

        try{
            const { email, password } = req.body;
            this.validateAccessToken(email, password)
            let user = await UserRepository.findByEmail(email);
            this.validadeUserNotFound(user);
            await this.validatePassword(password, user.password);
            const  authUser = { id: user.id, name: user.name, email: user.email };
            const accessToken = jwt.sign({authUser}, secrets.API_SECRET, { expiresIn: "1d"});

            return {
                status: httpStatus.SUCCESS,
                accessToken
            };
        }
        catch(err){
            return {
                status : err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message : err.message
            };
        }

    }

    validateAccessToken(email, password){
        if(!email || !password){
            throw new UserException(httpStatus.UNAUTHORIZED, "User not authorized.");
        }
    }

    async validatePassword(password, hasPassword){
        if(!await bcrypt.compare(password, hasPassword)){
            throw new UserException(httpStatus.UNAUTHORIZED, "Password doesn't match");
        }
    }
}

export default new UserService();