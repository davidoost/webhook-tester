import { ModeToggle } from "./mode-toggle";

export function NavBar() {
  return (
    <div className="w-full flex flex-row-reverse items-center justify-between p-2 border-b border-bg-accent shadow-sm">
      <ModeToggle />
    </div>
  );
}
