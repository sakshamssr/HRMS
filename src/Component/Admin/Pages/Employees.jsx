import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { format, isValid, parseISO } from "date-fns"
import { ChevronDownIcon, Pencil, Plus, Trash2, UserRoundPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const baseUrl = import.meta.env.VITE_BASE_URL

const emptyEmployee = {
  name: "",
  username: "",
  email: "",
  phone: "",
  address: "",
  dest: "",
  dept: "",
}

const requiredFields = [
  ["name", "Name is required"],
  ["username", "Username is required"],
  ["email", "Email is required"],
  ["phone", "Phone is required"],
  ["address", "Address is required"],
  ["dest", "Designation is required"],
  ["dept", "Department is required"],
]

function toInputDate(value) {
  if (!value) return new Date()

  const isoDate = parseISO(value)
  if (isValid(isoDate)) return isoDate

  const date = new Date(value)
  return isValid(date) ? date : new Date()
}

function displayDate(value) {
  const date = toInputDate(value)
  return isValid(date) ? format(date, "dd MMM yyyy") : "-"
}

function buildEmployeePayload(formData, dob, doj) {
  return {
    ...formData,
    dob: format(dob, "yyyy-MM-dd"),
    doj: format(doj, "yyyy-MM-dd"),
  }
}

function validateEmployee(formData, dob, doj) {
  const nextErrors = {}

  requiredFields.forEach(([field, message]) => {
    if (!formData[field]?.trim()) {
      nextErrors[field] = message
    }
  })

  if (!dob) nextErrors.dob = "DOB is required"
  if (!doj) nextErrors.doj = "DOJ is required"

  return nextErrors
}

function EmployeeForm({ formData, errors, dob, doj, onChange, onDOBChange, onDOJChange }) {
  return (
    <FieldGroup>
      <Field>
        <Label>Employee Name</Label>
        <Input name="name" value={formData.name} onChange={onChange} />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </Field>
      <Field>
        <Label>Username</Label>
        <Input name="username" value={formData.username} onChange={onChange} />
        {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
      </Field>
      <Field>
        <Label>Emp Email</Label>
        <Input type="email" name="email" value={formData.email} onChange={onChange} />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </Field>
      <Field>
        <Label>Emp Phone</Label>
        <Input name="phone" value={formData.phone} onChange={onChange} />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
      </Field>
      <Field>
        <Label>Emp Address</Label>
        <Input name="address" value={formData.address} onChange={onChange} />
        {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
      </Field>
      <Field>
        <Label>Emp DOB</Label>
        <DatePicker date={dob} onSelect={onDOBChange} />
        {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
      </Field>
      <Field>
        <Label>Emp Join Date</Label>
        <DatePicker date={doj} onSelect={onDOJChange} />
        {errors.doj && <p className="text-xs text-red-500">{errors.doj}</p>}
      </Field>
      <Field>
        <Label>Emp Dest</Label>
        <Input name="dest" value={formData.dest} onChange={onChange} />
        {errors.dest && <p className="text-xs text-red-500">{errors.dest}</p>}
      </Field>
      <Field>
        <Label>Emp Dept</Label>
        <Input name="dept" value={formData.dept} onChange={onChange} />
        {errors.dept && <p className="text-xs text-red-500">{errors.dept}</p>}
      </Field>
    </FieldGroup>
  )
}

function DatePicker({ date, onSelect }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          data-empty={!date}
          className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  )
}

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [formData, setFormData] = useState(emptyEmployee)
  const [editData, setEditData] = useState(emptyEmployee)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [accountPassword, setAccountPassword] = useState({
    role: "employee",
    password: "",
    confirmPassword: "",
  })
  const [dob, setDOB] = useState(new Date())
  const [doj, setDOJ] = useState(new Date())
  const [editDOB, setEditDOB] = useState(new Date())
  const [editDOJ, setEditDOJ] = useState(new Date())
  const [errors, setErrors] = useState({})
  const [accountError, setAccountError] = useState("")
  const [statusMessage, setStatusMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const [isAccountOpen, setAccountOpen] = useState(false)
  const [loadingAction, setLoadingAction] = useState("")

  const totalAccounts = useMemo(
    () => employees.filter((employee) => employee.accountCreated).length,
    [employees]
  )

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/get/employee`)
      const { success, message, data } = res.data

      if (!success) {
        setStatusMessage(message || "Unable to load employees")
        return
      }

      setEmployees(Array.isArray(data) ? data : [])
    } catch (error) {
      setStatusMessage(
        error.response?.data?.message || "Unable to load employees"
      )
    }
  }

  useEffect(() => {
    let isMounted = true

    axios
      .get(`${baseUrl}/api/get/employee`)
      .then((res) => {
        if (!isMounted) return

        const { success, message, data } = res.data
        if (!success) {
          setStatusMessage(message || "Unable to load employees")
          return
        }

        setEmployees(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        if (!isMounted) return

        setStatusMessage(
          error.response?.data?.message || "Unable to load employees"
        )
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleFormChange = (setter) => (e) => {
    const { name, value } = e.target
    setter((prevData) => ({ ...prevData, [name]: value }))
  }

  const resetAddForm = () => {
    setFormData(emptyEmployee)
    setDOB(new Date())
    setDOJ(new Date())
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nextErrors = validateEmployee(formData, dob, doj)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const payload = buildEmployeePayload(formData, dob, doj)

    try {
      setLoadingAction("add")
      const res = await axios.post(`${baseUrl}/api/post/employee`, payload)

      if (res.data?.success === false) {
        setStatusMessage(res.data.message || "Employee was not added")
        return
      }

      await fetchEmployees()
      resetAddForm()
      setIsOpen(false)
      setStatusMessage("Employee added successfully")
    } catch (error) {
      setStatusMessage(error.response?.data?.message || "Employee was not added")
    } finally {
      setLoadingAction("")
    }
  }

  const openEditDialog = (employee) => {
    setSelectedEmployee(employee)
    setEditData({
      name: employee.name || "",
      username: employee.username || "",
      email: employee.email || "",
      phone: employee.phone || "",
      address: employee.address || "",
      dest: employee.dest || "",
      dept: employee.dept || "",
    })
    setEditDOB(toInputDate(employee.dob))
    setEditDOJ(toInputDate(employee.doj))
    setErrors({})
    setEditOpen(true)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    if (!selectedEmployee?._id) return

    const nextErrors = validateEmployee(editData, editDOB, editDOJ)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const payload = {
      ...buildEmployeePayload(editData, editDOB, editDOJ),
      accountCreated: selectedEmployee.accountCreated || false,
    }

    try {
      setLoadingAction(`edit-${selectedEmployee._id}`)
      const res = await axios.put(
        `${baseUrl}/api/update/byid/${selectedEmployee._id}`,
        payload
      )

      if (!res.data?.success) {
        setStatusMessage(res.data?.message || "Employee was not updated")
        return
      }

      const updatedEmployee = res.data.data || { ...selectedEmployee, ...payload }
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === selectedEmployee._id ? updatedEmployee : employee
        )
      )
      setEditOpen(false)
      setSelectedEmployee(null)
      setStatusMessage("Employee updated successfully")
    } catch (error) {
      setStatusMessage(error.response?.data?.message || "Employee was not updated")
    } finally {
      setLoadingAction("")
    }
  }

  const handleDelete = async (employeeId) => {
    try {
      setLoadingAction(`delete-${employeeId}`)
      const res = await axios.delete(`${baseUrl}/api/delete/byid/${employeeId}`)

      if (!res.data?.success) {
        setStatusMessage(res.data?.message || "Employee was not deleted")
        return
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== employeeId)
      )
      setStatusMessage("Employee deleted successfully")
    } catch (error) {
      setStatusMessage(error.response?.data?.message || "Employee was not deleted")
    } finally {
      setLoadingAction("")
    }
  }

  const openAccountDialog = (employee) => {
    setSelectedEmployee(employee)
    setAccountPassword({
      role: employee.accountRole || "employee",
      password: "",
      confirmPassword: "",
    })
    setAccountError("")
    setAccountOpen(true)
  }

  const handleCreateAccount = async (e) => {
    e.preventDefault()
    if (!selectedEmployee?._id) return

    if (!accountPassword.role?.trim()) {
      setAccountError("Role is required")
      return
    }

    if (!accountPassword.password || !accountPassword.confirmPassword) {
      setAccountError("Password and confirm password are required")
      return
    }

    if (accountPassword.password !== accountPassword.confirmPassword) {
      setAccountError("Password doesn't match")
      return
    }

    try {
      setLoadingAction(`account-${selectedEmployee._id}`)
      const res = await axios.post(
        `${baseUrl}/api/create/employee-account/${selectedEmployee._id}`,
        {
          ...accountPassword,
          role: accountPassword.role.trim(),
        }
      )

      const updatedEmployee = res.data.data || {
        ...selectedEmployee,
        accountCreated: true,
      }
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === selectedEmployee._id ? updatedEmployee : employee
        )
      )
      setAccountOpen(false)
      setSelectedEmployee(null)
      setStatusMessage(res.data?.message || "Employee account created")
    } catch (error) {
      const responseData = error.response?.data

      if (responseData?.data) {
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee._id === selectedEmployee._id ? responseData.data : employee
          )
        )
      }

      setAccountError(responseData?.message || "Employee account was not created")
    } finally {
      setLoadingAction("")
    }
  }

  return (
    <main className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm transition-colors dark:bg-zinc-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Employee Directory
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage employee records and create login accounts from each row.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-700 transition-colors dark:bg-white/5 dark:text-slate-300">
              {totalAccounts}/{employees.length} accounts created
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add profile</DialogTitle>
                  <DialogDescription>
                    Add the employee details before creating their account.
                  </DialogDescription>
                </DialogHeader>
                <EmployeeForm
                  formData={formData}
                  errors={errors}
                  dob={dob}
                  doj={doj}
                  onChange={handleFormChange(setFormData)}
                  onDOBChange={setDOB}
                  onDOJChange={setDOJ}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={resetAddForm}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" onClick={handleSubmit} disabled={loadingAction === "add"}>
                    {loadingAction === "add" ? "Saving..." : "Save changes"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {statusMessage && (
          <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 transition-colors dark:bg-white/5 dark:text-slate-300">
            {statusMessage}
          </p>
        )}
      </section>

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm transition-colors dark:bg-zinc-900">
        <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-5 transition-colors dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Employee records
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {employees.length} employees in the directory
            </p>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {employees.length - totalAccounts} accounts pending
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="sticky left-0 z-10 bg-slate-50 px-6 py-4 font-semibold transition-colors dark:bg-zinc-800">
                  Employee
                </th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Employment</th>
                <th className="px-6 py-4 font-semibold">Dates</th>
                <th className="px-6 py-4 font-semibold">Account</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/10">
              {employees.length ? (
                employees.map((item, index) => (
                  <tr
                    key={item._id || `${item.email}-${index}`}
                    className="group transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                  >
                    <th className="sticky left-0 bg-white px-6 py-4 transition-colors group-hover:bg-slate-50 dark:bg-zinc-900 dark:group-hover:bg-zinc-800">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sm font-semibold text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                          {(item.name || "E").charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900 dark:text-slate-100">
                            {item.name || "-"}
                          </p>
                          <p className="truncate text-xs font-normal text-slate-500 dark:text-slate-400">
                            @{item.username || "username"}
                          </p>
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <p className="whitespace-nowrap font-medium text-slate-700 dark:text-slate-200">
                        {item.email || "-"}
                      </p>
                      <p className="mt-1 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                        {item.phone || "-"}
                      </p>
                      <p className="mt-1 max-w-[260px] truncate text-xs text-slate-500 dark:text-slate-500">
                        {item.address || "-"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-slate-200">
                          {item.dest || "Designation"}
                        </span>
                        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-500/15 dark:text-sky-200">
                          {item.dept || "Department"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <p className="whitespace-nowrap">
                        <span className="text-xs text-slate-400 dark:text-slate-500">DOB</span>{" "}
                        {displayDate(item.dob)}
                      </p>
                      <p className="mt-1 whitespace-nowrap">
                        <span className="text-xs text-slate-400 dark:text-slate-500">DOJ</span>{" "}
                        {displayDate(item.doj)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            item.accountCreated
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200"
                          }`}
                        >
                          {item.accountCreated ? "Account created" : "Account pending"}
                        </span>
                        {item.accountCreated ? (
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Role: {item.accountRole || "employee"}
                          </span>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            className="gap-2"
                            disabled={loadingAction === `account-${item._id}`}
                            onClick={() => openAccountDialog(item)}
                          >
                            <UserRoundPlus className="h-4 w-4" />
                            Create
                          </Button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          onClick={() => openEditDialog(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          disabled={loadingAction === `delete-${item._id}`}
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Update employee details and keep the directory current.
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm
            formData={editData}
            errors={errors}
            dob={editDOB}
            doj={editDOJ}
            onChange={handleFormChange(setEditData)}
            onDOBChange={setEditDOB}
            onDOJChange={setEditDOJ}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={handleEdit}
              disabled={loadingAction === `edit-${selectedEmployee?._id}`}
            >
              {loadingAction === `edit-${selectedEmployee?._id}` ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAccountOpen} onOpenChange={setAccountOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create employee account</DialogTitle>
            <DialogDescription>
              This creates a login account for {selectedEmployee?.name || "the employee"}.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label>Email</Label>
              <Input value={selectedEmployee?.email || ""} readOnly />
            </Field>
            <Field>
              <Label>Role</Label>
              <Input
                value={accountPassword.role}
                placeholder="employee"
                onChange={(e) =>
                  setAccountPassword((prevData) => ({
                    ...prevData,
                    role: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Label>Password</Label>
              <Input
                type="password"
                value={accountPassword.password}
                onChange={(e) =>
                  setAccountPassword((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))
                }
              />
            </Field>
            <Field>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={accountPassword.confirmPassword}
                onChange={(e) =>
                  setAccountPassword((prevData) => ({
                    ...prevData,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </Field>
          </FieldGroup>
          {accountError && <p className="text-sm text-red-500">{accountError}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={handleCreateAccount}
              disabled={loadingAction === `account-${selectedEmployee?._id}`}
            >
              {loadingAction === `account-${selectedEmployee?._id}`
                ? "Creating..."
                : "Create account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
