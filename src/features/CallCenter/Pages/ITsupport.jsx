import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import officeLocations from "@/data/officeLocation"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { BiSupport } from "react-icons/bi"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react"

// ─── Dummy / placeholder data ───────────────────────────────────────────────
const callFromOptions = [
  { value: "ali_hassan", label: "Ali Hassan" },
  { value: "sara_ahmed", label: "Sara Ahmed" },
  { value: "usman_malik", label: "Usman Malik" },
  { value: "fatima_khan", label: "Fatima Khan" },
]

const requestCategories = [
  { value: "hardware", label: "Hardware" },
  { value: "software", label: "Software" },
  { value: "network", label: "Network" },
  { value: "email", label: "Email / Communication" },
]

const requestTypes = [
  { value: "installation", label: "Installation" },
  { value: "repair", label: "Repair" },
  { value: "configuration", label: "Configuration" },
  { value: "training", label: "Training" },
]

const queryNatureOptions = [
  { value: "complaint", label: "Complaint" },
  { value: "inquiry", label: "Inquiry" },
  { value: "request", label: "Request" },
  { value: "incident", label: "Incident" },
]

const referredToOptions = [
  { value: "it_team", label: "IT Team" },
  { value: "network_team", label: "Network Team" },
  { value: "vendor", label: "Vendor" },
  { value: "manager", label: "Manager" },
]

const statusOptions = [
  { value: "follow_up", label: "Follow Up" },
  { value: "pending", label: "Pending" },
  { value: "done", label: "Done" },
  { value: "case_close", label: "Case Close" },
]

const statusColors = {
  follow_up: "bg-blue-100 text-blue-700 border-blue-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  done: "bg-green-100 text-green-700 border-green-200",
  case_close: "bg-gray-100 text-gray-600 border-gray-200",
}

// ─── helpers ─────────────────────────────────────────────────────────────────
const getLabelByValue = (arr, val) =>
  arr.find((x) => x.value === val)?.label ?? val ?? "—"

