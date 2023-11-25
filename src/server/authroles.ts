import type { PrismaClient } from "@prisma/client";

export const updateRole = async (
  email: string | null | undefined,
  prisma: PrismaClient
) => {
  if (email) {
    const isAdmin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (isAdmin) return "admin";

    const isOrganizationMember = await prisma.organizationMember.findUnique({
      where: {
        email: email,
      },
    });

    if (isOrganizationMember) return "organizationMember";
  }

  return "authenticated";
};
