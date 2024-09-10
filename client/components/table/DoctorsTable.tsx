"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetDoctorsAdmin } from "@/lib/hooks/admin/useAdminDoctor";
import { getDefault } from "@/lib/utils";
import TableSkeleton from "@/components/skeletons/TableSkelton";
import AdminDoctorProfileModel from "../models/admin/AdminDoctorProfileModel";
import { useState } from "react";
import { IDoctor } from "@/types";

const columns = [
   { name: "Image", width: "w-[80px]" },
   { name: "Name", width: "w-1/6" },
   { name: "Email", width: "w-1/4" },
   { name: "Status", width: "w-1/6" },
   { name: "Blocked", width: "w-1/12" },
   { name: "Actions", width: "w-1/6 text-right pr-10" },
];

export default function DoctorsPage() {
   const { data, isLoading, refetch } = useGetDoctorsAdmin(0, 10);
   const [isModelOpen,setModelOpen ] =useState(false);
   const [selectedDoctor,setSelectedDoctor] = useState({});
   const doctors = data?.items || [];

   const handleViewProfile = (doctor:IDoctor)=>{
      setSelectedDoctor(doctor);
      setModelOpen(true);
   }

   return (
      <main className="flex-1 space-y-4 p-4 md:p-6">
         <div className="flex min-h-screen w-full flex-col bg-background">
            {isLoading ? (
               <TableSkeleton
                  columns={columns}
                  rows={5}
                  headerTitle="All Doctors"
                  headerDescription="A list of all doctors including their status, specialty, qualifications, and more."
               />
            ) : (
               <Card>
                  <CardHeader>
                     <CardTitle>All Doctors</CardTitle>
                     <CardDescription>
                        A list of all doctors including their status, specialty, qualifications, and more.
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <Table>
                        <TableHeader>
                           <TableRow>
                              {columns.map((column) => (
                                 <TableHead key={column.name} className={column.width}>
                                    {column.name}
                                 </TableHead>
                              ))}
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {doctors.length > 0 ? (
                              doctors.map((doctor) => (
                                 <TableRow key={doctor._id}>
                                    <TableCell>
                                       <Image
                                          src={getDefault(doctor.image, "/assets/images/admin.png")}
                                          alt={doctor.name!}
                                          width={64}
                                          height={64}
                                          className="rounded-full object-cover"
                                       />
                                    </TableCell>
                                    <TableCell className="font-medium">{doctor.name}</TableCell>
                                    <TableCell>{doctor.email}</TableCell>
                                    <TableCell>
                                       <Badge variant={`${doctor.isVerified?"default":"destructive"}`}>
                                          {doctor.isVerified ? "Verified" : "Not Verified"}
                                       </Badge>
                                    </TableCell>
                                    <TableCell>
                                       <Badge variant={`${doctor.isBlocked?"destructive":"success"}`}>
                                          {doctor.isBlocked ? "Yes" : "No"}
                                       </Badge>
                                    </TableCell>
                                    <TableCell className="text-right cursor-pointer" onClick={()=>handleViewProfile(doctor)}>
                                       <Button variant="ghost" size="sm">
                                          View Profile
                                       </Button>
                                    </TableCell>
                                 </TableRow>
                              ))
                           ) : (
                              <TableRow>
                                 <TableCell colSpan={9} className="text-center">
                                    No doctors found.
                                 </TableCell>
                              </TableRow>
                           )}
                        </TableBody>
                     </Table>
                  </CardContent>
                  <AdminDoctorProfileModel  open={isModelOpen} setOpen={setModelOpen} doctor={selectedDoctor} refetch={refetch} />
               </Card>
            )}
         </div>
      </main>
   );
}