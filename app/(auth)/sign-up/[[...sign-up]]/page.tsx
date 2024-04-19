import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main>
      <div className="flex w-full h-[80vh] items-center justify-center">
        <SignUp />
      </div>
    </main>
  );
}
