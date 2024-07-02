import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>main page</div>
      <div>
        <LoginLink>Sign in</LoginLink>
      </div>

      <div>
        <RegisterLink>Sign up</RegisterLink>
      </div>
    </main>
  );
}
