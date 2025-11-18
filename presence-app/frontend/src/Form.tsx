import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Form() {
  const [nom, setNom] = useState<string>("");
  const [prenoms, setPrenoms] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [numero, setNumero] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Validation personnalisée AVANT soumission
    if (!nom.trim() || !prenoms.trim() || !email.trim() || !numero.trim()) {
      toast.warning("Veuillez remplir tous les champs");
      return;
    }

    try {
      const data = { nom, prenoms, email, numero };

      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Utilisateur enregistré avec succès");
        setNom("");
        setPrenoms("");
        setEmail("");
        setNumero("");
      } else {
        toast.error(`Erreur: ${result.error}`);
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'enregistrement");
      console.error("Erreur:", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form
        onSubmit={handleSubmit}
        className="px-6 py-8 space-y-6 max-w-md mx-auto"
        noValidate
      >
        <div>
          <label className="text-gray-700 block mb-2 text-sm font-bold text-heading">
            Nom
          </label>
          <input
            type="text"
            className="border-gray-300 focus:bg-white focus:shadow-md bg-gray-50 transition-all duration-1000 bg-neutral-secondary-medium rounded-xl border border-default-medium text-heading text-sm focus:ring-2 focus:ring-blue-500 focus:border-b-blue-500 block w-full px-2.5 py-2 shadow-sm placeholder:text-body placeholder:text-gray-400 focus:outline-none"
            placeholder="Entrez votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-700 block mb-2 text-sm font-bold text-heading">
            Prénoms
          </label>
          <input
            type="text"
            className="border-gray-300 focus:bg-white focus:shadow-md bg-gray-50 transition-all duration-1000 bg-neutral-secondary-medium rounded-xl border border-default-medium text-heading text-sm focus:ring-2 focus:ring-blue-500 focus:border-b-blue-500 block w-full px-2.5 py-2 shadow-sm placeholder:text-body placeholder:text-gray-400 focus:outline-none"
            placeholder="Entrez votre/vos prénoms"
            value={prenoms}
            onChange={(e) => setPrenoms(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold text-gray-700 text-heading">
            Email
          </label>
          <input
            type="email"
            className="border-gray-300 focus:bg-white focus:shadow-md bg-gray-50 transition-all duration-1000 bg-neutral-secondary-medium rounded-xl border border-default-medium text-heading text-sm focus:ring-2 focus:ring-blue-500 focus:border-b-blue-500 block w-full px-2.5 py-2 shadow-sm placeholder:text-body placeholder:text-gray-400 focus:outline-none"
            placeholder="Entrez votre mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-700 block mb-2 text-sm font-bold text-heading">
            Numéro de téléphone
          </label>
          <PhoneInput
            containerClass="w-full"
            inputClass="!border-gray-300 focus:!bg-white focus:!shadow-md !bg-gray-50 !transition-all !duration-1000 !rounded-xl !border !text-sm focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !block !w-full !pr-2.5 !pl-14 !py-2 !shadow-sm !h-auto"
            buttonClass="!border-gray-300 !bg-gray-50 !border !border-r-0 !rounded-l-xl !shadow-sm hover:!bg-gray-100 !transition-all !duration-1000 focus:!bg-white"
            dropdownClass="!shadow-xl !border !border-gray-200 !rounded-xl !max-h-48"
            searchClass="!bg-gray-50 !border !border-gray-300 !rounded-lg !px-2 !py-2 !m-2 !text-sm focus:!bg-white focus:!border-blue-500 focus:!outline-none !transition-all !duration-1000"
            placeholder="Votre numéro de téléphone"
            country={"bj"}
            value={numero}
            onChange={(numero) => setNumero(numero)}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs leading-5 rounded-base text-sm px-4 py-3.5 focus:outline-none bg-sky-500 rounded-2xl text-amber-50 mt-8 hover:bg-blue-600 active:scale-95 hover:shadow-xl font-semibold tracking-wide"
          >
            Soumettre
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
