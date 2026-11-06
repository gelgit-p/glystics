-- Role for super-admin endpoints + per-tenant AI delivery detection switch
CREATE TYPE "UserRole" AS ENUM ('USER', 'SUPER_ADMIN');
ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER';
ALTER TABLE "User" ADD COLUMN "aiDeliveryDetectionEnabled" BOOLEAN NOT NULL DEFAULT true;
-- Promote the first account manually if needed:
-- UPDATE "User" SET role = 'SUPER_ADMIN' WHERE email = 'admin@example.com';
