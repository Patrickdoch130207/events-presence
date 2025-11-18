import Form from "./Form";
import UserTable from "./UserTable";

function App() {
  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8 ">
        <h1 className="font-bold tracking-tight text-3xl mb-0 ">
          Bienvenue à cet événement fastidieux
        </h1>
        <h1 className="text-gray-400 text-sm leading-relaxed font-light text-shadow-md">
          Veuillez marquer votre présence en renseignant les informations
          ci-après :{" "}
        </h1>
      </div>
      <div className=" backdrop-blur-sm bg-white/95 ring-1 ring-gray-200 max-w-2xl mx-auto shadow-2xl rounded-2xl p-8">
        <Form />
      </div>
      <UserTable />
    </div>
  );
}

export default App;
