import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  data: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      
      this.data = {
          labels: ['Pecho', 'Espalda', 'Core', 'Hombros', 'Brazos', 'Bíceps', 'Tríceps'],
          datasets: [
              {
                  label: 'Actual',
                  borderColor: documentStyle.getPropertyValue('--bluegray-400'),
                  pointBackgroundColor: documentStyle.getPropertyValue('--bluegray-400'),
                  pointBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
                  pointHoverBackgroundColor: textColor,
                  pointHoverBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
                  data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                  label: 'Anterior',
                  borderColor: documentStyle.getPropertyValue('--pink-400'),
                  pointBackgroundColor: documentStyle.getPropertyValue('--pink-400'),
                  pointBorderColor: documentStyle.getPropertyValue('--pink-400'),
                  pointHoverBackgroundColor: textColor,
                  pointHoverBorderColor: documentStyle.getPropertyValue('--pink-400'),
                  data: [28, 48, 40, 19, 96, 27, 100]
              }
          ]
      };
      
      this.options = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              r: {
                  grid: {
                      color: textColorSecondary
                  },
                  pointLabels: {
                      color: textColorSecondary
                  }
              }
          }
      };
  }
}
