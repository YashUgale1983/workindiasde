import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id || !user.email) {
    throw Error("Unauthorised");
  }

  // check is the user exists in the database
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  console.log("here : ", dbUser);

  if (!dbUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
        username: user.email.split("@")[0],
        isAdmin: false,
      },
    });
  }

  return { success: true };
};
