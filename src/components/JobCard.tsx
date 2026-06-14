"use client";

import { useState } from "react";
import { deleteJob, updateJob } from "@/actions/jobs";


type Job = {
  id: number;
  company: string;
  role: string;
  status: string;
  notes: string | null;
  createdAt: Date | null;
};

function getStatusColor(status: string) {
  switch (status) {
    case "Applied":
      return "#2563eb";
    case "Interview":
      return "#f59e0b";
    case "Offer":
      return "#16a34a";
    case "Rejected":
      return "#dc2626";
    default:
      return "#6b7280";
  }
}

export default function JobCard({
  job,
}: {
  job: Job;
}) {
  const [editing, setEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  if (editing) {
    return (
      <div className="job-card glass-card">
        <form
          action={async (formData) => {
            await updateJob(formData);
            setEditing(false);
          }}
          className="stack"
        >
          <input
            type="hidden"
            name="id"
            value={job.id}
          />

          <input
            name="company"
            defaultValue={job.company}
            className="dashboard-input form-field"
          />

          <input
            name="role"
            defaultValue={job.role}
            className="dashboard-input form-field"
          />

          <select
            name="status"
            defaultValue={job.status}
            className="dashboard-select form-field"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <textarea
            name="notes"
            defaultValue={job.notes || ""}
            className="dashboard-textarea form-field"
          />

          <div className="job-actions">
            <button type="submit" className="primary-button">
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditing(false)}
              className="ghost-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

if (showDelete) {
  return (
    <div className="job-card glass-card">
      <div className="danger-panel">
        <h3>Delete application?</h3>

        <p>
          This will permanently remove the record for <strong>{job.company}</strong> and all associated notes.
        </p>
      </div>

      <div className="job-actions">
        <button
          onClick={() => setShowDelete(false)}
          className="ghost-button"
        >
          Cancel
        </button>

        <form
          action={async () => {
            await deleteJob(job.id);
          }}
        >
          <button
            type="submit"
            className="danger-button"
          >
            Confirm Delete
          </button>
        </form>
      </div>
    </div>
  );
}

  return (
    <div className="job-card glass-card">
      <div className="job-card-header">
        <div className="job-summary">
          <h3 className="job-company">{job.company}</h3>

          <p className="job-role">{job.role}</p>
        </div>

        <span
          className="status-pill"
          style={{ backgroundColor: getStatusColor(job.status) }}
        >
          {job.status}
        </span>
      </div>

      <p className="job-notes">
        {job.notes || "No notes provided"}
      </p>
      <p className="job-meta">
        Applied on{" "}
        {job.createdAt
          ? new Date(job.createdAt).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )
          : "N/A"}
      </p>

      <div className="job-actions">
        <button
          onClick={() => setEditing(true)}
          className="secondary-button"
        >
          Edit
        </button>

        <button
          onClick={() => setShowDelete(true)}
          className="danger-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}