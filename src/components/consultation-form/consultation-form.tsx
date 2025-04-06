import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'consultation-form',
  styleUrl: 'consultation-form.css',
  shadow: true,
})
export class ConsultationForm {
  @State() name: string = '';
  @State() symptoms: string = '';

  handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log('Submitting consultation', { name: this.name, symptoms: this.symptoms });
    // TODO: Send data to API
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
            Describe Your Symptoms
            <textarea
              value={this.symptoms}
              onInput={e => this.symptoms = (e.target as HTMLTextAreaElement).value}
              required
            ></textarea>
          </label>

          <button type="submit">Submit Request</button>
        </form>
      </div>
    );
  }
}
