import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main>
      <div className="flex w-full h-[90vh] items-center justify-center">
        <SignIn />
      </div>
    </main>
  );
}
