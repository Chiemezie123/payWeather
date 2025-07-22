import { useEffect } from "react";
import Logo from "@/assets/images/MainLogo.png";
import SideBarcard from "../cards/sideBarcard";
import Cloud from "@/assets/svg/cloud.svg?react";
import Calender from "@/assets/svg/calendar.svg?react";
import Receipt from "@/assets/svg/receipt.svg?react";
import Map from "@/assets/svg/map.svg?react";
import Chart from "@/assets/svg/chart.svg?react";
import Setting from "@/assets/svg/setting-2.svg?react";
import Support from "@/assets/svg/24-support.svg?react";
import CloseIcon from "@/assets/svg/sidebar-left.svg?react";
import { cn } from "@/lib/utils";

interface SideBarProps {
  collapse: boolean;
  toggleHandler: () => void;
}

const SideBar = ({ collapse, toggleHandler }: SideBarProps) => {
  useEffect(() => {
    document.body.style.overflow = collapse ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [collapse]);

  return (
    <>
      {!collapse && (
        <div
          className="block sm:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleHandler}
        />
      )}
      <div
        className={cn(
          `fixed top-0 left-0 h-screen py-6 px-6 flex flex-col items-start gap-16 border-r border-grey-100 bg-white z-50 transition-[width] duration-300 ease-in-out`,
          collapse ? "w-[96px]" : "w-[272px]",
          collapse ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        )}
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 cursor-pointer" onClick={toggleHandler}>
              <img src={Logo} alt={Logo} className="w-full h-full" />
            </div>
            {!collapse && (
              <h2 className="text-md font-medium text-grey-600">
                Weather Forcast
              </h2>
            )}
          </div>
          <div>
            {!collapse && (
              <CloseIcon className="cursor-pointer" onClick={toggleHandler} />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          {[
            {
              icons: <Cloud />,
              text: "Current Weather",
            },
            {
              icons: <Calender />,
              text: "Daily Forcast",
            },
            {
              icons: <Receipt />,
              text: "Microclimate Report ",
            },
            {
              icons: <Map />,
              text: "Weather Maps",
            },
            {
              icons: <Chart />,
              text: "Weather Data",
            },
          ].map((item, index) =>
            collapse ? (
              <div key={index} className="p-3">
                {item.icons}
              </div>
            ) : (
              <SideBarcard
                key={index}
                icon={item.icons}
                text={item.text}
                index={index}
              />
            )
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1 items-end justify-end">
          {[
            { icons: <Setting />, text: "Settings" },
            { icons: <Support />, text: "Help & Support" },
          ].map((item, index) =>
            collapse ? (
              <div key={index} className="p-3">
                {item.icons}
              </div>
            ) : (
              <SideBarcard
                key={index}
                icon={item.icons}
                text={item.text}
                index={index}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
