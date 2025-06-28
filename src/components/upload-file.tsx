"use client"

import { useState } from "react"
import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Upload } from "lucide-react"
import { Cobblemon } from "@/models/pokemon.model"

export default function UploadExcel() {
  const [isLoading, setIsLoading] = useState(false)
  const [jsonData, setJsonData] = useState<any[] | null>(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setMessage("")
    setError("")
    setJsonData(null)

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data, { type: "array" })

      // Solo usamos la primera hoja
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]

      // Convertimos a JSON usando la primera fila como claves
      const json: Cobblemon[] = XLSX.utils.sheet_to_json(sheet, { defval: null })

      setJsonData(json)
      console.log("json", json)

      setMessage("Archivo procesado correctamente.")
    } catch (err) {
      console.error(err)
      setError("Error al procesar el archivo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 max-w-xl">
      <div className="flex items-center gap-2">
        <Input type="file" accept=".xlsx" onChange={handleFileChange} disabled={isLoading} />
        <Button disabled>
          <Upload className="w-4 h-4 mr-2" />
          Subir
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Loader2 className="animate-spin w-4 h-4" />
          <span>Procesando archivo...</span>
        </div>
      )}

      {message && (
        <Alert variant="default">
          <AlertTitle>✅ Éxito</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>❌ Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {jsonData && (
        <pre className="text-xs bg-muted p-4 rounded overflow-x-auto max-h-[400px] overflow-y-auto">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}
    </div>
  )
}
