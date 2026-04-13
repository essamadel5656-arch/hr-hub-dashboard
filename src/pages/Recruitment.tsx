import { useState } from "react";
import { MapPin, Clock, Users, GripVertical } from "lucide-react";
import { candidates as initialCandidates, jobPostings, type Candidate } from "@/data/mockData";

const stages: Candidate["stage"][] = ["Applied", "Screening", "Interview", "Offer", "Hired"];
const stageColors: Record<string, string> = {
  Applied: "border-l-primary",
  Screening: "border-l-info",
  Interview: "border-l-warning",
  Offer: "border-l-success",
  Hired: "border-l-success",
};

export default function Recruitment() {
  const [candidateList, setCandidateList] = useState(initialCandidates);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (id: string) => setDraggedId(id);

  const handleDrop = (stage: Candidate["stage"]) => {
    if (!draggedId) return;
    setCandidateList(prev => prev.map(c => (c.id === draggedId ? { ...c, stage } : c)));
    setDraggedId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Recruitment</h1>

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const cards = candidateList.filter(c => c.stage === stage);
          return (
            <div
              key={stage}
              className="kanban-column"
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(stage)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{stage}</h3>
                <span className="text-xs bg-card text-muted-foreground px-2 py-0.5 rounded-full">{cards.length}</span>
              </div>
              {cards.map(c => (
                <div
                  key={c.id}
                  className={`kanban-card border-l-4 ${stageColors[stage]}`}
                  draggable
                  onDragStart={() => handleDragStart(c.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.position}</p>
                    </div>
                    <GripVertical size={14} className="text-muted-foreground mt-0.5" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{c.appliedDate}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Job Postings */}
      <div className="kpi-card">
        <h2 className="text-base font-semibold mb-4">Open Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobPostings.map(job => (
            <div key={job.id} className="p-4 border border-border rounded-lg hover:border-primary/40 transition-colors">
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.department}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {job.applicants} applicants</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
