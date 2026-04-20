import { generateQRBatch } from "../services/api";

export const createBatch = async (count) => {
  const parsedCount = Number(count);

  if (!Number.isInteger(parsedCount) || parsedCount <= 0) {
    throw new Error("Enter a valid batch size");
  }

  const response = await generateQRBatch(parsedCount);

  return {
    message: response?.message || "Batch generated",
    items: Array.isArray(response?.data) ? response.data : [],
  };
};
