export async function GET(request) {

  console.log("ALL COOKIES:", request.cookies.getAll());

  const token = request.cookies.get("token")?.value;
  console.log("TOKEN:", token);

}