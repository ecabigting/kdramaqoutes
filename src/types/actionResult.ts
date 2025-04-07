export type ActionResult<T = unknown> = {
  success: boolean;
  message: string;
  data?: T; // Optional generic data payload
};
