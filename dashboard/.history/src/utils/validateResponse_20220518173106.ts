import { HttpResponse } from "@/modules/shared/http/ApiHelper/ApiHelper.types";

function validateResponse(response: HttpResponse<any>): boolean {
  if (response.statusCode >= 300 || response.statusCode < 200) return false;
  return true;
}
