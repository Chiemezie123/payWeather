import Avatar from "@/assets/images/Frame 14.png";
import SearchIcon from "@/assets/svg/search-normal.svg?react";
import Notification from "@/assets/svg/notification.svg?react";
import CloseIcon from "@/assets/svg/sidebar-left.svg?react";
import { cn } from "@/lib/utils";

interface NavBarProps {
  collapse?: boolean;
  openSidebar: () => void;
}
const NavBar = ({ collapse, openSidebar }: NavBarProps) => {
  return (
    <section>
      <div className=" h-20 my-auto w-full flex items-center  justify-between  sm:justify-center lg:justify-end gap-4 border-grey-100 border-b px-[36px]">
        <CloseIcon className="block sm:hidden" onClick={openSidebar} />
        <div className="flex items-center gap-4">
          {" "}
          <div
            className={cn(
              ` h-12 p-[12px_64px_12px_16px] sm:flex items-center gap-[15px] bg-grey-50 rounded-2xl hidden `,
              collapse ? "w-[330px]" : "w-[300px] lg:w-[330px]"
            )}
          >
            <SearchIcon  />
            <input
              type="text"
              placeholder="search"
              className="outline-none text-sm font-medium"
            />
          </div>
          <div>
            <Notification />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12">
              <img src={Avatar} alt={Avatar} className="w-full h-full" />
            </div>
            <p className="text-sm font-medium text-grey-600 hidden sm:block">
              Paystack
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
