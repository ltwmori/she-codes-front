import { api } from "./api";

export interface Ride {
  ride_id?: number;
  client_id?: number;
  driver_id?: number;
  pick_up_location: string;
  destination: string;
  created_time: string;
  status:
    | "searching"
    | "accepted"
    | "started"
    | "completed"
    | "ordered"
    | "cancelled";
}

export interface IShareRide {
  ride_id: number;
  phone: string;
}

// {
//   "driver_first_name": "string",
//   "driver_last_name": "string",
//   "driver_license_number": "string",
//   "driver_contact_number": "string",
//   "driver_car": {},
//   "pick_up_location": "string",
//   "destination": "string",
//   "pick_up_time": "2023-11-25T16:12:08.476Z",
//   "status": "string"
// }

export interface IAssignDriver {
  driver_first_name: string;
  driver_last_name: string;
  driver_license_number: string;
  driver_contact_number: string;
  driver_car: any;
  pick_up_location: string;
  destination: string;
  pick_up_time: string;
  status:
    | "searching"
    | "accepted"
    | "started"
    | "completed"
    | "ordered"
    | "cancelled";
}

export const bookRide = (
  pick_up_location: string,
  destination: string
): Promise<Ride> => {
  return api
    .post("/rides/book_ride", {
      pick_up_location,
      destination,
    })
    .then((response) => response.data);
};

export const shareRide = (ride_id: number, phone: string) => {
  return api
    .post("/rides/share_ride", {
      ride_id,
      phone,
    })
    .then((response) => response.data);
};

export const voiceBookRide = (voice_message: string) => {
  return api
    .post("/rides/voice_book_ride", { voice_message })
    .then((response) => response.data);
};

export const assignDriver = (ride_id: number): Promise<IAssignDriver> => {
  return api
    .post("/rides/assign_driver", { ride_id })
    .then((response) => response.data);
};
