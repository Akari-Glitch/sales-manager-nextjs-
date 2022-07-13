import { Sale } from "../interfaces/Sale";
import { Router, useRouter } from "next/router";

interface Props {
  sales: Sale[];
}

function Home({ sales }: Props) {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.push("/sales/new")}>Create one</button>
    </>
  );
}

export default Home;
