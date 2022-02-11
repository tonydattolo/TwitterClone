import Link from "next/dist/client/link"

export default function SignupLanding() {
  return (
    <div>
      <h3>Signup Landing Page</h3>
      <p>check your email to activate your account</p>

      <Link href="resendactivationemail">resend activation email</Link>

    </div>
  )
}