"use client";
import { useEffect } from "react";
import Logo from "@/assets/images/MainLogo.png";
import SideBarcard from "@/components/card/sideBarcard";
import Cloud from "@/assets/svg/cloud.svg";
import Calender from "@/assets/svg/calendar.svg";
import Receipt from "@/assets/svg/receipt.svg";
import Map from "@/assets/svg/map.svg";
import Chart from "@/assets/svg/chart.svg";
import Setting from "@/assets/svg/setting-2.svg";
import Support from "@/assets/svg/24-support.svg";
import CloseIcon from "@/assets/svg/sidebar-left.svg";
import { cn } from "@/libs/utils";
import Image from "next/image";

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
          `fixed top-0 w-full left-0 h-screen py-6 px-6 flex flex-col items-start gap-16 border-r duration-150  overflow-hidden scroll-smooth border-grey-100 bg-white z-50 transition-[width]  ease-in-out`,
          collapse ? "max-w-[96px]" : "max-w-[272px]",
          collapse ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        )}
      >
        <div
          className={cn(
            `w-full flex   items-center `,
            collapse ? "justify-center" : "justify-between"
          )}
        >
          {!collapse && (
            <div className={cn(`flex items-center gap-2`)}>
              <div
                className="relative  w-10 h-10 cursor-pointer"
                onClick={toggleHandler}
              >
                <Image src={Logo} alt={"logo"} className="w-full h-full" />
              </div>

              <h2 className="text-md font-medium text-grey-600">
                Weather Forcast
              </h2>
            </div>
          )}

          <div className="relative w-fit">
            <CloseIcon
              className={cn(`cursor-pointer transition-all ease-in-out`)}
              onClick={toggleHandler}
            />
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
          ].map((item, index) => (
            <SideBarcard
              key={index}
              icon={item.icons}
              text={item.text}
              index={index}
              collapse={collapse}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 flex-1 items-end justify-end">
          {[
            { icons: <Setting />, text: "Settings" },
            { icons: <Support />, text: "Help & Support" },
          ].map((item, index) => (
            <SideBarcard
              key={index}
              icon={item.icons}
              text={item.text}
              index={index}
              collapse={collapse}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBar;
