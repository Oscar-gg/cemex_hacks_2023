import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";

// Used to call TRPC procedures from the pages/api folder

const systemContext = {
  session: {
    user: {
      id: "-1",
      email: "@admin",
      role: "admin",
    },
    expires: new Date(`${new Date().getFullYear() + 2}-01-01`).toISOString(),
  },
  db,
};

export const deviceCaller = appRouter.device.createCaller(systemContext);

// export const awsCaller = appRouter.aws.createCaller(systemContext);
