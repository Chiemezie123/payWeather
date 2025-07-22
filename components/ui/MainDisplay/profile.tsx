import Location from "@/assets/svg/location.svg?react";
import ArrowDown from "@/assets/svg/arrow-down.svg?react";
import { getFormattedDate, getGreeting } from "@/features/date/dateUtils";

const Profile = () => {
  const greeting = getGreeting();
  const today = getFormattedDate();
  return (
    <div className="w-full flex flex-col md:flex-row  items-start sm:items-end lg:items-center gap-2 sm:gap-0 justify-between  mt-8">
      <div className="max-w-[379px] w-full flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-grey-900 flex items-center">
          {greeting}, Paystack!
        </h2>
        <p className="text-grey-600 text-sm sm:text-md">{today}</p>
      </div>
      <div className="h-12 p-3 gap-2 flex items-center bg-grey-50 border border-grey-100 rounded-[8px]">
        <Location />
        <p className="text-sm sm:text-md text-grey-900 font-bold ">Lagos, Nigeria</p>
        <ArrowDown />
      </div>
    </div>
  );
};

export default Profile;
