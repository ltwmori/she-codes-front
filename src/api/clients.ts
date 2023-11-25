import { api } from "./api";

export interface IRideHistory {
  id: number;
  client_id: number;
  driver_id: number;
  pick_up_location: string;
  destination: string;
  status: string;
  created_time: string;
  pick_up_time: string;
  start_time: string;
  end_time: string;
  notes: string;
  is_inclusive: boolean;
  car_type: string;
}

export const getRidesHistory = (): Promise<IRideHistory[]> => {
  return api.get("/clients/rides").then((res) => res.data);
};
