import LogoIcon from "@/app/Components/Icons/LogoIcon";

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="mb-4">
        <LogoIcon className="w-16 h-16 text-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-center text-foreground mb-2">
        Attendance System
      </h1>
      <p className="text-sm text-center text-zinc-600 dark:text-zinc-400">
        Using QR Code and OCR
      </p>
    </div>
  );
};

export default LoginHeader;

