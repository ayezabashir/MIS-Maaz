import { IoNotificationsSharp } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import Profile from "./Profile";
import ThemeToggle from "../../../ThemeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Menu from "./Menu";
import { Link, Links } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/authSlice";
import { HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from "@mui/material";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="fixed top-0 z-20 w-screen h-16 border-b bg-background px-3 sm:px-6 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Menu />

        <Link to="/mainScreen">
          <h1 className="hidden sm:block text-lg font-semibold text-primary">
            MIS Dashboard
          </h1>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <ThemeToggle />
            </div>
          </TooltipTrigger>
          <TooltipContent>Change Theme</TooltipContent>
        </Tooltip>

        {/* Notifications */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-1 sm:p-2 rounded-full hover:bg-muted transition">
              <IoNotificationsSharp className="lg:size-10 size-6 text-primary bg-primary/10 p-1 sm:p-2 rounded-full" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>

        {/* Profile */}
        <Profile />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="text-primary">
            <HelpCircle />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-background mt-10 rounded-md px-2 space-y-1 py-3 w-60 text-[14px]
  "
          >
            <Link to="/meeting">
              <DropdownMenuItem className=" hover:text-primary ">
                Meeting
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />
            <Link to="/storystudy">
              <DropdownMenuItem className=" hover:text-primary ">
                Story and Study
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />
            <Link to="/crisiscontrol">
              {" "}
              <DropdownMenuItem className=" hover:text-primary ">
                Crisis and Control
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />
            <Link to="/schedule">
              <DropdownMenuItem className=" hover:text-primary ">
                Schedule
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />
            <Link to="/credentialing">
              <DropdownMenuItem className=" hover:text-primary ">
                Credentialing Status
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />
            <Link to="/stickynotes">
              <DropdownMenuItem className=" hover:text-primary ">
                Sticky Notes
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />
            <Link to="/weblinks">
              <DropdownMenuItem className=" hover:text-primary ">
                Web Links
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logout */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="p-1 sm:p-2 rounded-full bg-muted hover:bg-muted/70 transition"
              onClick={() => dispatch(logoutUser())}
            >
              <CiLogin className="lg:size-10 size-6 text-primary bg-primary/10 p-1 sm:p-2 rounded-full" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Logout</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
