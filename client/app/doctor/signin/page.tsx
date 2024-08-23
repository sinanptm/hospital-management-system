'use server'
import SigninForm from "@/components/forms/doctor/SigninForm";
import Image from "next/image";
import Link from "next/link";
const SignIn = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-[496px]">
          <Image
            src={"/assets/icons/logo-full.svg"}
            width={1000}
            height={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <SigninForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 AVM Ayurveda&apos;s
            </p>
            <Link href={"/patient/signin"} className="text-green-500">
              Patient
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default SignIn;