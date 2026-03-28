import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  Headphones,
  BarChart3,
  NotebookPen,
  HelpCircleIcon,
  Building2,
  Eye,
  Repeat2,
  SendIcon,
  MonitorDot,
  CircleDollarSign,
  CircleArrowOutUpLeft,
  Printer,
  BadgeCheck,
  ReceiptText,
  BadgeDollarSign,
  FlaskConical,
  Form,
  Truck,
  User,
  Bandage,
  Archive,
  Copy,
  Album,
  Hospital,
  HeartPlus,
  Trash,
  Briefcase,
} from "lucide-react";
// lucide-react (modern + clean UI)
import {
  FileText,
  Home,
  ShieldCheck,
  Calendar,
  BarChart,
  History,
} from "lucide-react";

// react-icons

import { RiQuestionnaireFill, RiSoundModuleFill } from "react-icons/ri";
import { selectDepartment } from "../../../redux/departmentSlice";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IoIosCall } from "react-icons/io";
import { ChevronDown } from "lucide-react";
import { MdOutlineCallMade } from "react-icons/md";

/* ================= MENU CONFIG ================= */
const sidebarMenus = {
  Administration: [
    {
      name: "Call Management",
      icon: IoIosCall,
      link: "callmanagement",
      submenu: [
        { name: "GA Calls", link: "gacalls" },
        {
          name: "Calls",
          link: "calls",
        },
        { name: "E-Checking", link: "e-checking" },
        { name: "Balance ", link: "balance " },
        { name: "No Show", link: "noshow" },
        { name: "Voice Message", link: "voicemessage" },
        { name: "Frontdesk tracking", link: "frontdesktracking" },
        { name: "Medical Record", link: "medicalrecord" },
        { name: "IT Support", link: "itsupport" },
      ],
    },
    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },
    { name: "Dashboard", icon: Settings, link: "dashboard" },
    {
      name: "Reports",
      icon: BarChart3,
      link: "reports",
      submenu: [
        { name: "Daily", link: "daily" },
        { name: "Monthly", link: "monthly" },
      ],
    },
    { name: "Settings", icon: Settings, link: "settings" },
  ],

  "Call Center": [
    {
      name: "Call Management",
      icon: IoIosCall,
      link: "callmanagement",
      submenu: [
        { name: "GA Calls", link: "gacalls" },
        {
          name: "Calls",
          link: "calls",
        },
        { name: "E-Checking", link: "e-checking" },
        { name: "Balance ", link: "balance " },
        { name: "No Show", link: "noshow" },
        { name: "Voice Message", link: "voicemessage" },
        { name: "Frontdesk tracking", link: "frontdesktracking" },
        { name: "Medical Record", link: "medicalrecord" },
        { name: "IT Support", link: "itsupport" },
      ],
    },
    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },
    {
      name: "Tracking",
      icon: BarChart3,
      link: "tracking",
      submenu: [
        { name: "Form Tracking", link: "formtracking" },
        { name: "Medical Clearance Tracking", link: "medclearancetracking" },
      ],
    },

    {
      name: "Quest Billing",
      icon: RiQuestionnaireFill,
      link: "questbilling",
    },

    {
      name: "Medical Record",
      icon: FileText,
      link: "medicalrecord",
    },

    {
      name: "HCO (Home Care Order)",
      icon: Home,
      link: "hco",
    },

    {
      name: "Quality Assurance",
      icon: ShieldCheck,
      link: "qualityassurance",
    },

    {
      name: "Schedule",
      icon: Calendar,
      link: "schedule",
    },

    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },

    {
      name: "Patient History",
      icon: History,
      link: "patienthistory",
    },
  ],

  "Control Pannel": [
    {
      name: "Call Management",
      icon: IoIosCall,
      link: "callmanagement",
      submenu: [
        { name: "GA Calls", link: "gacalls" },
        {
          name: "Calls",
          link: "calls",
        },
        { name: "E-Checking", link: "e-checking" },
        { name: "Balance ", link: "balance " },
        { name: "No Show", link: "noshow" },
        { name: "Voice Message", link: "voicemessage" },
        { name: "Frontdesk tracking", link: "frontdesktracking" },
        { name: "Medical Record", link: "medicalrecord" },
        { name: "IT Support", link: "itsupport" },
      ],
    },
    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },
    {
      name: "Company",
      icon: Building2,
      link: "company",
      submenu: [
        { name: "Client", link: "client" },
        { name: "Department", link: "department" },
        { name: "Office Location", link: "officelocation" },
      ],
    },
    { name: "Module", icon: RiSoundModuleFill, link: "module" },
    {
      name: "Registration",
      icon: NotebookPen,
      link: "registration",
      submenu: [
        { name: "Person Creation", link: "personcreation" },
        { name: "Employee", link: "employee" },
        { name: "User Creation", link: "usercreate" },
        { name: "User Update", link: "userupdate" },
      ],
    },
    { name: "Help", icon: HelpCircleIcon, link: "help" },
  ],
  AR: [
    {
      name: "Call Management",
      icon: IoIosCall,
      link: "callmanagement",
      submenu: [
        { name: "GA Calls", link: "gacalls" },
        {
          name: "Calls",
          link: "calls",
        },
        { name: "E-Checking", link: "e-checking" },
        { name: "Balance ", link: "balance " },
        { name: "No Show", link: "noshow" },
        { name: "Voice Message", link: "voicemessage" },
        { name: "Frontdesk tracking", link: "frontdesktracking" },
        { name: "Medical Record", link: "medicalrecord" },
        { name: "IT Support", link: "itsupport" },
      ],
    },
    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },
    {
      name: "View",
      icon: Eye,
      link: "view",
      submenu: [
        { name: "Insurance", link: "insurance" },
        { name: "Web Link ", link: "weblinkin " },
        { name: "Credential status", link: "credentialstatus" },
        { name: "Schedule", link: "schedule" },
      ],
    },
    {
      name: "Auto Posting",
      icon: Repeat2,
      link: "autoposting",
    },
    {
      name: "Submission",
      icon: SendIcon,
      link: "submission",
    },
    {
      name: "Front desk",
      icon: MonitorDot,
      link: "frontdesk",
    },
    {
      name: "Personal Balance",
      icon: CircleDollarSign,
      link: "personalbalance",
    },
    {
      name: "ESC",
      icon: CircleArrowOutUpLeft,
      link: "esc",
    },
    {
      name: "Internal Audit",
      icon: CircleDollarSign,
      link: "internalaudit",
      submenu: [
        { name: "BRS", link: "brs" },
        { name: "Reporting ", link: "reporting " },
      ],
    },
  ],
  Faxing: [
    {
      name: "Call Management",
      icon: IoIosCall,
      link: "callmanagement",
      submenu: [
        { name: "GA Calls", link: "gacalls" },
        {
          name: "Calls",
          link: "calls",
        },
        { name: "E-Checking", link: "e-checking" },
        { name: "Balance ", link: "balance " },
        { name: "No Show", link: "noshow" },
        { name: "Voice Message", link: "voicemessage" },
        { name: "Frontdesk tracking", link: "frontdesktracking" },
        { name: "Medical Record", link: "medicalrecord" },
        { name: "IT Support", link: "itsupport" },
      ],
    },
    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },
    {
      name: "HCDM",
      icon: Printer,
      link: "hcdm",
      submenu: [
        { name: "Forms", link: "forms" },
        {
          name: "Documents Sorting",
          link: "documentssorting",
        },
        { name: "Appointment", link: "appointment" },
        { name: "Balance ", link: "balance " },
        { name: "End-to-End Exception", link: "endtoendexception" },
        { name: "Lab Exceptions", link: "labexceptions" },
        { name: "Established", link: "established" },
      ],
    },
  ],
  "Medical Billing": [
    {
      name: "Call Management",
      icon: IoIosCall,
      link: "callmanagement",
      submenu: [
        { name: "GA Calls", link: "gacalls" },
        {
          name: "Calls",
          link: "calls",
        },
        { name: "E-Checking", link: "e-checking" },
        { name: "Balance ", link: "balance " },
        { name: "No Show", link: "noshow" },
        { name: "Voice Message", link: "voicemessage" },
        { name: "Frontdesk tracking", link: "frontdesktracking" },
        { name: "Medical Record", link: "medicalrecord" },
        { name: "IT Support", link: "itsupport" },
      ],
    },
    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },
    {
      name: "Eligibility",
      icon: BadgeCheck,
      link: "eligibility",
    },
    {
      name: "Open E-Bill",
      icon: ReceiptText,
      link: "open e-bill",
    },
    {
      name: "Charge Entry",
      icon: BadgeDollarSign,
      link: "chargeentry",
    },
    {
      name: "Lab Code",
      icon: FlaskConical,
      link: "lab code",
    },
    {
      name: "Personal Balance",
      icon: BadgeDollarSign,
      link: "personalbalance",
    },
    {
      name: "Forms",
      icon: Form,
      link: "forms",
      submenu: [
        { name: "Auto Check", link: "autocheck" },
        { name: "GA management", link: "ga-management" },
      ],
    },
    {
      name: "View",
      icon: Eye,
      link: "view",
      submenu: [{ name: "Web Link", link: "weblink" }],
    },
  ],
  Credentialing: [
    {
      name: "Call Management",
      icon: IoIosCall,
      link: "callmanagement",
      submenu: [
        { name: "GA Calls", link: "gacalls" },
        {
          name: "Calls",
          link: "calls",
        },
        { name: "E-Checking", link: "e-checking" },
        { name: "Balance ", link: "balance " },
        { name: "No Show", link: "noshow" },
        { name: "Voice Message", link: "voicemessage" },
        { name: "Frontdesk tracking", link: "frontdesktracking" },
        { name: "Medical Record", link: "medicalrecord" },
        { name: "IT Support", link: "itsupport" },
      ],
    },
    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },
    {
      name: "View",
      icon: Eye,
      link: "view",
      submenu: [
        { name: "Panel", link: "panel" },
        { name: "Provider Detail", link: "providerdetail" },
        { name: "Office Record", link: "officerecord" },
      ],
    },
  ],
  "Prior Authorization": [
    {
      name: "Call Management",
      icon: IoIosCall,
      link: "callmanagement",
      submenu: [
        { name: "GA Calls", link: "gacalls" },
        {
          name: "Calls",
          link: "calls",
        },
        { name: "E-Checking", link: "e-checking" },
        { name: "Balance ", link: "balance " },
        { name: "No Show", link: "noshow" },
        { name: "Voice Message", link: "voicemessage" },
        { name: "Frontdesk tracking", link: "frontdesktracking" },
        { name: "Medical Record", link: "medicalrecord" },
        { name: "IT Support", link: "itsupport" },
      ],
    },
    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },
    {
      name: "Tracking",
      icon: Truck,
      link: "tracking",
    },
    {
      name: "EPA",
      icon: User,
      link: "epa",
    },
    {
      name: "Gaps in Care",
      icon: Bandage,
      link: "gapsincare",
    },
    {
      name: "Letter Record",
      icon: Archive,
      link: "letterecord",
    },
    {
      name: "Roster",
      icon: Copy,
      link: "roster",
    },
    {
      name: "View",
      icon: Eye,
      link: "view",
      submenu: [
        { name: "Roll back", link: "rollback" },
        { name: "Real-time Dashboard", link: "realtimedashboard" },
      ],
    },
  ],
  "WNY Muslims": [
    {
      name: "Call Management",
      icon: IoIosCall,
      link: "callmanagement",
      submenu: [
        { name: "GA Calls", link: "gacalls" },
        {
          name: "Calls",
          link: "calls",
        },
        { name: "E-Checking", link: "e-checking" },
        { name: "Balance ", link: "balance " },
        { name: "No Show", link: "noshow" },
        { name: "Voice Message", link: "voicemessage" },
        { name: "Frontdesk tracking", link: "frontdesktracking" },
        { name: "Medical Record", link: "medicalrecord" },
        { name: "IT Support", link: "itsupport" },
      ],
    },
    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },
    {
      name: "WNY",
      icon: Building2,
      link: "wny",
      submenu: [
        { name: "Rental Assistance", link: "rentalassistance" },
        { name: "Half Development", link: "halfdevelopment" },
        { name: "Desi Virsa", link: "desivirsa" },
        { name: "Apna Dera", link: "apnadera" },
      ],
    },
    {
      name: "Maaz",
      icon: Building2,
      link: "maaz",
      submenu: [
        { name: "Quality Assurance", link: "qualityassurance" },
        { name: "HCO", link: "hco" },
        { name: "Voice Message", link: "Voice Message" },
      ],
    },
  ],
  "Patient Care Coordination": [
    {
      name: "Call Management",
      icon: IoIosCall,
      link: "callmanagement",
      submenu: [
        { name: "GA Calls", link: "gacalls" },
        {
          name: "Calls",
          link: "calls",
        },
        { name: "E-Checking", link: "e-checking" },
        { name: "Balance ", link: "balance " },
        { name: "No Show", link: "noshow" },
        { name: "Voice Message", link: "voicemessage" },
        { name: "Frontdesk tracking", link: "frontdesktracking" },
        { name: "Medical Record", link: "medicalrecord" },
        { name: "IT Support", link: "itsupport" },
      ],
    },
    {
      name: "Reporting",
      icon: BarChart,
      link: "reporting",
    },
    {
      name: "Discrepancy",
      icon: Album,
      link: "discrepancy",
    },
    {
      name: "Tracking",
      icon: Truck,
      link: "tracking",
      submenu: [
        { name: "Pre and Post", link: "preandpost" },
        { name: "Wellness Visit", link: "wellnessvisit" },
      ],
    },
    {
      name: "HO-FU",
      icon: Hospital,
      link: "hofu",
    },
    {
      name: "Medical Claiming",
      icon: HeartPlus,
      link: "medicalclaiming",
    },
    {
      name: "Document Bin",
      icon: Trash,
      link: "documentbin",
    },
    {
      name: "Working",
      icon: Briefcase,
      link: "working",
      submenu: [
        { name: "Summary", link: "summary" },
        { name: "Live Dashboard", link: "livedashboard" },
      ],
    },
    {
      name: "View",
      icon: Eye,
      link: "view",
      submenu: [
        { name: "New Account", link: "newaccount" },
        { name: "Assign by", link: "assignby" },
        { name: "Location", link: "location" },
        { name: "Provider", link: "provider" },
        { name: "Location + Provider", link: "locationandprovider" },
        { name: "Applicable Category", link: "applicable category" },
        { name: "Surgery Type", link: "surgery type" },
        { name: "Lab Test", link: "labtest" },
        { name: "Management", link: "management" },
      ],
    },
  ],
};
// Call Center
//                 --->Call Group
//                 --->Call Category
//                 --->Call Nature
//                 --->Category Nature Group
/* ================= URL → Department Name ================= */
const slugToDepartment = {
  administration: "Administration",
  callcenter: "Call Center",
  controlpannel: "Control Pannel",
  ar: "AR",
  faxing: "Faxing",
  medicalbilling: "Medical Billing",
  credentialing: "Credentialing",
  priorauthorization: "Prior Authorization",
  wnymuslims: "WNY Muslims",
  patientcarecoordination: "Patient Care Coordination",
};

