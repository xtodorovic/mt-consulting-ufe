import { Component, h, State } from '@stencil/core';
import { ConsultationsApi, Configuration } from '../../api/consulting-requests';

@Component({
  tag: 'consultation-form',
  styleUrl: 'consultation-form.css',
  shadow: true,
})
export class ConsultationForm {
  @State() name: string = '';
  @State() email: string = '';
  @State() symptoms: string = '';
  @State() statusMessage: string = '';

  apiBase: string = 'http://localhost:8080/api';

  handleSubmit = async (e: Event) => {
    e.preventDefault();

    const formData = {
      id: null, // or 0, depending on your backend expectations
      name: this.name,
      email: this.email,
      symptoms: this.symptoms,
    };

    try {
      const config = new Configuration({ basePath: this.apiBase });
      const formApi = new ConsultationsApi(config);

      // The exact method name may vary depending on your OpenAPI generator output
      await formApi.submitConsultingForm({ consultation: formData });

      this.statusMessage = 'Form submitted successfully!';
      this.name = '';
      this.email = '';
      this.symptoms = '';
    } catch (error) {
      console.error('Form submission failed:', error);
      this.statusMessage = 'Submission failed. Please try again later.';
    }
  };

  render() {
    return (
      <div class="form-wrapper">
        <form onSubmit={this.handleSubmit}>
          <h2>Request a Remote Consultation</h2>

          <label>
            Your Name
            <input
              type="text"
              value={this.name}
              onInput={e => this.name = (e.target as HTMLInputElement).value}
              required
            />
          </label>

          <label>
            Your Email
            <input
              type="email"
              value={this.email}
              onInput={e => this.email = (e.target as HTMLInputElement).value}
              required
            />
          </label>

          <label>
            Describe Your Symptoms
            <textarea
              value={this.symptoms}
              onInput={e => this.symptoms = (e.target as HTMLTextAreaElement).value}
              required
            ></textarea>
          </label>

          <button type="submit">Submit Request</button>
        </form>

        {this.statusMessage && <p class="status">{this.statusMessage}</p>}
      </div>
    );
  }
}