const now = () => {
  const d = new Date()
  return {
    date: d.toISOString().split("T")[0],
    time: d.toTimeString().slice(0, 5),
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
const ITsupport = () => {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: { date: now().date, time: now().time },
  })

  const [tableData, setTableData] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchColumn, setSearchColumn] = useState("callFrom")
  const [searchText, setSearchText] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  // ── Query Details Dialog state ────────────────────────────────────────────
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDetails, setSelectedDetails] = useState("")

  const openDetailsDialog = (details) => {
    setSelectedDetails(details ?? "—")
    setDialogOpen(true)
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  const onSubmit = (data) => {
    const newRow = { id: Date.now(), ...data }
    setTableData((prev) => [newRow, ...prev])
    reset({ date: now().date, time: now().time })
  }

  // ── Today Call ────────────────────────────────────────────────────────────
  const handleTodayCall = () => {
    const today = now().date
    setDateFrom(today)
    setDateTo(today)
  }

  // ── Filter logic ──────────────────────────────────────────────────────────
  const filteredData = tableData.filter((row) => {
    if (activeFilter !== "all" && row.status !== activeFilter) return false
    if (dateFrom && row.date < dateFrom) return false
    if (dateTo && row.date > dateTo) return false
    if (searchText) {
      const colMap = {
        callFrom: getLabelByValue(callFromOptions, row.callFrom),
        queryNature: getLabelByValue(queryNatureOptions, row.queryNature),
        queryDetails: row.details ?? "",
      }
      return (colMap[searchColumn] ?? "")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    }
    return true
  })

  // ─── Reusable field wrapper ───────────────────────────────────────────────
  const Field = ({ label, children, className = "" }) => (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Label className="text-xs font-semibold tracking-wide">
        {label}
      </Label>
      {children}
    </div>
  )

  // ─── Reusable controlled select ──────────────────────────────────────────
  const ControlledSelect = ({ name, placeholder, options }) => (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value ?? ""}>
          <SelectTrigger className="w-full h-9 text-sm">
            <SelectValue placeholder={placeholder ?? "Select"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  )

  return (
    <div className="p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BiSupport className="text-white bg-primary rounded-md p-2" size={42} />
        <div>
          <h1 className="text-2xl font-bold leading-tight">IT Support</h1>
          <p className="text-foreground/80 text-sm">Call Center — IT Support Module</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="queryentry" className="w-full">
        <TabsList className="border-b border-border w-full" variant="line">
          <TabsTrigger value="queryentry" className="text-lg">Query Entry</TabsTrigger>
          <TabsTrigger value="workdetail" className="text-lg">Work Detail</TabsTrigger>
        </TabsList>

        {/* ── Query Entry Tab ───────────────────────────────────────────── */}
        <TabsContent value="queryentry" className="mt-4 space-y-4">

          {/* FORM CARD */}
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                  <Field label="Date">
                    <Input type="date" className="h-9 text-sm" {...register("date", { required: true })} />
                  </Field>

                  <Field label="Time">
                    <Input type="time" className="h-9 text-sm" {...register("time", { required: true })} />
                  </Field>

                  <Field label="Call From">
                    <ControlledSelect name="callFrom" placeholder="Select caller" options={callFromOptions} />
                  </Field>

                  <Field label="Location">
                    <Controller
                      control={control}
                      name="location"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value ?? ""}>
                          <SelectTrigger className="w-full h-9 text-sm">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {officeLocations.map((o) => (
                              <SelectItem key={o.location} value={o.location}>{o.location}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>

                  <Field label="Request Category">
                    <ControlledSelect name="requestCategory" placeholder="Select category" options={requestCategories} />
                  </Field>

                  <Field label="Request Type">
                    <ControlledSelect name="requestType" placeholder="Select type" options={requestTypes} />
                  </Field>

                  <Field label="Query Nature">
                    <ControlledSelect name="queryNature" placeholder="Select nature" options={queryNatureOptions} />
                  </Field>

                  <Field label="Referred To">
                    <ControlledSelect name="referredTo" placeholder="Select person" options={referredToOptions} />
                  </Field>

                  <Field label="Query Details" className="col-span-2">
                    <Textarea
                      placeholder="Describe the issue in detail..."
                      className="text-sm resize-none min-h-[80px]"
                      {...register("details", { required: true })}
                    />
                  </Field>

                  <Field label="Status">
                    <ControlledSelect name="status" placeholder="Select status" options={statusOptions} />
                  </Field>

                  <Field label="Done Date">
                    <Input type="date" className="h-9 text-sm" {...register("doneDate")} />
                  </Field>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-5 pt-4 border-t border-border">
                  <Button type="submit" className="bg-primary text-white hover:bg-primary/90 px-6">
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset({ date: now().date, time: now().time })}
                    className="px-6"
                  >
                    Clear
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="bg-primary text-white hover:bg-primary/90"
                    onClick={handleTodayCall}
                  >
                    Today Call
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* FILTER + TABLE */}
          <Card className="shadow-sm">
            <CardContent className="p-4 space-y-4">

              {/* Filter Row */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { key: "all", label: "All" },
                    { key: "follow_up", label: "Follow Up" },
                    { key: "pending", label: "Pending" },
                    { key: "done", label: "Done" },
                    { key: "case_close", label: "Case Close" },
                  ].map((f) => (
                    <Button
                      key={f.key}
                      size="sm"
                      variant={activeFilter === f.key ? "default" : "outline"}
                      className={`h-7 text-xs px-3 ${activeFilter === f.key ? "bg-primary text-white" : "text-slate-600"}`}
                      onClick={() => setActiveFilter(f.key)}
                    >
                      {f.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Search Row */}
              <div className="flex flex-wrap items-center gap-4 py-2 px-3 rounded-md">
                <span className="text-xs font-semibold tracking-wide">Search by:</span>
                <RadioGroup value={searchColumn} onValueChange={setSearchColumn} className="flex gap-4">
                  {[
                    { value: "callFrom", label: "Call From" },
                    { value: "queryNature", label: "Query Nature" },
                    { value: "queryDetails", label: "Query Details" },
                  ].map((r) => (
                    <div key={r.value} className="flex items-center gap-1.5">
                      <RadioGroupItem value={r.value} id={r.value} />
                      <Label htmlFor={r.value} className="text-sm cursor-pointer">{r.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <Input
                  placeholder={`Search by ${
                    searchColumn === "callFrom" ? "caller name"
                    : searchColumn === "queryNature" ? "query nature"
                    : "query details"
                  }...`}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="h-8 text-sm w-52 ml-auto"
                />
              </div>

              {/* Table */}
              <div className="rounded-md border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/60">
                      <TableHead className="w-8">#</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Call From</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Query Nature</TableHead>
                      <TableHead>Query Details</TableHead>
                      <TableHead>Referred To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Done Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={12} className="text-center py-12 text-sm">
                          {tableData.length === 0
                            ? "No records yet. Fill the form above and click Save."
                            : "No records match the current filter."}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((row, idx) => (
                        <TableRow key={row.id} className="text-sm">
                          <TableCell className="text-slate-400 text-xs">{idx + 1}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.time}</TableCell>
                          <TableCell>{getLabelByValue(callFromOptions, row.callFrom)}</TableCell>
                          <TableCell>{row.location ?? "—"}</TableCell>
                          <TableCell>{getLabelByValue(requestCategories, row.requestCategory)}</TableCell>
                          <TableCell>{getLabelByValue(requestTypes, row.requestType)}</TableCell>
                          <TableCell>{getLabelByValue(queryNatureOptions, row.queryNature)}</TableCell>

                          {/* ── Query Details — truncated + eye icon ── */}
                          <TableCell>
                            <div className="flex items-center gap-1.5 max-w-[150px] cursor-pointer">
                          
                              {row.details && (
                                <button
                                  type="button"
                                  onClick={() => openDetailsDialog(row.details)}
                                  className="text-primary cursor-pointer items-center gap-1 flex hover:text-primary/70 transition-colors flex-shrink-0"
                                  title="View full details"
                                >
                                View Details<Eye size={14} />
                                </button>
                              )}
                            </div>
                          </TableCell>

                          <TableCell>{getLabelByValue(referredToOptions, row.referredTo)}</TableCell>
                          <TableCell>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[row.status] ?? "bg-slate-100 text-slate-600"}`}>
                              {getLabelByValue(statusOptions, row.status)}
                            </span>
                          </TableCell>
                          <TableCell>{row.doneDate ?? "—"}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {filteredData.length > 0 && (
                <p className="text-xs text-slate-400 text-right">
                  Showing {filteredData.length} of {tableData.length} record(s)
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Work Detail Tab ───────────────────────────────────────────── */}
        <TabsContent value="workdetail">
          <Card className="shadow-sm mt-4">
            <CardContent className="p-6 text-center text-slate-400 text-sm">
              Work Detail section — coming soon.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── Query Details Dialog ──────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="mt-6 p-4  rounded-md border border-border text-[15px] text-foreground h-[80vh] min-w-[90vw] ">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye size={17} className="text-primary" />
              Query Details
            </DialogTitle>
            <DialogDescription className="sr-only">Full query details view</DialogDescription>
          </DialogHeader>
          <div >
            {selectedDetails}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default ITsupport