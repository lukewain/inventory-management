import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main>
      <div className="flex w-full h-[80vh] items-center justify-center">
        <SignUp />
      </div>
    </main>
  );
}
