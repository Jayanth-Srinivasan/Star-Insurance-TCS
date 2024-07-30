import Image from "next/image";
import { Inter } from "next/font/google";
import LoginLayout from "@/layouts/LoginLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"login" | "admin" | "user">("login");
  const router = useRouter();

  const defaultAdmin = {
    username: "admin",
    password: "admin123",
  };

  const handleAuth = async () => {
    try {
      if (
        username === defaultAdmin.username &&
        password === defaultAdmin.password
      ) {
        setRole("admin");
      } else {
        const userRef = doc(db, "users", username);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData?.password === password) {
            setRole("user");
          } else {
            alert("Invalid password. Please try again.");
          }
        } else {
          alert("Contact Admin to get access.");
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <>
      {role === "login" && (
        <LoginLayout>
          <h1 className="text-center w-3/5 md:w-2/5 text-[1.2rem] md:text-[1.5rem] font-semibold">
            Login
          </h1>
          <div className="w-4/5 md:w-2/5 flex items-center justify-center">
            <button className="w-full text-slate-900 p-2 md:p-4 rounded-md border-2 bg-slate-300/20 transition-all duration-300 hover:shadow-md">
              <span>Log in with </span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285f4] via-[#fbbc05] to-[#ea4335]">
                Google
              </span>
            </button>
          </div>
          <p>Or</p>
          <div className="w-4/5 md:w-2/5">
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 bg-slate-300/20 p-2 md:p-4 rounded-md outline-none focus:outline focus:outline-green-500"
            />
          </div>
          <div className="w-4/5 md:w-2/5">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 bg-slate-300/20 p-2 md:p-4 rounded-md outline-none focus:outline focus:outline-green-500"
            />
            <span
              onClick={() => alert("Contact Admin to change your password")}
              className="flex cursor-pointer justify-end mt-2 text-green-500"
            >
              Forgot Password?
            </span>
          </div>
          <div className="w-4/5 md:w-2/5">
            <button
              onClick={handleAuth}
              className="w-full transition-all duration-300 hover:shadow-md bg-green-500 p-2 md:p-4 rounded-md text-white"
            >
              Login
            </button>
          </div>
        </LoginLayout>
      )}
      {role === "admin" && <AdminDashboard />}
      {role === "user" && <UserDashboard />}
    </>
  );
}