const DynamicSidebar = () => {
  const { selectedDepartment } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  // Current department based on URL
  const departmentSlug = useMemo(
    () => location.pathname.split("/")[1]?.toLowerCase() || "administration",
    [location.pathname],
  );

  const departmentName = useMemo(
    () =>
      selectedDepartment?.name ||
      slugToDepartment[departmentSlug] ||
      "Administration",
    [selectedDepartment, departmentSlug],
  );

  // Sync Redux when URL changes
  useEffect(() => {
    const nameFromUrl = slugToDepartment[departmentSlug];
    if (nameFromUrl && selectedDepartment?.name !== nameFromUrl) {
      dispatch(selectDepartment({ name: nameFromUrl, slug: departmentSlug }));
    }
  }, [departmentSlug, selectedDepartment, dispatch]);

  const menus = sidebarMenus[departmentName] || [];

  return (
    <Sidebar className="mt-15">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[15px] text-center p-3 mb-2">
            <Link className="text-center" to={`/${departmentSlug}`}>{departmentName}</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='overflow-y-auto'>
              {menus.map((menu) => {
                const isActive =
                  menu.link &&
                  location.pathname.includes(`/${departmentSlug}/${menu.link}`);

                // Menu with submenu
                if (menu.submenu) {
                  return (
                    <Collapsible key={menu.name} asChild defaultOpen={isActive}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link to={`/${departmentSlug}/${menu.link}`}>
                              <menu.icon />
                              <span className="text-[14px] ">{menu.name}</span>
                              <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                            </Link>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {menu.submenu.map((sub) => {
                              const subActive = location.pathname.includes(
                                `/${departmentSlug}/${sub.link}`,
                              );
                              return (
                                <SidebarMenuSubItem key={sub.name}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={subActive}
                                  >
                                    <Link to={`/${departmentSlug}/${sub.link}`}>
                                      <span>{sub.name}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                // Regular menu without submenu
                return (
                  <SidebarMenuItem key={menu.name} >
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="text-[16px]"
                    >
                      <Link to={`/${departmentSlug}/${menu.link}`}>
                        <menu.icon />
                        <span>{menu.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default DynamicSidebar;
