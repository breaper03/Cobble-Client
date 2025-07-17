import * as XLSX from "xlsx";

export async function parseExcelToJson(
  file: File,
): Promise<Record<string, any[]>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const result: Record<string, any[]> = {};

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: null }); // defval para evitar undefined
        result[sheetName] = json;
      });

      resolve(result);
    };

    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
}
