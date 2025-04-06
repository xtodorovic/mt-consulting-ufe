import { Component, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'consultation-detail',
  styleUrl: 'consultation-detail.css',
  shadow: true,
})
export class ConsultationDetail {
  @Prop() consultationId: number;
  @State() date: string = '2025-04-10';
  @State() notes: string = '';
  @State() videoLink: string = '';

  handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log('Saving consultation', { date: this.date, notes: this.notes, videoLink: this.videoLink });
    // TODO: Send update to backend
  };

  render() {
    return (
      <div class="detail-wrapper">
        <form onSubmit={this.handleSubmit}>
          <h2>Edit Consultation</h2>

          <label>
            Date & Time
            <input
              type="datetime-local"
              value={this.date}
              onInput={e => this.date = (e.target as HTMLInputElement).value}
            />
          </label>

          <label>
            Notes
            <textarea
              value={this.notes}
              onInput={e => this.notes = (e.target as HTMLTextAreaElement).value}
            ></textarea>
          </label>

          <label>
            Video Session Link
            <input
              type="url"
              value={this.videoLink}
              onInput={e => this.videoLink = (e.target as HTMLInputElement).value}
            />
          </label>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }
}
