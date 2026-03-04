import { CgMenuGridO } from "react-icons/cg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Settings,
  Headphones,
  BarChart3,
  FileText,
  CreditCard,
  ShieldCheck,
  ClipboardCheck,
  GraduationCap,
  Users,
  Laptop,
  Calendar,
  HeartPulse,
  FolderKanban,
  AlertTriangle,
  Database,
} from "lucide-react";

import { MdControlCamera } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectDepartment } from "@/redux/departmentSlice";

// ICON MAP
const iconMap = {
  Administration: Settings,
  "Call Center": Headphones,
  AR: BarChart3,
  Faxing: FileText,
  "Medical Billing": CreditCard,
  Credentialing: ShieldCheck,
  "Prior Authorization": ClipboardCheck,
  Training: GraduationCap,
  WnyMuslims: Users,
  "Information Technology": Laptop,
  Meetings: Calendar,
  "Patient Care Coordination": HeartPulse,
  "Research & Development": FolderKanban,
  "Crisis Job Management": AlertTriangle,
  "Information Management": Database,
  "Control Pannel": MdControlCamera,
};

// 🔥 SAME linksMap AS YOU WANT
const linksMap = {
  Administration: "administration",
  "Call Center": "callcenter",
  AR: "AR",
  Faxing: "faxing",
  "Medical Billing": "medicalBilling",
  Credentialing: "credentialing",
  "Prior Authorization": "PriorAuthorization",
  Training: "Training",
  WnyMuslims: "WnyMuslims",
  "Information Technology": "InformationTechnology",
  Meetings: "Meetings",
  "Patient Care Coordination": "PatientCareCoordination",
  "Research & Development": "ResearchDevelopment",
  "Crisis Job Management": "CrisisJobManagement",
  "Information Management": "InformationManagement",
  "Control Pannel": "ControlPannel",
};

const Menu = () => {
  const { departments } = useSelector((state) => state.user); // 👈 objects array
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 rounded-md bg-primary/10 hover:bg-primary/20 text-primary">
          <CgMenuGridO size={20} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[90vw] sm:w-[80vw] lg:w-[45vw] overflow-y-auto p-6 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {departments.map((dep) => {
          const Icon = iconMap[dep.name];
          const link = linksMap[dep.name];

          if (!link) return null; // safety

          return (
            <button
              key={dep.id} // ✅ UNIQUE KEY
              onClick={() => {
                dispatch(
                  selectDepartment({
                    id: dep.id,
                    name: dep.name,
                    workAreas: dep.workAreas,
                    slug: link,
                  })
                );
                navigate(`/${link}`);
              }}
              className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted transition"
            >
              {Icon && (
                <Icon
                  size={22}
                  className="text-muted-foreground group-hover:text-primary"
                />
              )}
              <p className="text-sm text-center text-muted-foreground">
                {dep.name}
              </p>
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default Menu;
