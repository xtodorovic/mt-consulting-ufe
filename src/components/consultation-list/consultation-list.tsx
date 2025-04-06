import { Component, h, State } from '@stencil/core';

interface Consultation {
  id: number;
  name: string;
  symptoms: string;
  date: string;
}

@Component({
  tag: 'consultation-list',
  styleUrl: 'consultation-list.css',
  shadow: true,
})
export class ConsultationList {
  @State() consultations: Consultation[] = [
    { id: 1, name: 'Alice Smith', symptoms: 'Fever, fatigue', date: '2025-04-10' },
    { id: 2, name: 'John Doe', symptoms: 'Back pain', date: '2025-04-12' },
  ];

  render() {
    return (
      <div class="list-container">
        <h2>Consultation Requests</h2>
        <ul>
          {this.consultations.map(consultation => (
            <li>
              <strong>{consultation.name}</strong>
              <p>{consultation.symptoms}</p>
              <span>{consultation.date}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
