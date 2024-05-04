import { db } from "@/lib/db";
import { errHandler } from "@/utils/errHandler";
import { data } from "@prisma/client";

export const getAllData = async () => {
  try {
    return await db.data.findMany();
  } catch (err) {
    errHandler(err, "Failed to get all data");
  }
};

export const addData = async (data: data) => {
  try {
    return await db.data.create({ data });
  } catch (err) {
    errHandler(err, "Failed to add data");
  }
};

export const updateData = async (id: string, data: Partial<data>) => {
  try {
    return await db.data.update({ where: { id }, data });
  } catch (err) {
    errHandler(err, "Failed to update data");
  }
};

export const deleteData = async (id: string) => {
  try {
    return await db.data.delete({ where: { id } });
  } catch (err) {
    errHandler(err, "Failed to delete data");
  }
};
