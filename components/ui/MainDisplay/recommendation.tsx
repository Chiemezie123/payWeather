import { cn } from "@/lib/utils";
import { useState } from "react";
import HealthSafety from "./healthSafety";
import Activities from "./activities";

const Recommendation = () => {
  const [toggleTab, setToggleTab] = useState<"Health & Safety" | "Activities">(
    "Health & Safety"
  );
  return (
    <div className="w-full flex flex-col gap-6 items-start">
      <div className="w-full flex flex-col gap-[10px]">
        <h2 className="text-xl text-grey-900 font-bold">Recommendations</h2>
        <div className="w-full flex flex-items-center gap-6 border-b border-grey-100">
          <div
            className={cn(
              `py-2`,
              toggleTab === "Health & Safety" &&
                "border-b-2 border-[#3793FF] cursor-pointer"
            )}
            onClick={() => setToggleTab("Health & Safety")}
          >
            <p
              className={cn(
                ` text-center font-bold cursor-pointer`,
                toggleTab === "Health & Safety"
                  ? "bg-[linear-gradient(225deg,_#3793FF_-3.36%,_#0017E4_103.57%)] text-transparent bg-clip-text"
                  : "text-grey-600"
              )}
            >
              Health & Safety
            </p>
          </div>
          <div
            className={cn(
              `py-2`,
              toggleTab === "Activities" &&
                "border-b-2 border-[#3793FF] cursor-pointer"
            )}
            onClick={() => setToggleTab("Activities")}
          >
            <p
              className={cn(
                ` text-center font-bold cursor-pointer`,
                toggleTab === "Activities"
                  ? "bg-[linear-gradient(225deg,_#3793FF_-3.36%,_#0017E4_103.57%)] text-transparent bg-clip-text"
                  : "text-grey-600"
              )}
            >
              Activities
            </p>
          </div>
        </div>
      </div>
      <div className="w-full">{toggleTab === "Health & Safety" ? <HealthSafety /> : <Activities/>}</div>
    </div>
  );
};

export default Recommendation;
