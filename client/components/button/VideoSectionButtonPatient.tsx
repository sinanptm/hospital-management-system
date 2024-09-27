'use client';

import React, { memo, useState } from 'react';
import { ButtonV2 } from './ButtonV2';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge'
import VideoCallModal from '../models/VideoSectionsModel';
import { useGetSectionsInOneDayPatient } from '@/lib/hooks/video/usePatient';
import { Skeleton } from '../ui/skeleton';

const VideoSectionButtonPatient = () => {
    const { data: upcomingSections, isLoading } = useGetSectionsInOneDayPatient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(upcomingSections);

    if(isLoading) return <Skeleton className="w-10 h-10" />
    
    const handleClick = () => {
        console.log('Video button clicked');
    }


    return (
        <>
            <ButtonV2 variant="ghost" size="icon" className="relative" onClick={handleClick}>
                 <Image
                    src="/assets/icons/utils/video.svg"
                    width={20}
                    height={20}
                    alt="Video Calls"
                    className="text-muted-foreground"
                />
                {upcomingSections!.length > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                        {upcomingSections!.length}
                    </Badge>
                )} 
                <span className="sr-only">View Upcoming Video Calls</span>
            </ButtonV2>
            <VideoCallModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                sections={upcomingSections!}
                link="/video-call" 
            />
        </>
    )
}

export default memo(VideoSectionButtonPatient)