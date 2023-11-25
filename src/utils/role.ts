export type Roles =
  | "admin"
  | "organizationMember"
  | "authenticated"
  | "unauthenticated";

const adminOrUpper: Roles[] = ["admin"];
const organizationMemberOrUpper: Roles[] = [
  ...adminOrUpper,
  "organizationMember",
];
const authenticatedOrUpper: Roles[] = [
  ...organizationMemberOrUpper,
  "authenticated",
];
const unauthenticatedOrUpper: Roles[] = [
  ...authenticatedOrUpper,
  "unauthenticated",
];

// interface RoleType {
//   [key: string]: Roles[];
// }

const roleOrUpper: Record<string, Roles[]> = {
  admin: adminOrUpper,
  organizationMember: organizationMemberOrUpper,

  authenticated: authenticatedOrUpper,
  unauthenticated: unauthenticatedOrUpper,
};

const upperRole: Record<string, Roles[]> = {
  admin: adminOrUpper,
  organizationMember: adminOrUpper,
  communityMember: organizationMemberOrUpper,
  unauthenticated: authenticatedOrUpper,
};

const unauthenticatedOrLower: Roles[] = ["unauthenticated"];
const authenticatedOrLower: Roles[] = [
  ...unauthenticatedOrLower,
  "authenticated",
];
const organizationMemberOrLower: Roles[] = [
  ...authenticatedOrLower,
  "organizationMember",
];
const adminOrLower: Roles[] = [...organizationMemberOrLower, "admin"];

export const roleOrLower: Record<string, Roles[]> = {
  admin: adminOrLower,
  organizationMember: organizationMemberOrLower,
  authenticated: authenticatedOrLower,
  unauthenticated: unauthenticatedOrLower,
};

const isRoleValid = (role: string): role is Roles => {
  return (
    role === "admin" ||
    role === "organizationMember" ||
    role === "authenticated" ||
    role === "unauthenticated"
  );
};

const castToRole = (role: string | undefined | null): Roles => {
  if (role && isRoleValid(role)) {
    return role as Roles;
  } else {
    throw new Error(`Invalid role: ${role}`);
  }
};

// 1: allowed
// 0: not allowed
// A role is allowed if it is in the same or higher level than the required role
export const compareRole = ({
  requiredRole,
  userRole,
}: {
  requiredRole: string;
  userRole: string | undefined;
}) => {
  if (requiredRole === "unauthenticated") return 1;

  try {
    const validRole = castToRole(userRole);
    const t = roleOrUpper[requiredRole];

    if (t && t.includes(validRole)) return 1;
  } catch (e) {
    console.error(e);
    return 0;
  }

  return 0;
};

export const onlyUpperRole = ({
  upperThan,
  userRole,
}: {
  upperThan: string;
  userRole: string | undefined;
}) => {
  try {
    const validRole = castToRole(userRole);
    const t = upperRole[upperThan];

    if (t && t.includes(validRole)) return 1;
  } catch (e) {
    console.error(e);
    return 0;
  }

  return 0;
};

type UserRole = {
  role: string | null;
};

export const getHighestRole = (roles: UserRole[], startRole?: string) => {
  let highestRole = startRole ?? "unauthenticated";

  for (const role of roles) {
    if (!role.role) continue;
    if (onlyUpperRole({ upperThan: highestRole, userRole: role.role })) {
      highestRole = role.role;
    }
  }

  return highestRole;
};

export const getRoleOrLower = (role: string | undefined | null) => {
  if (!role) return unauthenticatedOrLower;

  const roles = roleOrLower[role];

  if (!roles) return unauthenticatedOrLower;

  return roles;
};
