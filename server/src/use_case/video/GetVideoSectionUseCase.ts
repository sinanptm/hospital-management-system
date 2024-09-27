import IVideoSection from "../../domain/entities/IVideoChatSection";
import { IVideoSectionRepository } from "../../domain/interface/repositories/IVideoSectionRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { addDays } from "../../utils/date-formatter";

export default class GetVideoSectionUseCase {
    constructor(
        private readonly videoSectionRepository: IVideoSectionRepository,
        private readonly validatorService: IValidatorService
    ) { }

    async getSectionById(id: string): Promise<IVideoSection | null> {
        this.validatorService.validateIdFormat(id)
        return await this.videoSectionRepository.findById(id);
    }

    async getSectionByAppointmentId(appointmentId: string): Promise<IVideoSection | null> {
        this.validatorService.validateIdFormat(appointmentId)
        return await this.videoSectionRepository.findByAppointmentId(appointmentId);
    }

    async getSectionInOneDayDoctor(doctorId: string): Promise<IVideoSection[] | []> {
        this.validatorService.validateIdFormat(doctorId);
        const currentTime = new Date();
        const afterOneDay = addDays(currentTime, 2);
        const sections = await this.videoSectionRepository.findByStartTimeRangeByDoctorId(
            currentTime.toISOString(),
            afterOneDay.toISOString(),
            doctorId
        );
        return sections ?? [];
    }

    async getSectionsInOneDayPatient(patientId: string): Promise<IVideoSection[] | []> {
        this.validatorService.validateIdFormat(patientId);

        const currentTime = new Date();
        const afterTwoDays = addDays(currentTime, 2);

        const sections = await this.videoSectionRepository.findByStartTimeRangeByPatientId(
            currentTime.toISOString(),
            afterTwoDays.toISOString(),
            patientId
        );

        return sections ?? [];
    }
}
