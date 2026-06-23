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
import { useState } from 'react'
import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Employees() {
  let [empdata, updateEmpdata] = useState([]);
  let data = {}
  const [dob, setDOB] = useState(new Date())
  const [doj, setDOJ] = useState(new Date())
  let handleChange = (e) =>{
    // console.log("");
    let {name, value} = e.target;
    updateEmpdata({...empdata,[name]:value});
    console.log(empdata)
  }
  let handleSubmit = () =>{
    empdata={...empdata,"dob":dob.toLocaleDateString(),"doj": doj.toLocaleDateString()}
    console.log("API DATA: ", empdata);
  }
  return (
    <>
    <div>
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Employee</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm h-120 overflow-scroll">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label >Employee Name</Label>
              <Input id="name" name="name" onChange={handleChange}/>
            </Field>
            <Field>
              <Label >Username</Label>
              <Input id="username" name="username" onChange={handleChange}/>
            </Field>
            <Field>
              <Label >Emp Email</Label>
              <Input id="email" name="email" onChange={handleChange}/>
            </Field>
            <Field>
              <Label >Emp Phone</Label>
              <Input id="phone" name="phone" onChange={handleChange}/>
            </Field>
            <Field>
              <Label >Emp Address</Label>
              <Input id="address" name="address" onChange={handleChange}/>
            </Field>
            <Field>
              <Label >Emp DOB</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!dob}
                    className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dob}
                    onSelect={setDOB}
                    defaultMonth={dob}
                    onChange={handleChange}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <Label >Emp Join Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!doj}
                    className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {doj ? format(doj, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={doj}
                    onSelect={setDOJ}
                    defaultMonth={doj}
                    onChange={handleChange}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field>
              <Label >Emp Dest</Label>
              <Input id="dest" name="dest" onChange={handleChange}/>
            </Field>
            <Field>
              <Label >Emp Dept</Label>
              <Input id="dept" name="dept" onChange={handleChange}/>
            </Field>

          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    

  <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-2 rounded-2xl">
      <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
              <tr>
                  <th scope="col" class="px-6 py-3 font-medium">
                      Name
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                      Username
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                      EMP Email
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                      EMP Phone
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                      EMP Address
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                      EMP DOB
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                      EMP DOJ
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                      EMP DEST
                  </th>
                  <th scope="col" class="px-6 py-3 font-medium">
                      EMP DEPT
                  </th>
              </tr>
          </thead>
          <tbody>
            {empdata.map((item)=>{
              <tr class="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                  <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                      {item.name}
                  </th>
                  <td class="px-6 py-4">
                      {item.username}
                  </td>
                  <td class="px-6 py-4">
                      {item.email}
                  </td>
                  <td class="px-6 py-4">
                      {item.phone}
                  </td>
                  <td class="px-6 py-4">
                      {item.address}
                  </td>
                  <td class="px-6 py-4">
                      {item.dob}
                  </td>
                  <td class="px-6 py-4">
                      {item.doj}
                  </td>
                  <td class="px-6 py-4">
                      {item.dest}
                  </td>
                  <td class="px-6 py-4">
                      {item.dept}
                  </td>
              </tr> 
                  })
                }
          </tbody>
      </table>
  </div>

    </div>
    </>
  )
}
