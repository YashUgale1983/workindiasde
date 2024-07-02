"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/authcallback");
        console.log(response);
        if (!response.ok) {
          router.push("/api/auth/login");
        }

        if (response.ok) {
          router.push(origin ? `/${origin}` : "/dashboard");
        }

        if (data.success) {
          // user is synced to db
          router.push(origin ? `/${origin}` : "/dashboard");
        } else {
          router.push("/api/auth/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/api/auth/login");
      }
    };

    fetchData();
  }, [origin, router]);

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-semibold text-xl">Loading your account...</h3>
      </div>
    </div>
  );
};

export default Page;
