import { useState } from 'react'
import {Globe, FileType, Phone, Mail, ArrowDownToLine} from 'lucide-react'
import './App.css'

type QRType = 'url' | 'text' | 'email' | 'phone'

function App() {
  const [content, setContent] = useState('')
  const [type, setType] = useState<QRType>('url')
  const [qrCode, setQrCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const getPlaceholder = () => {
    switch (type) {
      case 'url':
        return 'https://exemple.com'
      case 'text':
        return 'Entrez votre texte...'
      case 'email':
        return 'exemple@email.com'
      case 'phone':
        return '+261 34 00 000 00'
    }
  }

  const prepareContent = () => {
    switch (type) {
      case 'email':
        return `mailto:${content}`
      case 'phone':
        return `tel:${content}`
      default:
        return content
    }
  }

  const generateQRCode = async () => {
    if (!content.trim()) {
      setError('Veuillez entrer un contenu.')
      return
    }

    setError('')
    setQrCode('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/generation/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: prepareContent(),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Une erreur est survenue.')
        return
      }

      setQrCode(data.qr_code)
    } catch (error) {
      console.error(error)
      setError('Impossible de contacter le serveur.')
    } finally {
      setLoading(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCode) return

    const link = document.createElement('a')
    link.href = qrCode
    link.download = 'mon-qr-code.png'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetForm = () => {
    setContent('')
    setQrCode('')
    setError('')
    setType('url')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/10 px-4 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-10">

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-content shadow-lg mb-5">
            <span className="text-3xl">▦</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            QR Code Generator
          </h1>

          <p className="text-base-content/60 mt-3 max-w-md mx-auto">
            Crée facilement un QR Code à partir d'une URL, d'un texte,
            d'un email ou d'un numéro de téléphone.
          </p>

        </header>

        {/* MAIN CARD */}
        <div className="bg-base-100/90 backdrop-blur rounded-3xl shadow-2xl border border-base-300 overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* LEFT - FORM */}
            <div className="p-6 sm:p-8 lg:p-10">

              <div className="mb-7">
                <h2 className="text-xl font-bold">
                  Créer un QR Code
                </h2>

                <p className="text-sm text-base-content/60 mt-1">
                  Choisissez un type et entrez votre contenu.
                </p>
              </div>

              {/* TYPE */}
              <label className="text-sm font-semibold mb-3 block">
                Type de contenu
              </label>

              <div className="grid grid-cols-2 gap-3 mb-7">

                <button
                  onClick={() => {
                    setType('url')
                    setContent('')
                    setQrCode('')
                    setError('')
                  }}
                  className={`btn h-auto min-h-16 flex-col gap-1 ${
                    type === 'url'
                      ? 'btn-primary'
                      : 'btn-outline'
                  }`}
                >
                  <span className="text-xl">
                    <Globe />
                  </span>
                  <span>URL</span>
                </button>

                <button
                  onClick={() => {
                    setType('text')
                    setContent('')
                    setQrCode('')
                    setError('')
                  }}
                  className={`btn h-auto min-h-16 flex-col gap-1 ${
                    type === 'text'
                      ? 'btn-primary'
                      : 'btn-outline'
                  }`}
                >
                  <span className="text-xl">
                    <FileType />
                  </span>
                  <span>Texte</span>
                </button>

                <button
                  onClick={() => {
                    setType('email')
                    setContent('')
                    setQrCode('')
                    setError('')
                  }}
                  className={`btn h-auto min-h-16 flex-col gap-1 ${
                    type === 'email'
                      ? 'btn-primary'
                      : 'btn-outline'
                  }`}
                >
                  <span className="text-xl">
                    <Mail />
                  </span>
                  <span>Email</span>
                </button>

                <button
                  onClick={() => {
                    setType('phone')
                    setContent('')
                    setQrCode('')
                    setError('')
                  }}
                  className={`btn h-auto min-h-16 flex-col gap-1 ${
                    type === 'phone'
                      ? 'btn-primary'
                      : 'btn-outline'
                  }`}
                >
                  <span className="text-xl"><Phone /></span>
                  <span>Téléphone</span>
                </button>

              </div>

              {/* INPUT */}
              <label className="text-sm font-semibold mb-3 block">
                Votre contenu
              </label>

              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={getPlaceholder()}
                className="input input-lg w-full border-base-300 focus:border-primary focus:outline-none"
              />

              {error && (
                <div className="alert alert-error mt-3 text-sm">
                  <span>{error}</span>
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">

                <button
                  onClick={generateQRCode}
                  disabled={loading}
                  className="btn btn-primary flex-1"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Génération...
                    </>
                  ) : (
                    <>
                      Générer le QR Code
                    </>
                  )}
                </button>

                <button
                  onClick={resetForm}
                  className="btn btn-ghost"
                >
                  Réinitialiser
                </button>

              </div>

            </div>

            {/* RIGHT - RESULT */}
            <div className="bg-base-200/60 p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center min-h-[400px]">

              {!qrCode ? (
                <div className="text-center">

                  <div className="w-32 h-32 mx-auto rounded-3xl border-2 border-dashed border-base-content/20 flex items-center justify-center mb-5">
                    <span className="text-5xl opacity-30">▦</span>
                  </div>

                  <h3 className="font-semibold text-lg">
                    Votre QR Code apparaîtra ici
                  </h3>

                  <p className="text-sm text-base-content/50 mt-2 max-w-xs">
                    Entrez votre contenu puis cliquez sur
                    « Générer le QR Code ».
                  </p>

                </div>
              ) : (
                <div className="text-center w-full">

                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-5">
                    QR Code généré
                  </p>

                  <div className="inline-block bg-white p-5 rounded-2xl shadow-lg">
                    <img
                      src={qrCode}
                      alt="QR Code généré"
                      className="w-52 h-52 sm:w-60 sm:h-60"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">

                    <button
                      onClick={downloadQRCode}
                      className="btn btn-primary"
                    >
                      <ArrowDownToLine />
                       Télécharger
                    </button>

                    <button
                      onClick={resetForm}
                      className="btn btn-outline"
                    >
                      Nouveau QR Code
                    </button>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-base-content/40 mt-6">
          Simple • Rapide • Gratuit
        </p>

      </div>
    </div>
  )
}

export default App
