export type ClientStage =
  | "new"
  | "contacted"
  | "consultation_scheduled"
  | "retained"
  | "closed_won"
  | "closed_lost";

export const CLIENT_STAGES: { value: ClientStage; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "consultation_scheduled", label: "Consultation Scheduled" },
  { value: "retained", label: "Retained" },
  { value: "closed_won", label: "Closed (Won)" },
  { value: "closed_lost", label: "Closed (Lost)" },
];

export type MatterStatus = "active" | "on_hold" | "closed";

export type Client = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  source: string | null;
  practice_area: string | null;
  is_nri: boolean;
  stage: ClientStage;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Matter = {
  id: string;
  client_id: string;
  practice_area: string | null;
  opposing_party: string | null;
  court: string | null;
  case_number: string | null;
  next_hearing_date: string | null;
  status: MatterStatus;
  created_at: string;
  updated_at: string;
};

export type MatterNote = {
  id: string;
  matter_id: string;
  author_id: string | null;
  body: string;
  created_at: string;
};

export type Appointment = {
  id: string;
  client_id: string | null;
  matter_id: string | null;
  title: string;
  scheduled_at: string;
  location: string | null;
  notes: string | null;
  created_at: string;
};
