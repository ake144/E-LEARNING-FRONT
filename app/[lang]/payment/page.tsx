import CheckoutForm from '@/components/checkout'
import PurchaseCard from '@/components/payCard'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

function Pay() {

  return (
<div  className='mt-[200px]  mx-[80px]  flex-col'>
    <CheckoutForm  amount={1000} />
    <div className='mt-6 flex items-center justify-center p-6'>
  
    <Dialog> 
        <DialogTrigger asChild>
                    <Button className='text-black font-bold  py-2 rounded-md border bg-white px-4' variant="outline">
                         CLick here to play
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] dialog-overlay bg-white">
                    <DialogHeader>
                    <DialogTitle className='text-base'>Buy this course</DialogTitle>
                    </DialogHeader>
                       <PurchaseCard amount={2000} />
                </DialogContent>
            </Dialog>
       </div>
    </div>
  )
}

export default Pay