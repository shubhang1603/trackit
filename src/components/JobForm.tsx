import { createJob } from "@/actions/jobs";

export default function JobForm() {
  return (
    <form
      action={createJob}
      className="stack"
    >
      <input
        name="company"
        placeholder="Company"
        required
        className="dashboard-input form-field"
      />

      <input
        name="role"
        placeholder="Role"
        required
        className="dashboard-input form-field"
      />

      <select
        name="status"
        className="dashboard-select form-field"
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <textarea
        name="notes"
        placeholder="Notes"
        rows={4}
        className="dashboard-textarea form-field"
      />

      <button
        type="submit"
        className="primary-button"
      >
        Add job
      </button>
    </form>
  );
}