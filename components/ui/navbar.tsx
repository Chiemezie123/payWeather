import Avatar from "@/assets/images/Frame 14.png";
import SearchIcon from "@/assets/svg/search-normal.svg";
import Notification from "@/assets/svg/notification.svg";
import CloseIcon from "@/assets/svg/sidebar-left.svg";
import { cn } from "@/libs/utils";
import Image from "next/image";

interface NavBarProps {
  collapse?: boolean;
  openSidebar: () => void;
}
const NavBar = ({ collapse, openSidebar }: NavBarProps) => {
  return (
    <section>
      <div className="max-w-[1440px] mx-auto h-20 my-auto w-full flex items-center   justify-between   md:justify-center lg:justify-end  border-grey-100 border-b px-5 md:px-[36px]">
        <div className="max-w-10 w-full">
          <CloseIcon className="block md:hidden" onClick={openSidebar} />
        </div>
        <div className="flex items-center justify-end  gap-4 max-w-[500px] w-full">
          {" "}
          <div
            className={cn(
              ` h-12 p-[12px_64px_12px_16px] md:flex items-center gap-[15px] bg-grey-50 rounded-2xl hidden `,
              collapse ? "w-[330px]" : "w-[300px] lg:w-[330px]"
            )}
          >
            <SearchIcon />
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
              <Image src={Avatar} alt={""} className="w-full h-full" />
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
