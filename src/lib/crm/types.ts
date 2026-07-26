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
  address: string | null;
  alternate_phone: string | null;
  id_proof_type: string | null;
  id_proof_number: string | null;
  date_of_birth: string | null;
  occupation: string | null;
  referred_by: string | null;
  source: string | null;
  practice_area: string | null;
  is_nri: boolean;
  nri_country: string | null;
  stage: ClientStage;
  notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export const LITIGATION_STAGES = [
  "Pre-filing",
  "Filed",
  "Evidence",
  "Arguments",
  "Judgment Reserved",
  "Disposed",
] as const;

export type Matter = {
  id: string;
  client_id: string;
  practice_area: string | null;
  opposing_party: string | null;
  opposing_advocate: string | null;
  court: string | null;
  case_number: string | null;
  under_section: string | null;
  filing_date: string | null;
  next_hearing_date: string | null;
  litigation_stage: string | null;
  status: MatterStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
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
  deleted_at: string | null;
};

export const TRASH_RETENTION_DAYS = 7;
