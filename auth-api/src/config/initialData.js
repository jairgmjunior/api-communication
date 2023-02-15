import bcrypt from "bcrypt";
import User from "../modules/user/model/User.js";

export async function createInicialData(){

    try{
            await User.sync({ force: true});
        
            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash("123456", salt);
            //const password = await bcrypt.hash("123456");
        
            await User.create({
                name: 'User teste',
                email: "teste@teste.com",
                password: password,
            });
    }catch(err){
        console.info(err.message);
    }

}