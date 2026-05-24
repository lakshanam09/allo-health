"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [message, setMessage] = useState("");

  async function reserveWarehouse() {
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("Reservation failed");
        return;
      }

      router.push(`/reservation/${data.id}`);

    } catch {
      setMessage("Server error");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-6xl font-bold mb-10">
        Warehouse Reservation System
      </h1>

      <p className="text-2xl mb-10">
        Click below to reserve a warehouse slot.
      </p>

      <button
        onClick={reserveWarehouse}
        className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black"
      >
        Reserve Warehouse
      </button>

      {message && (
        <p className="mt-6 text-red-500 text-lg">
          {message}
        </p>
      )}

    </div>
  );
}