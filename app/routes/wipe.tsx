import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [deleting, setDeleting] = useState(false);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    setDeleting(true);
    for (const file of files) {
      await fs.delete(file.path);
    }
    await kv.flush();
    loadFiles();
    setDeleting(false);
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Authenticated as: {auth.user?.username}
        </h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-700">Existing Files:</h3>
          {files.length === 0 ? (
            <p className="text-gray-500">No files found.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow-sm"
                >
                  <span className="text-gray-800">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors ${deleting || files.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={handleDelete}
          disabled={deleting || files.length === 0}
        >
          {deleting ? "Wiping..." : "Wipe App Data"}
        </button>
      </div>
    </div>


  );
};

export default WipeApp;
