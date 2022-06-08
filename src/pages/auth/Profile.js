import { KeyIcon, PencilIcon, UserIcon } from "@heroicons/react/solid";

function Profile() {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center relative w-[150px] h-[150px] rounded-full bg-gray-100 ">
            <input
              className="absolute cursor-pointer w-[150px] h-[150px] rounded-full opacity-0"
              type="file"
            />
            <UserIcon className="text-[50px]" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-700">
              kone dangui ismael
            </h2>
            <p className="text-sm text-gray-400">Salut j'utilise whatsapp</p>
          </div>
        </div>
        <div className="my-3">
          <a
            href="/me/edit"
            className="flex item-center gap-2 p-2 rounded-md hover:bg-gray-100"
          >
            <PencilIcon className="w-6 h-6" />
            <span>Modifier profile</span>
          </a>
          <a
            href="/me/changepass"
            className="flex item-center gap-2 p-2 rounded-md hover:bg-gray-100"
          >
            <KeyIcon className="w-6 h-6" />
            <span>Changer de mot de passe</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
