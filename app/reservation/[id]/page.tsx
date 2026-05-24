"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
};

export default function ReservationPage() {
  const params = useParams();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [message, setMessage] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");

      const data = await res.json();

      setProducts(data.products);
    } catch {
      setMessage("Failed to load products");
    }
  }

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };

    loadProducts();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          setMessage("Reservation expired");

          setTimeout(() => {
            router.push("/");
          }, 2000);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  async function confirmReservation() {
    if (selectedProducts.length === 0) {
      setMessage("Please select at least one product");
      return;
    }

    try {
      const res = await fetch(
        `/api/reservations/${params.id}/confirm`,
        {
          method: "POST",
        }
      );

      if (res.status === 410) {
        setMessage("Reservation expired");
        return;
      }

      setMessage(
        `${selectedProducts.join(", ")} reservation confirmed successfully`
      );
    } catch {
      setMessage("Confirmation failed");
    }
  }

  async function cancelReservation() {
    try {
      await fetch(
        `/api/reservations/${params.id}/release`,
        {
          method: "POST",
        }
      );

      setMessage("Reservation cancelled");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch {
      setMessage("Cancellation failed");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">

      <h1 className="text-6xl font-bold mb-8">
        Reservation Page
      </h1>

      <p className="text-2xl mb-4">
        Reservation ID: {params.id}
      </p>

      <p className="text-4xl mb-8">
        Time Left: {timeLeft} seconds
      </p>

      <div className="flex gap-6 mb-10">

        <button
          onClick={confirmReservation}
          className="border border-green-500 px-6 py-3 rounded-lg hover:bg-green-500"
        >
          Confirm Purchase
        </button>

        <button
          onClick={cancelReservation}
          className="border border-red-500 px-6 py-3 rounded-lg hover:bg-red-500"
        >
          Cancel
        </button>

      </div>

      <div className="w-full max-w-md">

        <h2 className="text-3xl font-bold mb-4">
          Products
        </h2>

        {products.length > 0 ? (
          <div className="space-y-4">

            {products.map((product) => {
              const isSelected = selectedProducts.includes(product.name);

              return (
                <button
                  key={product.id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedProducts(
                        selectedProducts.filter(
                          (item) => item !== product.name
                        )
                      );
                    } else {
                      setSelectedProducts([
                        ...selectedProducts,
                        product.name,
                      ]);
                    }
                  }}
                  className={`w-full border p-4 rounded-lg text-left transition ${
                    isSelected
                      ? "border-green-500 bg-gray-800"
                      : "border-white hover:bg-gray-800"
                  }`}
                >
                  <p className="text-xl">
                    {product.name}
                  </p>
                </button>
              );
            })}

          </div>
        ) : (
          <p>No products found</p>
        )}

      </div>

      {selectedProducts.length > 0 && (
        <div className="mt-6 text-xl text-green-400">
          <p>Selected Products:</p>

          {selectedProducts.map((product) => (
            <p key={product}>
              • {product}
            </p>
          ))}
        </div>
      )}

      {message && (
        <p className="mt-8 text-2xl text-yellow-400">
          {message}
        </p>
      )}

    </div>
  );
}