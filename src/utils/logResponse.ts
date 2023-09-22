export default function logResponse(response: Response): Response {
  // eslint-disable-next-line no-console
  console.log(response.status, response.statusText);
  return response;
}
