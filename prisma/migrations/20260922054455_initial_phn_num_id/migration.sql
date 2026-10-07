-- AlterTable
ALTER TABLE "User" ADD COLUMN     "SelectedFacebookBusinessId" TEXT,
ADD COLUMN     "displayPhoneNumber" TEXT,
ADD COLUMN     "phoneNumberId" TEXT[],
ADD COLUMN     "selectedFacebookBusinessId" TEXT,
ADD COLUMN     "selectedFacebookBusinessName" TEXT,
ADD COLUMN     "selectedPhoneNumberId" TEXT,
ADD COLUMN     "selectedPhoneNumberQualityRating" TEXT,
ADD COLUMN     "selectedPhoneNumberVerifiedName" TEXT,
ADD COLUMN     "selectedWabaId" TEXT;
