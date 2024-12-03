import { GoBackButton } from "@/components/profile/go-back-button";
import { Text } from "@/components/ui/text";
import { getCurrentUserDataDeep } from "@/server/auth/get-me";
import ProfileEditForm from "./edit-form";

export default async function EditProfilePage() {
  const user = await getCurrentUserDataDeep();
  return (
    <section className="container max-w-4xl">
      <GoBackButton />
      <div className="my-4 [&>*]:text-neutral-900">
        <Text
          variant="display-sm"
          className="text-left font-poppins !text-xl font-bold capitalize sm:!text-2xl"
        >
          Edit Profile
        </Text>
      </div>
      {user && <ProfileEditForm user={user} />}
    </section>
  );
}
