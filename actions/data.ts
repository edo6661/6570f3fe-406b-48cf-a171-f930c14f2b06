"use server";
import { FormSchema } from "@/app/_components/FormData";
import { db } from "@/lib/db";
import { errHandler } from "@/utils/errHandler";
import { Position, data } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createData = async (data: FormSchema) => {
  try {
    const res = await db.data.create({
      data: {
        ...data,
      },
    });
    revalidatePath("/");
    return res;
  } catch (err) {
    errHandler(err, "Failed to create data");
  }
};

export const editData = async (data: FormSchema, id: string) => {
  try {
    const res = await db.data.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    revalidatePath("/");
    return res;
  } catch (err) {
    errHandler(err, "Failed to edit data");
  }
};

export const deleteData = async (id: string) => {
  try {
    const res = await db.data.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return res;
  } catch (err) {
    errHandler(err, "Failed to delete data");
  }
};

export const deleteAllData = async (ids: string[]) => {
  try {
    await db.data.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    revalidatePath("/");
  } catch (err) {
    errHandler(err, "Failed to delete data");
  }
};
