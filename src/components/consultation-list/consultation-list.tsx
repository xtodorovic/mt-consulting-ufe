import { Component, h, State, Prop } from '@stencil/core';
import { WaitingListEntry, Configuration, RequestsListApi } from '../../api/consulting-requests';

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
  apiBase: string = "http://localhost:5000/api";
  ambulanceId: string = "bobulova";
  basePath: string = "/requests-list";

  @State() errorMessage: string;

  @State() waitingPatients: WaitingListEntry[] = [];

  private async getWaitingPatientsAsync(): Promise<WaitingListEntry[]> {
    // be prepared for connectivitiy issues
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const waitingListApi = new RequestsListApi(configuration);
      const response = await waitingListApi.getRequestsListEntriesRaw({requestId: this.ambulanceId})
      if (response.raw.status < 299) {
        return await response.value();
      } else {
        this.errorMessage = `Cannot retrieve list of waiting patients: ${response.raw.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of waiting patients: ${err.message || "unknown"}`
    }
    return [];
  }

  async componentWillLoad() {
    this.waitingPatients = await this.getWaitingPatientsAsync();
  }


  render() {
    return (
      <div class="list-container">
        <h2>Consultation Requests</h2>
        {this.errorMessage
        ? <div class="error">{this.errorMessage}</div>
        :
        <ul>
          {this.waitingPatients.map(patient => (
            <li>
              <strong>{patient.name}</strong>
              <p>{patient.condition.value}</p>
              <span>{patient.estimatedStart?.toLocaleString()}</span>
            </li>
          ))}
        </ul>
        }
      </div>
    );
  }
}
