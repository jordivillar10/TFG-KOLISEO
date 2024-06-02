// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize('rrhh', 'root', 'Nohay2sin3', {
//     host: 'localhost',
//     dialect: 'mysql',
// });

// export default sequelize;

import { Sequelize } from "sequelize";

const sequelize = new Sequelize('koliseo', 'jordi', 'Admin123', {
    host: '50.17.9.1',
    dialect: 'mysql',
});

export default sequelize;