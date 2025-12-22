import { LogoIcon, SmallLogoIcon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { HeaderActions, HeaderRoomInfo } from "./HeaderComponents";

export default function Header(props: { className?: string }) {
  const { className } = props;
  return (
    <>
      {/* Header */}
      <header
        className={cn(
          "flex items-center justify-between bg-[#121212] p-2 md:p-4",
          className
        )}
      >
        <div className="flex items-center space-x-2">
          {/* <LogoIcon className="hidden h-5 md:block" />
          <SmallLogoIcon className="block h-4 md:hidden" /> */}
          <h1 className="font-bold text-sm md:text-xl">晓佑</h1>
        </div>
        {/* <HeaderRoomInfo />
        <HeaderActions /> */}
      </header>
    </>
  );
}
