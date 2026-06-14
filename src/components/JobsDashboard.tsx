"use client";

import { useState } from "react";
import JobCard from "./JobCard";



export default function JobsDashboard({
  jobs,
}: {
  jobs: any[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const counts = {
  Applied: jobs.filter(
    (j) => j.status === "Applied"
  ).length,

  Interview: jobs.filter(
    (j) => j.status === "Interview"
  ).length,

  Offer: jobs.filter(
    (j) => j.status === "Offer"
  ).length,

  Rejected: jobs.filter(
    (j) => j.status === "Rejected"
  ).length,
};

  const filteredJobs = jobs
  .filter((job) => {
    const matchesSearch =
      job.company
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : job.status === filter;

    return matchesSearch && matchesFilter;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "Company":
        return a.company.localeCompare(
          b.company
        );

      case "Oldest":
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );

      case "Newest":
      default:
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
    }
  });

  return (
    <div className="search-wrap">
      <div className="card-header">
        <div>
          <h2 className="card-title">Applications</h2>
          <p className="card-copy">Search, filter, and sort your pipeline.</p>
        </div>
      </div>

      <input
        placeholder="Search company..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="dashboard-input form-field"
      />

      <div>
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="dashboard-select form-field"
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Company</option>
        </select>
      </div>

      <div className="toolbar">
        {[
          "All",
          "Applied",
          "Interview",
          "Offer",
          "Rejected",
        ].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            data-active={filter === status}
            className="chip-button"
          >
            {status === "All"
              ? `All (${jobs.length})`
              : `${status} (${counts[status as keyof typeof counts]})`}
          </button>
        ))}
      </div>

      <div className="results-grid">
        {filteredJobs.length === 0 ? (
          <div className="empty-state glass-card">
            <h3>No jobs found</h3>
            <p>Try a different company, filter, or sort option.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))
        )}
      </div>
    </div>
  );
}