"use client";

import { useState, useMemo, memo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDoctorsAdmin } from "@/lib/hooks/admin/useAdminDoctor";
import { getDefault } from "@/lib/utils";
import TableSkeleton from "@/components/skeletons/TableSkelton";
import AdminDoctorProfileModel from "../../models/admin/DoctorProfileModel";
import Pagination from "../../navigation/Pagination";
import { IDoctor } from "@/types/entities";
import { DoctorsFilter } from "@/types/enum";
import { ButtonColorVariant, ButtonV2 } from "@/components/button/ButtonV2";

type Props = {
   page: number;
   type: DoctorsFilter;
};

const DoctorsTable = ({ page, type }: Props) => {
   const [currentPage, setCurrentPage] = useState(page);
   const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);
   const [isModelOpen, setModelOpen] = useState(false);
   const [tabType, setTabType] = useState<DoctorsFilter>(DoctorsFilter.VERIFIED);
   const router = useRouter();
   const limit = 7;
   const { data, isLoading, error, refetch } = useGetDoctorsAdmin(currentPage - 1, limit, type);
   const columns = useMemo(
      () => [
         { name: "Image", width: "w-[80px]" },
         { name: "Name", width: "w-1/6" },
         { name: "Email", width: "w-1/4" },
         { name: "Status", width: "w-1/6" },
         { name: "Blocked", width: "w-1/12" },
         { name: "Actions", width: "w-1/6 text-right pr-10" },
      ],
      []
   );

   const doctors = useMemo(() => data?.items || [], [data]);

   const handleViewProfile = (doctor: IDoctor) => {
      setSelectedDoctor(doctor);
      setModelOpen(true);
   };

   useEffect(() => {
      if (Object.values(DoctorsFilter).includes(type)) {
         setTabType(type);
      }
   }, [type]);

   const handlePageChange = (pageIndex: number) => {
      if (pageIndex > data?.totalPages! || pageIndex < 1) return null;
      setCurrentPage(pageIndex);
      router.push(`/admin/doctors?page=${pageIndex}&type=${tabType}`);
      refetch();
   };

   const handleTabChange = (value: DoctorsFilter) => {
      setTabType(value);
      setCurrentPage(1);
      router.push(`/admin/doctors?page=1&type=${value}`);
      refetch();
   };

   if (error) {
      return (
         <div className="flex items-center justify-center h-screen">
            <p className="text-red-500">Error loading doctors. Please try again later.</p>
         </div>
      );
   }

   return (
      <main className="flex-1 space-y-4 p-4 md:p-6">
         <div className="flex min-h-screen w-full flex-col bg-background">
            <Tabs
               value={tabType}
               onValueChange={(value) => handleTabChange(value as DoctorsFilter)}
               className="space-y-4"
            >
               <div className="flex items-center justify-between">
                  <TabsList>
                     <TabsTrigger value={DoctorsFilter.VERIFIED} asChild>
                        <div>
                           <ButtonV2
                              variant="outline"
                              color="success"
                              className={`${tabType === DoctorsFilter.VERIFIED ? "bg-opacity-45 border-white border-solid hover:bg-opacity-45" : ""}`}
                           >
                              Verified
                           </ButtonV2>
                        </div>
                     </TabsTrigger>
                     <TabsTrigger value={DoctorsFilter.BLOCKED} asChild>
                        <div>
                           <ButtonV2
                              variant="outline"
                              color="warning"
                              className={`${tabType === DoctorsFilter.BLOCKED ? "bg-opacity-45 border-white border-solid hover:bg-opacity-45" : ""}`}
                           >
                              Blocked
                           </ButtonV2>
                        </div>
                     </TabsTrigger>
                     <TabsTrigger value={DoctorsFilter.NOT_VERIFIED} asChild>
                        <div>
                           <ButtonV2
                              variant="outline"
                              color="danger"
                              className={`${tabType === DoctorsFilter.NOT_VERIFIED ? "bg-opacity-45 border-white border-solid hover:bg-opacity-45" : ""}`}
                           >
                              Not Verified
                           </ButtonV2>
                        </div>
                     </TabsTrigger>
                  </TabsList>
               </div>
               <TabsContent value={tabType} className="space-y-4">
                  <Card>
                     <CardHeader>
                        <CardTitle>All Doctors</CardTitle>
                        <CardDescription>
                           A list of all doctors including their status, specialty, qualifications, and more.
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        {isLoading ? (
                           <TableSkeleton
                              columns={columns}
                              rows={limit}
                              showHeader={false}
                              headerTitle="All Doctors"
                              headerDescription="A list of all doctors including their status, specialty, qualifications, and more."
                           />
                        ) : (
                           <div className="overflow-x-auto">
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
                                    {doctors.length >= 1 ? (
                                       doctors.map((doctor) => (
                                          <TableRow key={doctor._id}>
                                             <TableCell>
                                                <Image
                                                   src={getDefault(doctor.image, "/assets/images/admin.png")}
                                                   alt={doctor.name || "Doctor"}
                                                   width={64}
                                                   height={64}
                                                   className="rounded-full object-cover"
                                                />
                                             </TableCell>
                                             <TableCell className="font-medium">{doctor.name}</TableCell>
                                             <TableCell>{doctor.email}</TableCell>
                                             <TableCell>
                                                <Badge variant={doctor.isVerified ? "default" : "destructive"}>
                                                   {doctor.isVerified ? "Verified" : "Not Verified"}
                                                </Badge>
                                             </TableCell>
                                             <TableCell>
                                                <Badge variant={doctor.isBlocked ? "destructive" : "success"}>
                                                   {doctor.isBlocked ? "Yes" : "No"}
                                                </Badge>
                                             </TableCell>
                                             <TableCell className="text-right">
                                                <ButtonV2
                                                   size="sm"
                                                   variant="linkHover2"
                                                   color={"link" as ButtonColorVariant}
                                                   onClick={() => handleViewProfile(doctor!)}
                                                   aria-label={`View profile of ${doctor.name}`}
                                                >
                                                   View Profile
                                                </ButtonV2>
                                             </TableCell>
                                          </TableRow>
                                       ))
                                    ) : (
                                       <TableRow>
                                          <TableCell colSpan={6} className="text-center">
                                             No doctors found.
                                          </TableCell>
                                       </TableRow>
                                    )}
                                 </TableBody>
                              </Table>
                           </div>
                        )}
                        {data && (
                           <Pagination
                              currentPage={currentPage}
                              handlePageChange={handlePageChange}
                              totalPages={data.totalPages}
                              className="mt-4"
                              hasNextPage={data.hasNextPage}
                              hasPrevPage={data.hasPreviousPage}
                           />
                        )}
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
         </div>
         {selectedDoctor && (
            <AdminDoctorProfileModel
               open={isModelOpen}
               setOpen={setModelOpen}
               doctor={selectedDoctor}
               refetch={refetch}
            />
         )}
      </main>
   );
};

export default memo(DoctorsTable);
