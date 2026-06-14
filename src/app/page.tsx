import { db } from "@/db";
import { jobs } from "@/db/schema";

import JobForm from "@/components/JobForm";
import JobsDashboard from "@/components/JobsDashboard";
import StatCard from "@/components/StatCard";

export default async function Home() {
  const allJobs = await db.select().from(jobs);

  const appliedCount = allJobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewCount = allJobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offerCount = allJobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejectedCount = allJobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const successRate =
    allJobs.length === 0
      ? 0
      : Math.round(
          (offerCount / allJobs.length) * 100
        );

  const activePipeline =
    appliedCount + interviewCount + offerCount;

  return (
    <main className="dashboard-shell">
      <section className="dashboard-hero">
        <div className="eyebrow">Application Command Center</div>

        <div>
          <h1 className="dashboard-title">Job Tracker Dashboard</h1>

          <p className="dashboard-copy">
            Track applications, focus on the strongest leads, and keep your interview pipeline organized in a clean workspace designed for speed.
          </p>
        </div>

        <div className="hero-grid">
          <div className="hero-panel">
            <p className="hero-panel-label">Active pipeline</p>
            <p className="hero-panel-value">{activePipeline}</p>
            <p className="hero-panel-note">
              Total jobs progressing through applied, interview, and offer stages.
            </p>
          </div>

          <div className="hero-panel">
            <p className="hero-panel-label">Success rate</p>
            <p className="hero-panel-value">{successRate}%</p>
            <p className="hero-panel-note">
              Offers won compared with total tracked applications.
            </p>
          </div>
        </div>
      </section>

      <section className="stack section-card">
        <div className="section-heading">
          <div>
            <h2 className="section-title">Performance snapshot</h2>
            <p className="section-subtitle">Quick view of the current search funnel.</p>
          </div>
        </div>

        <div className="stat-grid">
        <StatCard
          title="Total Jobs"
          value={allJobs.length}
        />

        <StatCard
          title="Applied"
          value={appliedCount}
        />

        <StatCard
          title="Interview"
          value={interviewCount}
        />

        <StatCard
          title="Offers"
          value={offerCount}
        />

        <StatCard
          title="Rejected"
          value={rejectedCount}
        />
        </div>
      </section>

      <section className="surface-card section-card">
        <div className="section-heading">
          <div>
            <h2 className="section-title">Offer momentum</h2>
            <p className="section-subtitle">Success rate across all tracked applications.</p>
          </div>

          <div className="eyebrow">{successRate}% win rate</div>
        </div>

        <div className="progress-track" aria-label="Offer success rate">
          <div
            className="progress-fill"
            style={{ width: `${successRate}%` }}
          />
        </div>
      </section>

      <section className="content-grid">
        <div className="glass-card section-card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Add a role</h2>
              <p className="card-copy">Capture a new opportunity before the details get lost.</p>
            </div>
          </div>

          <JobForm />
        </div>

        <div className="glass-card section-card">
          {allJobs.length === 0 ? (
            <div className="empty-state">
              <h3>No jobs added yet</h3>
              <p>Add your first application to start tracking the pipeline.</p>
            </div>
          ) : (
            <JobsDashboard jobs={allJobs} />
          )}
        </div>
      </section>
    </main>
  );
}