import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser.isAdmin) {
    return NextResponse.json({
      message: "Only Admins allowed",
      status_code: 401,
    });
  }

  const data = await req.json();

  const { category, title, author, content, actualContentLink, imageLink } =
    await data.body;

  const newShort = await db.short.create({
    data: {
      category,
      title,
      author,
      publishDate: Date.now(),
      content,
      actualContentLink,
      imageLink,
      userId: user.id,
    },
  });

  return NextResponse.json({
    message: "Short added successfully",
    short_id: newShort.id,
    status_code: 200,
  });
};
