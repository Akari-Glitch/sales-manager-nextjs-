import React from 'react'
import { Router, useRouter } from "next/router";
import { Sale } from '../../interfaces/Sale';

interface Props {
  sales: Sale[];
}

function Index({ sales }: Props) {
  const router = useRouter();

  return (
    <button onClick={() => router.push("/sales/new")}>Create one</button>

  )
}

export default Index 