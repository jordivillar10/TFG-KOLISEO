import { Sequelize } from "sequelize";

const sequelize = new Sequelize('rrhh', 'root', 'Nohay2sin3', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;