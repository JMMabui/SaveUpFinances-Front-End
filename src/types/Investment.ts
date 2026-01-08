export interface Investment {
  id?: string; // Assuming an ID for updates; adjust if not needed
  investimentName: string; // Note: Typo in original code ("investiment" instead of "investment"); consider fixing consistently
  amount: number;
  investmentTypeId: string;
  investmentGoalId: string | null;
  notes: string | null;
  userId?: string; // For creation; optional if not always present
}