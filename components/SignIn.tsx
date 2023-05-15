import { auth } from "@/firebase.config";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

function SignIn() {
  const provider = new GoogleAuthProvider();
  const handleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <>
      <div className="flex signindiv h-full flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl home-text md:text-4xl font-bold lg:text-5xl max-w-2xl text-center mb-5 md:mb-5">
            The only chat system you were finding
          </h1>
          <button
            onClick={handleSignIn}
            className="bg-blue-600 text-white rounded-md px-6 py-2.5"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
