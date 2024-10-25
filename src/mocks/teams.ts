import { Team } from "@/store/types";
import { mockEmployees } from "./employees";

export const mockTeams: Team[] = [
  {
    id: 1,
    name: 'Team 1',
    members: [
      mockEmployees[2],
      mockEmployees[3]
    ]
  },
  {
    id: 2,
    name: 'Team 2',
    members: [
      mockEmployees[4],
      mockEmployees[5]
    ]
  }
]