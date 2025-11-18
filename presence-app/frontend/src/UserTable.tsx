import { Card, Typography } from "@material-tailwind/react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: number;
  nom: string;
  prenoms: string;
  email: string;
  telephone: string;
  createdAt?: string;
}

function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const TABLE_HEAD = [
    "ID",
    "Nom",
    "Prénoms",
    "Email",
    "Téléphone",
    "Inscription",
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/users");
      if (!res.ok) throw new Error("Erreur lors de la récupération");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur du chargement : ", error);
      toast.error("Erreur lors du chargement des utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const downloadPDF = () => {
    if (users.length === 0) {
      toast.warning("Aucun utilisateur à télécharger");
      return;
    }

    const doc = new jsPDF();
    const tableData = users.map((u) => [
      u.id,
      u.nom,
      u.prenoms,
      u.email,
      u.telephone,
      u.createdAt ? new Date(u.createdAt).toLocaleDateString("fr-FR") : "-",
    ]);

    // appel explicite du plugin
    (autoTable as any)(doc, {
      head: [["ID", "Nom", "Prénoms", "Email", "Téléphone", "Inscription"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [14, 165, 233], textColor: 255 },
      bodyStyles: { textColor: 30 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { top: 22, left: 12, right: 12 },
      startY: 30,
      styles: { fontSize: 9 },
    });

    doc.setFontSize(14);
    doc.text("Liste des utilisateurs", 12, 16);
    const filename = `utilisateurs_${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    doc.save(filename);
    toast.success("✅ PDF téléchargé");
  };

  return (
    <Card className="h-full w-full overflow-auto p-4 mt-8">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h6" className="text-gray-800">
          Utilisateurs enregistrés ({users.length})
        </Typography>
        <div className="flex gap-2">
          <button
            onClick={fetchUsers}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
          >
            Rafraîchir
          </button>
          <button
            onClick={downloadPDF}
            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 flex items-center gap-2"
          >
            Télécharger PDF
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-600">
          Aucun utilisateur enregistré
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="bg-gray-50">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b px-4 py-3 text-sm font-medium text-gray-600"
                  >
                    <Typography variant="small" className="font-normal">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <td className="px-4 py-3 text-sm text-gray-700">{user.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {user.nom}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {user.prenoms}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.telephone}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("fr-FR")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default UserTable;
