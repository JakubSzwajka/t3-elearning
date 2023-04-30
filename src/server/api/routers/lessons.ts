import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { Prisma } from "@prisma/client";

export const lessonsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.lesson.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id: authorId } = ctx.session.user;

      const payload: Prisma.LessonCreateInput = {
        ...input,
        author: { connect: { id: authorId } },
      };

      return await ctx.prisma.lesson.create({ data: payload });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.lesson.delete({
        where: { id: input.id },
      });
    }),
});
