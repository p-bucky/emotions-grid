import Link from "next/link";
import "./app-header.css";
import { SERVER_BASE_URL } from "@/constants/base-url";

export const AppHeader = () => {
  return (
    <div className="header_container">
      <div className="flex flex-row justify-end pt-2">
        <Link
          href={`${SERVER_BASE_URL}/api/auth/google`}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
};
