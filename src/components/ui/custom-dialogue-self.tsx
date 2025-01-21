/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { Bot } from "lucide-react";
  import { Input } from "./input";
  
  const CustomDialogueSelf = ({
    action,
    setNewInput,
  }: {
    action: any;
    setNewInput: any;
  }) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex flex-row items-center justify-center gap-2 rounded-md border-white border-[2px] w-fit mb-2 px-2 hover:cursor-pointer hover:bg-slate-500">
            <Bot color="cyan" height={30} width={30} />
            <h1 className="text-white text-xs">Generate custom Quiz</h1>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create your own Quiz</AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                onChange={(e) => {
                  setNewInput(e.target.value); // Update new input text
                }}
                placeholder="Enter Quiz Title"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={action}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default CustomDialogueSelf;
  