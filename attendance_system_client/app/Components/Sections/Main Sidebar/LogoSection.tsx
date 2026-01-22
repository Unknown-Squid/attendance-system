import LogoIcon from "@/app/Components/Icons/LogoIcon";

const LogoSection = () => {
  return (
    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">

      <div className="flex items-center gap-3">

        <LogoIcon className="w-8 h-8 text-foreground" />

        <div>
          <h1 className="text-lg font-bold text-foreground">
            Attendance System
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            QR Code & OCR
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default LogoSection;

