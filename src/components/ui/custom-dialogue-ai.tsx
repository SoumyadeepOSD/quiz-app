import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Bot } from "lucide-react";


const CustomDialogueAi = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className="flex flex-row items-center justify-center gap-2 rounded-md border-white border-[2px] w-fit mb-2 px-2 hover:cursor-pointer hover:bg-slate-500">
                    <Bot color="cyan" height={30} width={30} />
                    <h1 className="text-white text-xs">Generate using AI</h1>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomDialogueAi;