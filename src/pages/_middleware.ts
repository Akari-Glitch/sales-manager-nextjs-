import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Cookies from "universal-cookie";

export default function middleware(req: NextApiRequest) {
  const cookies = new Cookies(req.cookies);
  let verifyLoggin = cookies.get("loggin");
  let verifyLogout = cookies.get("logout");
  let url = req.url as string;
  console.log(req.cookies);

  if (
    verifyLogout === "true" &&
    (url.includes("http://localhost:3000/sales") ||
      url.includes("http://localhost:3000/inventory") ||
      url.includes("http://localhost:3000/home"))
  ) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (verifyLoggin === "true" && url === "http://localhost:3000/") {
    return NextResponse.redirect("http://localhost:3000/home");
  }
}
