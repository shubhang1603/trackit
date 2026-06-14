"use server";

import { db } from "@/db";
import { jobs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createJob(formData: FormData) {
  await db.insert(jobs).values({
    company: formData.get("company") as string,
    role: formData.get("role") as string,
    status: formData.get("status") as string,
    notes: formData.get("notes") as string,
  });

  revalidatePath("/");
}

export async function deleteJob(id: number) {
  await db.delete(jobs).where(eq(jobs.id, id));

  revalidatePath("/");
}

export async function updateJob(formData: FormData) {
  const id = Number(formData.get("id"));

  await db
    .update(jobs)
    .set({
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      status: formData.get("status") as string,
      notes: formData.get("notes") as string,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/");
}

