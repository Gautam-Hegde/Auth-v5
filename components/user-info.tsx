import {ExtendedUser} from '@/next-auth'
import { Card, CardContent, CardHeader } from './ui/card';

interface UserInfoProps{
user?: ExtendedUser;
label: string;
}

export const UserInfo = ({user,label}:UserInfoProps) =>{
    return (
        <Card className='w-[600px] shadow-lg'>
            <CardHeader>
                <h2 className='text-xl font-medium text-center '>{label}</h2>
            </CardHeader>
            <CardContent>
                <div className='flex flex-row items-center justify-between rounded-xl p-4 shadow-lg'>
                <p className='text-sm font-normal'>
                   ID 
                </p>
                <p className='truncate text-xs bg-slate-200 rounded-sm p-2 max-w-[180px]'>
                    {user?.id}
                </p>
                </div>
                <div className='flex flex-row items-center justify-between rounded-xl p-4 shadow-lg'>
                <p className='text-sm font-normal'>
                   Name
                </p>
                <p className='truncate text-xs bg-slate-200 rounded-sm p-2 max-w-[180px]'>
                    {user?.name}
                </p>
                </div>
                <div className='flex flex-row items-center justify-between rounded-xl p-4 shadow-lg'>
                <p className='text-sm font-normal'>
                   Email
                </p>
                <p className='truncate text-xs bg-slate-200 rounded-sm p-2 max-w-[180px]'>
                    {user?.email}
                </p>
                </div>
                <div className='flex flex-row items-center justify-between rounded-xl p-4 shadow-lg'>
                <p className='text-sm font-normal'>
                   Role
                </p>
                <p className='truncate text-xs bg-slate-200 rounded-sm p-2 max-w-[180px]'>
                    {user?.role}
                </p>
                </div>
                <div className='flex flex-row items-center justify-between rounded-xl p-4 shadow-lg'>
                <p className='text-sm font-normal'>
                   Two factor enabled
                </p>
                <p className='truncate text-xs bg-slate-200 rounded-sm p-2 max-w-[180px]'>
                    {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                </p>
                </div>
            </CardContent>
        </Card>
    )
}