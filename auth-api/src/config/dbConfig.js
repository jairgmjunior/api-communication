import { Sequelize } from "sequelize";  

const sequelize = new Sequelize("auth-db", "admin", "123456", {
    host: "localhost",
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        uderscored: true,
        undescoredAll: true,
        freezeTableName: true
    },
});

sequelize
.authenticate().then(() =>{
    console.info("Connectin has been stablished!");
})
.catch((err) =>{
    console.info("unable to connect to the database.");
    console.info(err.message);
});

export default sequelize;