
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function ErrorMessage({ message }: any) {
    const { toast } = useToast()
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: `${message}`,
        })
      }}
    >
      Show Toast
    </Button>
  );
}

