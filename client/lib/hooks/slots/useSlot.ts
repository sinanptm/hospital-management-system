import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ISlot, Days, ErrorResponse, MessageResponse } from "@/types";
import { addSlotsDoctor, getSlotsByDayDoctor, getAllSlotsDoctor, deleteManyByDayDoctor } from "@/lib/api/slots/route";

export const useAddSlotsDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { slots: ISlot[], day: Days }>({
      mutationFn: ({ slots, day }) => addSlotsDoctor(slots, day),
      onError: (error) => {
         console.log("Error adding slots: ", error);
      },
   });
};

export const useDeleteDoctorByDay = ()=>{
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { slots: ISlot[], day: Days }>({
      mutationFn: ({ slots, day }) => deleteManyByDayDoctor(slots, day),
      onError: (error) => {
         console.log("Error Deleting Slot: ", error);
      },
   });
}


export const useGetSlotsByDayDoctor = (day: Days) => {
   return useQuery<ISlot[], AxiosError<ErrorResponse>>({
      queryFn: () => getSlotsByDayDoctor(day),
      queryKey: ["slotsByDay", day],
   });
};


export const useGetAllSlotsDoctor = () => {
   return useQuery<ISlot[], AxiosError<ErrorResponse>>({
      queryFn: () => getAllSlotsDoctor(),
      queryKey: ["allSlots"],
   });
};
