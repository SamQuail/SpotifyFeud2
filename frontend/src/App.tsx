
import { Button } from "@/components/ui/button"
import { Input } from "./components/ui/input"
import { useEffect, useState } from "react"
import AuthModal from "./components/AuthModal"
import { useDialog } from "./hooks/useDialog"
import MusicGrid from "./components/MusicGrid"
function App() {
  
  

  return (
    <>
    <AuthModal />
    <div className="flex flex-col gap-10">
    <MusicGrid />
   

    </div>
    </>
  )
}

export default App
