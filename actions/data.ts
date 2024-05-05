"use server";
import { FormSchema } from "@/app/_components/FormData";
import { db } from "@/lib/db";
import { errHandler } from "@/utils/errHandler";
import { Position, data } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createData = async (data: FormSchema) => {
  try {
    const dataExist = await db.data.findFirst({
      where: {
        email: data.email,
      },
    });
    if (dataExist) {
      return {
        error: "Email already exist",
      };
    }
    const res = await db.data.create({
      data: {
        ...data,
      },
    });
    revalidatePath("/");
    return {
      message: "Data created",
      data: res,
    };
  } catch (err) {
    errHandler(err, "Failed to create data");
  }
};

export const editData = async (data: FormSchema, id: string) => {
  try {
    const dataExist = await db.data.findFirst({
      where: {
        email: data.email,
      },
    });
    if (dataExist && dataExist.id !== id) {
      return {
        error: "Email already exist",
      };
    }
    const res = await db.data.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    revalidatePath("/");
    return {
      message: "Data edited",
      data: res,
    };
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
