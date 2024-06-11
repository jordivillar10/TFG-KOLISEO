import { Component, NgModule } from '@angular/core';
import { WorkoutsService } from '../../../services/workouts.service';
// import { Entrenamiento } from '../../../interfaces/entrenamiento';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';

interface ProcessedWorkout {
  entrenamiento_id: number;
  entrenamiento_date: Date;
  total_series: number;
  ejercicios: {id:number; name: string; series: { repeticiones: number; peso: number }[] }[];
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [ FormsModule, NgIf, NgFor],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
  workouts: ProcessedWorkout[] = [];

  constructor(private workoutService: WorkoutsService,private datePipe: DatePipe) {}
  
  ngOnInit(): void {
    const userId = this.workoutService.getUserId();

    if(userId) {
      this.workoutService.showHistorialWorkouts(userId).subscribe(
        (data) => {
          this.workouts = this.processWorkouts(data);
        },
        (error) => {
          console.error('Error fetching workouts:', error);
        }
      )
    }
  }

  private processWorkouts(data: any[]): ProcessedWorkout[] {
    const workoutMap: { [key: number]: ProcessedWorkout } = {};

    data.forEach(item => {
      const { entrenamiento_id, entrenamiento_date, total_series, id, name, repeticiones, peso } = item;

      if (!workoutMap[entrenamiento_id]) {
        workoutMap[entrenamiento_id] = {
          entrenamiento_id,
          entrenamiento_date,
          total_series,
          ejercicios: []
        };
      }

      const ejercicio = workoutMap[entrenamiento_id].ejercicios.find(e => e.name === name);
      if (ejercicio) {
        ejercicio.series.push({ repeticiones, peso });
      } else {
        workoutMap[entrenamiento_id].ejercicios.push({
          id,
          name,
          series: [{ repeticiones, peso }]
        });
      }
    });

    return Object.values(workoutMap);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'd \'de\' MMMM \'de\' yyyy', 'es-ES') || '';
  }
}
