export interface Exercise {
    id: number,
    name: string,
    description: string,
    muscle_group_id: number,
    campos?: { repeticiones: string, peso: string }[];
}