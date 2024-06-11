import { QueryTypes } from 'sequelize';
import sequelize from '../db/connection';

export const getUserWorkouts = async (userId: any) => {
    const query = `
    SELECT en.id AS entrenamiento_id, ex.id , ex.name, s.repeticiones, s.peso, en.entrenamiento_date,
    (SELECT COUNT(*) FROM series s2 WHERE s2.entrenamiento_id = en.id) AS total_series
    FROM entrenamientos en 
    JOIN series s ON en.id = s.entrenamiento_id
    JOIN exercises ex ON ex.id = s.exercise_id
    WHERE en.user_id = :userId
    `;
    
    const results = await sequelize.query(query, { // Usar la consulta SQL real
        type: QueryTypes.SELECT,
        replacements: { userId }
    });

    return results;
};
