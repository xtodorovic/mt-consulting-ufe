import { Component, h, State, Prop } from '@stencil/core';
import { Configuration, ConsultationsApi } from '../../api/consulting-requests';
import '@material/web/icon/icon'

interface Consultation {
  id: string;
  name: string;
  email: string;
  symptoms: string;
  videoLink?: string;
  scheduledDate?: Date;
  scheduledTime?: string;
}

@Component({
  tag: 'consultation-list',
  styleUrl: 'consultation-list.css',
  shadow: true,
})

export class ConsultationList {
  @State() consultations: Consultation[] = [
    { id: "1", name: 'Alice Smith', symptoms: 'Fever, fatigue', email: 'alice@gmail.com' },
    { id: "1", name: 'John Doe', symptoms: 'Back pain', email: 'john@gmail.com' },
  ];
  apiBase: string = "http://localhost:8080/api";
  basePath: string = "/requests-list";
  @State() editingPatient: any = null; // or use a typed interface
  @State() isEditing: boolean = false;
  @State() editStatusMessage: string = '';


  @State() errorMessage: string;

  @State() waitingPatients: Consultation[] = [];

  private async getWaitingPatientsAsync(): Promise<Consultation[]> {
    // be prepared for connectivitiy issues
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const waitingListApi = new ConsultationsApi(configuration);
      const response = await waitingListApi.getAllRequestsListEntriesRaw()
      if (response.raw.status < 299) {
        const waitingPatientsRaw = await response.value();
        console.log("Waiting patients:", waitingPatientsRaw);
        // Map WaitingListEntry[] to Consultation[]
        const waitingPatients: Consultation[] = waitingPatientsRaw.map(entry => ({
          id: entry.id,
          name: entry.name,
          email: entry.email,
          symptoms: entry.symptoms,
          videoLink: entry.videoLink,
          scheduledDate: entry.scheduledDate,
          scheduledTime: entry.scheduledTime
        }));
        return waitingPatients;
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

  async handleDelete(patientId: string) {
    try {
      const config = new Configuration({ basePath: this.apiBase });
      const api = new ConsultationsApi(config);

      await api.deleteConsultation({ requestId: patientId }); // confirm this matches your OpenAPI
      this.waitingPatients = this.waitingPatients.filter(p => p.id !== patientId);
    } catch (err) {
      console.error('Delete failed', err);
      this.errorMessage = 'Failed to delete consultation.';
    }
  }

  handleEdit(patient: any) {
    this.editingPatient = { ...patient }; // Clone to avoid direct mutation
    this.isEditing = true;
  }

  async submitEdit(e: Event) {
    e.preventDefault();
    const config = new Configuration({ basePath: this.apiBase });
    const api = new ConsultationsApi(config);

    try {
      // Extract just the time (HH:mm) from the datetime-local input
      const dateTimeValue = this.editingPatient.date;

      const [scheduledDateStr, scheduledTimeStr] = dateTimeValue.split('T');
      const scheduledDate = new Date(`${scheduledDateStr}T00:00`);
      const scheduledTime = scheduledTimeStr; // still a string like "14:30"

      await api.updateConsultation({
        requestId: this.editingPatient.id,
        consultationUpdate: {
          id: this.editingPatient.id,
          videoLink: this.editingPatient.videoLink,
          scheduledDate: scheduledDate,
          scheduledTime: scheduledTime,
        },
      });

      // Update list
      this.waitingPatients = await this.getWaitingPatientsAsync();

      this.isEditing = false;
      this.editStatusMessage = '';
    } catch (err) {
      console.error('Edit failed:', err);
      this.editStatusMessage = 'Failed to update consultation.';
    }
  }


  render() {
    return (
      <div class="list-container">
        <h2>Consultation Requests</h2>

        {this.errorMessage ? (
          <div class="error">{this.errorMessage}</div>
        ) : (
          <ul>
            {this.waitingPatients.map(patient => (
              <li>
                <div>
                  <div class="flex">
                    <md-icon slot="start">person</md-icon>
                    <strong>{patient.name}</strong>
                  </div>
                  <div>
                    <p>{patient.email}</p>
                    <span>{patient.symptoms}</span>
                    {patient.videoLink && (
                      <p>
                        <a href={patient.videoLink} target="_blank" rel="noopener noreferrer">
                          Video Session Link
                        </a>
                      </p>
                    )}
                    {patient.scheduledDate && (
                      <p>
                        Scheduled: {new Date(patient.scheduledDate).toLocaleDateString()} at {patient.scheduledTime}
                      </p>
                    )}
                  </div>
                </div>
                <div class="btn-group">
                  <button onClick={() => this.handleEdit(patient)}>Edit <md-icon slot="start">edit</md-icon></button>
                  <button onClick={() => this.handleDelete(patient.id)}>Delete <md-icon slot="start">delete</md-icon></button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {this.isEditing && (
          <div class="modal-backdrop">
            <div class="modal">
              <h3>Edit Consultation</h3>
              <div class="detail-wrapper">
                <form onSubmit={e => this.submitEdit(e)}>
                  <h2>Edit Consultation</h2>

                  <label>
                    Date & Time
                    <input
                      type="datetime-local"
                      value={this.editingPatient.date}
                      onInput={e => this.editingPatient.date = (e.target as HTMLInputElement).value}
                    />
                  </label>

                  <label>
                    Notes
                    <textarea
                      value={this.editingPatient.symptoms}
                      onInput={e => this.editingPatient.symptoms = (e.target as HTMLTextAreaElement).value}
                    ></textarea>
                  </label>

                  <label>
                    Video Session Link
                    <input
                      type="url"
                      value={this.editingPatient.videoLink}
                      onInput={e => this.editingPatient.videoLink = (e.target as HTMLInputElement).value}
                    />
                  </label>

                  <div class="modal-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => this.isEditing = false}>Cancel</button>
                  </div>
                </form>
                {this.editStatusMessage && <p class="status">{this.editStatusMessage}</p>}
              </div>
            </div>
          </div>
        )}

      </div>

    );
  }
}
