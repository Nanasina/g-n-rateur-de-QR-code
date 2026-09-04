import './App.css'

function App() {

  return (
    <>
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-2xl">

        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            QR CODE GENERATOR
          </h1>

          <p className="text-sm sm:text-base font-normal mt-2">
            Crée ton QR Code rapidement et simplement
          </p>
        </div>

        {/* Contenu principal */}
        <div className="bg-base-100 rounded-2xl shadow-md p-5 sm:p-8">

          <label className="label text-black mb-2">
            Votre contenu
          </label>

          <input
            type="text"
            className="input w-full border-1 border-zinc-600"
            placeholder="Entrez une URL, un texte, un numéro..."
          />

          <div className="flex justify-center mt-6">
            <button className="btn btn-primary btn-soft w-full sm:w-auto sm:btn-wide">
              Générer le QR Code
            </button>
          </div>

        </div>

      </div>

    </div>
    </>
  )
}

export default App
