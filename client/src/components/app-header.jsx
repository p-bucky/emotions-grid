import "./app-header.css";

export const AppHeader = () => {
  return (
    <div className="header_container">
      <div className="flex flex-row justify-end pt-2">
        <a
          href="#"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </a>
      </div>
    </div>
  );
};
