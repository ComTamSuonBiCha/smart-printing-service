const db = require("../routes/database");

async function addPrinter(data) {
  if (data.building == null || data.room == null || data.model == null) {
    throw new Error("Missing required");
  }
  try {
    const dataToInsert = [
      data.building,
      data.room,
      data.model,
      data.is_active ?? true,
      data.paper ?? 0,
    ];
    console.log(dataToInsert);
    // @ts-ignore
    const [result, _] = await db.execute(
      "INSERT INTO PRINTER SET BUILDING = ?, ROOM = ?, MODEL = ?, IS_ACTIVE = ?, PAPER = ?",
      dataToInsert
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deletePrinter(data) {
  try {
    if (data.printerID == null) {
      throw new Error("Missing required");
    }

    if (typeof data.printerID !== "number") {
      throw new Error("Invalid Data Input");
    }
    const dataToInsert = [data.printerID];
    // @ts-ignore
    const [result, _] = await db.execute(
      `DELETE FROM PRINTER 
         WHERE PRINTER_ID = ?`,
      dataToInsert
    );
    return { message: "Printer deleted successfully" };
  } catch (err) {
    console.error(`Error deleting printer with ID ${data.printerID}:`, err);
    throw err;
  }
}

async function getAllPrinter(data) {
  const pageSize = Number(data.pageSize);
  const offset = Number(data.offset);
  if (isNaN(pageSize) || isNaN(offset)) {
    throw new Error(
      "Invalid Data Input: pageSize and offset must be valid numbers"
    );
  }
  try {
    const dataToInsert = [data.pageSize, data.offset];
    // @ts-ignore
    const [result, _] = await db.execute(
      `SELECT * 
        FROM PRINTER 
        ORDER BY PRINTER_ID
        LIMIT ? OFFSET ?`,
      dataToInsert
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function getPrinterByID(printerID) {
  try {
    if (isNaN(printerID)) {
      throw new Error("Invalid Data Input: printerID must be a number");
    }
    const dataToInsert = [printerID];
    // @ts-ignore
    const [result, _] = await db.execute(
      `SELECT * 
        FROM PRINTER 
        WHERE PRINTER_ID = ?`,
      dataToInsert
    );
    return result;
  } catch (err) {
    console.error("Error fetching printer:", err);
    throw err;
  }
}

async function updatePrinterPage(data) {
  try {
    if (
      !data.printerID ||
      typeof data.printerID !== "number" ||
      typeof data.paper !== "number"
    ) {
      throw new Error("Invalid Data Input");
    }
    const dataToInsert = [data.paper, data.printerID || 0];

    // @ts-ignore
    const [result, _] = await db.execute(
      `UPDATE PRINTER 
        SET PAPER = ? 
        WHERE PRINTER_ID = ?`,
      dataToInsert
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function updatePrinterStatus(data) {
  try {
    if (
      !data.printerID ||
      typeof data.printerID !== "number" ||
      typeof data.status !== "boolean"
    ) {
      throw new Error("Invalid Data Input");
    }
    const dataToInsert = [data.status, data.printerId];

    // @ts-ignore
    const [result, _] = await db.execute(
      `UPDATE PRINTER 
          SET IS_ACTIVE = ? 
          WHERE PRINTER_ID = ?`,
      dataToInsert
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  addPrinter,
  getAllPrinter,
  getPrinterByID,
  updatePrinterPage,
  updatePrinterStatus,
  deletePrinter,
};
